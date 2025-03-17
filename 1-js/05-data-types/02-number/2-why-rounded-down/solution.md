Ichki o'nlik kasr `6.35` cheksiz ikkilikdir. Bunday holatlarda har doimgidek, u aniqlikni yo'qotish bilan saqlanadi.

Ko'raylikchi:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

Aniq yo'qotish raqamning ko'payishiga va kamayishiga olib kelishi mumkin. Bunday holda, raqam biroz kichikroq bo'lib qoladi, shuning uchun u yaxlitlanadi.

`1.35` uchun nima?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Bu erda aniq yo'qotish raqamni biroz kattaroq qildi, shuning uchun u yaxlitlandi.

**`6.35` bilan qanday qilib muammoni hal qilishimiz mumkin, agar u to'g'ri yo'lga aylantirilishini xohlasak?**

Yaxlitlanishdan oldin uni butun songa yaqinlashtirishimiz kerak:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

E'tibor bering, `63.5` hech qanday aniq yo'qotishlarga ega emas. Buning sababi, `0,5` kasr qismi aslida `1/2` dir. `2` kuchlariga bo'linadigan qismlar ikkilik tizimda to'liq ifodalanadi, endi biz uni yaxlitlashimiz mumkin:


```js run
<<<<<<< HEAD
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(yaxlitlangan) -> 6.4
=======
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(rounded) -> 6.4
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

