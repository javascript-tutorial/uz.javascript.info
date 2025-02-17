# Mahalliy prototiplar

`"prototype"` xususiyati JavaScript-ning o'zi tomonidan keng qo'llaniladi. Konstruktorning barcha funktsiyalari undan foydalanadi.

<<<<<<< HEAD
<<<<<<< HEAD
Avval oddiy narsalar uchun, keyin esa murakkab narsalar uchun qanday ekanligini bilib olamiz.
=======
First we'll see at the details, and then how to use it for adding new capabilities to built-in objects.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
First we'll look at the details, and then how to use it for adding new capabilities to built-in objects.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Object.prototype

Aytaylik, biz bo'sh obyektni chiqaramiz:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

`"[object Object]"` massivini yaratadigan kod qayerda? Bu o'rnatilgan `toString` usuli, ammo u qayerda? `Obj` bo'sh!

...Ammo `obj = {}` qisqa yozuvi `obj = new Object()` bilan bir xil, bu yerda `Object` o'rnatilgan konstruktor funktsiyasi bo'lib, o'zining `prototype` ga `toString` bilan va boshqa usullar bilan ulkan obyektga murojaat qiladi.

Mana nima bo'lmoqda:

![](object-prototype.svg)

`new Object()` deb nomlanganda (yoki `{...}` so'zma-so'z obyekti yaratiladi), uning `[[Prototype]]` biz muhokama qilgan qoidaga muvofiq `Object.prototype` ga o'rnatiladi oldingi bobda muhokama qilindi:

![](object-prototype-1.svg)

Shunday qilib, `obj.toString()` deb nomlanganda usul `Object.prototype` dan olinadi.

Buni quyidagicha tekshirishimiz mumkin:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

<<<<<<< HEAD
Iltimos, `Object.prototype` ustidagi zanjirda qo'shimcha `[[Prototype]]` mavjud emasligini unutmang:
=======
Please note that there is no more `[[Prototype]]` in the chain above `Object.prototype`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
alert(Object.prototype.__proto__); // null
```

## Boshqa o'rnatilgan prototiplar

`Array`, `Date`, `Function` va boshqa o'rnatilgan narsalar ham prototiplarda usullarni saqlaydi.

<<<<<<< HEAD
Masalan, `[1, 2, 3]` massivini yaratganimizda, ichidagi sukut bo'yicha yangi `new Array()` konstruktoridan foydalaniladi. Shunday qilib, massiv ma'lumotlari yangi obyektga yoziladi va `Array.prototype` uning prototipiga aylanadi va usullarni taqdim etadi. Bu juda samarali xotira.

Spetsifikatsiya bo'yicha, barcha o'rnatilgan prototiplarning yuqori qismida `Object.prototype` mavjud. Ba'zan odamlar "hamma narsa obyektlardan meros qilib oladi" deyishadi.
=======
For instance, when we create an array `[1, 2, 3]`, the default `new Array()` constructor is used internally. So `Array.prototype` becomes its prototype and provides methods. That's very memory-efficient.

By specification, all of the built-in prototypes have `Object.prototype` on the top. That's why some people say that "everything inherits from objects".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu yerda umumiy rasm (3 ta ichki o'rnatilgan bo'lishi uchun):

![](native-prototypes-classes.svg)

Keling, prototiplarni qo'lda tekshiramiz:

```js run
let arr = [1, 2, 3];

// u Array.prototype-dan meros qilib oladimi?
alert( arr.__proto__ === Array.prototype ); // true

// keyin Object.prototype danmi?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// va tepada null.
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Prototiplardagi ba'zi usullar bir-biriga to'g'ri kelishi mumkin, masalan, `Array.prototype` ning vergul bilan ajratilgan elementlarini sanab o'tadigan `toString` ga ega:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- Array.prototype.toString natijasi
```

Avval ko'rganimizdek, `Object.prototype` da `toString` mavjud, ammo `Array.prototype` zanjirda yaqinroq, shuning uchun massiv variantidan foydalaniladi.


![](native-prototypes-array-tostring.svg)


Chrome-ning dasturchi konsoliga o'xshash brauzer vositalari merosni ham ko'rsatadi (`console.dir` ichki obyektlar uchun ishlatilishi kerak bo'lishi mumkin):

![](console_dir_array.png)

Boshqa o'rnatilgan obyektlar ham xuddi shu tarzda ishlaydi. Hatto funktsiyalar -- ular o'rnatilgan `Function` konstruktorining obyektlari va ularning usullari (`call`/`apply` va boshqalar) `Function.prototype` dan olingan. Funksiyalarda o'ziga xos `toString` mavjud.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, obyektdan meros olish
```

## Primitivlar

Eng murakkab narsa matnlar, raqamlar va mantiqiy turdagi qiymatlar bilan sodir bo'ladi.

<<<<<<< HEAD
Esimizda bo'lganidek, ular obyekt emas. Ammo biz ularning xususiyatlariga kirishga harakat qilsak, u holda vaqtinchalik o'rash moslamalari o'rnatilgan `String`, `Number`, `Boolean` konstruktorlari yordamida yaratiladi, ular usullarni beradi va yo'qoladi.
=======
As we remember, they are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors `String`, `Number` and `Boolean`. They provide the methods and disappear.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ushbu obyektlar biz uchun ko'rinmas tarzda yaratilgan va aksariyat interpretatorlar ularni optimallashtiradi, ammo spetsifikatsiya uni aynan shu tarzda tasvirlaydi. Ushbu obyektlarning usullari `String.prototype`, `Number.prototype` va `Boolean.prototype` kabi prototiplarda mavjud.

