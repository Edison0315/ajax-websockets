const div    = document.getElementById('myContent');
const btn    = document.getElementById('btnLoad');
const loader = document.getElementById('loading');

loader.style.display = 'none'

btn.addEventListener('click', e => {
    // Mostrar el elemento
    loader.style.display = 'block'
    
    // Instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Validar estado del OBJ XMLHttpRequest
    console.log('Objeto creado: ', xhr.readyState); 

    // @httpmethod (get, post)
    // @url (path)
    // @type (true = async, false = sync)
    xhr.open('get', '/ajax-websockets/ejercicio2/data.html', true)

    // Validar estado del OBJ XMLHttpRequest
    console.log('Objeto abierto: ', xhr.readyState); 

    // Que se debe hacer con la data?
    xhr.addEventListener('load', evt => {
        // Validar estado del OBJ XMLHttpRequest
        console.log('Objeto cargado: ', xhr.readyState);
        
        // Ocultar el loader
        loader.style.display = 'none'
        
        div.innerHTML = evt.target.responseText
    })

    // Realizar la peticion
    xhr.send()

    // Validar estado del OBJ XMLHttpRequest
    console.log('Accion solicitado : ', xhr.readyState); 
})