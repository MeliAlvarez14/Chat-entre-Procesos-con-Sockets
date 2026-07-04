const net = require('net');

const PORT = 5000;
const HOST = '127.0.0.1';

const server = net.createServer((socket) => {
    console.log(`[${new Date().toISOString()}] Cliente conectado desde: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => {
        const mensaje = data.toString().trim();
        const timestamp = new Date().toLocaleTimeString();
        
        console.log(`[${timestamp}] Mensaje recibido: "${mensaje}"`);

        socket.write(`ACK: Mensaje "${mensaje}" recibido correctamente.\n`);
    });

    socket.on('end', () => {
        console.log(`[${new Date().toLocaleTimeString()}] El cliente se ha desconectado.`);
    });

    socket.on('error', (err) => {
        console.error(`Error en el socket: ${err.message}`);
    });
});

server.on('error', (err) => {
    console.error(`Error en el servidor: ${err.message}`);
});

server.listen(PORT, HOST, () => {
    console.log(`Servidor TCP escuchando en ${HOST}:${PORT}`);
});