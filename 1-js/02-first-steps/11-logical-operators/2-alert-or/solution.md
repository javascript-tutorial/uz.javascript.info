Javob: avval `1`, keyin `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

`alert` qiymatni qaytarmaydi. Yoki, boshqacha qilib aytganda, u `undefined` ni qaytaradi.

1. Birinchi YOKI `||` chap operandni baholaydi `alert(1)`. Bu birinchi xabarni `1` ko'rsatadi.
2. `alert` `undefined` ni qaytaradi, shuning uchun YOKI ikkinchi operandga o'tib, haqiqiy qiymatni qidiradi.
3. Ikkinchi operand `2` haqiqatdir, shuning uchun ijro to'xtatiladi, `2` qaytariladi va keyin tashqi ogohlantirish(alert) bilan ko'rsatiladi.

`3` bo'lmaydi, chunki baholash `alert(3)` ga yetib bormaydi.
