const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');


// defino variabes para el register
const userFilePath = path.join(__dirname, '../data/register.json');

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




const controller = {
	root: (req, res) => {
		res.render('index');
	},
	productAdd: (req, res) => {
		res.render('productAdd');
	},
	productCart: (req, res) => {
		res.render('productCart');
	},
	productDetail: (req, res) => {
		res.render('productDetail');
	},
	mostrarRegister: (req, res) => {
		res.render('register');
	},
	guardarRegister: (req, res) => {
		let newUserData = {
			id: generateUserId(),
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: req.file.filename,
				};
		storeUser(newUserData);
		//modificar por redirigir al login y no al index, o sino a una success page
		res.redirect('/');
	},
	showLogIn: (req,res)=> {
		res.render('login');
	},
	logInAttempt: (req,res) => {
		//Existe el email?
		let user = getUserEmail(req.body.email);

		if(user == undefined){
			res.send("Oops. No existe usuario asociado a este email. Intentalo de vuelta!")
		} else {
			// Comparo passwords
			if(bcryptjs.compareSync(req.body.password, user.password)){
				//acá debería redirigirlo al PERFIL, pero no tenemos  /account nosotros todavía
				res.redirect('/');
			} else {
				res.send('Contraseña incorrecta. Intentalo de vuelta!')
				
			}
				}
	}
	
};

module.exports = controller;