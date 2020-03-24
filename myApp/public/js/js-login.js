window.addEventListener("load",function() {
    let formulario = document.querySelector("form.login")
    console.log(formulario);
    
    formulario.addEventListener("submit", function (e){

        let errores = [];

        let campoEmail = document.querySelector("input.email")
        if (campoEmail.value == "" ) {
            errores.push("El campo email está vacio")
        }
        
        let campoContraseña = document.querySelector("input.contraseña")
        if (campoContraseña.value == "" ) {
            errores.push("El campo contraseña está vacio")
        }
       

        if (errores.length > 0 ){
         e.preventDefault();

        console.log("entre al for")
            let ulErrores = document.querySelector("div.errores ul");

            for (let i = 0; i < errores.length; i++) {
                console.log(errores[i])
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
                
            }
        }

    })

});