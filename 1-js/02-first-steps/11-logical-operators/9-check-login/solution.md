

```js run demo
let userName = prompt("Kim bu yerda?", '');

if (userName === 'Admin') {

  let pass = prompt('Parol?', '');

<<<<<<< HEAD
  if (pass == 'Master') {
    alert( 'Xush kelibsiz!' );
  } else if (pass == '' || pass == null) {
    alert( 'Bekor qilindi.' );
=======
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  } else {
    alert( "Noto'g'ri parol" );
  }

<<<<<<< HEAD
} else if (userName == '' || userName == null) {
  alert( 'Bekor qilindi' );
=======
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
} else {
  alert( "Men sizni tanimayman" );
}
```

  `If` bloklar ichidagi vertikal chiziqlarga e'tibor bering. Ular texnik jihatdan talab qilinmaydi, lekin ular kodning o'qilishini yanada oson qiladilar.
