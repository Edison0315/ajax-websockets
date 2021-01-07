const div = document.getElementById('myContent');
let btn = document.getElementById('btnLoad');

btn.addEventListener('click', e => {
    // Instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Validar estado del OBJ XMLHttpRequest
    console.log('Objeto creado: ', xhr.readyState); 

    // @httpmethod (get, post)
    // @url (path)
    // @type (true = async, false = sync)
    xhr.open('get', '/ajax-websockets/ejercicio1/data.html', true)

    // Validar estado del OBJ XMLHttpRequest
    console.log('Objeto abierto: ', xhr.readyState); 

    // Que se debe hacer con la data?
    xhr.addEventListener('load', evt => {
        // Validar estado del OBJ XMLHttpRequest
        console.log('Objeto cargado: ', xhr.readyState); 
        div.innerHTML = evt.target.responseText
    })

    // Realizar la peticion
    xhr.send()

    // Validar estado del OBJ XMLHttpRequest
    console.log('Accion solicitado : ', xhr.readyState); 
})