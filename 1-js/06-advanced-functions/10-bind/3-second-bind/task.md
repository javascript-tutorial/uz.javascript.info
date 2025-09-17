muhimlik: 5

---

# Ikkinchi bog'lash

Qo'shimcha bog'lash orqali `this` ni o'zgartira olamizmi?

Chiqish qanday bo'ladi?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind({ name: "John" }).bind({ name: "Ann" });

f();
```
