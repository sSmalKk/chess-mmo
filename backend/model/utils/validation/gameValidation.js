/**
 * gameValidation.js
 * @description :: validate each post and put request as per game model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  
const gameDefault = require('../../constants/game');    

/** validation keys and properties of game */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean().default(true),
  type: joi.number().default(gameDefault.type['normal']).allow(0),
  size: joi.number().integer().required(),
  time: joi.number().default(gameDefault.age['normal']).allow(0),
  playerlist: joi.array().items(),
  jogada: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chat: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  timepast: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of game for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean().default(true),
  type: joi.number().default(gameDefault.type['normal']).allow(0),
  size: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  time: joi.number().default(gameDefault.age['normal']).allow(0),
  playerlist: joi.array().items(),
  jogada: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chat: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  timepast: joi.number().integer().allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of game for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      playerlist: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      jogada: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chat: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      timepast: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
