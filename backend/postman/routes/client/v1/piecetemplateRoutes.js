/**
 * piecetemplateRoutes.js
 * @description :: CRUD API routes for piecetemplate
 */

const express = require('express');
const router = express.Router();
const piecetemplateController = require('../../../controller/client/v1/piecetemplateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/piecetemplate/create').post(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.addPiecetemplate);
router.route('/client/api/v1/piecetemplate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.findAllPiecetemplate);
router.route('/client/api/v1/piecetemplate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.getPiecetemplateCount);
router.route('/client/api/v1/piecetemplate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.getPiecetemplate);
router.route('/client/api/v1/piecetemplate/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.updatePiecetemplate);    
router.route('/client/api/v1/piecetemplate/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.partialUpdatePiecetemplate);
router.route('/client/api/v1/piecetemplate/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.softDeletePiecetemplate);
router.route('/client/api/v1/piecetemplate/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.softDeleteManyPiecetemplate);
router.route('/client/api/v1/piecetemplate/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.bulkInsertPiecetemplate);
router.route('/client/api/v1/piecetemplate/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.bulkUpdatePiecetemplate);
router.route('/client/api/v1/piecetemplate/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.deletePiecetemplate);
router.route('/client/api/v1/piecetemplate/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,piecetemplateController.deleteManyPiecetemplate);

module.exports = router;
