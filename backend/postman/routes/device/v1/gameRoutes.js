/**
 * gameRoutes.js
 * @description :: CRUD API routes for game
 */

const express = require('express');
const router = express.Router();
const gameController = require('../../../controller/device/v1/gameController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/game/create').post(auth(PLATFORM.DEVICE),checkRolePermission,gameController.addGame);
router.route('/device/api/v1/game/list').post(auth(PLATFORM.DEVICE),checkRolePermission,gameController.findAllGame);
router.route('/device/api/v1/game/count').post(auth(PLATFORM.DEVICE),checkRolePermission,gameController.getGameCount);
router.route('/device/api/v1/game/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,gameController.getGame);
router.route('/device/api/v1/game/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,gameController.updateGame);    
router.route('/device/api/v1/game/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,gameController.partialUpdateGame);
router.route('/device/api/v1/game/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,gameController.softDeleteGame);
router.route('/device/api/v1/game/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,gameController.softDeleteManyGame);
router.route('/device/api/v1/game/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,gameController.bulkInsertGame);
router.route('/device/api/v1/game/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,gameController.bulkUpdateGame);
router.route('/device/api/v1/game/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,gameController.deleteGame);
router.route('/device/api/v1/game/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,gameController.deleteManyGame);

module.exports = router;
