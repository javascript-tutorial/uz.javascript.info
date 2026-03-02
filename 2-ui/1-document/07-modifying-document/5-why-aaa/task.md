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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
</script>
```
