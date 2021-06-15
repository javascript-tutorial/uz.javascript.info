Milisekundalar sonini ertangi kunga qadar olish uchun "ertangi 00:00:00" dan boshlab joriy sanani qisqartirishimiz mumkin.

Birinchidan, biz "ertangi vaqti" hosil qilamiz, so'ngra buni bajaramiz:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // ertangi sana
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // millisekundlardagi farq
  return Math.round(diff / 1000); // soniyalarga aylantirish
}
```

Muqobil yechim:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Iltimos, unutmangki, ko'plab mamlakatlarda yozgi tejash vaqti (DST) mavjud, shuning uchun 23 yoki 25 soatlik kunlar bo'lishi mumkin. Bunday kunlarni alohida davolashni xohlashimiz mumkin.
