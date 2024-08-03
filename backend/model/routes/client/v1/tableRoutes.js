/**
 * tableRoutes.js
 * @description :: CRUD API routes for table
 */

const express = require('express');
const router = express.Router();
const tableController = require('../../../controller/client/v1/tableController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/table/create').post(auth(PLATFORM.CLIENT),checkRolePermission,tableController.addTable);
router.route('/client/api/v1/table/list').post(auth(PLATFORM.CLIENT),checkRolePermission,tableController.findAllTable);
router.route('/client/api/v1/table/count').post(auth(PLATFORM.CLIENT),checkRolePermission,tableController.getTableCount);
router.route('/client/api/v1/table/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,tableController.getTable);
router.route('/client/api/v1/table/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tableController.updateTable);    
router.route('/client/api/v1/table/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tableController.partialUpdateTable);
router.route('/client/api/v1/table/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tableController.softDeleteTable);
router.route('/client/api/v1/table/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,tableController.softDeleteManyTable);
router.route('/client/api/v1/table/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,tableController.bulkInsertTable);
router.route('/client/api/v1/table/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,tableController.bulkUpdateTable);
router.route('/client/api/v1/table/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,tableController.deleteTable);
router.route('/client/api/v1/table/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,tableController.deleteManyTable);

module.exports = router;
