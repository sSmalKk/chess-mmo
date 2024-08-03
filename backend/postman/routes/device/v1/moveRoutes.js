/**
 * moveRoutes.js
 * @description :: CRUD API routes for move
 */

const express = require('express');
const router = express.Router();
const moveController = require('../../../controller/device/v1/moveController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/move/create').post(auth(PLATFORM.DEVICE),checkRolePermission,moveController.addMove);
router.route('/device/api/v1/move/list').post(auth(PLATFORM.DEVICE),checkRolePermission,moveController.findAllMove);
router.route('/device/api/v1/move/count').post(auth(PLATFORM.DEVICE),checkRolePermission,moveController.getMoveCount);
router.route('/device/api/v1/move/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,moveController.getMove);
router.route('/device/api/v1/move/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,moveController.updateMove);    
router.route('/device/api/v1/move/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,moveController.partialUpdateMove);
router.route('/device/api/v1/move/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,moveController.softDeleteMove);
router.route('/device/api/v1/move/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,moveController.softDeleteManyMove);
router.route('/device/api/v1/move/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,moveController.bulkInsertMove);
router.route('/device/api/v1/move/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,moveController.bulkUpdateMove);
router.route('/device/api/v1/move/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,moveController.deleteMove);
router.route('/device/api/v1/move/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,moveController.deleteManyMove);

module.exports = router;
