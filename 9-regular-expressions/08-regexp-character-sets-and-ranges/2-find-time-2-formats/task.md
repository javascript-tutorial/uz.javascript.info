# Vaqtni ss:mm yoki ss-mm sifatida toping

Vaqt `soat: daqiqa` yoki `soat-daqiqa` formatida bo'lishi mumkin. Har ikkala soat va daqiqada 2 ta raqam mavjud: `09:00` yoki `21-30`.

Vaqtni topish uchun regexp yozing:

```js
let regexp = /your regexp/g;
alert("Breakfast at 09:00. Dinner at 21-30".match(regexp)); // 09:00, 21-30
```

P.S. Ushbu vazifada biz vaqt har doim to'g'ri deb hisoblaymiz, "45:67" kabi yomon satrlarni filtrlashning hojati yo'q. Keyinchalik bu bilan ham shug'ullanamiz.
