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

	showRegister: (req, res) => {
		res.render('users/register');
	},
	saveUser: (req, res) => {

		let newUserData = {
			id: generateUserId(),
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: req.file.filename,
				};
		let newUser = storeUser(newUserData);

		// Seteamos ID de session para el autologueo
		req.session.userId = newUser.id;

		//Seteo la cookie para mantener el login
		res.cookie('userCookie', newUser.id, {maxAge: 60000 * 60 * 24 * 30});

		// redirecciono ya logueado al perfil
		return res.redirect('/users/profile')

		//modificar por redirigir al login y no al index, o sino a una success page
		// res.send("Registro exitoso! Bienvenido a +Green :)");
	
	},

	profile: (req,res) => {
		let userLogged = getUserById(req.session.userId);
		res.render('users/profile', { user: userLogged });
	},

	showLogIn: (req,res)=> {
		res.render('users/login');
	},
	logInAttempt: (req,res) => {
		//Existe el email?
		let user = getUserEmail(req.body.email);

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