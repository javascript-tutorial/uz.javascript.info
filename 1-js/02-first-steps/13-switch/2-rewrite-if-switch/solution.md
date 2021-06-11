Dastlabki ikkita tekshiruv ikkita `case` ga aylanadi. Uchinchi tekshirish ikki holatga bo'linadi:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Iltimos, diqqat qiling: pastki qismida `break` shart emas. Ammo biz buni kodni kelajakka ishonchli qilish uchun qo'ydik.

Kelajakda yana bitta `case`, masalan `case 4` ni qo'shishni xohlashimiz mumkin. Agar bundan oldin tanaffus qo'shishni unutib qo'ysak, `case 3` oxirida xato bo'ladi. Demak, bu o'z-o'zini sug'urtalashning bir turi.
