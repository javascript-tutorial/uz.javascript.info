importance: 3

---

# "This" ning qiymatini tushuntiring

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/task.md
Quyidagi kodda biz ketma-ket 4 marta `user.go()` usulini chaqirmoqchimiz.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/3-why-this/task.md

Ammo `(1)` va `(2)` chaqiruvlari `(3)` va `(4)` dan farq qiladi. Nima uchun?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

