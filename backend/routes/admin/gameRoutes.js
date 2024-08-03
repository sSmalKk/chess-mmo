/**
 * gameRoutes.js
 * @description :: CRUD API routes for game
 */

const express = require('express');
const router = express.Router();
const gameController = require('../../controller/admin/gameController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/game/create').post(auth(PLATFORM.ADMIN),checkRolePermission,gameController.addGame);
router.route('/admin/game/list').post(auth(PLATFORM.ADMIN),checkRolePermission,gameController.findAllGame);
router.route('/admin/game/count').post(auth(PLATFORM.ADMIN),checkRolePermission,gameController.getGameCount);
router.route('/admin/game/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,gameController.getGame);
router.route('/admin/game/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,gameController.updateGame);    
router.route('/admin/game/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,gameController.partialUpdateGame);
router.route('/admin/game/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,gameController.softDeleteGame);
router.route('/admin/game/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,gameController.softDeleteManyGame);
router.route('/admin/game/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,gameController.bulkInsertGame);
router.route('/admin/game/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,gameController.bulkUpdateGame);
router.route('/admin/game/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,gameController.deleteGame);
router.route('/admin/game/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,gameController.deleteManyGame);

module.exports = router;
