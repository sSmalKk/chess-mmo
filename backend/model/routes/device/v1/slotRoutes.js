/**
 * slotRoutes.js
 * @description :: CRUD API routes for slot
 */

const express = require('express');
const router = express.Router();
const slotController = require('../../../controller/device/v1/slotController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/slot/create').post(auth(PLATFORM.DEVICE),checkRolePermission,slotController.addSlot);
router.route('/device/api/v1/slot/list').post(auth(PLATFORM.DEVICE),checkRolePermission,slotController.findAllSlot);
router.route('/device/api/v1/slot/count').post(auth(PLATFORM.DEVICE),checkRolePermission,slotController.getSlotCount);
router.route('/device/api/v1/slot/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,slotController.getSlot);
router.route('/device/api/v1/slot/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,slotController.updateSlot);    
router.route('/device/api/v1/slot/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,slotController.partialUpdateSlot);
router.route('/device/api/v1/slot/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,slotController.softDeleteSlot);
router.route('/device/api/v1/slot/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,slotController.softDeleteManySlot);
router.route('/device/api/v1/slot/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,slotController.bulkInsertSlot);
router.route('/device/api/v1/slot/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,slotController.bulkUpdateSlot);
router.route('/device/api/v1/slot/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,slotController.deleteSlot);
router.route('/device/api/v1/slot/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,slotController.deleteManySlot);

module.exports = router;
