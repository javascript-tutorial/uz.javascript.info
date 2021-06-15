**Xato**!

Urunib ko'ring:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // xato!
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Ko'pgina brauzerlardagi xato xabari nima bo'lganligini tushunishga imkon bermaydi.
=======
The error message in most browsers does not give us much of a clue about what went wrong.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

**Xato `user = {...}` dan keyin paydo bo'ladi, chunki nuqta-vergul yo'q.**

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Javascript `(user.go)()` qavsidan oldin vergulni qabul qilmaydi, shuning uchun u quyidagi kodni o'qiydi:
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Bundan tashqari, biz bunday qo'shma ifoda sintaktik ravishda `{go: ...}` ob'ektini `(user.go)` argumenti bilan funktsiya sifatida chaqirishini ko'rishimiz mumkin. Va bu xuddi shu satrda `let user` bilan sodir bo'ladi, shuning uchun `user` ob'ekti hali aniqlanmagan, shuning uchun xato.
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

Agar biz nuqta-vergul qo'shsak, barchasi yaxshi:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Iltimos e'tibor bering, `(user.go)` atrofidagi qavslar bu erda hech narsa qilmaydi. Odatda ular operatsiyalar tartibini o'rnatadilar, ammo bu erda nuqta `.` baribir avval ishlaydi, shuning uchun hech qanday ta'sir bo'lmaydi. Faqat nuqta-vergul muhim.






=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
