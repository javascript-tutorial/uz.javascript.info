
# Prototip usullari, objects without __proto__

Ushbu bo'limning birinchi bobida biz prototipni o'rnatish uchun zamonaviy usullar mavjudligini eslatib o'tdik.

`__proto__` biroz eskirgan hisoblanadi (JavaScript standartining faqat brauzer qismida).

Zamonaviy usullar:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- `proto` `[[Prototype]]` va ixtiyoriy xususiyat tavsiflovchilari sifatida bo'sh obyektni yaratadi.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- `obj` ning `[[Prototype]]` ni qaytaradi.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- `obj` ning `[[Prototype]]` ni `proto` ga o'rnatadi.

Ular `__proto__` o'rniga ishlatilishi kerak.

Masalan:

```js run
let animal = {
  eats: true
};

// prototip sifatida animal bilan yangi obyekt yaratish
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true
*!*
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit-ni prototipini olish
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // rabbit prototipini {} ga o'zgartirish
*/!*
```

`Object.create` ixtiyoriy ikkinchi argumentga ega: xususiyat tavsiflovchilari. U yerda yangi obyektga qo'shimcha xususiyatlarni taqdim etishimiz mumkin, masalan:

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

Deskriptorlar <info:property-descriptors> bobida tasvirlanganidek bir xil formatda bo'ladi.

Obyektni klonlashni `for..in` da nusxalash xususiyatlaridan ko'ra kuchliroq bajarish uchun `Object.create` dan foydalanishimiz mumkin:

```js
// obj ning to'liq bir xil sayoz kloni
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Ushbu chaqiruv `obj` ning barcha nusxalarini, shu jumladan, barcha xususiyatlarni: ro'yxatga olinadigan va sanab bo'lmaydigan ma'lumotlarni, ma'lumotlar xususiyatlarini va getter/setter-larni -- hamma narsani va `[[Prototype]]` huquqini oladi.

## Qisqa tarix

Agar biz `[[Prototype]]` ni boshqarishning barcha usullarini hisoblasak, juda ko'p narsa bor! Buni bajarishning ko'plab usullari mavjud!

Nega shunday?

Bu tarixiy sabablarga ko'ra.

- Konstruktor funktsiyasining `"prototype"` xususiyati juda qadim zamonlardan beri ishlaydi.
- Keyinchalik 2012 yilda: `Object.create` standartda paydo bo'ldi. Bu berilgan prototip bilan obyekt yaratishga imkon berdi, lekin uni olishga/o'rnatishga imkon bermadi. Shunday qilib brauzerlar istalgan vaqtda prototipni olish/o'rnatishga imkon beradigan nostandart `__proto__` kiruvchini qo'lladilar.
- Keyinchalik 2015 yilda: `Object.setPrototypeOf` va `Object.getPrototypeOf` standartga qo'shildi. `__proto__` hamma joyda amalga oshirildi, shuning uchun brauzerdan tashqari muhit uchun ixtiyoriy bo'lgan standartning B ilovasiga yo'l oldi.

Hozirda bizda bu usullarning barchasi bizning ixtiyorimizda.

Nima uchun `__proto__` funktsiyalar bilan almashtirildi? Bu qiziq savol, bizdan nima uchun `__proto__` yomon ekanligini tushunishni talab qiladi. Javobni olish uchun o'qing.

```warn header="Tezlik muhim bo'lmasa, `[[Prototype]]` ni qayta tiklamang"
Texnik jihatdan `[[Prototype]]` ni istalgan vaqtda olishimiz/o'rnatishimiz mumkin. Ammo, odatda, biz uni obyektni yaratish vaqtida faqat bir marta o'rnatamiz, keyin o'zgartirmaymiz: `rabbit` `animal` dan meros bo'lib qoladi va bu o'zgarmaydi.

Va JavaScript interpretatori bunga juda moslashtirilgan. `Object.setPrototypeOf` yoki `obj.__proto__=` bilan prototipni "bajarilish paytida" o'zgartirish juda sekin operatsiya bo'lib, u obyekt xususiyatlariga kirish operatsiyalari uchun ichki optimallashtirishni buzadi. Agar nima qilayotganingizni bilmasangiz yoki JavaScript-ning tezligi umuman siz uchun ahamiyatli bo'lmasa, unda bundan qochib qutuling.
```

## "Juda oddiy" obyektlar

Ma'lumki, obyektlar kalit/qiymat juftligini saqlash uchun assotsiativ massiv sifatida ishlatilishi mumkin.

...Ammo unda *foydalanuvchi tomonidan taqdim etilgan* kalitlarni saqlashga harakat qilsak (masalan, foydalanuvchi tomonidan kiritilgan lug'at), biz qiziqarli nosozlikni ko'rishimiz mumkin: `"__proto__"` dan tashqari barcha kalitlar yaxshi ishlaydi.

Misolni tekshiring:

```js run
let obj = {};

