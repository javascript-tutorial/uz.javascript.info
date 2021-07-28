# Maxsus xatolar, Error kengaytmasi

Biz biron bir narsani ishlab chiqsak, ko'pincha xatolarimizni aniqlab olish uchun o'z xato klasslarimizga ehtiyoj sezamiz. Tarmoq operatsiyalaridagi xatolar uchun bizga `HttpError`, ma'lumotlar bazasi operatsiyalari uchun `DbError`, qidiruv operatsiyalari uchun `NotFoundError` va boshqalar kerak bo'lishi mumkin.

<<<<<<< HEAD
Bizning xatolarimiz `message`, `name` va `stack` kabi asosiy xato xususiyatlarini qo'llab-quvvatlashi kerak. Ammo ular o'zlarining boshqa xususiyatlariga ham ega bo'lishi mumkin, masalan, `HttpError` obyektlari `404` yoki `403` yoki `500` kabi qiymatga ega bo'lgan `statusCode` xususiyatiga ega bo'lishi mumkin.
=======
Our errors should support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have a `statusCode` property with a value like `404` or `403` or `500`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

JavaScript har qanday argument bilan `throw` dan foydalanishga imkon beradi, shuning uchun texnik jihatdan bizning maxsus xato klasslarimiz `Error` dan meros bo'lib o'tishi shart emas. Ammo biz meros qilib olsak, xato obyektlarini aniqlash uchun `obj instanceof Error` dan foydalanish mumkin bo'ladi. Shunday qilib, undan meros olish yaxshiroqdir.

<<<<<<< HEAD
Ilovamizni tuzish jarayonida o'z xatolarimiz tabiiy ravishda iyerarxiyani shakllantiradi, masalan, `HttpTimeoutError` `HttpError` dan meros bo'lib o'tishi mumkin va hokazo.
=======
As the application grows, our own errors naturally form a hierarchy. For instance, `HttpTimeoutError` may inherit from `HttpError`, and so on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Error kengaytmasi

Masalan, JSON-ni foydalanuvchi ma'lumotlari bilan o'qishi kerak bo'lgan `readUser(json)` funktsiyasini ko'rib chiqamiz.

Yaroqli `json` ko'rinishi mumkin bo'lgan misol:
```js
let json = `{ "name": "John", "age": 30 }`;
```

<<<<<<< HEAD
Ichki sifatida biz `JSON.parse` dan foydalanamiz. Agar u noto'g'ri shakllangan `json` qabul qilsa, u holda `SyntaxError` yoziladi.

Ammo `json` sintaktik jihatdan to'g'ri bo'lsa ham, bu uning haqiqiy foydalanuvchi ekanligini anglatmaydi, to'g'rimi? Kerakli ma'lumotlarni o'tkazib yuborishi mumkin. Masalan, u bizning foydalanuvchilarimiz uchun muhim bo'lgan `name` va `age` xususiyatlariga ega bo'lmasligi mumkin.
=======
Internally, we'll use `JSON.parse`. If it receives malformed `json`, then it throws `SyntaxError`. But even if `json` is syntactically correct, that doesn't mean that it's a valid user, right? It may miss the necessary data. For instance, it may not have `name` and `age` properties that are essential for our users.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bizning `readUser(json)` funktsiyasi nafaqat JSONni o'qiydi, balki ma'lumotlarni tekshiradi ("tasdiqlaydi"). Agar talab qilinadigan maydonlar bo'lmasa yoki format noto'g'ri bo'lsa, demak bu xato. Va bu `SyntaxError` emas, chunki ma'lumotlar sintaktik jihatdan to'g'ri, ammo boshqa bir xato. Biz buni `ValidationError` deb ataymiz va buning uchun klass yaratamiz. Bunday xato, shuningdek, hatolik to'g'risidagi ma'lumotni o'z ichiga olishi kerak.

Bizning `ValidationError` klassi o'rnatilgan `Error` klassidan olinishi kerak.

<<<<<<< HEAD
<<<<<<< HEAD
Ushbu klass ichki o'rnatilgan, ammo biz nima kengaytirayotganimizni tushunish uchun uning taxminiy kodi bizning ko'z oldida bo'lishi kerak.

Mana:
=======
That class is built-in, but here's its approximate code so we can understand what we're extending:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Our `ValidationError` class should inherit from the `Error` class.

