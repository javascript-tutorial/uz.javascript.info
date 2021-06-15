# Dekorativlar va ekspeditorlik, call/apply
.
JavaScript funktsiyalar bilan ishlashda ajoyib moslashuvchanlikni beradi. Ularni aylanib o'tish, obyektlar sifatida ishlatish mumkin va endi biz ular o'rtasida chaqiruvlarni *oldinga yo'naltirish* va ularni qanday *bezashni* ko'rib chiqamiz.

## Shaffof keshlash

Aytaylik, bizda protsessor og'ir bo'lgan `slow(x)` funktsiyasi mavjud, ammo natijalari barqaror. Boshqacha qilib aytganda, xuddi shu `x` uchun u har doim bir xil natijani beradi.

Agar funktsiya tez-tez chaqirilsa, biz qayta hisoblash uchun qo'shimcha vaqt sarflamaslik uchun har xil `x` natijalarini keshlashni (eslashni) xohlashimiz mumkin.

<<<<<<< HEAD
Ammo bu funktsiyani `slow()` ga qo'shish o'rniga biz o'ramni yaratamiz. Ko'rib turganimizdek, buni amalga oshirishning foydalari juda ko'p.

Mana kod va tushuntirishlar quyidagicha:
=======
If the function is called often, we may want to cache (remember) the results to avoid spending extra-time on recalculations.

But instead of adding that functionality into `slow()` we'll create a wrapper function, that adds caching. As we'll see, there are many benefits of doing so.

Here's the code, and explanations follow:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function slow(x) {
  // bu erda og'ir CPU talab qiladigan ish bo'lishi mumkin
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
<<<<<<< HEAD
    if (cache.has(x)) { // agar natija xaritada bo'lsa
      return cache.get(x); // qaytaradi
    }

    let result = func(x); // aks holda funktsiyani chaqiradi

    cache.set(x, result); // va natijani keshlaydi (eslab qolish)
=======
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    return result;
  };
}

slow = cachingDecorator(slow);

<<<<<<< HEAD
alert( slow(1) ); // slow(1) keshlangan
alert( "Again: " + slow(1) ); // xuddi shu

alert( slow(2) ); // slow(2) keshlangan
alert( "Again: " + slow(2) ); // oldingi satr bilan bir xil
=======
alert( slow(1) ); // slow(1) is cached and the result returned
alert( "Again: " + slow(1) ); // slow(1) result returned from cache

alert( slow(2) ); // slow(2) is cached and the result returned
alert( "Again: " + slow(2) ); // slow(2) result returned from cache
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Yuqoridagi kodda `cachingDecorator` *dekorativ*: boshqa funktsiyani bajaradigan va uning xatti-harakatlarini o'zgartiradigan maxsus funktsiya.

G'oya shundan iboratki, biz har qanday funktsiya uchun `cachingDecorator` ni chaqira olamiz va u keshlash o'ramani qaytaradi. Bu juda yaxshi, chunki bizda bunday funktsiyani ishlatishi mumkin bo'lgan juda ko'p funktsiyalar mavjud va biz ularga faqat `cachingDecorator` dasturini qo'llashimiz kerak.

Keshlashni asosiy funktsiya kodidan ajratib, biz ham asosiy kodni soddalashtiramiz.

<<<<<<< HEAD
Endi uning qanday ishlashi haqida batafsil ma'lumotga ega bo'laylik.

`cachingDecorator(func)` ning natijasi "wrapper": `function(x)`, `func(x)` chaqiruvini keshlash mantig'iga "o'rab" oladi:

![](decorator-makecaching-wrapper.svg)

Ko'rib turganimizdek, o'rash `func(x)` natijasini "boricha" qaytaradi. Tashqi koddan o'ralgan `slow` funktsiyasi hanuzgacha xuddi shunday ishlaydi. Uning xatti-harakatlariga keshlash xususiyati qo'shildi.
=======
The result of `cachingDecorator(func)` is a "wrapper": `function(x)` that "wraps" the call of `func(x)` into caching logic:

![](decorator-makecaching-wrapper.svg)

From an outside code, the wrapped `slow` function still does the same. It just got a caching aspect added to its behavior.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Xulosa qilib aytganda, `slow` ning kodini o'zgartirish o'rniga alohida `cachingDecorator` dan foydalanishning bir qancha afzalliklari bor:

<<<<<<< HEAD
- `cachingDecorator` qayta ishlatilishi mumkin. Biz uni boshqa funktsiyaga qo'llashimiz mumkin.
- Keshlash mantig'i alohida, u `slow` ning murakkabligini oshirmadi (agar mavjud bo'lsa).
- Agar kerak bo'lsa, biz bir nechta dekorativlarni birlashtira olamiz (boshqa dekorativlar ergashadilar).


