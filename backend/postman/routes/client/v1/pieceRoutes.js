/**
 * pieceRoutes.js
 * @description :: CRUD API routes for piece
 */

const express = require('express');
const router = express.Router();
const pieceController = require('../../../controller/client/v1/pieceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/piece/create').post(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.addPiece);
router.route('/client/api/v1/piece/list').post(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.findAllPiece);
router.route('/client/api/v1/piece/count').post(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.getPieceCount);
router.route('/client/api/v1/piece/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.getPiece);
router.route('/client/api/v1/piece/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.updatePiece);    
router.route('/client/api/v1/piece/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.partialUpdatePiece);
router.route('/client/api/v1/piece/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.softDeletePiece);
router.route('/client/api/v1/piece/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.softDeleteManyPiece);
router.route('/client/api/v1/piece/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.bulkInsertPiece);
router.route('/client/api/v1/piece/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.bulkUpdatePiece);
router.route('/client/api/v1/piece/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.deletePiece);
router.route('/client/api/v1/piece/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,pieceController.deleteManyPiece);

module.exports = router;