The `Error` class is built-in, but here's its approximate code so we can understand what we're extending:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js
// O'rnatilgan Xatolar sinfi uchun "pseudocode" JavaScript-ning o'zi tomonidan belgilanadi
class Error {
  constructor(message) {
    this.message = message;
<<<<<<< HEAD
    this.name = "Error"; // (har xil o'rnatilgan xato klasslari uchun turli xil nomlar)
    this.stack = <nested calls>; // nostandart, ammo aksariyat muhitlar uni qo'llab-quvvatlaydi
=======
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <call stack>; // non-standard, but most environments support it
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }
}
```

<<<<<<< HEAD
Keling, undan `ValidationError` ni meros qilib olamiz:
=======
Now let's inherit `ValidationError` from it and try it in action:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // har biri uchun satr raqamlari ko'rsatilgan ichki chaqiruvlar ro'yxati
}
```

<<<<<<< HEAD
Iltimos, konstruktorga qarang:

1. `(1)` satrida biz ota-ona konstruktorini chaqiramiz. JavaScript bolalar konstruktorida `super` ni chaqirishni talab qiladi, shuning uchun bu majburiydir. Ota-ona konstruktor `message` xususiyatini o'rnatadi.
2. Ota-ona konstruktor shuningdek, `name` xususiyatini `Error` ga o'rnatadi, shuning uchun `(2)` satrida biz uni kerakli qiymatga qaytaramiz.
=======
Please note: in the line `(1)` we call the parent constructor. JavaScript requires us to call `super` in the child constructor, so that's obligatory. The parent constructor sets the `message` property.