## Kontekst uchun "func.call" dan foydalanish
=======
- The `cachingDecorator` is reusable. We can apply it to another function.
- The caching logic is separate, it did not increase the complexity of `slow` itself (if there was any).
- We can combine multiple decorators if needed (other decorators will follow).

## Using "func.call" for the context
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Yuqorida aytib o'tilgan keshlash dekorativi obyekt usullari bilan ishlashga mos kelmaydi.

Masalan, quyidagi ishchi kodida `worker.slow()` dekorativ keyin ishlashni to'xtatadi:

```js run
// biz worker.slow keshlash qilamiz
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
<<<<<<< HEAD
    // aslida, bu yerda CPU uchun juda og'ir vazifa bo'lishi mumkin
=======
    // scary CPU-heavy task here  
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// oldingi kod bilan bir xil
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // original usul ishlaydi

worker.slow = cachingDecorator(worker.slow); // endi uni keshlashni amalga oshiring

*!*
alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
*/!*
```

Xato `this.someMethod` ga kirishga harakat qiladigan `(*)` satrida paydo bo'ladi va ishlamayapti. Nega tushunyapsizmi?

Sababi shundaki, o'ram asl funktsiyani `(**)` satrida `func(x)` deb chaqiradi. Va shunga o'xshash chaqirilganda funktsiya `this = undefined` bo'ladi.

Agar biz bajarishga harakat qilsak, shunga o'xshash alomatni kuzatardik:

```js
let func = worker.slow;
func(2);
```

Shunday qilib, o'rash chaqiruvni asl usulga o'tkazadi, ammo `this` kontekstisiz. Shuning uchun xato.

Keling, buni tuzataylik.

Maxsus o'rnatilgan funktsiya usuli [func.call(kontekst, ... args)](mdn:js/Function/call), bu funktsiyani `this` ni aniq belgilab qo'yishga imkon beradi.

Sintaksis:

```js
func.call(context, arg1, arg2, ...)
```

Birinchi argumentni `this`, keyingisini esa argument sifatida taqdim etadigan `func` ishlaydi.

Oddiy qilib aytganda, ushbu ikkita chaqiruvlar deyarli bir xil:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Ularning ikkalasi ham `1`, `2` va `3` argumentlari bilan `func` ni chaqirishadi. Faqatgina farq shundaki, `func.call` `this` ni `obj` ga o'rnatadi.

Masalan, quyidagi kodda biz `sayHi` ni turli xil obyektlar tarkibida chaqiramiz: `sayHi.call(user)` `sayHi` ni `this=user` ni ta'minlaydi va keyingi satrda `this=admin` o'rnatiladi:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

<<<<<<< HEAD
// turli xil obyektlarni "this" sifatida o'tkazish uchun chaqiruvdan foydalaning
sayHi.call( user ); // this = John
sayHi.call( admin ); // this = Admin
=======
// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Va bu yerda biz `call` quyidagi kontekst va iboralar bilan `say` ga chaqiruv qilish uchun ishlatamiz:

```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user "this" "Salom" birinchi argumentga aylanadi
say.call( user, "Salom" ); // John: Salom
```

<<<<<<< HEAD

Bizning holatimizda kontekstni asl funktsiyaga o'tkazish uchun biz `call` dan foydalanishingiz mumkin:
=======
In our case, we can use `call` in the wrapper to pass the context to the original function:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // "this" hozir to'g'ri uzatildi
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // endi uni keshlashni amalga oshiring

alert( worker.slow(2) ); // ishlaydi
alert( worker.slow(2) ); // ishlaydi, asl nusxasini chaqirmaydi (keshlangan)
```

Endi hamma narsa yaxshi.

Barchasini aniq qilish uchun keling, `this` qanday o'tishini chuqurroq ko'rib chiqaylik:

1. Dekorativdan so'ng `worker.slow` endi `function (x) { ... }`.
2. Shunday qilib, `worker.slow(2)` bajarilganda, o'ram argument sifatida `2` va `this = worker` bo'ladi (bu nuqta oldidagi obyekt).
3. O'rama ichida, natija hali keshlanmagan deb faraz qilsak, `func.call(this, x)` joriy `this` (`= worker`) va joriy argumentni (`= 2`) asl usulga o'tkazadi.

<<<<<<< HEAD
## "func.apply" bilan ko'p argumentlarga o'tish
=======
## Going multi-argument
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Endi `cachingDecorator` ni yanada universal qilaylik. Hozirgacha u faqat bitta argumentli funktsiyalar bilan ishlaydi.

Endi multi-argumentli `worker.slow` usulini qanday keshlash mumkin?

```js
let worker = {
  slow(min, max) {
    return min + max; // qo'rqinchli CPU ga qabul qilinadi
  }
};

