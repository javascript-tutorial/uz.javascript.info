muhimlik: 5

---

# Matnni kesib oling

`str` uzunligini tekshiradigan `truncate(str, maxlength)` funktsiyasini yarating va agar u `maxlength` dan oshib ketsa -- `str` ohirini `"..."` ellipsis belgisi bilan almashtiring, uzunlik `maxlength` ga teng.

Funktsiyaning natijasi kesilgan (kerak bo'lsa) matn bo'lishi kerak.

Masalan:

```js
truncate("Ushbu mavzu bo'yicha men aytmoqchi bo'lgan narsa:", 20) = "Ushbu mavzu bo'yicha..."

truncate("Hammaga salom!", 20) = "Hammaga salom!"
```
