/**
 * slotController.js
 * @description : exports action methods for slot.
 */

const Slot = require('../../model/slot');
const slotSchemaKey = require('../../utils/validation/slotValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Slot in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Slot. {status, message, data}
 */ 
const addSlot = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      slotSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Slot(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Slot,[ 'position' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdSlot = await dbService.create(Slot,dataToCreate);
    return res.success({ data : createdSlot });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Slot in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Slots. {status, message, data}
 */
const bulkInsertSlot = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Slot,[ 'position' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdSlots = await dbService.create(Slot,dataToCreate);
    createdSlots = { count: createdSlots ? createdSlots.length : 0 };
    return res.success({ data:{ count:createdSlots.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Slot from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Slot(s). {status, message, data}
 */
const findAllSlot = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      slotSchemaKey.findFilterKeys,
      Slot.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Slot, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSlots = await dbService.paginate( Slot,query,options);
    if (!foundSlots || !foundSlots.data || !foundSlots.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSlots });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Slot from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Slot. {status, message, data}
 */
const getSlot = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSlot = await dbService.findOne(Slot,query, options);
    if (!foundSlot){
      return res.recordNotFound();
    }
    return res.success({ data :foundSlot });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Slot.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSlotCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      slotSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSlot = await dbService.count(Slot,where);
    return res.success({ data : { count: countedSlot } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Slot with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Slot.
 * @return {Object} : updated Slot. {status, message, data}
 */
const updateSlot = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      slotSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Slot,[ 'position' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedSlot = await dbService.updateOne(Slot,query,dataToUpdate);
    if (!updatedSlot){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSlot });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Slot with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Slots.
 * @return {Object} : updated Slots. {status, message, data}
 */
const bulkUpdateSlot = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Slot,[ 'position' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedSlot = await dbService.updateMany(Slot,filter,dataToUpdate);
    if (!updatedSlot){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSlot } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Slot with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Slot.
 * @return {obj} : updated Slot. {status, message, data}
 */
const partialUpdateSlot = async (req,res) => {
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
      slotSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Slot,[ 'position' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedSlot = await dbService.updateOne(Slot, query, dataToUpdate);
    if (!updatedSlot) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSlot });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Slot from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Slot.
 * @return {Object} : deactivated Slot. {status, message, data}
 */
const softDeleteSlot = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedSlot = await dbService.updateOne(Slot, query, updateBody);
    if (!updatedSlot){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSlot });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Slot from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Slot. {status, message, data}
 */
const deleteSlot = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedSlot = await dbService.deleteOne(Slot, query);
    if (!deletedSlot){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSlot });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Slot in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySlot = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedSlot = await dbService.deleteMany(Slot,query);
    if (!deletedSlot){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedSlot } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Slot from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Slot.
 * @return {Object} : number of deactivated documents of Slot. {status, message, data}
 */
const softDeleteManySlot = async (req,res) => {
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
    let updatedSlot = await dbService.updateMany(Slot,query, updateBody);
    if (!updatedSlot) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedSlot } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSlot,
  bulkInsertSlot,
  findAllSlot,
  getSlot,
  getSlotCount,
  updateSlot,
  bulkUpdateSlot,
  partialUpdateSlot,
  softDeleteSlot,
  deleteSlot,
  deleteManySlot,
  softDeleteManySlot    
};