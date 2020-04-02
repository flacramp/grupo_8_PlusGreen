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
				 res.render('products/list', {products}); 
			})
			.catch(error => console.log(error));
		
	},
	showForm: (req, res) => {

		let categories = db.Categories.findAll();
		let colors = db.Colors.findAll();
		let brands = db.Brands.findAll();
		// Resolviendo con Promise.all() -> se pasa un array de promesas
		Promise
			.all([categories, colors, brands])
			.then(queries => {
				// Recibís un array con el resultado de todas las consultas y lo pasas a la vista
				return res.render('products/create', { 
					categories: queries[0],
					colors: queries[1], 
					brands: queries[2], 
				});
			})
			.catch(error => console.log(error))	
	},
	create: (req, res) => {
		
		db.Products.create({
			category_id: req.body.category,
			name: req.body.name,
			brand_id: req.body.brand,
			model: req.body.model,
			color_id: req.body.color,
			description: req.body.description,
			list_price: req.body.list_price,
			sale_price: req.body.sale_price,
			stock: req.body.stock,
			image: req.file.filename,
			width: req.body.width,
			length: req.body.length,
			height: req.body.height,
			weight: req.body.weight,
			user_id: req.session.userId
		}
		)
		return res.redirect('/products')

	},

	cart: (req, res) => {
		let fetchProduct = getAllProducts();
		res.render('cart', { product: fetchProduct });
	},

	detail: (req, res) => {
		db.Products
			.findByPk(
				req.params.id,
				{
				include: ['categories', 'colors', 'brands'] 
				}
			)
			.then(products => {
				res.render('products/detail', {products});
			})
			.catch(error => console.log(error));

			
	},
	
	delete: (req,res) => {
		db.Products
			.destroy({
				where: {
					id: req.params.id
				}
			})
			.then(products => {
			return res.redirect('../');
			})
	},
	edit: async (req, res) => {
		
		let products = await db.Products.findByPk(req.params.id, {
			include: ['categories', 'colors', 'brands']
		});
		let categories = db.Categories.findAll();
		let colors = db.Colors.findAll();
		let brands = db.Brands.findAll();
		Promise
			.all([categories, colors, brands, products])
			.then(queries => {
				//console.log(queries);
				return res.render('products/edit', {
					categories: queries[0],
					colors: queries[1],
					brands: queries[2],
					products: queries[3],
				});
			})
			.catch(error => console.log(error))	
	},
	update: async (req, res) => {
	
		let oldImage = await db.Products.findByPk(req.params.id);
		oldImage = oldImage.image;

	db.Products
			.update({
				category_id: req.body.category,
				name: req.body.name,
				brand_id: req.body.brand,
				model: req.body.model,
				color_id: req.body.color,
				description: req.body.description,
				list_price: req.body.list_price,
				sale_price: req.body.sale_price,
				stock: req.body.stock,
 				image: req.file ? req.file.filename : oldImage,
				width: req.body.width,
				length: req.body.length,
				height: req.body.height,
				weight: req.body.weight,
			},{
				where: {
					id: req.params.id
				}
			})
		.then(() => res.redirect('/products/' + req.params.id))
		.catch(error => res.send(error));
},

}

module.exports = controller;