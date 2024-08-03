/**
 * gameController.js
 * @description : exports action methods for game.
 */

const Game = require('../../../model/game');
const gameSchemaKey = require('../../../utils/validation/gameValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Game in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Game. {status, message, data}
 */ 
const addGame = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'createdAt':(Date.now()).toString(),
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      gameSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Game(dataToCreate);
    let createdGame = await dbService.create(Game,dataToCreate);
    return res.success({ data : createdGame });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Game in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Games. {status, message, data}
 */
const bulkInsertGame = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'createdAt':(Date.now()).toString(),
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdGames = await dbService.create(Game,dataToCreate);
    createdGames = { count: createdGames ? createdGames.length : 0 };
    return res.success({ data:{ count:createdGames.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Game from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Game(s). {status, message, data}
 */
const findAllGame = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      gameSchemaKey.findFilterKeys,
      Game.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Game, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundGames = await dbService.paginate( Game,query,options);
    if (!foundGames || !foundGames.data || !foundGames.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundGames });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Game from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Game. {status, message, data}
 */
const getGame = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundGame = await dbService.findOne(Game,query, options);
    if (!foundGame){
      return res.recordNotFound();
    }
    return res.success({ data :foundGame });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Game.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getGameCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      gameSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedGame = await dbService.count(Game,where);
    return res.success({ data : { count: countedGame } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Game with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Game.
 * @return {Object} : updated Game. {status, message, data}
 */
const updateGame = async (req,res) => {
  try {
    let dataToUpdate = {
      ...{
        'updatedAt':(Date.now()).toString(),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      gameSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedGame = await dbService.updateOne(Game,query,dataToUpdate);
    if (!updatedGame){
      return res.recordNotFound();
    }
    return res.success({ data :updatedGame });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Game with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Games.
 * @return {Object} : updated Games. {status, message, data}
 */
const bulkUpdateGame = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...{
          'updatedAt':(Date.now()).toString(),
          'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedGame = await dbService.updateMany(Game,filter,dataToUpdate);
    if (!updatedGame){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedGame } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Game with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Game.
 * @return {obj} : updated Game. {status, message, data}
 */
const partialUpdateGame = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      gameSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedGame = await dbService.updateOne(Game, query, dataToUpdate);
    if (!updatedGame) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedGame });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Game from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Game.
 * @return {Object} : deactivated Game. {status, message, data}
 */
const softDeleteGame = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedGame = await dbService.updateOne(Game, query, updateBody);
    if (!updatedGame){
      return res.recordNotFound();
    }
    return res.success({ data:updatedGame });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Game from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Game. {status, message, data}
 */
const deleteGame = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedGame = await dbService.deleteOne(Game, query);
    if (!deletedGame){
      return res.recordNotFound();
    }
    return res.success({ data :deletedGame });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Game in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyGame = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedGame = await dbService.deleteMany(Game,query);
    if (!deletedGame){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedGame } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Game from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Game.
 * @return {Object} : number of deactivated documents of Game. {status, message, data}
 */
const softDeleteManyGame = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedGame = await dbService.updateMany(Game,query, updateBody);
    if (!updatedGame) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedGame } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addGame,
  bulkInsertGame,
  findAllGame,
  getGame,
  getGameCount,
  updateGame,
  bulkUpdateGame,
  partialUpdateGame,
  softDeleteGame,
  deleteGame,
  deleteManyGame,
  softDeleteManyGame    
};