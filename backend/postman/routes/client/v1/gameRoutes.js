/**
 * gameRoutes.js
 * @description :: CRUD API routes for game
 */

const express = require('express');
const router = express.Router();
const gameController = require('../../../controller/client/v1/gameController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const game = require('../../../middleware/game');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/game/create').post(auth(PLATFORM.CLIENT),game,checkRolePermission,gameController.addGame);
router.route('/client/api/v1/game/list').post(auth(PLATFORM.CLIENT),checkRolePermission,gameController.findAllGame);
router.route('/client/api/v1/game/count').post(auth(PLATFORM.CLIENT),checkRolePermission,gameController.getGameCount);
router.route('/client/api/v1/game/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,gameController.getGame);
router.route('/client/api/v1/game/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,gameController.updateGame);    
router.route('/client/api/v1/game/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,gameController.partialUpdateGame);
router.route('/client/api/v1/game/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,gameController.softDeleteGame);
router.route('/client/api/v1/game/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,gameController.softDeleteManyGame);
router.route('/client/api/v1/game/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,gameController.bulkInsertGame);
router.route('/client/api/v1/game/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,gameController.bulkUpdateGame);
router.route('/client/api/v1/game/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,gameController.deleteGame);
router.route('/client/api/v1/game/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,gameController.deleteManyGame);

module.exports = router;
