// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware=require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

// ************ Controller Require ************
const mainController = require('../controllers/mainController');


/* GET - home page. */
router.get('/', mainController.root);

module.exports = router;
