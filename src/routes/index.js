const express = require('express')
const router = express.Router()

const WebSocket = require('ws');

// Crear servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    
    // Escuchar mensajes del cliente
    ws.on('message', (message) => {
        console.log('Mensaje recibido del cliente:', message);
        
        // Enviar respuesta al cliente
        ws.send('Mensaje recibido: ' + message);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

router.get('/', (req, res) => {

    res.json({message:"Hello World"})
})

module.exports = router