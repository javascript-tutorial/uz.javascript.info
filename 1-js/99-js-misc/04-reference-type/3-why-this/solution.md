
Quyida tushuntirishlar.

1. Bu odatiy obyekt usulini chaqiruvi.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. Xuddi shu, qavslar bu yerda ishlash tartibini o'zgartirmaydi, nuqta baribir birinchi o'rinda turadi.

3. Bu erda biz `(ifoda).method()` yanada murakkab chaqiruvga egamiz. Chaqiruv xuddi ikkita satrga bo'linganidek ishlaydi:
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

    ```js no-beautify
    f = obj.go; // ifodani hisoblang
    f();        // paydo bo'lgan narsani chaqiring
    ```

    Bu yerda `f()` funktsiya sifatida `this` siz bajariladi.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
4. Shunga o'xshash narsa `(3)`, nuqta chap tomonida `.` bizda iboralar mavjud.
=======
4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

`(3)` va `(4)` xatti-harakatlarini tushuntirish uchun xususiyatga kiruvchilar (nuqta yoki kvadrat qavslar) havola turining qiymatini qaytarishini esga olishimiz kerak.

Unda usul chaqiruvidan tashqari har qanday operatsiya (masalan, `=` yoki `||` topshirig'i kabi) uni oddiy qiymatga aylantiradi, bu `this` o'rnatishga imkon beradigan ma'lumotni o'z ichiga olmaydi.

