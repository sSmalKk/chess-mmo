/**
 * piecetemplateRoutes.js
 * @description :: CRUD API routes for piecetemplate
 */

const express = require('express');
const router = express.Router();
const piecetemplateController = require('../../../controller/device/v1/piecetemplateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/piecetemplate/create').post(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.addPiecetemplate);
router.route('/device/api/v1/piecetemplate/list').post(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.findAllPiecetemplate);
router.route('/device/api/v1/piecetemplate/count').post(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.getPiecetemplateCount);
router.route('/device/api/v1/piecetemplate/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.getPiecetemplate);
router.route('/device/api/v1/piecetemplate/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.updatePiecetemplate);    
router.route('/device/api/v1/piecetemplate/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.partialUpdatePiecetemplate);
router.route('/device/api/v1/piecetemplate/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.softDeletePiecetemplate);
router.route('/device/api/v1/piecetemplate/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.softDeleteManyPiecetemplate);
router.route('/device/api/v1/piecetemplate/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.bulkInsertPiecetemplate);
router.route('/device/api/v1/piecetemplate/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.bulkUpdatePiecetemplate);
router.route('/device/api/v1/piecetemplate/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.deletePiecetemplate);
router.route('/device/api/v1/piecetemplate/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,piecetemplateController.deleteManyPiecetemplate);

module.exports = router;
