importance: 5

---

# Obyektda "this" dan foydalanish

Bu erda `makeUser` funktsiyasi obyektni qaytaradi.

`ref` ga kirish natijasi qanday? Nima uchun?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Natijasi nma?
```

