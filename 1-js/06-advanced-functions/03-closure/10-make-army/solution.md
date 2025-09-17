`makeArmy` ichida aynan nima sodir bo'lishini ko'rib chiqaylik, va yechim aniq bo'lib qoladi.

1. U bo'sh `shooters` massivini yaratadi:

   ```js
   let shooters = [];
   ```

2. Sikl orqali `shooters.push(function)` yordamida uni funktsiyalar bilan to'ldiradi.

   Har bir element funktsiya, shuning uchun natijada olingan massiv shunday ko'rinadi:

   ```js no-beautify
   shooters = [
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
   ];
   ```

3. Massiv funktsiyadan qaytariladi.

   Keyin, keyinroq, istalgan a'zoga chaqiruv, masalan `army[5]()` massivdan `army[5]` elementini oladi (bu funktsiya) va uni chaqiradi.

   Endi nega bunday barcha funktsiyalar bir xil qiymatni, ya'ni `10` ni ko'rsatadi?

   Bu `shooter` funktsiyalari ichida mahalliy `i` o'zgaruvchisi yo'qligi sababli. Bunday funktsiya chaqirilganda, u `i` ni o'zining tashqi leksik muhitidan oladi.

   U holda `i` ning qiymati nima bo'ladi?

   Agar manbaga qarasak:

   ```js
   function makeArmy() {
     ...
     let i = 0;
     while (i < 10) {
       let shooter = function() { // shooter funktsiyasi
         alert( i ); // o'z raqamini ko'rsatishi kerak
       };
       shooters.push(shooter); // funktsiyani massivga qo'shish
       i++;
     }
     ...
   }
   ```

   Ko'ramizki, barcha `shooter` funktsiyalar `makeArmy()` funktsiyasining leksik muhitida yaratilgan. Lekin `army[5]()` chaqirilganda, `makeArmy` allaqachon o'z ishini tugatgan va `i` ning oxirgi qiymati `10` (`while` `i=10` da to'xtaydi).

   Natijada, barcha `shooter` funktsiyalar tashqi leksik muhitdan bir xil qiymatni oladi va bu oxirgi qiymat, ya'ni `i=10`.

   ![](lexenv-makearmy-empty.svg)

   Yuqorida ko'rib turganingizdek, `while {...}` blokining har bir iteratsiyasida yangi leksik muhit yaratiladi. Shuning uchun, buni tuzatish uchun `i` ning qiymatini `while {...}` bloki ichidagi o'zgaruvchiga nusxalashimiz mumkin:

   ```js run
   function makeArmy() {
     let shooters = [];

     let i = 0;
     while (i < 10) {
       *!*
         let j = i;
       */!*
         let shooter = function() { // shooter funktsiyasi
           alert( *!*j*/!* ); // o'z raqamini ko'rsatishi kerak
         };
       shooters.push(shooter);
       i++;
     }

     return shooters;
   }

   let army = makeArmy();

   // Endi kod to'g'ri ishlaydi
   army[0](); // 0
   army[5](); // 5
   ```

   Bu yerda `let j = i` "iteratsiya-mahalliy" `j` o'zgaruvchisini e'lon qiladi va `i` ni unga nusxalaydi. Primitivlar "qiymat bo'yicha" nusxalanadi, shuning uchun biz aslida joriy sikl iteratsiyasiga tegishli `i` ning mustaqil nusxasini olamiz.

   Shooterlar to'g'ri ishlaydi, chunki `i` ning qiymati endi bir oz yaqinroq joyda yashaydi. `makeArmy()` Leksik muhitida emas, balki joriy sikl iteratsiyasiga mos keladigan Leksik muhitda:

   ![](lexenv-makearmy-while-fixed.svg)

   Agar boshidayoq `for` ishlatganimizda ham bunday muammoning oldini olish mumkin edi:

   ```js run demo
   function makeArmy() {

     let shooters = [];

   *!*
     for(let i = 0; i < 10; i++) {
   */!*
       let shooter = function() { // shooter funktsiyasi
         alert( i ); // o'z raqamini ko'rsatishi kerak
       };
       shooters.push(shooter);
     }

     return shooters;
   }

   let army = makeArmy();

   army[0](); // 0
   army[5](); // 5
   ```

   Bu mohiyatan bir xil, chunki `for` har bir iteratsiyada o'zining `i` o'zgaruvchisi bilan yangi leksik muhit yaratadi. Shuning uchun har bir iteratsiyada yaratilgan `shooter` aynan shu iteratsiyadagi o'z `i` siga havola qiladi.

   ![](lexenv-makearmy-for-fixed.svg)

Endi, siz buni o'qishga shuncha harakat qilganingizdan so'ng va oxirgi retsept shuncha oddiy - shunchaki `for` dan foydalaning, siz hayron bo'lishingiz mumkin -- bunga arziydimi?

Albatta, agar siz savolga osonlik bilan javob bera olsangiz, yechimni o'qimagan bo'lardingiz. Shuning uchun, umid qilamanki, bu vazifa sizga narsalarni biroz yaxshiroq tushunishga yordam bergan bo'lishi kerak.

Bundan tashqari, haqiqatan ham `for` dan ko'ra `while` ni afzal ko'radigan holatlar va bunday muammolar haqiqiy bo'lgan boshqa stsenariylar mavjud.
