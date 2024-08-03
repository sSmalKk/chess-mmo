/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./moveRoutes'));
router.use(require('./pieceRoutes'));
router.use(require('./piecetemplateRoutes'));
router.use(require('./slotRoutes'));
router.use(require('./tableRoutes'));
router.use(require('./gameRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
