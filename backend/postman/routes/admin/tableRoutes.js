/**
 * tableRoutes.js
 * @description :: CRUD API routes for table
 */

const express = require('express');
const router = express.Router();
const tableController = require('../../controller/admin/tableController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/table/create').post(auth(PLATFORM.ADMIN),checkRolePermission,tableController.addTable);
router.route('/admin/table/list').post(auth(PLATFORM.ADMIN),checkRolePermission,tableController.findAllTable);
router.route('/admin/table/count').post(auth(PLATFORM.ADMIN),checkRolePermission,tableController.getTableCount);
router.route('/admin/table/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,tableController.getTable);
router.route('/admin/table/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tableController.updateTable);    
router.route('/admin/table/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tableController.partialUpdateTable);
router.route('/admin/table/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tableController.softDeleteTable);
router.route('/admin/table/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,tableController.softDeleteManyTable);
router.route('/admin/table/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,tableController.bulkInsertTable);
router.route('/admin/table/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,tableController.bulkUpdateTable);
router.route('/admin/table/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,tableController.deleteTable);
router.route('/admin/table/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,tableController.deleteManyTable);

module.exports = router;
