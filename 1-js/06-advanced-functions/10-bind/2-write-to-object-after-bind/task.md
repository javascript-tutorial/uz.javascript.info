importance: 5

---

# Funktsiyani usul sifatida bog'lang 

Chiqish qanday bo'ladi?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

