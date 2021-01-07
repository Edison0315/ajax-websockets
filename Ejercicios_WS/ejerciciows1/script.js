let ws = null

const setText = data => {
    const msg = `<div>${data}</div>`
    chat.insertAdjacentHTML('beforeend', msg)
}

const setMessage = data => {
    const msg = `<div><span>${data.name}: </span><span>${data.message}</span></div>`
    chat.insertAdjacentHTML('beforeend', msg)
}

btnConnect.addEventListener('click', e => {
    ws = new WebSocket('ws://localhost:8080')
    ws.onopen = () => setText('Conectado')
    ws.onclose = () => setText('Desconectado')
    ws.onerror = (e) => setText(e)
    ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        setMessage(message)
    }
})

btnDisconnect.addEventListener('click', e => {
    ws.close()
})

btnSend.addEventListener('click', e => {
    const message = {
        name:txtName.value,
        message: txtMesage.value
    }

    ws.send(JSON.stringify(message))

    // Limpiar campos
    txtMesage.txtName = ''
    txtMesage.value = ''
})