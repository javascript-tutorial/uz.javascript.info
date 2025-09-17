# Tooltip xatti-harakati

Tooltip xatti-harakati uchun JavaScript kodi yarating.

Sichqoncha `data-tooltip` ga ega element ustiga kelganda, tooltip uning ustida paydo bo'lishi kerak, va ketganda yashirinishi kerak.

Izohli HTML misoli:

```html
<button data-tooltip="tooltip element uzunligidan uzunroq">Qisqa tugma</button>
<button data-tooltip="HTML<br>tooltip">Yana bir tugma</button>
```

Quyidagicha ishlashi kerak:

[iframe src="solution" height=200 border=1]

Ushbu vazifada biz `data-tooltip` ga ega barcha elementlarda faqat matn borligini taxmin qilamiz. Ichki teglar yo'q (hozircha).

Tafsilotlar:

- Element va tooltip orasidagi masofa `5px` bo'lishi kerak.
- Tooltip imkon qadar elementga nisbatan markazlashtirilgan bo'lishi kerak.
- Tooltip oyna chegaralarini kesib o'tmasligi kerak. Odatda u element ustida bo'lishi kerak, lekin agar element sahifa tepasida bo'lsa va tooltip uchun joy bo'lmasa, u holda ostida bo'lishi kerak.
- Tooltip mazmuni `data-tooltip` atributida berilgan. U ixtiyoriy HTML bo'lishi mumkin.

Bu yerda ikkita hodisa kerak bo'ladi:

- `mouseover` ko'rsatkich element ustiga kelganda ishga tushadi.
- `mouseout` ko'rsatkich elementni tark etganda ishga tushadi.

Iltimos, hodisa delegatsiyasidan foydalaning: `data-tooltip` ga ega elementlardan barcha "kelish" va "ketish"larni kuzatish va u yerdan tooltiplarni boshqarish uchun `document` da ikkita ishlov beruvchi o'rnating.

Xatti-harakat amalga oshirilgandan so'ng, hatto JavaScript bilan tanish bo'lmagan odamlar ham izohli elementlar qo'shishlari mumkin.

P.S. Bir vaqtda faqat bitta tooltip ko'rsatilishi mumkin.
