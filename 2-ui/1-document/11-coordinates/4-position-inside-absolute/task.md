muhimlik: 5

---

# Eslatmani ichida joylashtirish (absolute)

Oldingi vazifani <info:task/position-at-absolute> kengaytiring: `positionAt(anchor, position, elem)` funksiyasiga `elem` ni `anchor` ichiga qo'yishni o'rgating.

`position` uchun yangi qiymatlar:

- `top-out`, `right-out`, `bottom-out` -- avvalgidek ishlaydi, ular `elem` ni `anchor` ning ustiga/o'ngiga/ostiga qo'yadi.
- `top-in`, `right-in`, `bottom-in` -- `elem` ni `anchor` ichiga qo'yadi: uni yuqori/o'ng/pastki chetiga yopishtirib qo'yadi.

Masalan:

```js
// eslatmani blockquote ustida ko'rsatadi
positionAt(blockquote, "top-out", note);

// eslatmani blockquote ichida, yuqorida ko'rsatadi
positionAt(blockquote, "top-in", note);
```

Natija:

[iframe src="solution" height="310" border="1" link]

Manba kod sifatida <info:task/position-at-absolute> vazifasining yechimini oling.
