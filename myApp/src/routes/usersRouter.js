// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware=require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')




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
const usersController = require('../controllers/usersController');


/* GET - formulario de registro. */
router.get('/register', guestMiddleware, usersController.showRegister);

/* POST - Guardar el registro del usuario en DB */ 
router.post('/register', uploadProfileImage.single('image') ,usersController.saveUser);

/* GET - Log In. */
router.get('/login',guestMiddleware, usersController.showLogIn);

/* POST - Validacion Log In */ 
router.post('/login',  usersController.logInAttempt);

/*GET - Perfil de Usuario */
router.get('/profile', authMiddleware,usersController.profile);

/*GET - Logout */
router.get('/logout', usersController.logout);


module.exports = router;
