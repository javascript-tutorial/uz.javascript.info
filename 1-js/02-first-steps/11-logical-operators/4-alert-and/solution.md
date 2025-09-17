Javob: `1`, keyin `undefined`.

```js run
alert(alert(1) && alert(2));
```

`alert` ni chaqirish `undefined` ni qaytaradi (u shunchaki xabarni ko'rsatadi, shuning uchun mazmunli qaytish bo'lmaydi).

Shu sababli, `&&` chap operandni baholaydi (`1` ni qaytaradi) va darhol to'xtaydi, chunki `undefined` bu noto'g'ri qiymat. Va `&&` noto'g'ri qiymatni qidiradi va uni qaytaradi.
