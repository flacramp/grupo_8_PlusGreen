const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {

	showRegister: (req, res) => {
		res.render('users/register');
	},
	saveUser: (req, res) => {
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
		let user = await db.Users.findOne(
			{
				where: {
					email: req.body.email
				}
			}
		)
		if(user == undefined){
			res.send("Oops. No existe usuario asociado a este email. Intentalo de vuelta!")
		} else {

			// Comparo passwords
			if(bcryptjs.compareSync(req.body.password, user.password)){
				req.session.userId = user.id;
				//seteo la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 * 24 * 30 });
				}

				res.redirect('/users/profile');
			} else {
				res.send('Contraseña incorrecta. Intentalo de vuelta!')

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