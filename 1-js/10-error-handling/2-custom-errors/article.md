# Maxsus xatolar, Error kengaytmasi

Biz biron bir narsani ishlab chiqsak, ko'pincha xatolarimizni aniqlab olish uchun o'z xato klasslarimizga ehtiyoj sezamiz. Tarmoq operatsiyalaridagi xatolar uchun bizga `HttpError`, ma'lumotlar bazasi operatsiyalari uchun `DbError`, qidiruv operatsiyalari uchun `NotFoundError` va boshqalar kerak bo'lishi mumkin.

Bizning xatolarimiz `message`, `name` va `stack` kabi asosiy xato xususiyatlarini qo'llab-quvvatlashi kerak. Ammo ular o'zlarining boshqa xususiyatlariga ham ega bo'lishi mumkin, masalan, `HttpError` obyektlari `404` yoki `403` yoki `500` kabi qiymatga ega bo'lgan `statusCode` xususiyatiga ega bo'lishi mumkin.

JavaScript har qanday argument bilan `throw` dan foydalanishga imkon beradi, shuning uchun texnik jihatdan bizning maxsus xato klasslarimiz `Error` dan meros bo'lib o'tishi shart emas. Ammo biz meros qilib olsak, xato obyektlarini aniqlash uchun `obj instanceof Error` dan foydalanish mumkin bo'ladi. Shunday qilib, undan meros olish yaxshiroqdir.

Ilovamizni tuzish jarayonida o'z xatolarimiz tabiiy ravishda iyerarxiyani shakllantiradi, masalan, `HttpTimeoutError` `HttpError` dan meros bo'lib o'tishi mumkin va hokazo.

## Error kengaytmasi

Masalan, JSON-ni foydalanuvchi ma'lumotlari bilan o'qishi kerak bo'lgan `readUser(json)` funktsiyasini ko'rib chiqamiz.

Yaroqli `json` ko'rinishi mumkin bo'lgan misol:
```js
let json = `{ "name": "John", "age": 30 }`;
```

Ichki sifatida biz `JSON.parse` dan foydalanamiz. Agar u noto'g'ri shakllangan `json` qabul qilsa, u holda `SyntaxError` yoziladi.

Ammo `json` sintaktik jihatdan to'g'ri bo'lsa ham, bu uning haqiqiy foydalanuvchi ekanligini anglatmaydi, to'g'rimi? Kerakli ma'lumotlarni o'tkazib yuborishi mumkin. Masalan, u bizning foydalanuvchilarimiz uchun muhim bo'lgan `name` va `age` xususiyatlariga ega bo'lmasligi mumkin.

Bizning `readUser(json)` funktsiyasi nafaqat JSONni o'qiydi, balki ma'lumotlarni tekshiradi ("tasdiqlaydi"). Agar talab qilinadigan maydonlar bo'lmasa yoki format noto'g'ri bo'lsa, demak bu xato. Va bu `SyntaxError` emas, chunki ma'lumotlar sintaktik jihatdan to'g'ri, ammo boshqa bir xato. Biz buni `ValidationError` deb ataymiz va buning uchun klass yaratamiz. Bunday xato, shuningdek, hatolik to'g'risidagi ma'lumotni o'z ichiga olishi kerak.

Bizning `ValidationError` klassi o'rnatilgan `Error` klassidan olinishi kerak.

Ushbu klass ichki o'rnatilgan, ammo biz nima kengaytirayotganimizni tushunish uchun uning taxminiy kodi bizning ko'z oldida bo'lishi kerak.

Mana:

```js
// O'rnatilgan Xatolar sinfi uchun "pseudocode" JavaScript-ning o'zi tomonidan belgilanadi
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (har xil o'rnatilgan xato klasslari uchun turli xil nomlar)
    this.stack = <nested calls>; // nostandart, ammo aksariyat muhitlar uni qo'llab-quvvatlaydi
  }
}
```

Keling, undan `ValidationError` ni meros qilib olamiz:

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

Iltimos, konstruktorga qarang:

1. `(1)` satrida biz ota-ona konstruktorini chaqiramiz. JavaScript bolalar konstruktorida `super` ni chaqirishni talab qiladi, shuning uchun bu majburiydir. Ota-ona konstruktor `message` xususiyatini o'rnatadi.
2. Ota-ona konstruktor shuningdek, `name` xususiyatini `Error` ga o'rnatadi, shuning uchun `(2)` satrida biz uni kerakli qiymatga qaytaramiz.

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

Bundan tashqari, agar `catch` noma'lum xatoga duch kelsa, uni `(**)` satrida qayta tiklashi muhimdir. `catch` faqat tasdiqlash va sintaksis xatolarini qanday boshqarishni biladi, boshqa turlarni (koddagi xato yoki shunga o'xshash sabablarga ko'ra) boshqara ololmaydi.

