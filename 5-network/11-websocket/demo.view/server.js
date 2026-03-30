const http = require("http");
const ws = require("ws");

const wss = new ws.Server({ noServer: true });

function accept(req, res) {
  // barcha kiruvchi so'rovlar veb-soketlar bo'lishi kerak
  if (
    !req.headers.upgrade ||
    req.headers.upgrade.toLowerCase() != "websocket"
  ) {
    res.end();
    return;
  }

  // Ulanish bo'lishi mumkin: tirik qolish, yangilash
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
<<<<<<< HEAD
  ws.on("message", function (message) {
    let name =
      message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
    ws.send(`Serverdan salom, ${name}!`);
=======
  ws.on('message', function (message) {
    message = message.toString();
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
    ws.send(`Hello from server, ${name}!`);
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

    setTimeout(() => ws.close(1000, "Xayr!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
