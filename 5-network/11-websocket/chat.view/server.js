/**
Boshlashdan oldin:
> npm install ws
keyin:
> node server.js
> http://localhost:8080 ni brauzerda oching
*/

const http = require("http");
const fs = require("fs");
const ws = new require("ws");

const wss = new ws.Server({ noServer: true });

const clients = new Set();

function accept(req, res) {
  if (
    req.url == "/ws" &&
    req.headers.upgrade &&
    req.headers.upgrade.toLowerCase() == "websocket" &&
    // Ulanish bo'lishi mumkin: tirik qolish, yangilash
    req.headers.connection.match(/\bupgrade\b/i)
  ) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == "/") {
    // index.html
    fs.createReadStream("./index.html").pipe(res);
  } else {
    // sahifa topilmadi
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on("message", function (message) {
    log(`xabar qabul qilindi: ${message}`);

    message = message.slice(0, 50); // maksimal xabar uzunligi 50 bo'ladi

    for (let client of clients) {
      client.send(message);
    }
  });

  ws.on("close", function () {
    log(`aloqa uzildi`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(accept).listen(8080);
} else {
  // javascript.info-ga joylashtirish uchun
  log = function () {};
  // log = console.log;
  exports.accept = accept;
}
