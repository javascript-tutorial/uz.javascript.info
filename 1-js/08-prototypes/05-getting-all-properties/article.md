# Barcha xususiyatlarni olish

Obyektdan kalitlarni/qiymatlarni olishning ko'plab usullari mavjud.

Ularning aksariyati obyektning o'zida ishlaydi, prototipni hisobga olmaganda, keling ularni esga olamiz:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- sanab o'tiladigan o'z matnlar nomlari/qiymatlari/kalit-qiymat juftliklari massivini qaytaradi. Ushbu usullar faqat _sanab o'tiladigan_ xususiyatlarni va _matnlarni kalit sifatida_ ro'yxatini beradi.

Agar biz ramziy xususiyatlarni istasak:

- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- barcha o'ziga xos ramziy xususiyat nomlari massivini qaytaradi.

Agar biz sanab bo'lmaydigan xususiyatlarni xohlasak:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- o'zlarining barcha matn xususiyatlarining nomlarini qaytaradi.

Agar biz _barcha_ xususiyatlarni xohlasak:

- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- barcha mulk nomlari massivini qaytaradi.

Ushbu usullar ularning qaysi xususiyatlarini qaytarishi haqida bir oz farq qiladi, ammo ularning barchasi obyektning o'zida ishlaydi. Prototipdagi xususiyatlar ro'yxatga kiritilmagan.

## for..in tsikl

`for..in` tsikli boshqacha: u ham meros qilib olingan xususiyatlarni ko'rib chiqadi.

Masalan:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// faqat o'z kalitlari
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// meros kalitlari ham
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

Agar biz xohlamagan narsa bo'lsa va biz merosxo'rlik xususiyatlarini istisno qilmoqchi bo'lsak, o'rnatilgan usul mavjud [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): u `true` ni qaytaradi, agar `obj` o'ziga xos `key` nomli (merosxo'r bo'lmagan) xususiyatga ega bo'lsa.

Shunday qilib, biz meros qilib olingan xususiyatlarni filtrlashimiz mumkin (yoki ular bilan boshqa biror narsa qilishimiz mumkin):

```js run
let animal = {
  eats: true,
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);
  alert(`${prop}: ${isOwn}`); // jumps: true, then eats: false
}
```

Bu yerda bizda quyidagi meros zanjiri mavjud: `rabbit`, keyin `animal`, so'ngra `Object.prototype` (chunki `animal` literal obyekt `{...}`, shuning uchun u sukut bo'yicha) va keyin `null` yuqorida:

![](rabbit-animal-object.svg)

E'tibor bering, bitta kulgili narsa bor. `rabbit.hasOwnProperty` usuli qayerdan keladi? Zanjirga qarab, usul `Object.prototype.hasOwnProperty` tomonidan taqdim etilganligini ko'rishimiz mumkin. Boshqacha qilib aytganda, bu meros bo'lib qolgan.

...Lekin nima uchun `hasOwnProperty` ko'rinmaydi `for..in` tsikl, u barcha meros xususiyatlarini ro'yxatlar bo'lsa? Javob oddiy: uni sanab bo'lmaydi. Xuddi `Object.prototype` ning barcha boshqa xususiyatlari kabi. Shuning uchun ular ro'yxatga olinmagan.

## Xulosa

Aksariyat usullar meros qilib olingan xususiyatlarni e'tiborsiz qoldiradi, bundan tashqari `for..in` bundan mustasno.

Ikkinchisi uchun biz [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) dan foydalanishimiz mumkin: agar `obj` ning `key` nomli o'ziga xos (meros emas) xususiyati bo'lsa, u `true` ni qaytaradi.
