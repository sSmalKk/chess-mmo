/**
 * slotRoutes.js
 * @description :: CRUD API routes for slot
 */

const express = require('express');
const router = express.Router();
const slotController = require('../../../controller/client/v1/slotController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/slot/create').post(auth(PLATFORM.CLIENT),checkRolePermission,slotController.addSlot);
router.route('/client/api/v1/slot/list').post(auth(PLATFORM.CLIENT),checkRolePermission,slotController.findAllSlot);
router.route('/client/api/v1/slot/count').post(auth(PLATFORM.CLIENT),checkRolePermission,slotController.getSlotCount);
router.route('/client/api/v1/slot/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,slotController.getSlot);
router.route('/client/api/v1/slot/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,slotController.updateSlot);    
router.route('/client/api/v1/slot/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,slotController.partialUpdateSlot);
router.route('/client/api/v1/slot/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,slotController.softDeleteSlot);
router.route('/client/api/v1/slot/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,slotController.softDeleteManySlot);
router.route('/client/api/v1/slot/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,slotController.bulkInsertSlot);
router.route('/client/api/v1/slot/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,slotController.bulkUpdateSlot);
router.route('/client/api/v1/slot/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,slotController.deleteSlot);
router.route('/client/api/v1/slot/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,slotController.deleteManySlot);

module.exports = router;
