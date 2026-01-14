const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const root = __dirname;

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".jsx": "application/javascript",
};

function send(res, status, data, type) {
  res.writeHead(status, { "Content-Type": type || "text/plain" });
  res.end(data);
}

const server = http.createServer((req, res) => {
  const safePath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(root, safePath.split("?")[0]);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath);
    send(res, 200, data, mime[ext] || "text/plain");
  });
});

server.listen(port, () => {
  console.log(`Task dashboard available at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  server.close(() => process.exit());
});
