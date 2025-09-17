# Jonli taymer elementi

Bizda yaxshi formatlangan vaqtni ko'rsatish uchun `<time-formatted>` elementi allaqachon mavjud.

Joriy vaqtni ko'rsatish uchun `<live-taymer>` elementini yarating:

1. U `<time-formatted>` dan ichki foydalanishi kerak, uning funksiyalarini takrorlamasligi kerak.
2. Har soniyada belgilash (yangilanishlar).
3. Har bir belgi uchun joriy sana `event.detail` da ko'rsatilgan `tabel` nomli maxsus hodisa yaratilishi kerak (<info:dispatch-events> bobiga qarang).

Foydalanish:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener("tick", (event) => console.log(event.detail));
</script>
```

Demo:

[iframe src="solution" height=40]