The parent constructor also sets the `name` property to `"Error"`, so in the line `(2)` we reset it to the right value.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buni `readUser(json)` da ishlatishga harakat qilaylik:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Try..catch bilan ishlash namunasi

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it (**)
  }
}
```

Yuqoridagi koddagi `try..catch` bloki bizning `ValidationError` va `JSON.parse` dan o'rnatilgan `SyntaxError` bilan ishlaydi.

Iltimos, `(*)` satridagi aniq xato turini tekshirish uchun `instanceof` dan qanday foydalanayotganimizni ko'rib chiqing.

Quyidagi kabi `err.name` ga qarashimiz mumkin:

```js
// ...
// (err instanceof SyntaxError) ning o'rniga
} else if (err.name == "SyntaxError") { // (*)
// ...
```

`instanceof` versiyasi ancha yaxshi, chunki kelajakda biz `ValidationError` ni kengaytiramiz, uning `TypeRequiredError` kabi pastki turlarini yaratamiz. Va `instanceof` tekshiruvi yangi meros klasslari uchun ishlashni davom ettiradi. Demak, bu kelajakka ishonchli.

<<<<<<< HEAD
<<<<<<< HEAD
Bundan tashqari, agar `catch` noma'lum xatoga duch kelsa, uni `(**)` satrida qayta tiklashi muhimdir. `catch` faqat tasdiqlash va sintaksis xatolarini qanday boshqarishni biladi, boshqa turlarni (koddagi xato yoki shunga o'xshash sabablarga ko'ra) boshqara ololmaydi.
=======
Also it's important that if `catch` meets an unknown error, then it rethrows it in the line `(**)`. The `catch` block only knows how to handle validation and syntax errors, other kinds (due to a typo in the code or other unknown ones) should fall through.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Also it's important that if `catch` meets an unknown error, then it rethrows it in the line `(**)`. The `catch` block only knows how to handle validation and syntax errors, other kinds (caused by a typo in the code or other unknown reasons) should fall through.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

## Keyinchalik meros

<<<<<<< HEAD
`ValidationError` klassi juda umumiy. Ko'p narsalar noto'g'ri ketishi mumkin. Xususiyat yo'q bo'lishi yoki noto'g'ri formatda bo'lishi mumkin (masalan, `age` uchun matn qiymati). Keling, aniq xususiyatlar uchun aniqroq `PropertyRequiredError` klassini yarataylik. Unda yetishmayotgan mulk to'g'risida qo'shimcha ma'lumotlar mavjud.
=======
The `ValidationError` class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for `age` instead of a number). Let's make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that's missing.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Foydalanish
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Try..catch bilan ishlash namunasi

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // noma'lum xato, uni qayta tiklang
  }
}
```

Yangi `PropertyRequiredError` klassidan foydalanish oson: biz faqat xususiyat nomini kiritishimiz kerak: `new PropertyRequiredError(property)`. Inson tomonidan o'qiladigan `message` konstruktor tomonidan yaratilgan.

<<<<<<< HEAD
Shuni esda tutingki, `PropertyRequiredError` konstruktoridagi `this.name` yana qo'lda tayinlangan. Bu biroz zerikarli bo'lishi mumkin -- har bir maxsus xatoni yaratishda `this.name = <class name>` ni belgilash. Ammo chiqishning bir usuli bor. Ushbu yukni yelkamizdan olib tashlaydigan o'zimizning "asosiy xatolar" klassimizni konstruktorda `this.name` uchun `this.constructor.name` dan foydalanishimiz mumkin. Va keyin undan meros olamiz.
=======
Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Keling, uni `MyError` deb nomlaymiz.

Soddalashtirilgan `MyError` va boshqa maxsus xato klasslari bilan kod:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// ism to'g'ri
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Endi konstruktordagi `"this.name = ..."` satridan xalos bo'lganimiz sababli, maxsus xatolar ancha qisqaroq, ayniqsa `ValidationError`.

## Istisnolarni o'rash

<<<<<<< HEAD
Yuqoridagi koddagi `readUser` funktsiyasining maqsadi "foydalanuvchi ma'lumotlarini o'qish", shunday emasmi? Jarayonda turli xil xatolar bo'lishi mumkin. Hozir bizda `SyntaxError` va `ValidationError` mavjud, ammo kelajakda `readUser` funktsiyasi o'sishi mumkin: yangi kod boshqa turdagi xatolarni keltirib chiqarishi mumkin.

`readUser` ni chaqiradigan kod ushbu xatolarni hal qilishi kerak. Hozirda u turli xil xato turlarini tekshirish va noma'lumlarini qayta tiklash uchun `catch` blokida bir nechta `if` dan foydalanadi. Agar `readUser` funktsiyasi bir nechta xatolarni keltirib chiqaradigan bo'lsa, unda biz o'zimizga savol berishimiz kerak: biz `readUser` ni chaqiradigan har bir kodda barcha xato turlarini birma-bir tekshirishni xohlaymizmi?

Ko'pincha javob "Yo'q": tashqi kod "hamma narsadan bir daraja" bo'lishni xohlaydi. U qandaydir "ma'lumotlarni o'qish xatosi" ga ega bo'lishni xohlaydi. Nima uchun aynan shunday sodir bo'ldi -- ko'pincha ahamiyatsiz (xato xabari uni tavsiflaydi). Yoki xato tafsilotlarini olishning bir usuli bo'lsa ham yaxshiroq, lekin faqat agar kerak bo'lsa.

Shunday qilib, bunday xatolarni aks ettirish uchun yangi `ReadError` klassini yarataylik. Agar `readUser` da xatolik yuz bersa, biz uni o'sha yerda ushlaymiz va `ReadError` ni yaratamiz. Shuningdek, biz uning asl sababidagi asl xato haqida ma'lumotni saqlaymiz. Keyin tashqi kod faqat `ReadError` ni tekshirishi kerak.
=======
The purpose of the function `readUser` in the code above is "to read the user data". There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but in the future `readUser` function may grow and probably generate other kinds of errors.

The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:

```js
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`ReadError` ni belgilaydigan va uni `readUser` va `try..catch` da ishlatilishini ko'rsatadigan kod:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

Yuqoridagi kodda `readUser` aniq ta'riflanganidek ishlaydi -- sintaksis va tasdiqlash xatolarini ushlaydi va uning o'rniga `ReadError` xatolarini chiqaradi (noma'lum xatolar odatdagidek qayta ko'rib chiqiladi).

<<<<<<< HEAD
Shunday qilib tashqi kod `instanceof ReadError` ni tekshiradi. Mumkin bo'lgan barcha xato turlarini ro'yxatlashning hojati yo'q.

Ushbu yondashuv "istisnolarni o'rash" deb nomlanadi, chunki biz "past darajadagi istisnolarni" qabul qilamiz va ularni `ReadError` ga o'ramoqdamiz, bu esa chaqiruv kodi uchun qulayroq. U obyektga yo'naltirilgan dasturlashda keng qo'llaniladi.
=======
So the outer code checks `instanceof ReadError` and that's it. No need to list all possible error types.

The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
- Odatda `Error` va boshqa o'rnatilgan xato klasslaridan meros qilib olishimiz mumkin, faqat `name` xususiyati haqida g'amxo'rlik qilishimiz kerak va `super` ga chaqiruv qilishni unutmang.
- Ko'pincha, ba'zi xatolarni tekshirish uchun `instanceof` dan foydalanishimiz kerak. Shuningdek, u meros bilan ishlaydi. Ammo ba'zida bizda uchinchi tomon kutubxonasidan xato obyekti kelib chiqadi va klassni olishning oson yo'li yo'q. Bunday tekshirishlar uchun `name` xususiyati ishlatilishi mumkin.
- Istisnolarni o'rash - bu funktsiya past darajadagi istisnolarni ko'rib chiqishda va xatolar haqida xabar berish uchun yuqori darajadagi obyektni yaratishda keng tarqalgan usul. Ba'zan past darajadagi istisnolar yuqoridagi misollarda `err.cause` kabi obyektning xususiyatlariga aylanadi, ammo bu qat'iy talab qilinmaydi.
=======
- We can inherit from `Error` and other built-in error classes normally. We just need to take care of the `name` property and don't forget to call `super`.
- We can use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there's no easy way to get its class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
