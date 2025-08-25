muhimlik: 3

---

# "This" ning qiymatini tushuntiring

Quyidagi kodda biz ketma-ket 4 marta `user.go()` usulini chaqirmoqchimiz.

Ammo `(1)` va `(2)` chaqiruvlari `(3)` va `(4)` dan farq qiladi. Nima uchun?

```js run no-beautify
let obj, method;

obj = {
  go: function () {
    alert(this);
  },
};

obj.go(); // (1) [object Object]

obj.go(); // (2) [object Object]

(method = obj.go)(); // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```
