Biz 0..1 oralig'idan barcha qiymatlarni `min` dan `max` gacha bo'lgan qiymatlarga "map" qilishimiz kerak.

Buni ikki bosqichda amalga oshirish mumkin:

1. Agar tasodifiy sonni 0..1 dan `max-min` ga ko'paytirsak, u holda mumkin bo'lgan qiymatlar oralig'i `0..1` dan `0..max-min` gacha ko'tariladi.
2. Endi `min` ni qo'shsak, mumkin bo'lgan interval `min` dan `max` gacha bo'ladi.

Funktsiya:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

