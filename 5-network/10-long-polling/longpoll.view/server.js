let http = require("http");
let url = require("url");
let querystring = require("querystring");
let static = require("node-static");

let fileServer = new static.Server(".");

let subscribers = Object.create(null);

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  subscribers[id] = res;

  req.on("close", function () {
    delete subscribers[id];
  });
}

function publish(message) {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message);
  }

  subscribers = Object.create(null);
}

function accept(req, res) {
  let urlParsed = url.parse(req.url, true);

  // yangi mijoz xabarlarni xohlaydi
  if (urlParsed.pathname == "/subscribe") {
    onSubscribe(req, res);
    return;
  }

  // xabar yuborilmoqda
  if (urlParsed.pathname == "/publish" && req.method == "POST") {
    // POST ni qabul qilmoqda
    req.setEncoding("utf8");
    let message = "";
    req
      .on("data", function (chunk) {
        message += chunk;
      })
      .on("end", function () {
        publish(message); // uni hammaga e'lon qiling
        res.end("ok");
      });

    return;
  }

  // qolganlari statikdir
  fileServer.serve(req, res);
}

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log("8080 portida ishlaydigan server");
} else {
  exports.accept = accept;

  if (process.send) {
    process.on("message", (msg) => {
      if (msg === "shutdown") {
        close();
      }
    });
  }

  process.on("SIGINT", close);
}
