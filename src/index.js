const WebSocket = require('ws');

// Crear el servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    
    let counter = 0; // Inicializa el contador
    let counterInterval; // Variable para el intervalo

    // Manejar mensajes recibidos desde el cliente
    ws.on('message', (message) => {
        // Convertir el mensaje de Buffer a string
        const receivedMessage = message.toString();
        console.log('Mensaje recibido del cliente:', receivedMessage);

        if (receivedMessage === 'start_counter') {
            // Iniciar el contador cuando recibimos "start_counter"
            console.log("Entrando en start_counter");
            
            // Si ya hay un intervalo corriendo, no iniciar uno nuevo
            if (!counterInterval) {
                counterInterval = setInterval(() => {
                    counter += 1;
                    console.log('Counter:', counter);
                    ws.send(counter.toString()); // Enviar el contador como cadena
                }, 1000);
            }
        } else if (receivedMessage === 'stop_counter') {
            console.log("entrando en counterStop", receivedMessage);
            // Detener el contador cuando recibimos "stop_counter"
            if (counterInterval) {
                counter = 0
                clearInterval(counterInterval);
                counterInterval = null; // Reiniciar para permitir que se inicie de nuevo
                console.log('Contador detenido');
            }
        }
    });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado');
        // Detener el contador si el cliente se desconecta
        if (counterInterval) {
            clearInterval(counterInterval);
            counterInterval = null; // Reiniciar para permitir que se inicie de nuevo
        }
    });
});

console.log('Servidor WebSocket escuchando en ws://localhost:8080');
