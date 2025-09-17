Buni bajarib ko'ring:

```js run
let str = "Salom";

str.test = 5; // (*)

alert(str.test);
```

Natija ikki xil bo'lishi mumkin:

1. `undefined`
2. Xato.

Nima uchun? Keling, `(*)` qatorida nima bo'layotganini ko'raylik:

1. `str` xususiyatga murojaat qilish vaqtida "o'ralish-obyekti" yaratiladi.
2. Xususiyat bilan operatsiya unda amalga oshiriladi. Shunday qilib, obyekt `test` xususiyatini oladi.
3. Amaliyot tugaydi va "o'ralishsh-obyekti" yo'qoladi.

Shunday qilib, oxirgi satrda `str` xususiyatidan iz qolmaydi. Matndagi har qanday obyekt ishlashi uchun yangi o'ralish obyekti.

Ba'zi brauzerlar dasturchini yanada cheklashga qaror qilishlari va umuman ibtidoiylarga xususiyatlarni berishga yo'l qo'ymasliklari mumkin. Shuning uchun amalda xatolarni `(*)` satrida ham ko'rishimiz mumkin. Bu spetsifikatsiyadan biroz uzoqroq.

**Ushbu misol ibtidoiylar obyekt emasligini aniq ko'rsatib turibdi.**

Ular qo'shimcha ma'lumotlarni saqlay olmaydi.

Barcha xususiyat/usul operatsiyalari vaqtinchalik obyektlar yordamida amalga oshiriladi.
