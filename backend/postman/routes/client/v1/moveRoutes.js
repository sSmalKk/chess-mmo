/**
 * moveRoutes.js
 * @description :: CRUD API routes for move
 */

const express = require('express');
const router = express.Router();
const moveController = require('../../../controller/client/v1/moveController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/move/create').post(auth(PLATFORM.CLIENT),checkRolePermission,moveController.addMove);
router.route('/client/api/v1/move/list').post(auth(PLATFORM.CLIENT),checkRolePermission,moveController.findAllMove);
router.route('/client/api/v1/move/count').post(auth(PLATFORM.CLIENT),checkRolePermission,moveController.getMoveCount);
router.route('/client/api/v1/move/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,moveController.getMove);
router.route('/client/api/v1/move/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,moveController.updateMove);    
router.route('/client/api/v1/move/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,moveController.partialUpdateMove);
router.route('/client/api/v1/move/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,moveController.softDeleteMove);
router.route('/client/api/v1/move/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,moveController.softDeleteManyMove);
router.route('/client/api/v1/move/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,moveController.bulkInsertMove);
router.route('/client/api/v1/move/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,moveController.bulkUpdateMove);
router.route('/client/api/v1/move/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,moveController.deleteMove);
router.route('/client/api/v1/move/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,moveController.deleteManyMove);

module.exports = router;
