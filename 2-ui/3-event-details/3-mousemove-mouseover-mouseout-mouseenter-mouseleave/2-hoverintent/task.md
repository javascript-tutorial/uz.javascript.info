# "Aqlli" tooltip

Faqat tashrif buyuruvchi sichqonchani elementga *olib kelganda* ko'rsatiladigan, lekin *orqali o'tkazganda* ko'rsatilmaydigan tooltip funksiyasini yozing.

Boshqacha qilib aytganda, agar tashrif buyuruvchi sichqonchani elementga olib kelib, u yerda to'xtatsa -- tooltipni ko'rsating. Va agar ular shunchaki sichqonchani orqali o'tkazgan bo'lsa, kerak emas, kim qo'shimcha miltillashni xohlaydi?

Texnik jihatdan, biz element ustida sichqoncha tezligini o'lchashimiz mumkin va agar u sekin bo'lsa, u "element ustiga kelgan" deb hisoblaymiz va tooltipni ko'rsatamiz, agar tez bo'lsa -- uni e'tiborsiz qoldiramiz.

Buning uchun universal obyekt `new HoverIntent(options)` yarating.

Uning `options` lari:
- `elem` -- kuzatish uchun element.
- `over` -- agar sichqoncha elementga kelgan bo'lsa chaqiriladigan funksiya: ya'ni u sekin harakat qiladi yoki uning ustida to'xtaydi.
- `out` -- sichqoncha elementni tark etganda chaqiriladigan funksiya (`over` chaqirilgan bo'lsa).

Bunday obyektni tooltip uchun ishlatish misoli:

```js
// tooltip namunasi
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// obyekt sichqonchani kuzatadi va over/out ni chaqiradi
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

Demo:

[iframe src="solution" height=140]

Agar siz sichqonchani "soat" ustiga tez harakat qildirsangiz, hech narsa bo'lmaydi, va agar uni sekin qilsangiz yoki ularda to'xtatsangiz, tooltip paydo bo'ladi.

Diqqat qiling: kursor soat kichik elementlari orasida harakat qilganda tooltip "miltillamaydi".