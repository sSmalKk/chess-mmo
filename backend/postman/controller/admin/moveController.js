/**
 * moveController.js
 * @description : exports action methods for move.
 */

const Move = require('../../model/move');
const moveSchemaKey = require('../../utils/validation/moveValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Move in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Move. {status, message, data}
 */ 
const addMove = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null),
        'date':(Date.now()).toString()
      },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      moveSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Move(dataToCreate);
    let createdMove = await dbService.create(Move,dataToCreate);
    return res.success({ data : createdMove });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Move in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Moves. {status, message, data}
 */
const bulkInsertMove = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null),
          'date':(Date.now()).toString()
        },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdMoves = await dbService.create(Move,dataToCreate);
    createdMoves = { count: createdMoves ? createdMoves.length : 0 };
    return res.success({ data:{ count:createdMoves.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Move from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Move(s). {status, message, data}
 */
const findAllMove = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      moveSchemaKey.findFilterKeys,
      Move.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Move, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMoves = await dbService.paginate( Move,query,options);
    if (!foundMoves || !foundMoves.data || !foundMoves.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMoves });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Move from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Move. {status, message, data}
 */
const getMove = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMove = await dbService.findOne(Move,query, options);
    if (!foundMove){
      return res.recordNotFound();
    }
    return res.success({ data :foundMove });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Move.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMoveCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      moveSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMove = await dbService.count(Move,where);
    return res.success({ data : { count: countedMove } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Move with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Move.
 * @return {Object} : updated Move. {status, message, data}
 */
const updateMove = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      moveSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMove = await dbService.updateOne(Move,query,dataToUpdate);
    if (!updatedMove){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMove });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Move with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Moves.
 * @return {Object} : updated Moves. {status, message, data}
 */
const bulkUpdateMove = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedMove = await dbService.updateMany(Move,filter,dataToUpdate);
    if (!updatedMove){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMove } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Move with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Move.
 * @return {obj} : updated Move. {status, message, data}
 */
const partialUpdateMove = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      moveSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMove = await dbService.updateOne(Move, query, dataToUpdate);
    if (!updatedMove) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMove });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Move from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Move.
 * @return {Object} : deactivated Move. {status, message, data}
 */
const softDeleteMove = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedMove = await dbService.updateOne(Move, query, updateBody);
    if (!updatedMove){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMove });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Move from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Move. {status, message, data}
 */
const deleteMove = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedMove = await dbService.deleteOne(Move, query);
    if (!deletedMove){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMove });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Move in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMove = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedMove = await dbService.deleteMany(Move,query);
    if (!deletedMove){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedMove } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Move from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Move.
 * @return {Object} : number of deactivated documents of Move. {status, message, data}
 */
const softDeleteManyMove = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedMove = await dbService.updateMany(Move,query, updateBody);
    if (!updatedMove) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedMove } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMove,
  bulkInsertMove,
  findAllMove,
  getMove,
  getMoveCount,
  updateMove,
  bulkUpdateMove,
  partialUpdateMove,
  softDeleteMove,
  deleteMove,
  deleteManyMove,
  softDeleteManyMove    
};