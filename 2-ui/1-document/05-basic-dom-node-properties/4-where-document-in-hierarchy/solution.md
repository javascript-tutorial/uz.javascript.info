# Document Sinfini Aniqlash

Qaysi sinfga tegishli ekanligini uni chiqarib ko'rish orqali bilishimiz mumkin:

```js run
alert(document); // [object HTMLDocument]
```

Yoki:

```js run
alert(document.constructor.name); // HTMLDocument
```

Demak, `document` - bu `HTMLDocument` sinfining namunasi (instance).

Uning ierarxiyadagi o'rni qanday?

Ha, biz spetsifikatsiyani ko'rib chiqishimiz mumkin edi, lekin qo'lda aniqlash tezroq bo'lardi.

`__proto__` orqali prototip zanjirini ko'rib chiqamiz.

Ma'lumki, sinf usullari konstruktorning `prototype`ida joylashgan. Masalan, `HTMLDocument.prototype`da hujjatlar uchun usullar mavjud.

Shuningdek, `prototype` ichida konstruktor funksiyasiga havola mavjud:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Sinf nomini satr sifatida olish uchun `constructor.name`dan foydalanishimiz mumkin. Buni butun `document` prototip zanjiri uchun, `Node` sinfigacha qilamiz:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Mana ierarxiya.

Shuningdek, `console.dir(document)` yordamida obyektni tekshirib, `__proto__`ni ochish orqali bu nomlarni ko'rishimiz mumkin. Konsol ularni ichki tarzda `constructor`dan oladi.
