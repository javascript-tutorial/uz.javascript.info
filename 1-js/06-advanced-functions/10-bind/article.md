libs:
  - lodash

---

# Funktsiyani bog'lash

<<<<<<< HEAD
Obyekt usullari bilan `setTimeout` dan foydalanishda ma'lum bir muammo yuzaga keladi: "`this` ni yo'qotish".

To'satdan, `this` to'g'ri ishlashni to'xtatadi. Vaziyat yangi boshlanuvchilar uchun odatiy holdir, ammo tajribali dasturchilar bilan ham sodir bo'ladi.
=======
When passing object methods as callbacks, for instance to `setTimeout`, there's a known problem: "losing `this`".

In this chapter we'll see the ways to fix it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## "this" ni yo'qotish

<<<<<<< HEAD
Biz allaqachon bilamizki, JavaScript-da `this` ni yo'qotish oson. Biror usulni obyektdan alohida joyga o'tkazgandan so'ng - `this` yo'qoladi.
=======
We've already seen examples of losing `this`. Once a method is passed somewhere separately from the object -- `this` is lost.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu `setTimeout` bilan qanday sodir bo'lishi mumkin:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Salom, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Salom, undefined!
*/!*
```

Ko'rib turganimizdek, chiqishda "John" `this.firstName` emas, balki `undefined` ko'rsatilgan!

Buning sababi, `setTimeout` obyektdan alohida `user.sayHi` funktsiyasini olgan. Oxirgi satrni quyidagicha yozish mumkin:

```js
let f = user.sayHi;
setTimeout(f, 1000); // yo'qolgan foydalanuvchi konteksti
```

<<<<<<< HEAD
Brauzer ichidagi `setTimeout` usuli biroz o'ziga xos: funktsiya chaqiruvi uchun `this=window` ni o'rnatadi (Node.js uchun `this` taymer obyekti bo'ladi, lekin bu yerda muhim emas). Shunday qilib `this.firstName` uchun u mavjud bo'lmagan `window.firstName` ni olishga harakat qiladi. Ko'rganimiz kabi boshqa shunga o'xshash holatlarda odatda `this` `undefined` bo'ladi.
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Vazifa odatiy holdir -- biz obyekt usulini boshqa joyda (bu yerda -- rejalashtiruvchiga) chaqirishni xohlaymiz. Qanday qilib to'g'ri kontekstda chaqirilishiga ishonch hosil qilish kerak?

## Yechim 1: o'ralgan funktsiya

Oddiy yechim - o'ralgan funktsiyasidan foydalanish:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Salom, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Salom, John!
}, 1000);
*/!*
```

Endi u ishlaydi, chunki u `user` ni tashqi leksik muhitdan oladi va keyin odatdagi usulni chaqiradi.

Xuddi shu, ammo qisqaroq:

```js
setTimeout(() => user.sayHi(), 1000); // Salom, John!
```

Yaxshi ko'rinadi, lekin bizning kod tuzilishimizda biroz zaiflik paydo bo'ladi.

`setTimeout` ishga tushirilgunga qadar nima sodir bo'ladi (kechikish bir soniya!) o'zgaruvchan `user` boshqa qiymatga ega bo'ladimi? Keyin, to'satdan, u noto'g'ri obyektni chaqiradi!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Salom, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

<<<<<<< HEAD
// ...1 soniya ichida
user = { sayHi() { alert("setTimeout-da boshqa foydalanuvchi!"); } };

// setTimeout-da boshqa foydalanuvchi?!?
=======
// ...the value of user changes within 1 second
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Keyingi yechim bunday narsa bo'lmasligini kafolatlaydi.

## Yechim 2: bind

Funksiyalar `this` ni o'rnatishga imkon beradigan o'rnatilgan [bind](mdn:js/Function/bind) usulini taqdim etadi.

Asosiy sintaksis:

```js
<<<<<<< HEAD
// murakkabroq sintaksis biroz keyinroq bo'ladi
=======
// more complex syntax will come a little later
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let boundFunc = func.bind(context);
```

`func.bind(context)` ning natijasi funktsiya sifatida chaqiriladigan va shaffof ravishda `func` sozlamasini `this=context` ga o'tkazadigan "ekzotik obyekt" funktsiyasiga o'xshash.

Boshqa so'zlar bilan aytganda, `boundFunc` chaqiruvi sobit `this` bilan `func` chaqiruviga o'xshaydi.

Masalan, bu erda `funcUser` chaqiruvni `func` ga `this=user` bilan amalga oshiradi:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Bu yerda `func.bind(user)` `func` ning "bog'langan varianti" sifatida, sobit `this=user` bilan.

Barcha argumentlar asl `func` ga uzatiladi, masalan:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// this ni user ga bog'lash
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Salom, John ("Salom" argumenti berilgan va this=user)
*/!*
```

Endi obyekt usuli bilan sinab ko'raylik:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Salom, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

<<<<<<< HEAD
sayHi(); // Salom, John!

setTimeout(sayHi, 1000); // Salom, John!
=======
// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

`(*)` satrida biz `user.sayHi` usulini qo'llaymiz va uni `user` bilan bog'laymiz. `sayHi` - bu "bog'langan" funktsiya, uni yakka o'zi chaqirish yoki `setTimeout` ga o'tkazish mumkin -- bu muhim emas, kontekst to'g'ri bo'ladi.

Bu yerda argumentlar "boricha" berilganligini ko'rishimiz mumkin, faqat `this` `bind` bilan o'rnatiladi:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

<<<<<<< HEAD
say("Salom"); // Salom, John ("Salom" say ga bog'landi)
say("Hayir"); // Hayir, John ("Hayir" say ga bog'landi)
=======
say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

````smart header="Qulaylik usuli: `bindAll`"
Agar obyekt juda ko'p usullarga ega bo'lsa va biz uni faol ravishda uzatishni rejalashtirmoqchi bo'lsak, unda biz ularni barchasini tsiklda birlashtirib bog'lashimiz mumkin:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

<<<<<<< HEAD
<<<<<<< HEAD
JavaScript kutubxonalari, shuningdek, qulay ommaviy biriktirish uchun funktsiyalarni taqdim etadi, masalan, [_.bindAll(obj)](http://lodash.com/docs#bindAll) lodash-da.
````

## Xulosa
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) in lodash.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
````

## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function `double` on its base:

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

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

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

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`func.bind(context, ... args)` usuli `this` kontekstni tuzatuvchi va berilgan bo'lsa, birinchi argumentlarni `func` funktsiyasining "bog'langan variantini" qaytaradi.

<<<<<<< HEAD
Odatda biz `this` ni biron bir joyga o'tkazib yuborishimiz uchun `bind` ni obyekt usulida tuzatish uchun qo'llaymiz. Masalan, `setTimeout` ga. Zamonaviy dasturlashda `bog'lash` uchun ko'proq sabablar bor, biz ularni keyinroq uchratamiz.
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
