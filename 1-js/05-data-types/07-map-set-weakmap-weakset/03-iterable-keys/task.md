importance: 5

---

# Ketma-ket sarraluvchan kalitlar

Biz `map.keys()` dan massivni olishni istaymiz va u bilan ishlashni davom ettiramiz (Map obyektdan tashqari).

Ammo muammo bor:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Xato: keys.push funktsiya emas
keys.push("more");
*/!*
```

Nima uchun? `keys.push` ishlashi uchun kodni qanday tuzatishimiz mumkin?
