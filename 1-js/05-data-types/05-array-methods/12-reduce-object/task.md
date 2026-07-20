muhimlik: 4

---

# Massivdan kalitli obyekt yaratish

<<<<<<< HEAD
Aytaylik, bizga `{id:..., name:..., age... }` shaklida foydalanuvchilar massivi keldi.
=======
Let's say we received an array of users in the form `{id:..., name:..., age:... }`.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

Undan obyekt yaratiladigan `groupById(arr)` funksiyasini yarating, bu yerda `id` kalit bo'lib, massiv elementlari qiymat bo'ladi.

Masalan:

```js
let users = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 },
];

let usersById = groupById(users);

/*
// chaqiruvdan keyin bizda bo'lishi kerak:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Bunday funksiya server ma'lumotlari bilan ishlashda juda qulay.

Bu vazifada biz `id` ning noyob ekanligini faraz qilamiz. Bir xil `id` ga ega ikkita massiv elementi bo'lmasligi mumkin.

Iltimos, yechimda massivning `.reduce` usulidan foydalaning.
