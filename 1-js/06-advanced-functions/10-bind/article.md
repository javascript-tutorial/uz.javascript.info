libs:
  - lodash

---

# Funktsiyani bog'lash

Obyekt usullari bilan `setTimeout` dan foydalanishda ma'lum bir muammo yuzaga keladi: "`this` ni yo'qotish".

To'satdan, `this` to'g'ri ishlashni to'xtatadi. Vaziyat yangi boshlanuvchilar uchun odatiy holdir, ammo tajribali dasturchilar bilan ham sodir bo'ladi.

## "this" ni yo'qotish

Biz allaqachon bilamizki, JavaScript-da `this` ni yo'qotish oson. Biror usulni obyektdan alohida joyga o'tkazgandan so'ng - `this` yo'qoladi.

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

Brauzer ichidagi `setTimeout` usuli biroz o'ziga xos: funktsiya chaqiruvi uchun `this=window` ni o'rnatadi (Node.js uchun `this` taymer obyekti bo'ladi, lekin bu yerda muhim emas). Shunday qilib `this.firstName` uchun u mavjud bo'lmagan `window.firstName` ni olishga harakat qiladi. Ko'rganimiz kabi boshqa shunga o'xshash holatlarda odatda `this` `undefined` bo'ladi.

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

// ...1 soniya ichida
user = { sayHi() { alert("setTimeout-da boshqa foydalanuvchi!"); } };

// setTimeout-da boshqa foydalanuvchi?!?
```

Keyingi yechim bunday narsa bo'lmasligini kafolatlaydi.

## Yechim 2: bind

Funksiyalar `this` ni o'rnatishga imkon beradigan o'rnatilgan [bind](mdn:js/Function/bind) usulini taqdim etadi.

Asosiy sintaksis:

```js
// murakkabroq sintaksis biroz keyinroq bo'ladi
let boundFunc = func.bind(context);
````

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

sayHi(); // Salom, John!

setTimeout(sayHi, 1000); // Salom, John!
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

say("Salom"); // Salom, John ("Salom" say ga bog'landi)
say("Hayir"); // Hayir, John ("Hayir" say ga bog'landi)
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

JavaScript kutubxonalari, shuningdek, qulay ommaviy biriktirish uchun funktsiyalarni taqdim etadi, masalan, [_.bindAll(obj)](http://lodash.com/docs#bindAll) lodash-da.
````

## Xulosa

`func.bind(context, ... args)` usuli `this` kontekstni tuzatuvchi va berilgan bo'lsa, birinchi argumentlarni `func` funktsiyasining "bog'langan variantini" qaytaradi.

Odatda biz `this` ni biron bir joyga o'tkazib yuborishimiz uchun `bind` ni obyekt usulida tuzatish uchun qo'llaymiz. Masalan, `setTimeout` ga. Zamonaviy dasturlashda `bog'lash` uchun ko'proq sabablar bor, biz ularni keyinroq uchratamiz.
