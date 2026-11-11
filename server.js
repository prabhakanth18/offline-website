
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    let filename = req.url.split("?")[0];

    if (filename === "/") {
        filename = "/index.html";
    }

    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, (err, data) => {

        if (err) {
            console.log("File requested:", filename);
            console.log("Actual path:", filePath);
            res.writeHead(404);
            res.end("File not found: " + filename);
            return;
        }

        let type = "text/plain";

        if (filename.endsWith(".html")) type = "text/html";
        if (filename.endsWith(".css")) type = "text/css";
        if (filename.endsWith(".js")) type = "text/javascript";

        res.writeHead(200, { "Content-Type": type });
        res.end(data);
    });
});

server.listen(5050, "0.0.0.0", () => {
    console.log("Website server running on port 5050");
});
