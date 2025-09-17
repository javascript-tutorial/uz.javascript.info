# Proxy va Reflect

`Proxy` objekti boshqa objektni o'rab oladi va xususiyatlarni o'qish/yozish va boshqa amallarni tutib qoladi, ixtiyoriy ravishda ularni o'zi hal qiladi yoki objektga shaffof ravishda hal qilishga imkon beradi.

Proxylar ko'plab kutubxonalar va ba'zi brauzer freymvorklarida ishlatiladi. Bu maqolada ko'plab amaliy dasturlarni ko'ramiz.

## Proxy

Sintaksis:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- o'raladigan objekt, funktsiyalar ham bo'lishi mumkin.
- `handler` -- proxy konfiguratsiyasi: amallarni tutib qoladigan "trap"lar, metodlar bilan objekt. - masalan `target` ning xususiyatini o'qish uchun `get` trap, `target` ga xususiyat yozish uchun `set` trap va hokazo.

`proxy` dagi amallar uchun, agar `handler` da tegishli trap bo'lsa, u ishlaydi va proxy uni hal qilish imkoniyatiga ega bo'ladi, aks holda amal `target` da bajariladi.

Boshlang'ich misol sifatida, hech qanday traplarsiz proxy yarataylik:

```js run
let target = {};
let proxy = new Proxy(target, {}); // bo'sh handler

proxy.test = 5; // proxyga yozish (1)
alert(target.test); // 5, xususiyat targetda paydo bo'ldi!

alert(proxy.test); // 5, uni proxydan ham o'qiy olamiz (2)

for(let key in proxy) alert(key); // test, iteratsiya ishlaydi (3)
```

Traplar yo'qligi sababli, `proxy` dagi barcha amallar `target` ga yo'naltiriladi.

1. `proxy.test=` yozish amali `target` da qiymat o'rnatadi.
2. `proxy.test` o'qish amali `target` dan qiymat qaytaradi.
3. `proxy` bo'ylab iteratsiya `target` dan qiymatlar qaytaradi.

Ko'rib turganingizdek, hech qanday traplarsiz, `proxy` `target` atrofida shaffof wrapper.

![](proxy.svg)

`Proxy` maxsus "ekzotik objekt". Uning o'z xususiyatlari yo'q. Bo'sh `handler` bilan u amallarni shaffof ravishda `target` ga yo'naltiradi.

Ko'proq imkoniyatlarni faollashtirish uchun traplar qo'shaylik.

Ular bilan nimani tutib qolishimiz mumkin?

Objektlardagi ko'pchilik amallar uchun JavaScript spetsifikatsiyasida eng past darajada qanday ishlashini tavsiflovchi "ichki metod" mavjud. Masalan `[[Get]]`, xususiyatni o'qish uchun ichki metod, `[[Set]]`, xususiyatni yozish uchun ichki metod va hokazo. Bu metodlar faqat spetsifikatsiyada ishlatiladi, biz ularni nom bilan to'g'ridan-to'g'ri chaqira olmaymiz.

Proxy traplar bu metodlarning chaqiruvlarini tutib qoladi. Ular [Proxy spetsifikatsiyasi](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) va quyidagi jadvalda ko'rsatilgan.

Har bir ichki metod uchun ushbu jadvalda trap mavjud: amalni tutib qolish uchun `new Proxy` ning `handler` parametriga qo'shishimiz mumkin bo'lgan metod nomi:

