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
		let userLogged = getUserById(req.session.userId);
		// res.render('index',  {product: fetchProduct});
		res.render('index', {product: fetchProduct, user: userLogged})
	},
};

module.exports = controller;