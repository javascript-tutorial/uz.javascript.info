# Modal forma

`html` xabari, input maydoni va `OK/CANCEL` tugmalari bilan formani ko'rsatuvchi `showPrompt(html, callback)` funksiyasini yarating.

- Foydalanuvchi matn maydoniga biror narsa yozishi va `key:Enter` yoki OK tugmasini bosishi kerak, keyin kiritilgan qiymat bilan `callback(value)` chaqiriladi.
- Aks holda, agar foydalanuvchi `key:Esc` yoki CANCEL tugmasini bossa, `callback(null)` chaqiriladi.

Ikkala holatda ham bu kirish jarayonini tugatadi va formani olib tashlaydi.

Talablar:

- Forma oynaning markazida bo'lishi kerak.
- Forma *modal* bo'lishi kerak. Boshqacha qilib aytganda, foydalanuvchi uni yopmaguncha sahifaning qolgan qismi bilan hech qanday o'zaro ta'sir mumkin emas.
- Forma ko'rsatilganda, fokus foydalanuvchi uchun `<input>` ichida bo'lishi kerak.
- `key:Tab`/`key:Shift+Tab` tugmalari forma maydonlari orasida fokusni siljitishi kerak, uni boshqa sahifa elementlariga chiqishiga ruxsat bermang.

Foydalanish misoli:

```js
showPrompt("Biror narsa kiriting<br>...aqlli :)", function(value) {
  alert(value);
});
```

Iframe dagi demo:

[iframe src="solution" height=160 border=1]

P.S. Manba hujjatda sobit pozitsiyaga ega forma uchun HTML/CSS mavjud, lekin uni modal qilish sizga bog'liq.