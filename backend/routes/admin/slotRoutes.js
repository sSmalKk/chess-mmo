/**
 * slotRoutes.js
 * @description :: CRUD API routes for slot
 */

const express = require('express');
const router = express.Router();
const slotController = require('../../controller/admin/slotController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/slot/create').post(auth(PLATFORM.ADMIN),checkRolePermission,slotController.addSlot);
router.route('/admin/slot/list').post(auth(PLATFORM.ADMIN),checkRolePermission,slotController.findAllSlot);
router.route('/admin/slot/count').post(auth(PLATFORM.ADMIN),checkRolePermission,slotController.getSlotCount);
router.route('/admin/slot/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,slotController.getSlot);
router.route('/admin/slot/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,slotController.updateSlot);    
router.route('/admin/slot/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,slotController.partialUpdateSlot);
router.route('/admin/slot/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,slotController.softDeleteSlot);
router.route('/admin/slot/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,slotController.softDeleteManySlot);
router.route('/admin/slot/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,slotController.bulkInsertSlot);
router.route('/admin/slot/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,slotController.bulkUpdateSlot);
router.route('/admin/slot/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,slotController.deleteSlot);
router.route('/admin/slot/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,slotController.deleteManySlot);

module.exports = router;
