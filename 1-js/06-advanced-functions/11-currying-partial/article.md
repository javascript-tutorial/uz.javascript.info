libs:
  - lodash

---

# Qismalar

Hozirga qadar biz faqat `this` ni bog'lash haqida gaplashib kelmoqdamiz. Keling, yana bir qadam tashlaymiz.

Biz nafaqat `this` ni, balki argumentlarni ham bog'lashimiz mumkin. Bu kamdan-kam hollarda amalga oshiriladi, lekin ba'zida qulay bo'lishi mumkin.

`bind` ning to'liq sintaksisi:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

Bu kontekstni `this` va funktsiyalarning boshlang'ich argumentlari sifatida bog'lashga imkon beradi.

Masalan, bizda `mul(a, b)` ko'paytma funktsiyasi mavjud:

```js
function mul(a, b) {
  return a * b;
}
```

Uning asosida `double` funktsiyasini yaratish uchun `bind` dan foydalanamiz:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

`mul.bind(null, 2)` ga chaqiruv `mul` ga o'tuvchi yangi `double` funktsiyasini yaratadi, kontekst sifatida `null` ni va `2` ni birinchi argument sifatida belgilaydi. Boshqa argumentlar "boricha" o'tkaziladi.

Bu [qisman funktsional dastur](https://en.wikipedia.org/wiki/Partial_application) deb nomlanadi -- biz mavjud bo'lgan parametrlarning bir qismini tuzatish orqali yangi funktsiya yaratamiz.

Iltimos, e'tibor bering, biz bu erda `this` ni ishlatmaymiz. Ammo `bind` buni talab qiladi, shuning uchun biz `null` ga o'xshash narsalarni qo'yishimiz kerak.

Quyidagi koddagi `triple` funktsiyasi bu qiymatni uch baravar oshiradi:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Nima uchun biz odatda qisman funktsiyani yaratamiz?

Buning foydasi shundaki, biz o'qilishi mumkin bo'lgan nom bilan mustaqil funktsiyani yaratishimiz mumkin (`double`, `triple`). Biz uni ishlata olamiz va har safar birinchi argumentni keltirmaymiz, chunki u "bind" bilan o'rnatiladi.

Boshqa hollarda, qisman dastur juda umumiy funktsiyaga ega bo'lganimizda va qulayligi uchun unchalik universal bo'lmagan variantni xohlaganimizda foydalidir.

Masalan, bizda `send(from, to, text)` funksiyasi mavjud. Keyin, `user` obyekti ichida uning qisman variantini ishlatishni xohlashimiz mumkin: joriy foydalanuvchidan yuboradigan `sendTo(to, text)`.

## Kontekstsiz qisman o'tish

Agar biz ba'zi argumentlarni tuzatishni xohlasak, lekin `this` ni bog'lamasak nima bo'ladi?

`bind` bunga yo'l qo'ymaydi. Biz shunchaki kontekstni qoldirib, argumentlarga o'tishimiz mumkin emas.

Yaxshiyamki, faqat argumentlarni bog'lash uchun `qisman` funktsiyani osongina amalga oshirish mumkin.

Shunga o'xshash:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Foydalanish:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// birinchi argumentni tuzatish orqali hozir biron bir narsani aytadigan qisman usulni qo'shing
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Salom");
// Shunga o'xshash narsa:
// [10:00] John: Salom!
```

`partial(func[, arg1, arg2...])` chaqiruvining natijasi `func` ni quyidagicha chaqiradigan `(*)` to'plamidir:
- Xuddi shu `this` mavjud (`user.sayNow` uchun `user` ni chaqiring)
- Keyin unga `...argsBound` beradi - `qisman` chaqiruvdan argumentlar (`"10:00"`)
- Keyin uni qaytaradi `...args` - o'ramga(wrapper) berilgan argumentlar (`"Salom"`)

Buni tarqatish operatori bilan bajarish juda oson, shunday emasmi?

Shuningdek, lodash kutubxonasidan tayyor [_.partial](https://lodash.com/docs#partial) dastur mavjud.

## Currying

Ba'zan odamlar yuqorida aytib o'tilgan qisman funktsiyani "currying" deb nomlangan boshqa narsa bilan aralashtiradilar. Bu yerda funktsiyalar bilan ishlashning yana bir qiziqarli uslubi, biz bu yerda eslatib o'tamiz.

[Currying](https://en.wikipedia.org/wiki/Currying) - bu `f(a, b, c)` deb chaqiriladigan funktsiyadan `f(a)(b)(c)` ga aylantirish. JavaScript-da, biz asl funktsiyani saqlab qolish uchun odatda o'ramni yaratamiz.

Currying funktsiyani chaqirmaydi. Bu shunchaki uni o'zgartiradi.

Keling, ikkita argumentli `f` uchun currying-ni bajaradigan yordamchi `curry(f)` funktsiyasini yarataylik. Boshqacha qilib aytganda,`curry(f)` ikki argumentli `f(a, b)` `f(a)(b)` ga aylantiradi

```js run
*!*
function curry(f) { // curry(f) currying o'zgartiradi
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// foydalanish
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```

Ko'rib turganingizdek, amalga oshirish - bu bir qator o'ramalar.

- `curry(func)` natijasi `function(a)` o'ralmasini hosil qiladi.
- U `sum(1)` kabi chaqirilganda, argument leksik muhitda saqlanadi va yangi o'rash `function(b)`qaytariladi.
- So'ngra `sum(1)(2)` nihoyat `2` ni ta'minlaydigan `function(b)` ni chaqiradi va u chaqiruvni asl ko'p argumentli `sum` ga o'tkazadi.

Lodash kutubxonasidan [_.curry](https://lodash.com/docs#curry) kabi currying-ni yanada takomillashtirilgan dasturlari yanada murakkabroq narsani amalga oshiradi. Ular barcha argumentlar keltirilganda funktsiyani normal ravishda chaqirishga imkon beradigan o'ramni qaytaradi *yoki* aks holda qisman qaytaradi.

```js
function curry(f) {
  return function(...args) {
    // agar args.length == f.length (f qancha argument bo'lsa),
    //   keyin chaqiruvni f ga o'tkazadi
    // aks holda argumentlarni birinchi argument sifatida tuzatadigan qisman funktsiyani qaytaradi
  };
}
```

## Currying? Nima uchun?

Imtiyozlarni tushunish uchun, albatta, munosib hayotiy misol kerak.

Kengaytirilgan currying funktsiyani odatdagi va qisman chaqiruv qilish imkoniyatini beradi.

Masalan, biz ma'lumotni formatlaydigan va chiqaradigan `log(date, importance, message)` logga yozish funktsiyasiga egamiz. Haqiqiy loyihalarda bunday funktsiyalar, shuningdek, tarmoq orqali loglarni yuborish kabi ko'plab boshqa foydali xususiyatlarga ega:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Keling, buni curry chiqaylik!

```js
log = _.curry(log);
```

Shundan so'ng `log` hali ham normal ishlaydi:

```js
log(new Date(), "DEBUG", "some debug");
```

...Ammo, shuningdek, curry shaklida ham chaqirilishi mumkin:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Bugungi logglar uchun qulaylik funktsiyasini olaylik:

```js
// todayLog will be the partial of log with fixed first argument
let todayLog = log(new Date());

// use it
todayLog("INFO", "message"); // [HH:mm] INFO message
```

Va bugungi koddagi nosozliklarni tuzatish xabarlari uchun qulaylik vazifasi:

```js
let todayDebug = todayLog("DEBUG");

todayDebug("message"); // [HH:mm] DEBUG message
```

Shunday qilib:
1. Currying keyin biz hech narsani yo'qotmadik: `log` odatdagidek chaqiriladi.
2. Bugungi logglar kabi qisman funktsiyalarni yaratishga muvaffaq bo'ldik.

## Curry-ni takomillashtirish

Agar tafsilotlarni bilmoqchi bo'lsangiz (majburiy emas!), Mana yuqorida ishlatishimiz mumkin bo'lgan "ilg'or" curry dasturini taklif qilamiz.

Bu juda qisqa:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Foydalanish misollari:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, hali ham odatdagidek chaqiruv qilish mumkin
alert( curriedSum(1)(2,3) ); // 6, currying 1 chi argumentni
alert( curriedSum(1)(2)(3) ); // 6, to'la currying
```

Yangi `curry` murakkab ko'rinishi mumkin, ammo aslida uni tushunish oson.

`curry(func)` natijasi quyidagicha ko'rinadigan `curried` o'ramidir:

```js
// func konvertatsiya qilish funktsiyasi
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Biz uni bajarganimizda, ikkita stsenariy mavjud:

1. Hozir chaqiruv qiling: agar o'tgan `args` soni asl funktsiya (`func.length`) funktsiyasida bir xil bo'lsa yoki undan ko'p bo'lsa, shunchaki chaqiruvni unga o'tkazing.
2. Qismanni oling: aks holda, `func` hali chaqirilmagan. Buning o'rniga, avvalgi argumentlarni yangilari bilan birgalikda taqdim etgan `curried` ni qayta ishlatadigan yana bir `pass` qaytariladi. Keyin yana yangi chaqiruvda biz yana qisman (agar yetarli argument bo'lmasa) yoki natijada natijani olamiz.

Masalan, `sum(a, b, c)` misolida nima bo'lishini ko'rib chiqamiz. Uchta argument, shuning uchun `sum.length = 3`.

`curried(1)(2)(3)` chaqiruvi uchun:

1. Birinchi chaqiruv `curried(1)` leksik muhitda `1` ni eslaydi va `pass` o'ramasini qaytaradi.
2. `pass` o'ramasi `(2)` bilan chaqiriladi: u oldingi argumentlarni (`1`) oladi, ularni `(2)` bilan birlashtiradi va `curried(1, 2)` ni ular bilan birga chaqiradi.

    Argumentlar soni hali 3 dan kam bo'lganligi sababli, `curry` `pass` ni qaytaradi.
3. `pass` o'ramasi yana `(3)` bilan chaqiriladi, chunki keyingi chaqiruv `pass(3)` oldingi argumentlarni (`1`, `2`) oladi va ularga `3` qo'shib, chaqiruvni `curried(1, 2, 3)` qiladi - nihoyat `3` argumentlari bor, ular asl funktsiyaga qaytarilgan.

Agar bu hali ham aniq bo'lmasa, chaqiruvlar ketma-ketligini yodda yoki qog'ozda kuzatib boring.

```smart header="Faqatgina belgilangan uzunlikdagi funktsiyalar"
Currying funktsiyadan ma'lum bir aniq sonli argumentga ega bo'lishini talab qiladi.
```

```smart header="Currying-dan ko'ra biroz ko'proq"
Ta'rifga ko'ra, currying `sum(a, b, c)` ni `sum(a)(b)(c)` ga aylantirishi kerak.

Ammo JavaScript-dagi currying dasturlarining aksariyati ta'riflanganidek rivojlangan: ular funktsiyani ko'p argumentli variantda ham chaqirish mumkin.
```

## Xulosa

- Mavjud funktsiyani ba'zi argumentlarini tuzatsak, natijada (kamroq universal) funktsiya *qisman* deb nomlanadi. Qisman olish uchun `bind` dan foydalanishimiz mumkin, ammo boshqa usullar ham mavjud.

    Biz bir xil argumentni qayta-qayta takrorlashni xohlamasak, qismlar qulay. Agar bizda `send(from, to)` funktsiyasi mavjud bo'lsa va `from` har doim bizning vazifamiz uchun bir xil bo'lishi kerak bo'lsa, biz qismanni olamiz va shu bilan davom etamiz.

- *Currying* - bu `f(a,b,c)` ni `f(a)(b)(c)` deb chaqiradigan konvertatsiya. JavaScript dasturlari odatda funktsiyani odatdagidek chaqiradi va agar argumentlar soni yetarli bo'lmasa, qisman qaytaradi.

    Currying biz oson qismlarni xohlaganimizda juda yaxshi. Log misolida ko'rganimizdek: `log(date)` yoki ikkita argument `log(date, importance)` kabi bitta argument bilan chaqirilganda universal `log(date, importance, message)` funktsiyasi bizga qisman beradi.
