**Xato**!

Urunib ko'ring:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // xato!
```

Ko'pgina brauzerlardagi xato xabari nima bo'lganligini tushunishga imkon bermaydi.

**Xato `user = {...}` dan keyin paydo bo'ladi, chunki nuqta-vergul yo'q.**

Javascript `(user.go)()` qavsidan oldin vergulni qabul qilmaydi, shuning uchun u quyidagi kodni o'qiydi:

```js no-beautify
let user = { go:... }(user.go)()
```

Bundan tashqari, biz bunday qo'shma ifoda sintaktik ravishda `{go: ...}` ob'ektini `(user.go)` argumenti bilan funktsiya sifatida chaqirishini ko'rishimiz mumkin. Va bu xuddi shu satrda `let user` bilan sodir bo'ladi, shuning uchun `user` ob'ekti hali aniqlanmagan, shuning uchun xato.

Agar biz nuqta-vergul qo'shsak, barchasi yaxshi:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Iltimos e'tibor bering, `(user.go)` atrofidagi qavslar bu erda hech narsa qilmaydi. Odatda ular operatsiyalar tartibini o'rnatadilar, ammo bu erda nuqta `.` baribir avval ishlaydi, shuning uchun hech qanday ta'sir bo'lmaydi. Faqat nuqta-vergul muhim.






