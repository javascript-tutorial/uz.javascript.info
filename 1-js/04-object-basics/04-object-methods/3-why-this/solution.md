
Quyida tushuntirishlar.

1. Bu odatiy obyekt usulini chaqiruvi.

2. Xuddi shu, qavslar bu yerda ishlash tartibini o'zgartirmaydi, nuqta baribir birinchi o'rinda turadi.

3. Bu erda biz `(ifoda).method()` yanada murakkab chaqiruvga egamiz. Chaqiruv xuddi ikkita satrga bo'linganidek ishlaydi:

    ```js no-beautify
    f = obj.go; // ifodani hisoblang
    f();        // paydo bo'lgan narsani chaqiring
    ```

    Bu yerda `f()` funktsiya sifatida `this` siz bajariladi.

4. Shunga o'xshash narsa `(3)`, nuqta chap tomonida `.` bizda iboralar mavjud.

`(3)` va `(4)` xatti-harakatlarini tushuntirish uchun xususiyatga kiruvchilar (nuqta yoki kvadrat qavslar) havola turining qiymatini qaytarishini esga olishimiz kerak.

Unda usul chaqiruvidan tashqari har qanday operatsiya (masalan, `=` yoki `||` topshirig'i kabi) uni oddiy qiymatga aylantiradi, bu `this` o'rnatishga imkon beradigan ma'lumotni o'z ichiga olmaydi.

