const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5500;
const WEB_DIR = path.join(__dirname, "www");

const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".js": "text/javascript; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((request, response) => {
  const requestPath = request.url === "/" ? "/index.html" : request.url;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(WEB_DIR, safePath);

  if (!filePath.startsWith(WEB_DIR)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=UTF-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
    });
    response.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`MoveLedger mobile build running at http://localhost:${PORT}`);
});
