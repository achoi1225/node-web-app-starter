const http = require('http');
const { readFile } = require('fs').promises;
const path = require('path');

const hostname = '127.0.0.1';
const port = 8081;

const server = http.createServer(async (req, res) => {
   
    let urlRex = /images/;
    // console.log(urlRex.test('we have some images here!'));

    if(urlRex.test(req.url)) {
        const imagesFilePath = './assets' + req.url;

        try{
            const imageFileContents = await readFile(imagesFilePath);
        } catch (err) {
            res.statusCode = 404;
            res.end();
        }
        const fileExtension = path.extname(req.url);
        const imageType = 'image/' + fileExtension.substring(1);

        console.log(imageType);

        res.statusCode = 200;
        res.setHeader('Content-Type', imageType);
        res.end(imageFileContents);
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('I have items');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});