/**
 * game.js
 * @description :: model of a database collection game
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const gameEnum = require('../constants/game');
        
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    isDeleted:{ type:Boolean },

    isActive:{
      type:Boolean,
      required:true,
      default:true
    },

    createdAt:{
      type:Date,
      required:true,
      unique:false
    },

    updatedAt:{
      type:Date,
      required:false,
      unique:false
    },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:true,
      unique:false
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:true,
      unique:false
    },

    type:{
      type:Number,
      default:gameEnum.type['normal'],
      required:true,
      unique:false,
      enum:gameEnum.type
    },

    size:{
      unique:false,
      type:Number,
      required:true
    },

    time:{
      type:Number,
      default:gameEnum.age['normal'],
      required:true,
      unique:false,
      enum:gameEnum.age
    },

    playerlist:{ type:Array },

    jogada:{
      ref:'user',
      type:Schema.Types.ObjectId
    },

    chat:{
      ref:'Chat_group',
      type:Schema.Types.ObjectId
    },

    timepast:{ type:Number }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const game = mongoose.model('game',schema);
module.exports = game;