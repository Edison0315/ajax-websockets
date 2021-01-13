let ws = null, theChart = null
dataChart = [5,15,12]

// Aca se colocan los mensajes
const setSystemMessage = data => {
    systemMessage.textContent = data
}

// Async para poder usar await y esperar la peticion fetch
const login = async () => {

    // OBJ de usuario para autenticar
    const user = {
        name:usrName.value,
        password:password.value
    }

    // Set headers content
    const header = new Headers();
    header.append('Content-type', 'application/json') 
    
    const options = {
        method: 'POST', 
        headers: header, 
        body: JSON.stringify(user)
    }
    
    let data = {}
    const response = await fetch('/login', options)

    // Validar codigos de respuesta
    switch (response.status) {
        case 200:
            // Procesar JSON de respuesta
            data = await response.json()
            connnectWS(data)
            loadChart()
            break;
        
        case 401:
            setSystemMessage('Usuario o password no valido')
            break;
            
        default:
            setSystemMessage('Estado no esperado: ' + response.status)
            break;
    }
}

// Evento para iniciar session
btnLogin.addEventListener('click', e => {
    e.preventDefault()
    login()
})

password.addEventListener('keydown', ({key}) => {
    if(key == 'Enter') login()
})

const connnectWS = (data) => {
    ws = new WebSocket(`ws://localhost:9999/ws?uname=${usrName.value}&token=${data.token}`)
    ws.onopen = e => {
        setSystemMessage('Conectado al WS')
    }
    ws.onerror = e => {
        setSystemMessage(e)
    }
    ws.onmessage = e => {
        const data = JSON.parse(e.data)
        switch (data.type) {
            case 'message':
                content.insertAdjacentHTML('beforeend', `<div>De: ${data.data_response.name}, Mensaje: ${data.data_response.message}</div>`)
                break
            case 'sale':
                dataChart[data.data_sale.product] += data.data_sale.quantity
                theChart.update()
                break
            case 'pong':
                console.log('sigo vivo')
                break
            default:
                setSystemMessage('Recibí un tipo de mensaje desconocido')
        }
    }
    setInterval(() => {
        ws.send(JSON.stringify({type: 'ping'}))
    }, 10000)
}

btnSendMessage.addEventListener('click', e => {
   e.preventDefault();
   const data = {
       type: 'message',
       message: txtmsg.value
   } 

   ws.send(JSON.stringify(data))
})

btnSale.addEventListener('click', e => {
   e.preventDefault();
   const data = {
        type: 'sale',
        product: parseInt(product.value, 10),
        quantity: parseInt(quantity.value, 10)
    } 
   ws.send(JSON.stringify(data))
})

const loadChart = () => {
    const ctx = myChart.getContext('2d');
    myChart.width = 400
    myChart.height = 400
    theChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Zapatos", "Camisas", "Billeteras"],
            datasets: [{
                label: 'Sales',
                data: dataChart,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}