// bir xil argumentli chaqiruvlarni eslab qolishi kerak
worker.slow = cachingDecorator(worker.slow);
```

<<<<<<< HEAD
Bu yerda ikkita vazifani hal qilishimiz kerak.

Birinchidan, `min` va `max` ikkala argumentni `cache` xaritasidagi kalit uchun qanday ishlatish kerakligi. Ilgari, bitta `x` argumenti uchun biz natijani saqlash uchun `cache.set(x, result)` va uni olish uchun `cache.get(x)` Ammo endi *argumentlarning kombinatsiyasi* `(min, max)` uchun natijani eslashimiz kerak. Mahalliy `Map` yagona kalitni faqat kalit sifatida qabul qiladi.
=======
Previously, for a single argument `x` we could just `cache.set(x, result)` to save the result and `cache.get(x)` to retrieve it. But now we need to remember the result for a *combination of arguments* `(min,max)`. The native `Map` takes single value only as the key.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ko'plab yechimlar mavjud:

1. Ko'p qirrali va ko'p kalitlarga imkon beradigan yangi (yoki uchinchi tomonlardan foydalangan holda) xaritaga o'xshash ma'lumotlar tuzilishini amalga oshiring.
2. Ichki xaritalardan foydalaning: `cache.set(min)` juftlikni saqlaydigan `Map` bo'ladi `(max, natija)`. Shunday qilib biz `result` ni `cache.get(min).get(max)` sifatida olishimiz mumkin.
3. Ikkita qiymatni biriga qo'shib qo'ying. Bizning alohida holatimizda biz `Map` kalit sifatida `min, max` matnidan foydalanishimiz mumkin. Moslashuvchanlik uchun biz dekorativ *hash funktsiyasini* taqdim etishimiz mumkin, bu ko'pchilikdan bitta qiymatni qanday yaratishni biladi.

<<<<<<< HEAD

Ko'pgina amaliy dasturlar uchun 3-variant yetarli darajada yaxshi, shuning uchun biz unga rioya qilamiz.

Yechish kerak bo'lgan ikkinchi vazifa - ko'plab funktsiyalarni `func` ga qanday o'tkazish. Hozirda `function(x)` bitta argumentni qabul qiladi va `func.call(this, x)` uni o'tkazadi.

Bu yerda biz boshqa o'rnatilgan usuldan foydalanishingiz mumkin [func.apply](mdn:js/Function/apply).

Sintaksis:

```js
func.apply(context, args)
```

U argumentlar ro'yxati sifatida `func` sozlamasini `this=context` va massivga-o'xshash obyekt `args` dan foydalanadi.


Masalan, ushbu ikkita chaqiruv deyarli bir xil:

```js
func(1, 2, 3);
func.apply(context, [1, 2, 3])
```

Ikkalasi ham `1,2,3` argumentlarini beradigan `func` ishlaydi. Ammo `apply` shuningdek `this=context` ni o'rnatadi.

Masalan, bu yerda `say` argumentlar ro'yxati sifatida `this = user` va `messageData` bilan chaqiriladi:

```js run
function say(time, phrase) {
  alert(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: "John" };

let messageData = ['10:00', 'Salom']; // vaqt va iboraga aylanadi

*!*
// foydalanuvchi shunday bo'ladi, messageData argumentlar ro'yxati (vaqt, ibora) sifatida qabul qilinadi
say.apply(user, messageData); // [10:00] John: Salom (this=user)
*/!*
```

`call` va `apply` o'rtasidagi yagona sintaksis farqi shundaki, `call` argumentlar ro'yxatini kutadi, `apply` esa ular massivga-o'xshash obyektni oladi.

Biz qatorni (yoki istalgan takrorlanadigan) argumentlar ro'yxati sifatida o'tkaza oladigan <info:rest-parametrlari-spread-operator> bobidan `...` tarqatish operatorini allaqachon bilamiz. Shunday qilib, biz uni `call` bilan ishlatsak, deyarli `apply` bilan bir xil natijalarga erishishimiz mumkin.

Ushbu ikkita chaqiruv deyarli teng:

```js
let args = [1, 2, 3];

*!*
func.call(context, ...args); // massivga tarqatish operatori bilan ro'yxat sifatida o'tkazing
func.apply(context, args);   // murojaat qilish bilan bir xil
*/!*
```

Agar batafsilroq ko'rib chiqadigan bo'lsak, `call` va `apply` ning bunday ishlatilishi o'rtasida ozgina farq bor.

- `...` tarqatish operatori chaqiriladigan ro'yxat sifatida *iterable* `args` larni o'tkazishga imkon beradi.
- `apply` faqat *massivga-o'xshash* `args` larni qabul qiladi.

Demak, bu chaqiruvlar bir-birini to'ldiradi. Qayerda takrorlanadiganni kutsak, `call` ishlaydi, qayerda biz massivga-o'xshaganni kutsak, `apply` ishlaydi.

Va agar `args` takrorlanadigan va massivga-o'xshash bo'lsa, masalan, haqiqiy massiv, biz texnik jihatdan ulardan har qandayidan foydalanishimiz mumkin, ammo `apply` tezroq bo'ladi, chunki bu bitta operatsiya. JavaScript-ning aksariyat interpretatorlari uni  `call + spread` juftligidan ko'ra yaxshiroq optimallashtiradi.

`apply` ning eng muhim usullaridan biri bu chaqiruvni boshqa funktsiyaga o'tkazishdir, masalan:

```js
let wrapper = function() {
  return anotherFunction.apply(this, arguments);
};
```

Bu *chaqiruvni yo'naltirish* deb nomlanadi. `wrapper` har bir narsani oladi: `this` kontekstini va argumentlarni `anotherFunction` ga qaytaradi va natijasini qaytaradi.

Tashqi kod bunday `wrapper` chaqirganda, uni asl funktsiya chaqiruvidan ajratib bo'lmaydi.

Keling, barchasini yanada kuchliroq `cachingDecorator` da bajaraylik:
=======
For many practical applications, the 3rd variant is good enough, so we'll stick to it.

Also we need to pass not just `x`, but all arguments in `func.call`. Let's recall that in a `function()` we can get a pseudo-array of its arguments as `arguments`, so `func.call(this, x)` should be replaced with `func.call(this, ...arguments)`.

Here's a more powerful `cachingDecorator`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // ishlaydi
alert( "Again " + worker.slow(3, 5) ); // bir xil (keshlangan)
```

<<<<<<< HEAD
Endi o'rash har qanday sonli argumentlar bilan ishlaydi.
=======
Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ikki o'zgarish mavjud:

<<<<<<< HEAD
- `(*)` satrida `argumentlardan` bitta kalit yaratish uchun `hash` chaqiriladi. Bu yerda biz "qo'shilish" funktsiyasidan foydalanamiz, bu `(3, 5)` argumentlarini `"3,5"` kalitiga aylantiradi. Keyinchalik murakkab holatlarda boshqa xeshlash funktsiyalari talab qilinishi mumkin.
- So'ngra `(**)` dastlabki funktsiyaga (qancha bo'lishidan qat'iy nazar) kontekstni va barcha argumentlarni o'tkazish uchun `func.apply` dan foydalanadi.
=======
- In the line `(*)` it calls `hash` to create a single key from `arguments`. Here we use a simple "joining" function that turns arguments `(3, 5)` into the key `"3,5"`. More complex cases may require other hashing functions.
- Then `(**)` uses `func.call(this, ...arguments)` to pass both the context and all arguments the wrapper got (not just the first one) to the original function.

## func.apply

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](mdn:js/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args);
func.apply(context, args);
```

They perform the same call of `func` with given context and arguments.

There's only a subtle difference regarding `args`:

- The spread syntax `...` allows to pass *iterable* `args` as the list to `call`.
- The `apply` accepts only *array-like* `args`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

...And for objects that are both iterable and array-like, such as a real array, we can use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called *call forwarding*.

That's the simplest form of it:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.

## Qarz olish usuli

Endi xeshlash funktsiyasida yana bir kichik yaxshilanishni amalga oshiramiz:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

Hozirga kelib, u faqat ikkita argument asosida ishlaydi. Agar u biron bir sonni `args` ni yopishtirsa yaxshi bo'lar edi.

Tabiiy yechim [arr.join](mdn:js/Array/join) usulidan foydalanish bo'ladi:

```js
function hash(args) {
  return args.join();
}
```

<<<<<<< HEAD
...Afsuski, bu ishlamaydi. Biz `hash(argumentlar)` va `argumentlar` obyekti deb nomlanayotganimiz uchun ham takrorlanadigan, ham massivga-o'xshash, ammo haqiqiy massiv emas.
=======
...Unfortunately, that won't work. Because we are calling `hash(arguments)`, and `arguments` object is both iterable and array-like, but not a real array.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, `join` ni chaqirish muvaffaqiyatsiz tugadi, biz quyida ko'rib turganimizdek:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

Shunga qaramay, massiv qo'shilishidan foydalanishning oson usuli mavjud:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

Bu hiyla *usulni qarzga olish* deb nomlanadi.

<<<<<<< HEAD
Biz oddiy massivda qo'shilish usulini olamiz (qarzga olamiz) `[].join`. Va uni `argumentlar` kontekstida ishlatish uchun `[].join.call` dan foydalanamiz.
=======
We take (borrow) a join method from a regular array (`[].join`) and use `[].join.call` to run it in the context of `arguments`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Nima uchun u ishlaydi?

Bu chunki, `arr.join(glue)` mahalliy usulining ichki algoritmi juda oddiy.

Spetsifikatsiyadan deyarli "boricha" olingan:

1. Birinchi argument `glue` bo'lsin, agar argument bo'lmasa, keyin `","` vergul bo'lsin.
2. `result` bo'sh matn bo'lsin.
3. `this[0]` ni `result` ga qo'shib qo'ying.
4. `glue` va `this[1]` qo'shing.
5. `glue` va `this[2]` qo'shing.
6. ...Buni `this.length` elementlari yopishtirilguncha bajaring.
7. `result` ni qaytaring.

Shunday qilib, texnik jihatdan bu `this` ni oladi va `this[0]`, `this[1]` ... va boshqalarni birlashtiradi. Bu ataylab har qanday massivga-o'xshash tarzda yozilgan (bu tasodif emas, ko'plab usullar ushbu amaliyotga amal qiladi). Shuning uchun u `this = arguments` bilan ham ishlaydi.

<<<<<<< HEAD
## Xulosa
=======
## Decorators and function properties

It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like `func.calledCount` or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

E.g. in the example above if `slow` function had any properties on it, then `cachingDecorator(slow)` is a wrapper without them.

Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function. We'll discuss it later in the article <info:proxy#proxy-apply>.

## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

*Decorator* - bu uning xatti-harakatlarini o'zgartiradigan funktsiya atrofidagi o'rash. Asosiy ish hali ham funktsiya tomonidan amalga oshiriladi.

<<<<<<< HEAD
Odatda, funktsiyani yoki usulni bezatilgan bilan almashtirish xavfsizdir, faqat bitta kichik narsa bundan mustasno. Agar asl funktsiya funktsiyalariga ega bo'lsa, masalan, `func.calledCount` yoki boshqa narsalar bo'lsa, bezatilgan narsalar ularni ta'minlamaydi. Chunki bu o'ram. Shunday qilib, ulardan biri foydalansa, ehtiyot bo'lish kerak. Ba'zi dekorativlar o'zlarining xususiyatlarini taqdim etadilar.

Dekorativlarni funktsiyaga qo'shilishi mumkin bo'lgan "xususiyatlar" yoki "jihatlar" sifatida qarash mumkin. Biz ularni bir yoki ko'p qo'shishimiz mumkin. Va bularning barchasi uning kodini o'zgartirmasdan!
=======
Decorators can be seen as "features" or "aspects" that can be added to a function. We can add one or add many. And all this without changing its code!
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`cachingDecorator` ni amalga oshirish uchun biz quyidagi usullarni o'rganib chiqdik:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- berilgan kontekst va argumentlar bilan `func` ni chaqiradi.
- [func.apply(context, args)](mdn:js/Function/apply) -- argumentlar ro'yxatiga `kontekstni` `this` va massivga-o'xshash `args` larni o'tkazadigan `funktsiyani` chaqiradi.

Umumiy *chaqiruvni yo'naltirish* odatda `apply` bilan amalga oshiriladi:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

<<<<<<< HEAD
Shuningdek, biz obyektdan usul olib, uni boshqa obyekt kontekstida "chaqirish" paytida *usulni qarzga olish* misolini ko'rdik. Massiv usullarini qo'llash va ularni argumentlarga qo'llash odatiy holdir. Shu bilan bir massivda, haqiqiy massiv bo'lgan qoldiq parametrlari obyektidan foydalanish.
=======
We also saw an example of *method borrowing* when we take a method from an object and `call` it in the context of another object. It is quite common to take array methods and apply them to `arguments`. The alternative is to use rest parameters object that is a real array.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

U yerda yovvoyi tabiatda ko'plab dekorativlar mavjud. Ushbu bobning vazifalarini hal qilish orqali ularni qanchalik yaxshi egallaganingizni tekshiring.
