muhimlik: 1

---

# Nima uchun "aaa" qoladi?

Quyidagi misolda `table.remove()` chaqiruvi jadvalni hujjatdan olib tashlaydi.

Agar siz uni ishga tushirsangiz, `"aaa"` matni hali ham ko'rinib turishini ko'rishingiz mumkin.

Nega bunday bo'ladi?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // stol, xuddi shunday bo'lishi kerak

  table.remove();
<<<<<<< HEAD
  // nega hujjatda hali ham aaa bor?
=======
  // why there's still "aaa" in the document?
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
</script>
```
