const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;


// defino variabes para el register
const userFilePath = path.join(__dirname, '../data/register.json');
const productFilePath = path.join(__dirname, '../data/products.json');

// Funciones Helper
function getAllUsers() {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
	return finalUsers;
}

function storeUser(newUserData){
	let allUsers = getAllUsers();
	allUsers.push(newUserData);
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
	return newUserData;
}

function generateUserId(){
	let allUsers = getAllUsers();
	if(allUsers.length==0){
		return 1;
	}
	let lastUser=allUsers.pop();
	return lastUser.id+1
}

function getUserEmail(email){
	let allUsers=getAllUsers();
	let findUser = allUsers.find(user => user.email == email);
	return findUser;
}

function getUserById(id){
	let allUsers=getAllUsers();
	let findUser = allUsers.find(user => user.id == id);
	return findUser;
}

function getAllProducts() {
	let productFileContent = fs.readFileSync(productFilePath, 'utf-8');
	let finalProducts = productFileContent == '' ? [] : JSON.parse(productFileContent);
	return finalProducts;
}



function storeProduct(newProductData){
	let allProducts = getAllProducts();
	allProducts.push(newProductData);
	fs.writeFileSync(productFilePath, JSON.stringify(allProducts, null, ' '));
}

function generateProductId(){
	let allProducts = getAllProducts();
	if(allProducts.length==0){
		return 1;
	}
	let lastProduct=allProducts.pop();
	return lastProduct.id+1
}

function getProductById(id){
	let products = getAllProducts();
	let productToFind = products.find(oneProduct => oneProduct.id==id)
	return productToFind;
}

const controller = {
	root: (req, res) => {
		// let fetchProduct = getAllProducts();
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
			// user_id: req.session.userId
		}
		);

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
				res.redirect('../');
			})
	},
	edit: (req, res) => {
		
		db.Products
			.findByPk(
				req.params.id,
				{
				include: ['categories', 'colors', 'brands'] 
				}
			)
			.then(products => {
				res.render('products/edit', {products})
			})
			.catch(error => console.log(error))
	},
	update: (req, res) => {
	let oldImage = 
	db.Products
			.findByPk(req.params.id)
			.then(getImage =>{
				return getImage.image
			})
			console.log(req.body)
			console.log(oldImage)
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
				// user_id: req.session.userId},
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