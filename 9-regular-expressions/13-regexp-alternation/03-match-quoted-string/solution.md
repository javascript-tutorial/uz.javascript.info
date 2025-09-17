Yechim: `pattern:/"(\\.|[^"\\])*"/g`.

Bosqichma-bosqich:

- Avval biz `pattern:"` ochilish iqtibosini qidiramiz
- Agar bizda teskari qiyshiq chiziq `pattern:\\` bo'lsa (bu maxsus belgi bo'lgani uchun uni naqshda ikki barobarga qo'yishimiz kerak), undan keyin har qanday belgi yaxshi bo'ladi (nuqta).
- Aks holda biz qo'shtirnoq (bu qatorning oxirini bildiradi) va teskari chiziqdan tashqari har qanday belgini olamiz (yakka teskari qiyshiq chiziqning oldini olish uchun teskari chiziq faqat undan keyin boshqa belgi bilan ishlatiladi): `pattern:[^"\\]`
- Yakunlovchi iqtibosgacha shunday.

Amalda:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = '.. "meni sinab ko'ring" .. "\\"Salom\\" deb ayting!" .. "\\\\ \\"" ..';

alert(str.match(regexp)); // "meni sinab ko'ring","\"Salom\" deb ayt!","\\ \""
```
