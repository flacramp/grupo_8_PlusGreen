window.addEventListener("load",function() {
    let formulario = document.querySelector("form.register")
    console.log(formulario);
    
    formulario.addEventListener("submit", function (e){

        let errores = [];

        let campoNombre = document.querySelector("input.nombre")
        if (campoNombre.value == "" ) {
            errores.push("El campo nombre está vacio")
        }
        
        let campoApellido = document.querySelector("input.apellido")
        if (campoApellido.value == "" ) {
            errores.push("El campo apellido está vacio")
        }

        let campoEmail = document.querySelector("input.email")
        if (campoEmail.value == "" ) {
            errores.push("El campo email está vacio")
        }

        let campoContraseña = document.querySelector("input.contraseña")
        if (campoContraseña.value == "" ) {
            errores.push("El campo contraseña está vacio")
        }

        let campoRecontraseña = document.querySelector("input.recontraseña")
        if (campoRecontraseña.value == "" ) {
            errores.push("El campo recontraseña está vacio")
        }
       console.log(campoContraseña);
       console.log(campoRecontraseña);

        if (campoContraseña.value.length > 0 && campoRecontraseña.value.length > 0 && (campoContraseña != campoRecontraseña)) {
            errores.push("Las contraseñas no coinciden!")
        }

        let campoFoto = document.querySelector("input.foto")
        if (campoFoto.value == "" ) {
            errores.push("Tenes que cargar una foto de perfil!")
        }

        if (errores.length > 0 ){
         e.preventDefault();

        console.log("entre al for")
            let ulErrores = document.querySelector("div.errores ul");

            for (let i = 0; i < errores.length; i++) {
                console.log(errores[i])
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
                
            }
            errores = []
        }
        errores = []
    })
    errores = []


});