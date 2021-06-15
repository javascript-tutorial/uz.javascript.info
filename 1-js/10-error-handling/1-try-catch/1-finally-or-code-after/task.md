importance: 5

---

# Finally yoki faqat kodmi?

Ikkala kod fragmentlarini solishtiring.

<<<<<<< HEAD
1. Birinchisi, `try..catch` dan so'ng kodni bajarish uchun `finally` dan foydalanadi:
=======
1. The first one uses `finally` to execute the code after `try...catch`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
<<<<<<< HEAD
2. Ikkinchi fragment tozalashni darhol `try..catch` dan so'ng qo'yadi:
=======
2. The second fragment puts the cleaning right after `try...catch`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

<<<<<<< HEAD
Ish boshlangandan so'ng, albatta, bizga tozalash kerak, xato bor yoki yo'qligi muhim emas.
=======
We definitely need the cleanup after the work, doesn't matter if there was an error or not.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu erda `finally` dan foydalanishning afzalligi bormi yoki ikkala kod fragmenti tengmi? Agar bunday ustunlik bo'lsa misol keltiring.
