libs:
  - lodash

---

# Currying

[Currying](https://en.wikipedia.org/wiki/Currying) - bu funktsiyalar bilan ishlashning ilg'or texnikasi. U nafaqat JavaScript da, balki boshqa tillarda ham qo'llaniladi.

Currying - bu funktsiyalarni o'zgartirish bo'lib, funktsiyani `f(a, b, c)` sifatida chaqiriladigan holatdan `f(a)(b)(c)` sifatida chaqiriladigan holga o'tkazadi.

Currying funktsiyani chaqirmaydi. U faqat uni o'zgartiradi.

Nima haqida gapirayotganimizni yaxshiroq tushunish uchun avval misolni ko'raylik, keyin amaliy dasturlarni.

Ikki argumentli `f` uchun currying bajaradigan yordamchi `curry(f)` funktsiyasini yaratamiz. Boshqacha qilib aytganda, ikki argumentli `f(a, b)` uchun `curry(f)` uni `f(a)(b)` sifatida ishlaydigan funktsiyaga aylantiradi:

```js run
*!*
function curry(f) { // curry(f) currying o'zgartirishini bajaradi
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

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

Ko'rib turganingizdek, amalga oshirish oddiy: bu faqat ikkita wrapper.

- `curry(func)` natijasi `function(a)` wrapperi.
- U `curriedSum(1)` kabi chaqirilganda, argument Leksik muhitda saqlanadi va yangi wrapper `function(b)` qaytariladi.
- Keyin bu wrapper `2` argumenti bilan chaqiriladi va u chaqiruvni asl `sum` ga o'tkazadi.

Currying ning rivojlangan implementatsiyalari, masalan lodash kutubxonasidan [_.curry](https://lodash.com/docs#curry), funktsiyani ham odatiy, ham qisman chaqirish imkonini beruvchi wrapper qaytaradi:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // lodash kutubxonasidan _.curry dan foydalanish

alert( curriedSum(1, 2) ); // 3, hali ham odatiy chaqiriladigan
alert( curriedSum(1)(2) ); // 3, qisman chaqirilgan
```

## Currying? Nima uchun?

Foydalari tushunish uchun bizga haqiqiy hayotdan munosib misol kerak.

Masalan, bizda ma'lumotni formatlash va chiqarish uchun `log(date, importance, message)` log funktsiyasi bor. Haqiqiy loyihalarda bunday funktsiyalar tarmoq orqali loglarni yuborish kabi ko'p foydali xususiyatlarga ega, bu yerda biz faqat `alert` dan foydalanamiz:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Uni curry qilaylik!

```js
log = _.curry(log);
```

Bundan keyin `log` odatiy ishlaydi:

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

...Lekin curry qilingan shaklda ham ishlaydi:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Endi joriy loglar uchun qulaylik funktsiyasini osonlik bilan yarata olamiz:

```js
// logNow - birinchi argumenti qo'zg'almas log qismi bo'ladi
let logNow = log(new Date());

// uni ishlatish
logNow("INFO", "message"); // [HH:mm] INFO message
```

Endi `logNow` - bu birinchi argumenti qo'zg'almas `log`, boshqacha qilib aytganda "qisman qo'llanilgan funktsiya" yoki qisqacha "partial".

Davom etib, joriy debug loglar uchun qulaylik funktsiyasini yarata olamiz:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

Shunday qilib:
1. Currying dan keyin hech narsani yo'qotmadik: `log` hali ham odatiy chaqiriladigan.
2. Bugungi loglar kabi partial funktsiyalarni osonlik bilan yarata olamiz.

## Rivojlangan curry implementatsiyasi

Agar tafsilotlarni bilishni xohlasangiz, yuqorida ishlatishimiz mumkin bo'lgan ko'p argumentli funktsiyalar uchun "rivojlangan" curry implementatsiyasi:

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

alert( curriedSum(1, 2, 3) ); // 6, hali ham odatiy chaqiriladigan
alert( curriedSum(1)(2,3) ); // 6, 1-argumentni curry qilish
alert( curriedSum(1)(2)(3) ); // 6, to'liq curry
```

Yangi `curry` murakkab ko'rinishi mumkin, lekin aslida tushunish oson.

`curry(func)` chaqiruvining natijasi shunday ko'rinadigan `curried` wrapperi:

```js
// func - o'zgartiriladigan funktsiya
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Uni ishga tushirganda, ikkita `if` bajarilish shoxchasi mavjud:

1. Agar uzatilgan `args` soni asl funktsiya ta'rifidagi (`func.length`) bilan bir xil yoki ko'p bo'lsa, u holda `func.apply` yordamida chaqiruvni unga o'tkazing.
2. Aks holda, partial oling: biz `func` ni hali chaqirmaymiz. Buning o'rniga, oldingi argumentlarni yangilari bilan birga taqdim etib, `curried` ni qayta qo'llaydigan boshqa wrapper qaytariladi.

Keyin, agar uni yana chaqirsak, yangi partial (agar argumentlar yetarli bo'lmasa) yoki nihoyat, natijani olamiz.

```smart header="Faqat qat'iy uzunlikdagi funktsiyalar"
Currying funktsiyaning qat'iy argumentlar soniga ega bo'lishini talab qiladi.

`f(...args)` kabi rest parametrlaridan foydalanadigan funktsiya bu usul bilan curry qilinmaydi.
```

```smart header="Currying dan biroz ko'proq"
Ta'rifga ko'ra, currying `sum(a, b, c)` ni `sum(a)(b)(c)` ga aylantirishi kerak.

Lekin JavaScript da currying ning aksariyat implementatsiyalari tasvirlangandek rivojlangan: ular funktsiyani ko'p argumentli variantda ham chaqiriladigan qilib saqlaydi.
```

## Xulosa

*Currying* - bu `f(a,b,c)` ni `f(a)(b)(c)` sifatida chaqiriladigan qiladigan o'zgartirish. JavaScript implementatsiyalari odatda funktsiyani ham odatiy chaqiriladigan qilib saqlaydi, ham argumentlar soni yetarli bo'lmasa partial qaytaradi.

Currying bizga partiallarni osonlik bilan olish imkonini beradi. Log misolida ko'rganimizdek, currying dan keyin uch argumentli universal `log(date, importance, message)` funktsiyasi bir argument bilan chaqirilganda (masalan `log(date)`) yoki ikki argument bilan (masalan `log(date, importance)`) bizga partiallar beradi.