| Ichki metod | Handler metodi | Qachon ishga tushadi... |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | xususiyatni o'qish |
| `[[Set]]` | `set` | xususiyatga yozish |
| `[[HasProperty]]` | `has` | `in` operatori |
| `[[Delete]]` | `deleteProperty` | `delete` operatori |
| `[[Call]]` | `apply` | funktsiya chaqiruvi |
| `[[Construct]]` | `construct` | `new` operatori |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](mdn:/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](mdn:/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](mdn:/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](mdn:/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](mdn:/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](mdn:/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object.keys/values/entries` |

```warn header="Invariantlar"
JavaScript ba'zi invariantlarni ta'minlaydi -- ichki metodlar va traplar tomonidan bajarilishi kerak bo'lgan shartlar.

Ularning aksariyati qaytariladigan qiymatlar uchun:
- Agar qiymat muvaffaqiyatli yozilgan bo'lsa `[[Set]]` `true` qaytarishi kerak, aks holda `false`.
- Agar qiymat muvaffaqiyatli o'chirilgan bo'lsa `[[Delete]]` `true` qaytarishi kerak, aks holda `false`.
- ...va hokazo, quyidagi misollarda ko'proq ko'ramiz.

Boshqa ba'zi invariantlar ham bor, masalan:
- Proxy objektiga qo'llanilgan `[[GetPrototypeOf]]` proxy objektining target objektiga qo'llanilgan `[[GetPrototypeOf]]` bilan bir xil qiymat qaytarishi kerak. Boshqacha qilib aytganda, proxyning prototype ini o'qish har doim target objektning prototype ini qaytarishi kerak.

Traplar bu amallarni tutib qolishi mumkin, lekin bu qoidalarga rioya qilishi kerak.

Invariantlar til xususiyatlarining to'g'ri va izchil xatti-harakatini ta'minlaydi. To'liq invariantlar ro'yxati [spetsifikatsiyada](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). Agar g'alati narsa qilmayotgan bo'lsangiz, ularni buzmasligingiz mumkin.
```

Buni amaliy misollarda qanday ishlashini ko'raylik.

## "get" trap bilan standart qiymat

Eng keng tarqalgan traplar xususiyatlarni o'qish/yozish uchun.

O'qishni tutib qolish uchun `handler` da `get(target, property, receiver)` metodi bo'lishi kerak.

U xususiyat o'qilganda quyidagi argumentlar bilan ishga tushadi:

- `target` -- maqsadli objekt, `new Proxy` ga birinchi argument sifatida uzatilgan,
- `property` -- xususiyat nomi,
- `receiver` -- agar target xususiyati getter bo'lsa, u holda `receiver` uning chaqiruvida `this` sifatida ishlatilishi kerak bo'lgan objekt. Odatda bu `proxy` objektining o'zi (yoki agar proxydan meros olsak, undan meros oluvchi objekt). Hozir bizga bu argument kerak emas, shuning uchun u keyinroq batafsil tushuntiriladi.

Objekt uchun standart qiymatlarni amalga oshirish uchun `get` dan foydalanamiz.

Mavjud bo'lmagan qiymatlar uchun `0` qaytaradigan raqamli massiv yaratamiz.

Odatda mavjud bo'lmagan massiv elementini olishga harakat qilganda, `undefined` olinadi, lekin biz oddiy massivni o'qishni tutib qoladigan va bunday xususiyat bo'lmasa `0` qaytaradigan proxyga o'raymiz:

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // standart qiymat
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (bunday element yo'q)
*/!*
```

Ko'rib turganingizdek, `get` trap bilan buni qilish juda oson.

"Standart" qiymatlar uchun har qanday mantiqni amalga oshirish uchun `Proxy` dan foydalanishimiz mumkin.

Iboralar va ularning tarjimalari bilan lug'at borligini tasavvur qiling:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

Hozir, agar ibora bo'lmasa, `dictionary` dan o'qish `undefined` qaytaradi. Lekin amalda, iborani tarjima qilmaslik odatda `undefined` dan yaxshiroq. Shuning uchun bu holda `undefined` o'rniga tarjima qilinmagan iborani qaytaraylik.

Bunga erishish uchun biz `dictionary` ni o'qish amallarini tutib qoladigan proxyga o'raymiz:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // lug'atdan xususiyat o'qishni tutib qolish
*/!*
    if (phrase in target) { // agar lug'atda bo'lsa
      return target[phrase]; // tarjimani qaytarish
    } else {
      // aks holda, tarjima qilinmagan iborani qaytarish
      return phrase;
    }
  }
});

// Lug'atdan ixtiyoriy iboralarni qidiring!
// Eng yomoni, ular tarjima qilinmaydi.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (tarjima yo'q)
*/!*
```

````smart
Proxy o'zgaruvchini qanday qayta yozishiga e'tibor bering:

```js
dictionary = new Proxy(dictionary, ...);
```

Proxy hamma joyda target objektni butunlay almashtirishi kerak. Proxy qilingandan keyin hech kim target objektga murojaat qilmasligi kerak. Aks holda chalkashlik oson.
````

## "set" trap bilan validatsiya

Faqat raqamlar uchun massiv kerak deylik. Agar boshqa turdagi qiymat qo'shilsa, xato bo'lishi kerak.

`set` trap xususiyat yozilganda ishga tushadi.

`set(target, property, value, receiver)`:

- `target` -- maqsadli objekt, `new Proxy` ga birinchi argument sifatida uzatilgan,
- `property` -- xususiyat nomi,
- `value` -- xususiyat qiymati,
- `receiver` -- `get` trap ga o'xshash, faqat setter xususiyatlari uchun muhim.

`set` trap o'rnatish muvaffaqiyatli bo'lsa `true`, aks holda `false` qaytarishi kerak (`TypeError` ni ishga tushiradi).

Yangi qiymatlarni validatsiya qilish uchun undan foydalanamiz:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // xususiyat yozishni tutib qolish uchun
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // muvaffaqiyatli qo'shildi
numbers.push(2); // muvaffaqiyatli qo'shildi
alert("Uzunlik: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' on proxy returned false)
*/!*

alert("Bu qator hech qachon yetib bormaydi (yuqoridagi qatorda xato)");
```

