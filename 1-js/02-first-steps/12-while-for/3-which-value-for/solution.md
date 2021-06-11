**Javob: ikkala holatda ham `0` dan `4` gacha.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Buni `for` algoritmidan osongina ajratish mumkin:

1. Hamma narsadan oldin `i = 0` ifodani bir marta bajaring(boshlang).
2. `i < 5` shartni tekshiring
3. Agar `true` bo'lsa -- `alert(i)` tsiklning tanasini va keyin `i++` ni bajaring

Shartni tekshirishdan (2) `i++` kattalashmasi ajratilgan. Bu yana bir ifoda.

O'sish bilan qaytarilgan qiymat bu erda ishlatilmaydi, shuning uchun `i++` va `++i` o'rtasida farq yo'q.
