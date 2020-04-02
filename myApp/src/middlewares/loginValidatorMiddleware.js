const { check } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

let emailAlreadyExists = async function(email) {
    await db.Users.findOne({
        where: {
            email: email
        }
    })
    .then(users => {
        return true
    })
    return false;
}


let registerValidatorMiddleware = [
    //validando Nombre
    check('first_name')
    .notEmpty().withMessage('El campo Nombre no puede estar vacío').bail()
    .isAlpha().withMessage('El campo Nombre sólo acepta caractéres alfabéticos'),

    //valido apellido
    check('last_name')
    .notEmpty().withMessage('El campo Apellido no puede estar vacío').bail()
    .isAlpha().withMessage('El campo Apellido sólo acepta caractéres alfabéticos'),

    //valido email
    check('email')
    .notEmpty().withMessage('El campo Email no puede estar vacío').bail()
    .isEmail().withMessage('El campo Email sólo acepta un formato de Email: ejemplo@gmail.com')
    .custom(email => {
        if(emailAlreadyExists(email)){
            throw new Error('El email ya existe! Por favor, ingresá otro email para continuar el resgistro')
        } else {
            return email;
        }
    }),


    //valido password
    check('password')
    .notEmpty().withMessage('El campo Contraseña no puede estar vacío').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe constar de 8 caracteres, al menos 1 minúscula, 1 mayúscula y 1 número')
    .matches('[0-9]').withMessage('La contraseña debe constar de 8 caracteres, al menos 1 minúscula, 1 mayúscula y 1 número')
    .matches('[a-z]').withMessage('La contraseña debe constar de 8 caracteres, al menos 1 minúscula, 1 mayúscula y 1 número')
    .matches('[A-Z]').withMessage('La contraseña debe constar de 8 caracteres, al menos 1 minúscula, 1 mayúscula y 1 número')
    ,
    //valido repassword
    check('rePassword')
    .notEmpty().withMessage('El campo Repetir Contraseña no puede estar vacío').bail()
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // tira error si las pass no coinciden
            throw new Error("Las contraseñas no son iguales, por favor volve a ingresarlas.");
        } else {
            return value;
        }
    }),

    check('image')
    .custom((value, { req }) => {
        let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        if (typeof req.file == 'undefined') {
            throw new Error('Elegí una imagen de perfil');
        } else if (req.file.originalname) {
            let fileExtension = path.extname(req.file.originalname);
            let extensionIsOk = acceptedExtensions.includes(fileExtension);
            if (!extensionIsOk) {
                throw new Error('Los formatos válidos son JPG, JPEG y PNG');
            }
        }
        return true;
    }),

]

module.exports = registerValidatorMiddleware;