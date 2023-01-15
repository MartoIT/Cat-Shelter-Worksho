const http = require('http');
const fs = require('fs');



const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    })

    res.write('<H1>Hello world</H>');

});

console.log('Server is listening on a port 5000...');
server.listen(5000);
