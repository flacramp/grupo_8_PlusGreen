const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');


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
	showProductAdd: (req, res) => {
		res.render('productAdd');
	},
	createProduct: (req, res) => {
		
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
		res.redirect('productAdd');
	},

	productCart: (req, res) => {
		let fetchProduct = getAllProducts();
		res.render('productCart', { product: fetchProduct });
	},
	productDetail: (req, res) => {
		let fetchProduct = getProductById(req.params.id);
		res.render('productDetail', { product: fetchProduct});
	},
	productList: (req, res) => {
		let fetchProduct = getAllProducts();
		res.render('productList', { product: fetchProduct});
	//	res.send(fetchProduct);	
	},
	deleteProduct: (req,res) => {
		let allProducts = getAllProducts();
		let listadoProductos = allProducts.filter(oneProduct => oneProduct.id != req.params.id);
		fs.writeFileSync(productFilePath, JSON.stringify(listadoProductos, null, ' '));
		res.redirect('/');
	},
	productEdit: (req, res) => {
		let fetchProduct = getProductById(req.params.id);
		res.render('productEdit', { product: fetchProduct});
	},
	productUpdate: (req, res) => {
		req.body.id = req.params.id;
		let productToUpdate= getProductById(req.params.id);
		console.log(productToUpdate)
		console.log(req.body.name)
		productToUpdate.category= req.body.category;
		productToUpdate.name= req.body.name;
		// brand: req.body.brand;
		// model: req.body.model;
		// color: req.body.color;
		// description: req.body.description;
		// list_price: req.body.list_price;
		// sale_price: req.body.sale_price;
		// stock: req.body.stock;
		// image: req.file.filename;
		// width: req.body.width;
		// length: req.body.lenght;
		// height: req.body.height;
		// weight: req.body.weight;
		console.log(productToUpdate);
		res.redirect('/productDetail/'+ req.params.id)
		
		
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
		let newUser = storeUser(newUserData);

		// Seteamos ID de session para el autologueo
		req.session.userId = newUser.id;

		//Seteo la cookie para mantener el login
		res.cookie('userCookie', newUser.id, {maxAge: 60000 * 60 * 24 * 30});

		// redirecciono ya logueado al perfil
		return res.redirect('/register/profile')

		//modificar por redirigir al login y no al index, o sino a una success page
		// res.send("Registro exitoso! Bienvenido a +Green :)");
	
	},

	profile: (req,res) => {
		let userLogged = getUserById(req.session.userId);
		res.render('profile', { user: userLogged });
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
				req.session.userId = user.id;
				//seteo la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 * 24 * 30 });
				}

				res.redirect('/register/profile');
			} else {
				res.send('Contraseña incorrecta. Intentalo de vuelta!')

			}
				}
	},
	logout: (req,res) => {
		req.session.destroy();
		res.cookie('userCookie', null, {maxAge: 1});

		return res.redirect('/')
	},
};

module.exports = controller;