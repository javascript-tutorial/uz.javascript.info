const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const getRawBody = require("raw-body");
const busboy = require("async-busboy");
const Router = require("koa-router");

let router = new Router();

router.post("/user", async (ctx) => {
  ctx.body = {
    message: "User saved",
  };
});

router.post("/image-form", async (ctx) => {
  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
      // davom etish uchun barcha fayllarni o'qiydi
      let length = 0;
      file.on("data", function (data) {
        length += data.length;
      });
      file.on("end", () => {
        files.push({
          fieldname,
          filename,
          length,
        });
      });
    },
  });

  ctx.body = {
    message: `Image saved, firstName: ${fields.firstName}, Image size:${files[0].length}, fileName: ${files[0].filename}`,
  };
});

router.post("/user-avatar", async (ctx) => {
  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
      // davom etish uchun barcha fayllarni o'qiydi
      let length = 0;
      file.on("data", function (data) {
        length += data.length;
      });
      file.on("end", () => {
        files.push({
          fieldname,
          filename,
          length,
        });
      });
    },
  });

  ctx.body = {
    message: `Foydalanuvchi rasmlari bilan, Ism: ${fields.firstName}, rasm hajmi:${files[0].length}`,
  };
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
