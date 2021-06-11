Keyingi oyning sanasini yarataylik, lekin nolni kun sifatida o'tkazamiz:

```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Odatda, sanalar 1-dan boshlanadi, ammo texnik jihatdan biz istalgan raqamni o'tkaza olamiz, sana o'zini o'zi sozlaydi. Shunday qilib, biz 0-dan o'tganimizda, bu "oyning 1-kunidan bir kun oldin" degan ma'noni anglatadi, boshqacha qilib aytganda: "o'tgan oyning oxirgi kuni".