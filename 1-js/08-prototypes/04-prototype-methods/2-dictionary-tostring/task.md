muhimlik: 5

---

# ToStringni lug'atga qo'shing

Har qanday `key/value` juftligini saqlash uchun `Object.create(null)` shaklida yaratilgan `lug'at` obyekti mavjud.

Unga `dictionary.toString()` usulini qo'shing, bu kalitlarni vergul bilan ajratilgan ro'yxatini qaytarishi kerak. Sizning `toString` obyekt uchun `for..in` ko'rinishida bo'lmasligi kerak.

Bu shunday ishlashi kerak:

```js
let dictionary = Object.create(null);

*!*
// dictionary.toString usulini qo'shish uchun sizning kodingiz
*/!*

// ba'zi ma'lumotlarni qo'shing
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ bu yerda odatiy xususiyat kalitidir

// faqat apple va __proto__ tsiklda
for(let key in dictionary) {
  alert(key); // "apple", so'ng "__proto__"
}

// sizning toString amalda
alert(dictionary); // "apple,__proto__"
```
