/**
 * piecetemplateValidation.js
 * @description :: validate each post and put request as per piecetemplate model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of piecetemplate */
exports.schemaKeys = joi.object({
  img: joi.string().allow(null).allow(''),
  move: joi.array().items(),
  eat: joi.string().allow(null).allow(''),
  table: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of piecetemplate for updation */
exports.updateSchemaKeys = joi.object({
  img: joi.string().allow(null).allow(''),
  move: joi.array().items(),
  eat: joi.string().allow(null).allow(''),
  table: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of piecetemplate for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      move: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      eat: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      table: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
