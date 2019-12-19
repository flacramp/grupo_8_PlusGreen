const fs = require('fs');
const path = require('path');

const ubicacionRegisterJSON = path.join(__dirname, '../data/register.json');

let contenidoRegisterJSON = fs.readFileSync(ubicacionRegisterJSON, 'utf-8');

const controller = {
	mostrarRegister: (req, res) => {
		res.render('register')
	},
	guardarRegister: (req, res) => {
		// creo array vació
		let arrayDeRegister = [];
		
		// Si el archivo no está vacío 
		if (contenidoRegisterJSON != '') {

			// tomo el contenido y lo convierto en un formato de Array de objetos literales
			arrayDeRegister = JSON.parse(contenidoRegisterJSON);
		}
			// Genero el id para el producto
			req.body = {
				id: arrayDeRegister.length + 1,
				...req.body
			};
			
			req.body.timestamp = new Date();
			
			// Inserto el producto nuevo
			arrayDeRegister.push(req.body);
		

			// Convierto el arrayDeProductos a JSON
			let contenidoAGuardar = JSON.stringify(arrayDeRegister, null, ' ');

			// guardo el array completo en el archivo JSON
			fs.writeFileSync(ubicacionRegisterJSON, contenidoAGuardar);
			
			// Mensaje de éxito
			res.send('¡Producto creado con éxitooooo!');
	}
}

module.exports = controller
