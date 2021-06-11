importance: 5

---

# Qayta havolalarni chiqarib tashlash

Oddiy holatlarda, tsiklik bog'lanishlarda, biz uning nomidan ketma-ketlikdan kelib chiqadigan mulkni chiqarib tashlashimiz mumkin.

Ammo ba'zida ko'plab qayta havolalar mavjud. Va ismlar tsiklik ma'lumotnomalar ham, oddiy xususiyatlarda ham ishlatilishi mumkin.

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
// tsiklik ma'lumotnomalar 
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

