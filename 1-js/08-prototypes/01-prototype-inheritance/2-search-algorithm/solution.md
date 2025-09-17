1. `__proto__` qo'shaylik:

   ```js run
   let head = {
     glasses: 1,
   };

   let table = {
     pen: 3,
     __proto__: head,
   };

   let bed = {
     sheet: 1,
     pillow: 2,
     __proto__: table,
   };

   let pockets = {
     money: 2000,
     __proto__: bed,
   };

   alert(pockets.pen); // 3
   alert(bed.glasses); // 1
   alert(table.money); // undefined
   ```

2. Zamonaviy interpretatorlarda, ishlash jihatidan, biz obyektdan yoki uning prototipidan xususiyatni olishi bilan farq qilmaydi. Ular xususiyat qayerdan topilganligini eslashadi va uni keyingi so'rovda qayta ishlatadilar.

   Masalan, `pockets.glasses` uchun ular `glasses` (`boshida`) qayerdan topganlarini eslashadi va keyingi safar u yerda qidirishadi. Ular, shuningdek, biror narsa o'zgargan taqdirda ichki keshlarni yangilash uchun yetarlicha aqlli, shuning uchun optimallashtirish xavfsizdir.
