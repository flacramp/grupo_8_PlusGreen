// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');


/* GET - home page. */
router.get('/', mainController.root);

/* GET - home page. */
router.get('/productDetail',mainController.productDetail);

/* GET - home page. */
router.get('/productCart',mainController.productCart);

/* GET - home page. */
router.get('/productAdd',mainController.productAdd);

/* GET - formulario de registro. */
router.get('/register/create', mainController.mostrarRegister);

/* POST - Guardar el registro del usuario en DB */ 
router.post('/register/create', mainController.guardarRegister);


module.exports = router;
