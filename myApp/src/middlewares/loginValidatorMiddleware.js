const { check } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

let loginValidatorMiddleware = [
    //valido email
    check('email')
    .notEmpty().withMessage('El campo Email no puede estar vacío').bail()
    .isEmail().withMessage('Completá el campo Email con una dirección de correo correcta').bail()
    .custom(email => {
        return db.Users.findOne({
			where: {
				email: email
            }
		}).then(user => {
			if (!user) {
				return Promise.reject('Dirección de correo inválida');
			}
		});
    }),

    //valido password
    check('password')
    .notEmpty().withMessage('Completá el campo con tu contraseña')

,
]

module.exports = loginValidatorMiddleware;