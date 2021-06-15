importance: 5

---

# Ketma-ket sarraluvchan kalitlar

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/03-iterable-keys/task.md
Biz `map.keys()` dan massivni olishni istaymiz va u bilan ishlashni davom ettiramiz (Map obyektdan tashqari).

Ammo muammo bor:
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.

But that doesn't work:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/07-map-set/03-iterable-keys/task.md

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
