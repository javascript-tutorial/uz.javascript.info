
Buni bajarib ko'ring:

```js run
let str = "Salom";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
Natija ikki xil bo'lishi mumkin:
1. `undefined`
2. Xato.
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Nima uchun? Keling, `(*)` qatorida nima bo'layotganini ko'raylik:

<<<<<<< HEAD
1. `str` xususiyatga murojaat qilish vaqtida "o'ralish-obyekti" yaratiladi.
2. Xususiyat bilan operatsiya unda amalga oshiriladi. Shunday qilib, obyekt `test` xususiyatini oladi.
3. Amaliyot tugaydi va "o'ralishsh-obyekti" yo'qoladi.

Shunday qilib, oxirgi satrda `str` xususiyatidan iz qolmaydi. Matndagi har qanday obyekt ishlashi uchun yangi o'ralish obyekti.

Ba'zi brauzerlar dasturchini yanada cheklashga qaror qilishlari va umuman ibtidoiylarga xususiyatlarni berishga yo'l qo'ymasliklari mumkin. Shuning uchun amalda xatolarni `(*)` satrida ham ko'rishimiz mumkin. Bu spetsifikatsiyadan biroz uzoqroq.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**Ushbu misol ibtidoiylar obyekt emasligini aniq ko'rsatib turibdi.**

<<<<<<< HEAD
Ular qo'shimcha ma'lumotlarni saqlay olmaydi.

Barcha xususiyat/usul operatsiyalari vaqtinchalik obyektlar yordamida amalga oshiriladi.

=======
They can't store additional data.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
