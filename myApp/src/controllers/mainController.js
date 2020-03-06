const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
	root: (req, res) => {
		db.Products
			.findAll(
				{
					include: ['categories', 'colors', 'brands']
				}
			)
			.then(products => {
				let users = db.Users.findByPk(req.session.userId)
				// .then()
				 res.render('index', {products, users}); 
			})
			.catch(error => console.log(error));

	},
};

module.exports = controller;