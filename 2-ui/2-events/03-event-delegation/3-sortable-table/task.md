muhimlik: 4

---

# Saralanadigan jadval

Jadvalni tartiblash mumkin bo'lsin: `<th>` elementlarini bosish uni mos ustun bo'yicha tartiblashi kerak.

Har bir `<th>` atributda shunday turga ega:

```html
<table id="grid">
  <thead>
    <tr>
      *!*
      <th data-type="number">Yosh</th>
      <th data-type="string">Ism</th>
      */!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

Yuqoridagi misolda birinchi ustunda raqamlar, ikkinchisida esa satrlar mavjud. Saralash funktsiyasi turga ko'ra tartiblashni boshqarishi kerak.

Faqat `"string"` va `"raqam"` turlari qo'llab-quvvatlanishi kerak.

Namuna:

[iframe border=1 src="solution" height=190]

P.S. Jadval katta bo'lishi mumkin, har qanday qator va ustunlar soni.
