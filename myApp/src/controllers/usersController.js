const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require('express-validator')

const controller = {

	showRegister: (req, res) => {
		res.render('users/register');
	},
	saveUser: (req, res) => {
		const hasErrorGetMessage = (field, errors) =>{
			for (const oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
		
		let errorsResult = validationResult(req);
		console.log(errorsResult);

		if ( !errorsResult.isEmpty()){
			return res.render('users/register', {	
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body,
			})
		} else {
		db.Users.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: req.file.filename,
		}
		)
		.then(lastInserted => {
			req.session.userId = lastInserted.id;
			res.cookie('userCookie', lastInserted.id, {maxAge: 60000 * 60 * 24 * 30});
			return res.redirect('/users/profile')
		})		
		.catch(error => console.log(error));
	}
},

	profile: (req,res) => {
		db.Users.findByPk(req.session.userId)
		.then(users => {
			res.render('users/profile', { users });
		})
		.catch(error => console.log(error))
	},

	showLogIn: (req,res)=> {
		res.render('users/login');
	},
	logInAttempt: async (req,res) => {
		//Existe el email?

		const hasErrorGetMessage = (field, errors) =>{
			for (const oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
		let errorsResult = validationResult(req);
		
		if ( !errorsResult.isEmpty()){
			return res.render('users/login', {	
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body,
			})
		} else {
			let user = await db.Users.findOne(
				{
					where: {
						email: req.body.email
					}
				}
			)
			// Comparo passwords
			if(bcryptjs.compareSync(req.body.password, user.password)){
				req.session.userId = user.id;
				//seteo la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 * 24 * 30 });
				}
			res.redirect('/users/profile');
		} else {
			let incorrectPasswordMessage = 'Contraseña incorrecta. Por favor, intentá nuevamente.'
			return res.render('users/login', {
				incorrectPasswordMessage: incorrectPasswordMessage,
				oldData:req.body,
			});
			// res.send('Contraseña incorrecta. Intentalo de vuelta!')

			}
		}
	},
	logout: (req,res) => {
		req.session.destroy();
		res.cookie('userCookie', null, {maxAge: 1});

		return res.redirect('../')
	},
};

module.exports = controller;