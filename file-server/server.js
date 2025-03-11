const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg",
    ".json": "application/json",
    ".xml": "application/xml"
};

const server = http.createServer((req, res) => {
    let filePath = req.url === "/" ? "./public/index.html" : `./public${req.url}`;
    let extname = path.extname(filePath);
    let contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log(`Server running`);
});
