importance: 5

---

# Qayta havolalarni chiqarib tashlash

Oddiy holatlarda, tsiklik bog'lanishlarda, biz uning nomidan ketma-ketlikdan kelib chiqadigan mulkni chiqarib tashlashimiz mumkin.

<<<<<<< HEAD:1-js/05-data-types/11-json/2-serialize-event-circular/task.md
Ammo ba'zida ko'plab qayta havolalar mavjud. Va ismlar tsiklik ma'lumotnomalar ham, oddiy xususiyatlarda ham ishlatilishi mumkin.
=======
But sometimes we can't just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/2-serialize-event-circular/task.md

Hamma narsani torlashtirish uchun `replacer` funktsiyasini yozing, lekin `meetup` ga havola qilingan xususiyatlarni olib tashlang:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konferensiya",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
<<<<<<< HEAD:1-js/05-data-types/11-json/2-serialize-event-circular/task.md
// tsiklik ma'lumotnomalar 
=======
// circular references
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/2-serialize-event-circular/task.md
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* sizning kodingiz */
}));

/* natija quyidagicha bo'lishi kerak:
{
  "title":"Konferensiya",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
