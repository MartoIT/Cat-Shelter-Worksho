
const http = require('http');
const fs = require('fs/promises');


const server = http.createServer(async (req, res) => {

    if (req.url == '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        const homepage = await fs.readFile('./resources/home.html', 'utf-8');
        res.write(homepage)

    }

    res.end();

});

console.log('Server is listening on a port 5000...');
server.listen(5000);