E'tibor bering: massivlarning o'rnatilgan funksionalligi hali ham ishlaydi! Qiymatlar `push` orqali qo'shiladi. `length` xususiyati qiymatlar qo'shilganda avtomatik ravishda oshadi. Bizning proxy hech narsani buzmaydi.

`push` va `unshift` kabi qiymat qo'shuvchi massiv metodlarini qayta yozish va ularga tekshiruv qo'shish kerak emas, chunki ular ichki tomondan proxy tomonidan tutib qolinadigan `[[Set]]` amalidan foydalanadi.

Shuning uchun kod toza va ixcham.

```warn header="`true` qaytarishni unutmang"
Yuqorida aytilganidek, saqlanishi kerak bo'lgan invariantlar bor.

`set` uchun, muvaffaqiyatli yozish uchun `true` qaytarishi kerak.

Agar buni qilishni unutsak yoki biron falsy qiymat qaytarsak, amal `TypeError` ni ishga tushiradi.
```

## "ownKeys" va "getOwnPropertyDescriptor" bilan iteratsiya

`Object.keys`, `for..in` sikl va objekt xususiyatlari bo'ylab iteratsiya qiladigan ko'pchilik boshqa metodlar xususiyatlar ro'yxatini olish uchun `[[OwnPropertyKeys]]` ichki metodidan (uni `ownKeys` trap tutib qoladi) foydalanadi.

Bunday metodlar tafsilotlarda farqlanadi:
- `Object.getOwnPropertyNames(obj)` simvol bo'lmagan kalitlarni qaytaradi.
- `Object.getOwnPropertySymbols(obj)` simvol kalitlarni qaytaradi.
- `Object.keys/values()` `enumerable` bayroq bilan simvol bo'lmagan kalitlar/qiymatlarni qaytaradi (xususiyat bayroqlari <info:property-descriptors> maqolasida tushuntirilgan).
- `for..in` `enumerable` bayroq bilan simvol bo'lmagan kalitlar va shuningdek prototype kalitlari bo'ylab sikl qiladi.

...Lekin bularning barchasi shu ro'yxat bilan boshlanadi.

Quyidagi misolda biz pastki chiziq `_` bilan boshlanadigan xususiyatlarni o'tkazib yuborish uchun `user` bo'ylab `for..in` sikl, shuningdek `Object.keys` va `Object.values` ni qilish uchun `ownKeys` trap dan foydalanamiz:

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" _password ni filtrlab tashlaydi
for(let key in user) alert(key); // name, keyin: age

// bu metodlarga ham bir xil ta'sir:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

Hozirgacha ishlaydi.

Garchi, agar biz objektda mavjud bo'lmagan kalitni qaytarsak, `Object.keys` uni ro'yxatga olmaydi:

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <bo'sh>
```

Nima uchun? Sababi oddiy: `Object.keys` faqat `enumerable` bayroqli xususiyatlarni qaytaradi. Buni tekshirish uchun u har bir xususiyat uchun [uning descriptorini](info:property-descriptors) olish uchun ichki `[[GetOwnProperty]]` metodini chaqiradi. Va bu yerda, xususiyat yo'q bo'lganligi sababli, uning descriptori bo'sh, `enumerable` bayroq yo'q, shuning uchun u o'tkazib yuboriladi.

`Object.keys` ning xususiyatni qaytarishi uchun, u objektda `enumerable` bayroq bilan mavjud bo'lishi yoki biz `[[GetOwnProperty]]` ga chaqiruvlarni tutib qolishimiz (`getOwnPropertyDescriptor` trap buni qiladi) va `enumerable: true` bilan descriptor qaytarishimiz mumkin.

Mana buning misoli:

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // xususiyatlar ro'yxatini olish uchun bir marta chaqiriladi
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // har bir xususiyat uchun chaqiriladi
    return {
      enumerable: true,
      configurable: true
      /* ...boshqa bayroqlar, ehtimol "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```

