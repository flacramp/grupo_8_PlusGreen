// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware=require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

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




// ************ Controller Require ************
const mainController = require('../controllers/mainController');


/* GET - home page. */
router.get('/', mainController.root);

/* GET - home page. */
router.get('/productDetail/:id',mainController.productDetail);

/* GET - home page. */
router.get('/productCart',mainController.productCart);

/* GET - Formulario para crear producto. */
router.get('/productAdd',mainController.showProductAdd);

/* POST - Creacion de producto. */
router.post('/productAdd', uploadProductImage.single('image'),mainController.createProduct);

/* POST - Borrar producto. */
router.delete('/productDelete/:id', mainController.deleteProduct);

/* GET - Product Edit. */
router.get('/productEdit/:id',mainController.productEdit);

/* GET - Product Update. */
router.put('/productEdit/:id',uploadProductImage.single('image'),mainController.productUpdate);


/* GET - formulario de registro. */
router.get('/register', guestMiddleware, mainController.mostrarRegister);

/* POST - Guardar el registro del usuario en DB */ 
router.post('/register', uploadProfileImage.single('image') ,mainController.guardarRegister);

/* GET - Log In. */
router.get('/login',guestMiddleware, mainController.showLogIn);

/* POST - Validacion Log In */ 
router.post('/login',  mainController.logInAttempt);

/* GET - Listado de productos */
router.get('/productList', mainController.productList); 

/*GET - Perfil de Usuario */
router.get('/register/profile', authMiddleware,mainController.profile);

/*GET - Logout */
router.get('/register/logout', mainController.logout);


module.exports = router;
