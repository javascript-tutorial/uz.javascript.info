

1. Yoki o'rash funktsiyasidan foydalaning, qisqacha bo'lishi uchun o'q:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    Endi u tashqi o'zgaruvchanlardan `user` oladi va odatdagi usulda ishlaydi.

2. Yoki `user` ni kontekst sifatida ishlatadigan va to'g'ri birinchi argumentga ega bo'lgan `user.login` dan qisman funktsiya yarating:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
