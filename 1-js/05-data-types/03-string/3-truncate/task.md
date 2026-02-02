muhimlik: 5

---

# Matnni kesib oling

`str` uzunligini tekshiradigan `truncate(str, maxlength)` funktsiyasini yarating va agar u `maxlength` dan oshib ketsa -- `str` ohirini `"..."` ellipsis belgisi bilan almashtiring, uzunlik `maxlength` ga teng.

Funktsiyaning natijasi kesilgan (kerak bo'lsa) matn bo'lishi kerak.

Masalan:

```js
<<<<<<< HEAD
truncate("Ushbu mavzu bo'yicha men aytmoqchi bo'lgan narsa:", 20) = "Ushbu mavzu bo'yicha..."

truncate("Hammaga salom!", 20) = "Hammaga salom!"
=======
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
```
