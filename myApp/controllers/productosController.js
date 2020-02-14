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
		let fetchProduct = getAllProducts();
		res.render('index', { product: fetchProduct});
	},
	showForm: (req, res) => {
		res.render('create');
	},
	create: (req, res) => {
		
		let newProductData = {
			id: generateProductId(),
			category: req.body.category,
			name: req.body.name,
			brand: req.body.brand,
			model: req.body.model,
			color: req.body.color,
			description: req.body.description,
			list_price: req.body.list_price,
			sale_price: req.body.sale_price,
			stock: req.body.stock,
			image: req.file.filename,
			width: req.body.width,
			length: req.body.lenght,
			height: req.body.height,
			weight: req.body.weight,
		};

		storeProduct(newProductData);
	//modificar por redirigir al login y no al index, o sino a una success page
		res.redirect('create');
	},

	cart: (req, res) => {
		let fetchProduct = getAllProducts();
		res.render('cart', { product: fetchProduct });
	},
	detail: (req, res) => {
		let fetchProduct = getProductById(req.params.id);
		res.render('detail', { product: fetchProduct});
	},
	
	delete: (req,res) => {
		let allProducts = getAllProducts();
		let listadoProductos = allProducts.filter(oneProduct => oneProduct.id != req.params.id);
		fs.writeFileSync(productFilePath, JSON.stringify(listadoProductos, null, ' '));
		res.redirect('index');
	},
	edit: (req, res) => {
		let fetchProduct = getProductById(req.params.id);
		res.render('edit', { product: fetchProduct});
	},
	update: (req, res) => {
		let productToUpdate= getProductById(req.params.id);
		let oldImage = productToUpdate.image;
		productToUpdate = {
		id: req.params.id,
		 category: req.body.category,
		 name: req.body.name,
		 brand: req.body.brand,
		 model: req.body.model,
		 color: req.body.color,
		 description: req.body.description,
		 list_price: req.body.list_price,
		 sale_price: req.body.sale_price,
		 stock: req.body.stock,
		 image: req.file ? req.file.filename : oldImage,
		 width: req.body.width,
		 length: req.body.lenght,
		 height: req.body.height,
		 weight: req.body.weight,
			}
		let allProducts = getAllProducts();
		let listadoProductos = allProducts.filter(oneProduct => oneProduct.id != req.params.id);
		listadoProductos.push(productToUpdate);
		fs.writeFileSync(productFilePath, JSON.stringify(listadoProductos, null, ' '));
			res.redirect('/'+ req.params.id)
	},

};

module.exports = controller;