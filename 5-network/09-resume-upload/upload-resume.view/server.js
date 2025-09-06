let http = require("http");
let static = require("node-static");
let fileServer = new static.Server(".");
let path = require("path");
let fs = require("fs");
let debug = require("debug")("example:resume-upload");

let uploads = Object.create(null);

function onUpload(req, res) {
  let fileId = req.headers["x-file-id"];
  let startByte = +req.headers["x-start-byte"];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

  // biz "hech bir joyda" fayllarni joylashtiramiz
  let filePath = "/dev/null";
  // Buning o'rniga haqiqiy yo'lni ishlatishi mumkin, masalan.
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

  // yangi yuklashni ishga tushiring
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte);

  let fileStream;

  // agar startByte 0 bo'lsa yoki o'rnatilmagan bo'lsa, yangi fayl yarating, aks holda hajmini tekshiring va mavjud faylga qo'shing
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: "w",
    });
    debug("New file created: " + filePath);
  } else {
    // Ishonch hosil qilish uchun diskdagi fayl hajmini ham tekshirishimiz mumkin
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // mavjud faylga qo'shing
    fileStream = fs.createWriteStream(filePath, {
      flags: "a",
    });
    debug("File reopened: " + filePath);
  }

  req.on("data", function (data) {
    debug("bitlar qabul qilindi", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

  // so'rov tanasini faylga yuboring
  req.pipe(fileStream);

  // so'rov tugaganda va uning barcha ma'lumotlari yoziladi
  fileStream.on("close", function () {
    if (upload.bytesReceived == req.headers["x-file-size"]) {
      debug("Yuklash yakunlandi");
      delete uploads[fileId];

      // bu yerda yuklangan fayl bilan boshqa biror narsa qilish mumkin

      res.end("Success " + upload.bytesReceived);
    } else {
      // ulanish yo'qolsa, biz tugallanmagan faylni atrofida qoldiramiz
      debug("Fayl tugallanmagan, toʻxtatilgan " + upload.bytesReceived);
      res.end();
    }
  });

  // kiritish-chiqarish xatosi bo'lsa - so'rovni yakunlang
  fileStream.on("error", function (err) {
    debug("fileStream xatoligi");
    res.writeHead(500, "Fayl xatoligi");
    res.end();
  });
}

function onStatus(req, res) {
  let fileId = req.headers["x-file-id"];
  let upload = uploads[fileId];
  debug("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0");
  } else {
    res.end(String(upload.bytesReceived));
  }
}

function accept(req, res) {
  if (req.url == "/status") {
    onStatus(req, res);
  } else if (req.url == "/upload" && req.method == "POST") {
    onUpload(req, res);
  } else {
    fileServer.serve(req, res);
  }
}

// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log("Server 8080 portida ishlamoqda");
} else {
  exports.accept = accept;
}