## Keyinchalik meros

`ValidationError` klassi juda umumiy. Ko'p narsalar noto'g'ri ketishi mumkin. Xususiyat yo'q bo'lishi yoki noto'g'ri formatda bo'lishi mumkin (masalan, `age` uchun matn qiymati). Keling, aniq xususiyatlar uchun aniqroq `PropertyRequiredError` klassini yarataylik. Unda yetishmayotgan mulk to'g'risida qo'shimcha ma'lumotlar mavjud.

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

Shuni esda tutingki, `PropertyRequiredError` konstruktoridagi `this.name` yana qo'lda tayinlangan. Bu biroz zerikarli bo'lishi mumkin -- har bir maxsus xatoni yaratishda `this.name = <class name>` ni belgilash. Ammo chiqishning bir usuli bor. Ushbu yukni yelkamizdan olib tashlaydigan o'zimizning "asosiy xatolar" klassimizni konstruktorda `this.name` uchun `this.constructor.name` dan foydalanishimiz mumkin. Va keyin undan meros olamiz.

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

Yuqoridagi koddagi `readUser` funktsiyasining maqsadi "foydalanuvchi ma'lumotlarini o'qish", shunday emasmi? Jarayonda turli xil xatolar bo'lishi mumkin. Hozir bizda `SyntaxError` va `ValidationError` mavjud, ammo kelajakda `readUser` funktsiyasi o'sishi mumkin: yangi kod boshqa turdagi xatolarni keltirib chiqarishi mumkin.

`readUser` ni chaqiradigan kod ushbu xatolarni hal qilishi kerak. Hozirda u turli xil xato turlarini tekshirish va noma'lumlarini qayta tiklash uchun `catch` blokida bir nechta `if` dan foydalanadi. Agar `readUser` funktsiyasi bir nechta xatolarni keltirib chiqaradigan bo'lsa, unda biz o'zimizga savol berishimiz kerak: biz `readUser` ni chaqiradigan har bir kodda barcha xato turlarini birma-bir tekshirishni xohlaymizmi?

Ko'pincha javob "Yo'q": tashqi kod "hamma narsadan bir daraja" bo'lishni xohlaydi. U qandaydir "ma'lumotlarni o'qish xatosi" ga ega bo'lishni xohlaydi. Nima uchun aynan shunday sodir bo'ldi -- ko'pincha ahamiyatsiz (xato xabari uni tavsiflaydi). Yoki xato tafsilotlarini olishning bir usuli bo'lsa ham yaxshiroq, lekin faqat agar kerak bo'lsa.

Shunday qilib, bunday xatolarni aks ettirish uchun yangi `ReadError` klassini yarataylik. Agar `readUser` da xatolik yuz bersa, biz uni o'sha yerda ushlaymiz va `ReadError` ni yaratamiz. Shuningdek, biz uning asl sababidagi asl xato haqida ma'lumotni saqlaymiz. Keyin tashqi kod faqat `ReadError` ni tekshirishi kerak.

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

Shunday qilib tashqi kod `instanceof ReadError` ni tekshiradi. Mumkin bo'lgan barcha xato turlarini ro'yxatlashning hojati yo'q.

Ushbu yondashuv "istisnolarni o'rash" deb nomlanadi, chunki biz "past darajadagi istisnolarni" qabul qilamiz va ularni `ReadError` ga o'ramoqdamiz, bu esa chaqiruv kodi uchun qulayroq. U obyektga yo'naltirilgan dasturlashda keng qo'llaniladi.

## Xulosa

- Odatda `Error` va boshqa o'rnatilgan xato klasslaridan meros qilib olishimiz mumkin, faqat `name` xususiyati haqida g'amxo'rlik qilishimiz kerak va `super` ga chaqiruv qilishni unutmang.
- Ko'pincha, ba'zi xatolarni tekshirish uchun `instanceof` dan foydalanishimiz kerak. Shuningdek, u meros bilan ishlaydi. Ammo ba'zida bizda uchinchi tomon kutubxonasidan xato obyekti kelib chiqadi va klassni olishning oson yo'li yo'q. Bunday tekshirishlar uchun `name` xususiyati ishlatilishi mumkin.
- Istisnolarni o'rash - bu funktsiya past darajadagi istisnolarni ko'rib chiqishda va xatolar haqida xabar berish uchun yuqori darajadagi obyektni yaratishda keng tarqalgan usul. Ba'zan past darajadagi istisnolar yuqoridagi misollarda `err.cause` kabi obyektning xususiyatlariga aylanadi, ammo bu qat'iy talab qilinmaydi.
