// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/profileImages');
	},
	filename: (req, file, cb) => {
        let imageFinalName = `profile_image_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});
const upload=multer({storage: storageDisk});

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
router.get('/register', mainController.mostrarRegister);

/* POST - Guardar el registro del usuario en DB */ 
router.post('/register', upload.single('image') ,mainController.guardarRegister);



module.exports = router;
