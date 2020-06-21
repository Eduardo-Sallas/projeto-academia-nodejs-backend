//Servidor HTTP
const http = require('http'); //usando require para importar um módulo
const app = require('./app');

const port = process.env.PORT || 3000; //porta com variavel de ambiente importante para subir codigo pro servidor

const server = http.createServer(app); //const que vai usar o htttp e criar o servidor


server.listen(port);