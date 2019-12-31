// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// const storageDisk = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, __dirname + '/../public/images/profileImages');
// 	},
// 	filename: (req, file, cb) => {
//         let imageFinalName = `profile_image_${Date.now()}${path.extname(file.originalname)}`;
// 		cb(null, imageFinalName);
// 	}
// });
// const upload=multer({storage: storageDisk});

const storageDiskProfileImage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/profileImages');
	},
	filename: (req, file, cb) => {
        let imageFinalName = `profile_image_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});
const uploadProfileImage=multer({storage: storageDiskProfileImage});

const storageDiskProductImage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/productImages');
	},
	filename: (req, file, cb) => {
        let imageFinalName = `product_image_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});
const uploadProductImage=multer({storage: storageDiskProductImage});




// ************ Controller Require ************
const mainController = require('../controllers/mainController');


/* GET - home page. */
router.get('/', mainController.root);

/* GET - home page. */
router.get('/productDetail',mainController.productDetail);

/* GET - home page. */
router.get('/productCart',mainController.productCart);

/* GET - Formulario para crear producto. */
router.get('/productAdd',mainController.showProductAdd);

/* POST - Creacion de producto. */
router.post('/productAdd', uploadProductImage.any('images'),mainController.createProduct);

/* GET - formulario de registro. */
router.get('/register', mainController.mostrarRegister);

/* POST - Guardar el registro del usuario en DB */ 
router.post('/register', uploadProfileImage.single('image') ,mainController.guardarRegister);

/* GET - Log In. */
router.get('/login', mainController.showLogIn);

/* POST - Validacion Log In */ 
router.post('/login',  mainController.logInAttempt);


module.exports = router;
