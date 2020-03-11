const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

// ************ Controller Require ************
const apiController = require('../controllers/apiController');

/* GET - Obtener los productos. */
router.get('/products',apiController.getProducts);

/* GET - Obtener los usuarios. */
router.get('/users', apiController.getUsers);

/* GET - Obtener los usuarios. */
router.get('/categories', apiController.getCategories);

module.exports = router;