<<<<<<< HEAD
```warn header="`null` va `undefined` qiymatlarida hech qanday moslama mavjud emas"
`null` va `undefined` maxsus qiymatlari ajralib turadi. Ularda obyekt o'ramlari yo'q, shuning uchun usullar va xususiyatlar ular uchun mavjud emas. Va tegishli prototiplar ham yo'q.
=======
```warn header="Values `null` and `undefined` have no object wrappers"
Special values `null` and `undefined` stand apart. They have no object wrappers, so methods and properties are not available for them. And there are no corresponding prototypes either.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## Mahalliy prototiplarni o'zgartirish

Mahalliy prototiplarni o'zgartirish mumkin. Masalan, `String.prototype` ga usul qo'shsak, u barcha matnlar uchun mavjud bo'ladi:

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

Rivojlanish jarayonida biz xohlagan yangi o'rnatilgan usullar haqida g'oyalarimiz bo'lishi mumkin va ularni mahalliy prototiplarga qo'shishni xohlashimiz mumkin. Ammo bu umuman yomon fikr.

```warn
<<<<<<< HEAD
Prototiplar globaldir, shuning uchun ziddiyatni topish oson. Agar ikkita kutubxona `String.prototype.show` usulini qo'shsa, ulardan biri boshqasining ustiga yoziladi.
=======
Prototypes are global, so it's easy to get a conflict. If two libraries add a method `String.prototype.show`, then one of them will be overwriting the method of the other.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, odatda, mahalliy prototipni o'zgartirish yomon fikr deb hisoblanadi.
```

**Zamonaviy dasturlashda mahalliy prototiplarni o'zgartirishni tasdiqlaydigan bitta holat mavjud. Bu juda ko'p to'ldirish.**

<<<<<<< HEAD
Polyfilling - bu JavaScript spetsifikatsiyasida mavjud bo'lgan, ammo hozirgi JavaScript interpretatori tomonidan qo'llab-quvvatlanmagan usulning o'rnini bosuvchi so'z.

Keyin biz uni qo'lda amalga oshirishimiz va u bilan o'rnatilgan prototipni to'ldirishimiz mumkin.
=======
Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.

We may then implement it manually and populate the built-in prototype with it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
if (!String.prototype.repeat) { // agar bunday usul bo'lmasa
  // uni prototipga qo'shing

  String.prototype.repeat = function(n) {
    // matni n marta takrorlang

    // aslida, kod bundan biroz murakkabroq bo'lishi kerak
    // (to'liq algoritm spetsifikatsiyada)
    // ammo hatto nomukammal polyfill ham ko'pincha yetarlicha yaxshi deb hisoblanadi
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## Prototiplardan qarz olish

<info:call-apply-decorators#method-loaning> bobida biz qarz olish usuli haqida suhbatlashdik.

Ana shunda biz bir obyektdan usul olib, boshqasiga ko'chiramiz.

Mahalliy prototiplarning ba'zi usullari ko'pincha qarzga olinadi.

<<<<<<< HEAD
Masalan, agar biz massivga-o'xshash obyekt qilsak, unga ba'zi bir massiv usullarni ko'chirishni xohlashimiz mumkin.
=======
For instance, if we're making an array-like object, we may want to copy some `Array` methods to it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Hello,world!
```

<<<<<<< HEAD
U ishlaydi, chunki o'rnatilgan `join` usulining ichki algoritmi faqat to'g'ri indekslar va `length` xususiyati haqida qayg'uradi, chunki bu obyekt haqiqatan ham massiv ekanligini tekshirmaydi. Va ko'plab o'rnatilgan usullar shunga o'xshashdir.
=======
It works because the internal algorithm of the built-in `join` method only cares about the correct indexes and the `length` property. It doesn't check if the object is indeed an array. Many built-in methods are like that.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Yana bir imkoniyat - `obj.__proto__` ni `Array.prototype` ga o'rnatish orqali meros olish, shunday qilib barcha `Array` usullari avtomatik ravishda `obj` da mavjud.

Ammo `obj` boshqa obyektdan meros bo'lib qolgan bo'lsa, bu mumkin emas. Esingizda bo'lsa, biz bir vaqtning o'zida faqat bitta obyektdan meros olishimiz mumkin.

<<<<<<< HEAD
Qarz olish usullari moslashuvchan, agar kerak bo'lsa, turli xil narsalardan funksionallikni aralashtirishga imkon beradi.
=======
Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
- Barcha o'rnatilgan obyektlar bir xil shablonga amal qiladi:
    - Usullar prototipda saqlanadi (`Array.prototype`, `Object.prototype`, `Date.prototype`).
    - Obyektning o'zi faqat ma'lumotlarni saqlaydi (massiv elementlari, obyekt xususiyatlari, sana).
- Ibtidoiy usullar o'rash moslamalari prototiplarida ham saqlanadi: `Number.prototype`, `String.prototype`, `Boolean.prototype`. Faqat `undefined` va `null` da o'rash moslamalari yo'q.
- O'rnatilgan prototiplarni o'zgartirish yoki yangi usullar bilan to'ldirish mumkin. Ammo ularni o'zgartirish tavsiya etilmaydi. Ehtimol, bu faqat bitta ruxsat etilgan sabab - biz yangi standartni qo'shganimizda, ammo hali JavaScript-ni interpretatorda tomonidan qo'llab-quvvatlanmaganimizda.
=======
- All built-in objects follow the same pattern:
    - The methods are stored in the prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - The object itself stores only the data (array items, object properties, the date)
- Primitives also store methods in prototypes of wrapper objects: `Number.prototype`, `String.prototype` and `Boolean.prototype`. Only `undefined` and `null` do not have wrapper objects
- Built-in prototypes can be modified or populated with new methods. But it's not recommended to change them. The only allowable case is probably when we add-in a new standard, but it's not yet supported by the JavaScript engine
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
