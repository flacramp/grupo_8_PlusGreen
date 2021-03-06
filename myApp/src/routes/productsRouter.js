// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware=require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

const storageDiskProductImage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../../public/images/productImages');
	},
	filename: (req, file, cb) => {
        let imageFinalName = `product_image_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});
const uploadProductImage=multer({storage: storageDiskProductImage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');


/* GET - Formulario para crear producto. */
router.get('/create',authMiddleware, productsController.showForm);

/* POST - Creacion de producto. */
router.post('/create', uploadProductImage.single('image'),productsController.create);

/* GET - detalle de producto. */
router.get('/',productsController.root);

/* GET - cart. */
router.get('/cart',productsController.cart);

/* POST - Borrar producto. */
router.delete('/:id', productsController.delete);

/* GET - Product Edit. */
router.get('/edit/:id',productsController.edit);

/* GET - Product Update. */
router.put('/edit/:id',uploadProductImage.single('image'),productsController.update);

/* GET - detalle de producto. */
router.get('/:id',productsController.detail);

module.exports = router;
