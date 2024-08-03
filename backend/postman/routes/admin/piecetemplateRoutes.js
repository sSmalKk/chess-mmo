/**
 * piecetemplateRoutes.js
 * @description :: CRUD API routes for piecetemplate
 */

const express = require('express');
const router = express.Router();
const piecetemplateController = require('../../controller/admin/piecetemplateController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/piecetemplate/create').post(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.addPiecetemplate);
router.route('/admin/piecetemplate/list').post(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.findAllPiecetemplate);
router.route('/admin/piecetemplate/count').post(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.getPiecetemplateCount);
router.route('/admin/piecetemplate/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.getPiecetemplate);
router.route('/admin/piecetemplate/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.updatePiecetemplate);    
router.route('/admin/piecetemplate/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.partialUpdatePiecetemplate);
router.route('/admin/piecetemplate/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.softDeletePiecetemplate);
router.route('/admin/piecetemplate/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.softDeleteManyPiecetemplate);
router.route('/admin/piecetemplate/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.bulkInsertPiecetemplate);
router.route('/admin/piecetemplate/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.bulkUpdatePiecetemplate);
router.route('/admin/piecetemplate/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.deletePiecetemplate);
router.route('/admin/piecetemplate/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,piecetemplateController.deleteManyPiecetemplate);

module.exports = router;