let key = prompt("Kalit nima??", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], not "some value"!
```

Agar foydalanuvchi `__proto__` ni yozsa, tayinlash e'tiborga olinmaydi!

Bu bizni ajablantirmasligi kerak. `__proto__` xususiyati alohida: u obyekt yoki `null` bo'lishi kerak, matn prototipga aylana olmaydi.

Ammo biz bunday xatti-harakatni amalga oshirishni *xohlamaymiz*, to'g'rimi? Biz kalit/qiymat juftlarini saqlamoqchimiz, va `"__proto__"` nomli kalit to'g'ri saqlanmadi. Demak bu xato!

Bu yerda yakunalar dahshatli emas. Ammo boshqa hollarda prototip haqiqatan ham o'zgartirilishi mumkin, shuning uchun ijro umuman kutilmagan yo'llar bilan noto'g'ri ketishi mumkin.

Eng yomoni -- odatda ishlab chiquvchilar bunday imkoniyat haqida umuman o'ylamaydilar. Bu bunday xatolarni sezishni qiyinlashtiradi va hatto ularni zaif tomonlarga aylantiradi, ayniqsa JavaScript server tomonida ishlatilganda.

`toString` xususiyatiga kirishda kutilmagan holatlar yuz berishi mumkin -- bu sukut bo'yicha funktsiya va boshqa o'rnatilgan xususiyatlar.

Muammodan qanday qochish kerak?

Birinchidan, biz `Map` dan foydalanishga o'tishimiz mumkin, keyin hamma narsa yaxshi.

Ammo `Object` ham bu yerda bizga yaxshi xizmat qilishi mumkin, chunki til yaratuvchilari bu muammo haqida juda oldin o'ylab ko'rishgan.

`__proto__` bu obyektning xususiyati emas, balki `Object.prototype` ga kiruvchi xususiyatdir:

![](object-prototype-2.svg)

Shunday qilib, agar `obj.__proto__` o'qilgan yoki o'rnatilgan bo'lsa, mos keladigan getter/setter uning prototipidan chaqiriladi va u oladi/o'rnatadi `[[Prototype]]`.

Ushbu o'quv bo'limining boshida aytilganidek: `__proto__` bu `[[Prototype]]` ga kirishning bir usuli, bu `[[Prototype]]` ning o'zi emas.

Endi biz obyektni assotsiativ massiv sifatida ishlatmoqchi bo'lsak, buni biroz hiyla bilan amalga oshirishimiz mumkin:

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("Kalit nima??", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` prototipsiz bo'sh obyektni yaratadi (`[[Prototype]]` `null`):

![](object-prototype-null.svg)

Shunday qilib, `__proto__` uchun getter/setter yo'q. Endi u odatdagi ma'lumotlar xususiyati sifatida qayta ishlanadi, shuning uchun yuqoridagi misol to'g'ri ishlaydi.

Bunday obyektni "juda oddiy" yoki "sof lug'at obyektlari" deb atashimiz mumkin, chunki ular oddiy obyektga qaraganda oddiyroq `{...}`.

Salbiy tomoni shundaki, bunday obyektlarda o'rnatilgan obyekt usullari mavjud emas, masalan, `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...Ammo bu odatda assotsiativ massivlar uchun yaxshi.

Iltimos, e'tibor bering, obyekt bilan bog'liq usullarning aksariyati `Object.something(...)`, masalan `Object.keys(obj)` - ular prototipda yo'q, shuning uchun ular bunday obyektlarda ishlashni davom ettiradi:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Xulosa

Prototipni o'rnatish va to'g'ridan-to'g'ri kirish uchun zamonaviy usullar:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- `[[Prototype]]` (`null` bo'lishi mumkin) sifatida berilgan `proto` va ixtiyoriy xususiyatlar deskriptokrlari bilan bo'sh obyektni yaratadi.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj` ning `[[Prototype]]` ni qaytaradi (`__proto__` getter bilan bir xil).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj` ning `[[Prototype]]` ni `proto` ga o'rnatadi (`__proto__` o'rnatuvchisi bilan bir xil).

Obyektga foydalanuvchi tomonidan yaratilgan kalitlarni qo'yishni xohlasak, o'rnatilgan `__proto__` getter/setter xavfli. Agar foydalanuvchi kalit sifatida `__proto__` ni kiritishi mumkinligi sababli, umid qilamanki oson, ammo umuman kutilmagan oqibatlarga olib keladigan xato bo'ladi.

Shunday qilib, biz "juda oddiy" obyektni yaratish uchun `Object.create(null)` dan foydalanishingiz yoki `__proto__` holda yoki `Map` moslamalarini qo'llashimiz mumkin.

Shuningdek, `Object.create` obyektni barcha tavsiflovchilar bilan sayoz nusxalashning oson usulini taqdim etadi:

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```


- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- sanab o'tiladigan o'z massiv nomlari/qiymatlari/kalit-qiymat juftliklari massivini qaytaradi.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- barcha o'ziga xos ramziy xususiyat nomlari massivini qaytaradi.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- o'zlarining barcha matn xususiyatlarining nomlarini qaytaradi.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- barcha mulk nomlari massivini qaytaradi.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): agar `obj` ning `key` nomli o'ziga xos (merosxo'r bo'lmagan) xususiyati bo'lsa, u `true` ni qaytaradi.

Shuningdek, biz `__proto__` - bu `[[Prototype]]` uchun getter/setter ekanligini va boshqa usullar singari `Object.prototype` da joylashganligini ham aniqladik.

Biz `Object.create(null)` prototipisiz obyektni yaratishimiz mumkin. Bunday obyektlar "sof lug'atlar" sifatida ishlatiladi, ularning kalitlari sifatida `"__proto __"` bilan bog'liq muammolar yo'q.

Obyekt xususiyatlarini qaytaradigan barcha usullar (`Object.keys` va boshqalar kabi) - "o'z" xususiyatlarini qaytaradi. Agar biz merosxo'rlarni xohlasak, unda `for..in` dan foydalanishimiz mumkin.
