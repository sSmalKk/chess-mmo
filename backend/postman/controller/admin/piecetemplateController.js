/**
 * piecetemplateController.js
 * @description : exports action methods for piecetemplate.
 */

const Piecetemplate = require('../../model/piecetemplate');
const piecetemplateSchemaKey = require('../../utils/validation/piecetemplateValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Piecetemplate in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Piecetemplate. {status, message, data}
 */ 
const addPiecetemplate = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      piecetemplateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Piecetemplate(dataToCreate);
    let createdPiecetemplate = await dbService.create(Piecetemplate,dataToCreate);
    return res.success({ data : createdPiecetemplate });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Piecetemplate in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Piecetemplates. {status, message, data}
 */
const bulkInsertPiecetemplate = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdPiecetemplates = await dbService.create(Piecetemplate,dataToCreate);
    createdPiecetemplates = { count: createdPiecetemplates ? createdPiecetemplates.length : 0 };
    return res.success({ data:{ count:createdPiecetemplates.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Piecetemplate from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Piecetemplate(s). {status, message, data}
 */
const findAllPiecetemplate = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      piecetemplateSchemaKey.findFilterKeys,
      Piecetemplate.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Piecetemplate, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPiecetemplates = await dbService.paginate( Piecetemplate,query,options);
    if (!foundPiecetemplates || !foundPiecetemplates.data || !foundPiecetemplates.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPiecetemplates });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Piecetemplate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Piecetemplate. {status, message, data}
 */
const getPiecetemplate = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPiecetemplate = await dbService.findOne(Piecetemplate,query, options);
    if (!foundPiecetemplate){
      return res.recordNotFound();
    }
    return res.success({ data :foundPiecetemplate });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Piecetemplate.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPiecetemplateCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      piecetemplateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPiecetemplate = await dbService.count(Piecetemplate,where);
    return res.success({ data : { count: countedPiecetemplate } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Piecetemplate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Piecetemplate.
 * @return {Object} : updated Piecetemplate. {status, message, data}
 */
const updatePiecetemplate = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      piecetemplateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPiecetemplate = await dbService.updateOne(Piecetemplate,query,dataToUpdate);
    if (!updatedPiecetemplate){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPiecetemplate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Piecetemplate with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Piecetemplates.
 * @return {Object} : updated Piecetemplates. {status, message, data}
 */
const bulkUpdatePiecetemplate = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedPiecetemplate = await dbService.updateMany(Piecetemplate,filter,dataToUpdate);
    if (!updatedPiecetemplate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPiecetemplate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Piecetemplate with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Piecetemplate.
 * @return {obj} : updated Piecetemplate. {status, message, data}
 */
const partialUpdatePiecetemplate = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      piecetemplateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPiecetemplate = await dbService.updateOne(Piecetemplate, query, dataToUpdate);
    if (!updatedPiecetemplate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPiecetemplate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Piecetemplate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Piecetemplate.
 * @return {Object} : deactivated Piecetemplate. {status, message, data}
 */
const softDeletePiecetemplate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedPiecetemplate = await dbService.updateOne(Piecetemplate, query, updateBody);
    if (!updatedPiecetemplate){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPiecetemplate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Piecetemplate from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Piecetemplate. {status, message, data}
 */
const deletePiecetemplate = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedPiecetemplate = await dbService.deleteOne(Piecetemplate, query);
    if (!deletedPiecetemplate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPiecetemplate });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Piecetemplate in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPiecetemplate = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedPiecetemplate = await dbService.deleteMany(Piecetemplate,query);
    if (!deletedPiecetemplate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedPiecetemplate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Piecetemplate from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Piecetemplate.
 * @return {Object} : number of deactivated documents of Piecetemplate. {status, message, data}
 */
const softDeleteManyPiecetemplate = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedPiecetemplate = await dbService.updateMany(Piecetemplate,query, updateBody);
    if (!updatedPiecetemplate) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedPiecetemplate } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPiecetemplate,
  bulkInsertPiecetemplate,
  findAllPiecetemplate,
  getPiecetemplate,
  getPiecetemplateCount,
  updatePiecetemplate,
  bulkUpdatePiecetemplate,
  partialUpdatePiecetemplate,
  softDeletePiecetemplate,
  deletePiecetemplate,
  deleteManyPiecetemplate,
  softDeleteManyPiecetemplate    
};