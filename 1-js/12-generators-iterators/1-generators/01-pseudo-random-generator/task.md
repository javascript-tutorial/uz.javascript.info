
# Psevdo-tasodifiy generator

Biz tasodifiy ma'lumotlarga muhtoj bo'lgan ko'plab joylar mavjud.

<<<<<<< HEAD
Ulardan biri testlar. Ishlarni yaxshi tekshirish uchun bizga tasodifiy ma'lumotlar kerak bo'ladi: matn, raqamlar va boshqalar.
=======
One of them is testing. We may need random data: text, numbers, etc. to test things out well.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

JavaScript-da biz `Math.random()` dan foydalanishimiz mumkin. Lekin, agar biror narsa noto'g'ri bo'lsa, biz xuddi shu ma'lumotlardan foydalanib, testni takrorlashni xohlaymiz.

<<<<<<< HEAD
Buning uchun "urug'langan psevdo-tasodifiy generatorlar" ishlatiladi. Ular birinchi qiymat bo'lgan "urug 'ni" olishadi, so'ngra formuladan foydalanib keyingilarini hosil qilishadi. Shunday qilib, bir xil urug' bir xil ketma-ketlikni beradi va shuning uchun butun oqim osongina takrorlanadi. Biz uni takrorlash uchun faqat urug'ni eslashimiz kerak.
=======
For that, so called "seeded pseudo-random generators" are used. They take a "seed", the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bir xil taqsimlangan qiymatlarni yaratadigan bunday formulaning misoli:

```
next = previous * 16807 % 2147483647
```

Agar biz `1` ni urug' sifatida ishlatsak, qiymatlar quyidagicha bo'ladi:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...va hokazo...

Vazifa `pseudoRandom(seed)` generator funktsiyasini yaratishdir, u `seed` ni oladi va generatorni ushbu formulada yaratadi.

Foydalanish misoli:

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
