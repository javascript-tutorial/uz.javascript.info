importance: 5

---

# Finally yoki faqat kodmi?

Ikkala kod fragmentlarini solishtiring.

1. Birinchisi, `try..catch` dan so'ng kodni bajarish uchun `finally` dan foydalanadi:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. Ikkinchi fragment tozalashni darhol `try..catch` dan so'ng qo'yadi:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

Ish boshlangandan so'ng, albatta, bizga tozalash kerak, xato bor yoki yo'qligi muhim emas.

Bu erda `finally` dan foydalanishning afzalligi bormi yoki ikkala kod fragmenti tengmi? Agar bunday ustunlik bo'lsa misol keltiring.