Yana bir marta eslatib o'taylik: biz faqat xususiyat objektda yo'q bo'lsa `[[GetOwnProperty]]` ni tutib qolishimiz kerak.

## "deleteProperty" va boshqa traplar bilan himoyalangan xususiyatlar

Pastki chiziq `_` prefiksi bilan xususiyatlar va metodlar ichki degan keng tarqalgan konventsiya mavjud. Ularga objekt tashqarisidan kirilmasligi kerak.

Biroq texnik jihatdan bu mumkin:

```js run
let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret
```

`_` bilan boshlanadigan xususiyatlarga har qanday kirishni oldini olish uchun proxylardan foydalanamiz.

Bizga traplar kerak bo'ladi:
- `get` bunday xususiyatni o'qishda xato tashlash uchun,
- `set` yozishda xato tashlash uchun,
- `deleteProperty` o'chirishda xato tashlash uchun,
- `ownKeys` `for..in` va `Object.keys` kabi metodlardan `_` bilan boshlanadigan xususiyatlarni istisno qilish uchun.

Mana kod:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Kirish taqiqlangan");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // xususiyat yozishni tutib qolish uchun
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Kirish taqiqlangan");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // xususiyat o'chirishni tutib qolish uchun
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Kirish taqiqlangan");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // xususiyatlar ro'yxatini tutib qolish uchun
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" _password o'qishga ruxsat bermaydi
try {
  alert(user._password); // Xato: Kirish taqiqlangan
} catch(e) { alert(e.message); }

// "set" _password yozishga ruxsat bermaydi
try {
  user._password = "test"; // Xato: Kirish taqiqlangan
} catch(e) { alert(e.message); }

// "deleteProperty" _password o'chirishga ruxsat bermaydi
try {
  delete user._password; // Xato: Kirish taqiqlangan
} catch(e) { alert(e.message); }

// "ownKeys" _password ni filtrlab tashlaydi
for(let key in user) alert(key); // name
```

`(*)` qatoridagi `get` trap dagi muhim tafsilotga e'tibor bering:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

Nima uchun funktsiyani `value.bind(target)` chaqirish kerak?

Sababi shundaki, `user.checkPassword()` kabi objekt metodlari `_password` ga kira olishi kerak:

```js
user = {
  // ...
  checkPassword(value) {
    // objekt metodi _password o'qiy olishi kerak
    return value === this._password;
  }
}
```

`user.checkPassword()` ga chaqiruv proxy qilingan `user` ni `this` sifatida oladi (nuqta oldidagi objekt `this` ga aylanadi), shuning uchun u `this._password` ga kirishga harakat qilganda, `get` trap faollashadi (u har qanday xususiyat o'qishda ishga tushadi) va xato tashlaydi.

Shuning uchun biz objekt metodlarining kontekstini `(*)` qatorida asl objekt `target` ga bog'laymiz. Keyin ularning kelajakdagi chaqiruvlari hech qanday traplarsiz `target` ni `this` sifatida ishlatadi.

Bu yechim odatda ishlaydi, lekin ideal emas, chunki metod proxy qilinmagan objektni boshqa joyga uzatishi mumkin va keyin biz chalkashib qolamiz: asl objekt qayerda va proxy qilingan qayerda?

Bundan tashqari, objekt bir necha marta proxy qilinishi mumkin (bir nechta proxylar objektga turli "o'zgarishlar" qo'shishi mumkin), va agar biz metodga o'ralmagan objektni uzatsak, kutilmagan oqibatlar bo'lishi mumkin.

Shuning uchun bunday proxy hamma joyda ishlatilmasligi kerak.

```smart header="Klass private xususiyatlari"
Zamonaviy JavaScript mexanizmlari klasslarda `#` prefiksi bilan private xususiyatlarni mahalliy qo'llab-quvvatlaydi. Ular <info:private-protected-properties-methods> maqolasida tasvirlangan. Proxylar kerak emas.

