Yechim aslida juda oddiy.

Bunga qarang:

```js
Promise.all(
  fetch("https://api.github.com/users/iliakan"),
  fetch("https://api.github.com/users/remy"),
  fetch("http://no-such-url")
);
```

Bu yerda bizda `Promise.all` ga ketadigan `fetch(...)` massivlari mavjud.

Biz "Promise.all" ning ishlash usulini o'zgartira olmaymiz: agar u xato aniqlasa, u holda u rad etadi. Shunday qilib, biz biron bir xato yuzaga kelishining oldini olishimiz kerak. Buning o'rniga, agar `fetch` xatosi yuzaga kelsa, biz unga "normal" natija sifatida qarashimiz kerak.

Mana qanday:

```js
Promise.all(
  fetch("https://api.github.com/users/iliakan").catch((err) => err),
  fetch("https://api.github.com/users/remy").catch((err) => err),
  fetch("http://no-such-url").catch((err) => err)
);
```

Boshqacha qilib aytganda, `.catch` barcha va'dalar uchun xatoga yo'l qo'yadi va uni normal ravishda qaytaradi. Va'dalar qanday ishlashining qoidalariga ko'ra, agar `.then/catch` ishlovchisi qiymatni qaytarsa (bu xato obyekti yoki boshqa biron bir narsaning ahamiyati yo'q), u holda "normal" oqim davom etadi.

Shunday qilib `.catch` xatoni "normal" natija sifatida tashqi `Promise.all` ga qaytaradi.

Ushbu kod:

```js
Promise.all(urls.map((url) => fetch(url)));
```

Quyidagidek, qayta yozish mumkin:

```js
Promise.all(urls.map((url) => fetch(url).catch((err) => err)));
```
