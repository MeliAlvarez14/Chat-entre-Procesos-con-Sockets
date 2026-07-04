const net = require('net');
const { default: chalk } = require('chalk');
const { default: boxen } = require('boxen');
const gradient = require('gradient-string');
const figlet = require('figlet');

const PORT = 5000;
const HOST = '127.0.0.1';

let proximoNumeroMaximo = 1;      
const numerosDisponibles = [];   

const asciiTitle = figlet.textSync('SOCKY SERVER', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
});

const asciiAlineado = asciiTitle.split('\n').map(linea => '  ' + linea).join('\n');

console.log(gradient.pastel.multiline(asciiAlineado));
console.log("");

const server = net.createServer((socket) => {
    let numeroCliente;

    if (numerosDisponibles.length > 0) {
        numerosDisponibles.sort((a, b) => a - b);
        numeroCliente = numerosDisponibles.shift();
    } else {
        numeroCliente = proximoNumeroMaximo;
        proximoNumeroMaximo++;
    }
    
    const connTime = new Date().toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    
    const connectMsg = chalk.green(`✔ Cliente ${numeroCliente} conectado`) + 
                       `\n${chalk.gray('Puerto:')}${socket.remotePort}` +
                       `\n${chalk.gray('Hora:')} ${connTime}`;
    
    console.log(boxen(connectMsg, { padding: 0, margin: 1, borderStyle: 'round', borderColor: 'green' }));

    socket.on('data', (data) => {
        const mensaje = data.toString().trim();
        const timestamp = chalk.cyan(`[${new Date().toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}]`);
        
        console.log(`${chalk.gray(timestamp)} ${chalk.bold.magenta(`Cliente ${numeroCliente}:`)} "${chalk.white(mensaje)}"`);

        socket.write(`Mensaje recibido correctamente.\n`);
    });

    const liberarNumero = () => {
        if (numeroCliente !== null) {
            if (!numerosDisponibles.includes(numeroCliente)) {
                numerosDisponibles.push(numeroCliente);
            }
            numeroCliente = null; 
        }
    };

    socket.on('end', () => {
        const disconnectTime = chalk.yellow(`[${new Date().toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}]`);
        console.log(`${disconnectTime} ${chalk.red(`⚠ El Cliente ${numeroCliente} se ha desconectado.`)}`);
        liberarNumero();
    });

    socket.on('error', (err) => {
        console.error(chalk.red(`[Error Socket Cliente ${numeroCliente}]: ${err.message}`));
        liberarNumero();
    });
});

server.on('error', (err) => {
    console.error(chalk.bold.red(`[Error Servidor]: ${err.message}`));
});

server.listen(PORT, HOST, () => {
    const serverInfo = chalk.green('Servidor TCP Activo') + 
                       `\n${chalk.gray('Escuchando en:')} http://${HOST}:${PORT}`;
                       
    console.log(boxen(serverInfo, { padding: 1, borderStyle: 'double', borderColor: 'white', textAlignment: 'center', float: 'center' }));
});
