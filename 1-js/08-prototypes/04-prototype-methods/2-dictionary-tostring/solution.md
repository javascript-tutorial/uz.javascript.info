
Usul `Object.keys` yordamida barcha ro'yxatga olinadigan kalitlarni olishi va ularning ro'yxatini chiqarishi mumkin.

`toString` ni sanoqsiz qilish uchun, uni xususiyat tavsiflovchisi yordamida aniqlaymiz. `Object.create` sintaksisi bizni obyektni ikkinchi argument sifatida xususiyat tavsiflovchilari bilan ta'minlashga imkon beradi.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // toString xususiyatini aniqlang
    value() { // qiymati funktsiya
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple va __proto__ tsiklda
for(let key in dictionary) {
  alert(key); // "apple", so'ng "__proto__"
}  

// toString tomonidan vergul bilan ajratilgan xususiyatlar ro'yxati
alert(dictionary); // "apple,__proto__"
```

Agar xususiyatni deskriptor yordamida yaratadigan bo'lsak, uning bayroqlari sukut bo'yicha `false` bo'ladi. Shunday qilib, yuqoridagi kodda `dictionary.toString` ni sanab bo'lmaydi.

<<<<<<< HEAD
Ko'rib chiqish uchun [](info:property-descriptors) bo'limiga qarang.
=======
See the chapter [](info:property-descriptors) for review.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
