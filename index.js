
const http = require('http');
const fs = require('fs/promises');
const fss = require('fs');
const cats = require('./cats.json');
const qsData = require('querystring');


const server = http.createServer(async (req, res) => {
   

    if (req.url == '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        const homepage = await readFile('./resources/home.html');
        const catsHtml =  cats.map(cat => catTemplete(cat)).join('');
        const result = homepage.replace('{{cat}}', catsHtml)
        res.write(result)

    } else if (req.url == '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css'
        })
        const cssFile = await readFile('./styles/site.css');
        res.write(cssFile)

    } else if(/cats\/add-cat/.test(req.url)){
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        const addNewCatView = await readFile('./resources/addCat.html');
        const data = qsData.parse(req.url.split('?')[1])
        console.log(data)
        res.write(addNewCatView)
    }

    res.end();

});

function readFile(path) {
    return fs.readFile(path, { encoding: 'utf-8' })
}

function catTemplete(cat){

    const html = fss.readFileSync('./resources/cat.html', 'utf-8');

    let result = html.replace('{{name}}', cat.name);
    result = result.replace('{{description}}', cat.description);
    result = result.replace('{{imageUrl}}', cat.imageUrl);
    result = result.replace('{{breed}}', cat.breed);

    return result;
}

// function addNewCat(){
//     const data = 
// }

console.log('Server is listening on a port 5000...');
server.listen(5000);
