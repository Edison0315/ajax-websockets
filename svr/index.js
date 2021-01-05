const express    = require('express')
const cors       = require('cors');
const bodyParser = require('body-parser')

const app        = express()
app.use(cors())
app.use(bodyParser.urlencoded({	extended: true }))
app.use(bodyParser.json())

app.get('/json', (req, res) => {

    let obj = [
        {
            'Titulo':'Nuevo curso de JS',
            'Contenido':'Aprende a hacer aplicacion con node',
        }
    ]

    res.send(obj);
})

app.listen(3000, ()=> {
    console.log(`API REST corriendo en http://localhost:3000`);   
})