Biroq bunday xususiyatlarning o'z muammolari bor. Xususan, ular meros bo'lib o'tmaydi.
```

## "has" trap bilan "Diapazon ichida"

Ko'proq misollar ko'raylik.

Bizda range objekti bor:

```js
let range = {
  start: 1,
  end: 10
};
```

Raqam `range` da ekanligini tekshirish uchun `in` operatoridan foydalanishni xohlaymiz.

`has` trap `in` chaqiruvlarini tutib qoladi.

`has(target, property)`

- `target` -- maqsadli objekt, `new Proxy` ga birinchi argument sifatida uzatilgan,
- `property` -- xususiyat nomi

Mana demo:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end;
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

Chiroyli sintaktik shakar, shunday emasmi? Va amalga oshirish juda oddiy.

## Funktsiyalarni o'rash: "apply" [#proxy-apply]

Biz proxy ni funktsiya atrofida ham o'rashimiz mumkin.

`apply(target, thisArg, args)` trap proxy ni funktsiya sifatida chaqirishni boshqaradi:

- `target` maqsadli objekt (JavaScript da funktsiya objekt),
- `thisArg` `this` ning qiymati.
- `args` argumentlar ro'yxati.

Masalan, <info:call-apply-decorators> maqolasida qilgan `delay(f, ms)` dekoratorni eslaymiz.

O'sha maqolada biz buni proxylardan foydalanmasdan qildik. `delay(f, ms)` ga chaqiruv `ms` millisekunddan keyin barcha chaqiruvlarni `f` ga yo'naltiradigan funktsiya qaytardi.

Mana oldingi, funktsiyaga asoslangan amalga oshirish:

```js run
function delay(f, ms) {
  // timeout dan keyin chaqiruvni f ga o'tkazadigan wrapper qaytarish
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Salom, ${user}!`);
}

// bu o'rashdan keyin sayHi chaqiruvlari 3 soniyaga kechiktiriladi
sayHi = delay(sayHi, 3000);

sayHi("John"); // Salom, John! (3 soniyadan keyin)
```

Natija bir xil, lekin endi nafaqat chaqiruvlar, balki proxy dagi barcha amallar asl funktsiyaga yo'naltiriladi. Shuning uchun `sayHi.length` `(*)` qatorida o'rashdan keyin to'g'ri qaytariladi.

Biz "boyroq" wrapper oldik.

Boshqa traplar ham mavjud: to'liq ro'yxat ushbu maqola boshida. Ulardan foydalanish namunasi yuqoridagiga o'xshash.

## Reflect

`Reflect` - bu `Proxy` yaratishni soddalashtiruvchi o'rnatilgan objekt.

Ilgari aytilganidek, `[[Get]]`, `[[Set]]` va boshqalar kabi ichki metodlar faqat spetsifikatsiya uchun, ularni to'g'ridan-to'g'ri chaqirish mumkin emas.

`Reflect` objekti buni biroz mumkin qiladi. Uning metodlari ichki metodlar atrofidagi minimal wrapperlar.

Mana bir xil ishni qiladigan amallar va `Reflect` chaqiruvlari misollari:

| Amal |  `Reflect` chaqiruvi | Ichki metod |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[Delete]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

Masalan:

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

Xususan, `Reflect` bizga operatorlarni (`new`, `delete`...) funktsiyalar (`Reflect.construct`, `Reflect.deleteProperty`, ...) sifatida chaqirish imkonini beradi. Bu qiziq imkoniyat, lekin bu yerda boshqa narsa muhim.

**`Proxy` tomonidan tutib qolinadigan har bir ichki metod uchun `Reflect` da `Proxy` trap bilan bir xil nom va argumentlarga ega mos metod mavjud.**

Shunday qilib biz amallarni asl objektga yo'naltirish uchun `Reflect` dan foydalanishimiz mumkin.

Ushbu misolda ikkala trap `get` va `set` shaffof ravishda (go'yo ular mavjud emas) o'qish/yozish amallarini objektga yo'naltiradi, xabar ko'rsatadi:

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // "GET name" ni ko'rsatadi
user.name = "Pete"; // "SET name=Pete" ni ko'rsatadi
```

Bu yerda:

- `Reflect.get` objekt xususiyatini o'qiydi.
- `Reflect.set` objekt xususiyatini yozadi va muvaffaqiyatli bo'lsa `true`, aks holda `false` qaytaradi.

Ya'ni, hamma narsa oddiy: agar trap chaqiruvni objektga yo'naltirmoqchi bo'lsa, bir xil argumentlar bilan `Reflect.<method>` ni chaqirish yetarli.

Ko'p holatlarda biz `Reflect` siz bir xilini qila olamiz, masalan, xususiyatni o'qish `Reflect.get(target, prop, receiver)` ni `target[prop]` bilan almashtirish mumkin. Biroq muhim nozikliklar bor.

### Getter ni proxy qilish

Keling, `Reflect.get` nima uchun yaxshiroq ekanligini ko'rsatuvchi misolni ko'raylik. Va biz shuningdek `get/set` ning uchinchi `receiver` argumenti nima uchun kerakligini ko'ramiz, avval ishlatmagan.

Bizda `_name` xususiyati va uning uchun getter bilan `user` objekti bor.

Mana uni atrofidagi proxy:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```

Bu yerda `get` trap "shaffof", u asl xususiyatni qaytaradi va boshqa hech narsa qilmaydi. Bu bizning misolimiz uchun yetarli.

Hammasi to'g'ri ko'rinadi. Lekin misolni biroz murakkabroq qilaylik.

`user` dan boshqa `admin` objektini meros qilib olgandan keyin, noto'g'ri xatti-harakatni kuzatishimiz mumkin:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Kutilgan: Admin
alert(admin.name); // chiqadi: Guest (?!?)
*/!*
```

`admin.name` o'qish "Admin" ni qaytarishi kerak edi, "Guest" ni emas!

Nima gap? Ehtimol meros bilan biror narsa noto'g'ri qildik?

Lekin agar proxy ni olib tashlasak, hamma narsa kutilgandek ishlaydi.

Aslida muammo proxy da, `(*)` qatorida.

1. `admin.name` ni o'qiganimizda, `admin` objektida bunday o'z xususiyat yo'q bo'lganligi sababli, qidiruv uning prototype ga boradi.
2. Prototype `userProxy` dir.
3. Proxy dan `name` xususiyatini o'qiganda, uning `get` trap ishga tushadi va uni asl objektdan `(*)` qatorida `target[prop]` sifatida qaytaradi.

    `target[prop]` ga chaqiruv, `prop` getter bo'lganda, o'z kodini `this=target` kontekstida ishga tushiradi. Shuning uchun natija asl objekt `target`, ya'ni: `user` dan `this._name`.

Bunday vaziyatlarni tuzatish uchun bizga `get` trap ning uchinchi argumenti `receiver` kerak. U getter ga uzatiladigan to'g'ri `this` ni saqlaydi. Bizning holatimizda bu `admin`.

Getter uchun kontekstni qanday uzatish mumkin? Oddiy funktsiya uchun `call/apply` dan foydalanishimiz mumkin, lekin bu getter, u "chaqirilmaydi", faqat kiriladi.

`Reflect.get` buni qila oladi. Agar uni ishlatsak hamma narsa to'g'ri bo'ladi.

Mana tuzatilgan variant:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

Endi to'g'ri `this` ga (ya'ni `admin` ga) havola saqlaydigan `receiver` `(*)` qatorida `Reflect.get` yordamida getter ga uzatiladi.

Biz trap ni yanada qisqa yoza olamiz:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```

`Reflect` chaqiruvlari traplar bilan aynan bir xil nomlanadi va bir xil argumentlarni qabul qiladi. Ular aynan shu tarzda mo'ljallangan.

Shuning uchun, `return Reflect...` amallarni yo'naltirish uchun xavfsiz va hech narsani unutmasligimizni ta'minlovchi usul.

## Proxy cheklovlari

Proxylar mavjud objektlarning eng past darajadagi xatti-harakatlarini o'zgartirish yoki sozlash uchun noyob usul taqdim etadi. Shunga qaramay, u mukammal emas. Cheklovlar mavjud.

### O'rnatilgan objektlar: Ichki slotlar

Ko'plab o'rnatilgan objektlar, masalan `Map`, `Set`, `Date`, `Promise` va boshqalar "ichki slotlar" deb ataladigan narsalardan foydalanadi.

Bular xususiyatlarga o'xshash, lekin ichki, faqat spetsifikatsiya maqsadlari uchun ajratilgan. Masalan, `Map` elementlarni ichki slot `[[MapData]]` da saqlaydi. O'rnatilgan metodlar ularga `[[Get]]/[[Set]]` ichki metodlari orqali emas, to'g'ridan-to'g'ri kiradi. Shuning uchun `Proxy` buni tutib qola olmaydi.

Nega g'amxo'rlik? Ular baribir ichki!

Xo'sh, mana muammo. Bunday o'rnatilgan objekt proxy qilingandan keyin, proxy bu ichki slotlarga ega bo'lmaydi, shuning uchun o'rnatilgan metodlar ishlamaydi.

Masalan:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Xato
*/!*
```

Ichki tomondan `Map` barcha ma'lumotlarni o'zining `[[MapData]]` ichki slotida saqlaydi. Proxy bunday slotga ega emas. [O'rnatilgan `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) metodi ichki xususiyat `this.[[MapData]]` ga kirishga harakat qiladi, lekin `this=proxy` bo'lganligi sababli, uni `proxy` da topa olmaydi va shunchaki ishlamaydi.

Yaxshiyamki, buni tuzatish usuli bor:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (ishlaydi!)
```

Endi u yaxshi ishlaydi, chunki `get` trap funktsiya xususiyatlarini, masalan `map.set` ni, maqsadli objekt (`map`) ning o'ziga bog'laydi.

Oldingi misoldan farqli o'laroq, `proxy.set(...)` ichidagi `this` ning qiymati `proxy` emas, balki asl `map` bo'ladi. Shuning uchun `set` ning ichki implementatsiyasi `this.[[MapData]]` ichki slotiga kirishga harakat qilganda, u muvaffaqiyatli bo'ladi.

```smart header="`Array` da ichki slotlar yo'q"
Muhim istisno: o'rnatilgan `Array` ichki slotlardan foydalanmaydi. Bu tarixiy sabablarga ko'ra, chunki u juda uzoq vaqt oldin paydo bo'lgan.

Shuning uchun massivni proxy qilishda bunday muammo yo'q.
```

### Shaxsiy maydonlar

Shaxsiy klass maydonlari bilan ham xuddi shunday narsa sodir bo'ladi.

Masalan, `getName()` metodi shaxsiy `#name` xususiyatiga kiradi va proxy qilingandan keyin buziladi:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Xato
*/!*
```

Sababi shundaki, shaxsiy maydonlar ichki slotlar yordamida amalga oshiriladi. JavaScript ularga kirishda `[[Get]]/[[Set]]` dan foydalanmaydi.

`getName()` chaqiruvida `this` ning qiymati proxy qilingan `user` va unda shaxsiy maydonlar bilan slot yo'q.

Yana, metodlarni bog'lash bilan yechim ishlaydi:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```

Biroq yechimning kamchiliklari bor, avval tushuntirilganidek: u asl objektni metodga ochib beradi, potensial ravishda uni keyinchalik uzatishga va boshqa proxy qilingan funksionallikni buzishga imkon beradi.

### Proxy != target

Proxy va asl objekt turli objektlar. Bu tabiiy, to'g'rimi?

Shuning uchun agar biz asl objektni kalit sifatida ishlatsak va keyin uni proxy qilsak, proxy topilmaydi:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

Ko'rib turganingizdek, proxy qilgandan keyin biz `user` ni `allUsers` to'plamida topa olmaymiz, chunki proxy boshqa objekt.

```warn header="Proxylar qat'iy tenglik testini `===` tutib qola olmaydi"
Proxylar ko'plab operatorlarni tutib qolishi mumkin, masalan `new` (`construct` bilan), `in` (`has` bilan), `delete` (`deleteProperty` bilan) va hokazo.

Lekin objektlar uchun qat'iy tenglik testini tutib qolish usuli yo'q. Objekt faqat o'ziga qat'iy teng, boshqa hech qanday qiymatga emas.

Shuning uchun objektlarni tenglik uchun solishtiradigan barcha amallar va o'rnatilgan klasslar objekt va proxy o'rtasida farq qiladi. Shaffof almashtirish bu yerda yo'q.
```

## Bekor qilinadigan proxylar

*Bekor qilinadigan* proxy - bu o'chirib qo'yilishi mumkin bo'lgan proxy.

Aytaylik, bizda resurs bor va istalgan vaqtda unga kirishni yopmoqchimiz.

Biz uni hech qanday traplarsiz bekor qilinadigan proxyga o'rashimiz mumkin. Bunday proxy amallarni objektga yo'naltiradi va biz uni istalgan vaqtda o'chirib qo'yishimiz mumkin.

Sintaksis:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

Chaqiruv `proxy` va uni o'chirish uchun `revoke` funktsiyasi bilan objekt qaytaradi.

Mana misol:

```js run
let object = {
  data: "Qimmatli ma'lumot"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// proxy ni objekt o'rniga biror joyga uzatish...
alert(proxy.data); // Qimmatli ma'lumot

// keyinroq kodimizda
revoke();

// proxy endi ishlamaydi (bekor qilingan)
alert(proxy.data); // Xato
```

`revoke()` ga chaqiruv proxy dan maqsadli objektga barcha ichki havolalarni olib tashlaydi, shuning uchun ular endi bog'lanmagan.

Dastlab `revoke` `proxy` dan alohida, shuning uchun biz `proxy` ni aylanib o'tkazishimiz mumkin, `revoke` ni joriy doirada qoldirib.

Biz shuningdek `proxy.revoke = revoke` o'rnatish orqali `revoke` metodini proxy ga bog'lashimiz mumkin.

Boshqa variant - `proxy` ni kalit va tegishli `revoke` ni qiymat sifatida saqlaydigan `WeakMap` yaratish, bu proxy uchun `revoke` ni osongina topish imkonini beradi:

```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Qimmatli ma'lumot"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..kodimizning boshqa joyida..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Xato (bekor qilingan)
```

Biz bu yerda `Map` o'rniga `WeakMap` dan foydalanamiz, chunki u axlat yig'ishni to'sqinlik qilmaydi. Agar proxy objekti "yetib borilmaydigan" bo'lsa (masalan, hech qanday o'zgaruvchi unga havola qilmaydi), `WeakMap` uni bizga endi kerak bo'lmagan `revoke` bilan birga xotiradan o'chirishga imkon beradi.

## Havolalar

- Spetsifikatsiya: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](mdn:/JavaScript/Reference/Global_Objects/Proxy).

## Xulosa

`Proxy` - bu objekt atrofidagi wrapper bo'lib, undagi amallarni objektga yo'naltiradi, ixtiyoriy ravishda ulardan ba'zilarini tutib qoladi.

U har qanday turdagi objektni, jumladan klasslar va funktsiyalarni o'ray oladi.

Sintaksis:

```js
let proxy = new Proxy(target, {
  /* traplar */
});
```

...Keyin biz `target` o'rniga hamma joyda `proxy` dan foydalanishimiz kerak. Proxy ning o'z xususiyatlari yoki metodlari yo'q. Agar trap taqdim etilgan bo'lsa, u amallarni tutib qoladi, aks holda uni `target` objektiga yo'naltiradi.

Biz quyidagilarni tutib qolishimiz mumkin:
- Xususiyatni o'qish (`get`), yozish (`set`), o'chirish (`deleteProperty`) (hatto mavjud bo'lmagan).
- Funktsiyani chaqirish (`apply` trap).
- `new` operatori (`construct` trap).
- Ko'plab boshqa amallar (to'liq ro'yxat maqola boshida va [hujjatlarda](mdn:/JavaScript/Reference/Global_Objects/Proxy)).

Bu bizga "virtual" xususiyatlar va metodlar, standart qiymatlar, kuzatiladigan objektlar, funktsiya dekoratorlari va boshqa ko'p narsalarni yaratish imkonini beradi.

Shuningdek objektni turli jihatlarning funksionalligi bilan bezab, turli proxylarda bir necha marta o'rashimiz mumkin.

[Reflect](mdn:/JavaScript/Reference/Global_Objects/Reflect) API [Proxy](mdn:/JavaScript/Reference/Global_Objects/Proxy) ni to'ldirish uchun mo'ljallangan. Har qanday `Proxy` trap uchun bir xil argumentlar bilan `Reflect` chaqiruvi mavjud. Maqsadli objektlarga chaqiruvlarni yo'naltirish uchun ulardan foydalanishimiz kerak.

Proxylarning ba'zi cheklovlari bor:

- O'rnatilgan objektlarda "ichki slotlar" bor, ularga kirish proxy qilinmaydi. Yuqoridagi yechimni qarang.
- Xuddi shu narsa shaxsiy klass maydonlari uchun ham amal qiladi, chunki ular ichki tomondan slotlar yordamida amalga oshiriladi. Shuning uchun proxy qilingan metod chaqiruvlari ularga kirish uchun maqsadli objektga `this` sifatida ega bo'lishi kerak.
- Objekt tenglik testlari `===` tutib qolinmaydi.
- Ishlash: benchmarklar mexanizmga bog'liq, lekin odatda eng oddiy proxy yordamida xususiyatga kirish bir necha marta uzoqroq vaqt oladi. Amalda bu faqat ba'zi "bo'g'in" objektlari uchun muhim.
