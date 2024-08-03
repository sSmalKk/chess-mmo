/**
 * moveRoutes.js
 * @description :: CRUD API routes for move
 */

const express = require('express');
const router = express.Router();
const moveController = require('../../controller/admin/moveController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const movePiece = require('../../middleware/movePiece');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/move/create').post(auth(PLATFORM.ADMIN),movePiece,checkRolePermission,moveController.addMove);
router.route('/admin/move/list').post(auth(PLATFORM.ADMIN),checkRolePermission,moveController.findAllMove);
router.route('/admin/move/count').post(auth(PLATFORM.ADMIN),checkRolePermission,moveController.getMoveCount);
router.route('/admin/move/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,moveController.getMove);
router.route('/admin/move/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,moveController.updateMove);    
router.route('/admin/move/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,moveController.partialUpdateMove);
router.route('/admin/move/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,moveController.softDeleteMove);
router.route('/admin/move/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,moveController.softDeleteManyMove);
router.route('/admin/move/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,moveController.bulkInsertMove);
router.route('/admin/move/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,moveController.bulkUpdateMove);
router.route('/admin/move/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,moveController.deleteMove);
router.route('/admin/move/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,moveController.deleteManyMove);

module.exports = router;
