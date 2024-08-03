/**
 * tableRoutes.js
 * @description :: CRUD API routes for table
 */

const express = require('express');
const router = express.Router();
const tableController = require('../../../controller/device/v1/tableController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/table/create').post(auth(PLATFORM.DEVICE),checkRolePermission,tableController.addTable);
router.route('/device/api/v1/table/list').post(auth(PLATFORM.DEVICE),checkRolePermission,tableController.findAllTable);
router.route('/device/api/v1/table/count').post(auth(PLATFORM.DEVICE),checkRolePermission,tableController.getTableCount);
router.route('/device/api/v1/table/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,tableController.getTable);
router.route('/device/api/v1/table/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tableController.updateTable);    
router.route('/device/api/v1/table/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tableController.partialUpdateTable);
router.route('/device/api/v1/table/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tableController.softDeleteTable);
router.route('/device/api/v1/table/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,tableController.softDeleteManyTable);
router.route('/device/api/v1/table/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,tableController.bulkInsertTable);
router.route('/device/api/v1/table/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,tableController.bulkUpdateTable);
router.route('/device/api/v1/table/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,tableController.deleteTable);
router.route('/device/api/v1/table/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,tableController.deleteManyTable);

module.exports = router;
