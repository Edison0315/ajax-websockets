const svrURL = 'http://localhost:3000';

const div    = document.getElementById('myContent');
const btn    = document.getElementById('btnLoad');
const loader = document.getElementById('loading');

loader.style.display = 'none'

btn.addEventListener('click', e => {
    // Mostrar el elemento
    loader.style.display = 'block'
    
    // Instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // @httpmethod (get, post)
    // @url (path)
    // @type (true = async, false = sync)
    xhr.open('get', `${svrURL}/json`, true)

    // Que se debe hacer con la data?
    xhr.addEventListener('load', evt => {
        const data = JSON.parse(evt.target.responseText);
        draw(data)

        // Ocultar el loader
        loader.style.display = 'none'        
    })

    // Realizar la peticion
    xhr.send()
})

const draw = (data) => {
    div.innerHTML = ''
    // Fragmento html, que no se dibuja
    const f = document.createDocumentFragment()

    data.forEach(n => {
        const container = document.createElement('div')
        
        const title     = document.createElement('h2')
        const content   = document.createElement('p')

        title.textContent = n.Titulo
        content.textContent = n.Contenido

        container.appendChild(title)
        container.appendChild(content)
        
        f.appendChild(container)

    });

    div.appendChild(f);
}