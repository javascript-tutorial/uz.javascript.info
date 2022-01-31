
# Va'dalar zanjiri

<<<<<<< HEAD
<info:callbacks> bobida aytib o'tilgan muammoga qaytaylik: bizda birin-ketin bajariladigan asinxron vazifalar ketma-ketligi mavjud. Masalan, skriptlarni yuklash. Qanday qilib biz uni yaxshi kodlashimiz mumkin?
=======
Let's return to the problem mentioned in the chapter <info:callbacks>: we have a sequence of asynchronous tasks to be performed one after another — for instance, loading scripts. How can we code it well?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buning uchun va'dalar bir nechta retseptlarni taqdim etadi.

Ushbu bobda biz va'da zanjirini yoritamiz.

Bu shunday ko'rinadi:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

G'oya shundan iboratki, natija `.then` ishlovchilar zanjiri orqali o'tadi.

<<<<<<< HEAD
Mana oqim:
1. Dastlabki va'da 1 soniyada hal qilinadi `(*)`,
2. Keyin `.then` ishlov beruvchisi `(**)` chaqiriladi.
3. Qaytgan qiymat keyingi `.then` ishlov beruvchiga `(***)` uzatiladi
4. ...va hokazo.
=======
Here the flow is:
1. The initial promise resolves in 1 second `(*)`,
2. Then the `.then` handler is called `(**)`, which in turn creates a new promise (resolved with `2` value).
3. The next `then` `(***)` gets the result of the previous one, processes it (doubles) and passes it to the next handler.
4. ...and so on.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

Natijada ishlovchilar zanjiri bo'ylab uzatilganda biz `alert` chaqiruvlari ketma-ketligini ko'rishimiz mumkin: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

<<<<<<< HEAD
Hammasi ishlaydi, chunki `promise.then` degan chaqiriq va'dani qaytaradi, shunda biz keyingi `.then` ni chaqira olamiz.
=======
The whole thing works, because every call to a `.then` returns a new promise, so that we can call the next `.then` on it.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

Qayta ishlovchi qiymatni qaytarganda, bu va'daning natijasi bo'ladi, shuning uchun keyingi `.then` u bilan chaqiriladi.

<<<<<<< HEAD
Ushbu so'zlarni aniqroq qilish uchun, mana zanjirning boshlanishi:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result);
  return result * 2; // <-- (1)

}) // <-- (2)
// .then…
```

`.then` tomonidan qaytarilgan qiymat va'da, shuning uchun biz `(2)` da yana bir `.then` qo'sha olamiz. Qiymat `(1)` ga qaytarilganda, bu va'da hal qilinadi, shuning uchun keyingi ishlov beruvchi qiymat bilan ishlaydi.

**Klassik yangilar xatosi: texnik jihatdan biz bitta va'daga ko'p `.then` qo'sha olamiz. Bu zanjir emas.**
=======
**A classic newbie error: technically we can also add many `.then` to a single promise. This is not chaining.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

<<<<<<< HEAD
Bu yerda qilgan narsamiz bu bitta va'daga bir nechta ishlovchilar qo'yganimiz. Ular natijani bir-biriga yetkazishmaydi, aksincha uni mustaqil ravishda qayta ishlashadi.
=======
What we did here is just several handlers to one promise. They don't pass the result to each other; instead they process it independently.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Mana rasm (yuqoridagi zanjir bilan taqqoslang):

![](promise-then-many.svg)

Barchasi `.then`, bitta va'da bo'yicha bir xil natijaga erishiladi - bu va'da natijasi. Shunday qilib, yuqoridagi kodda `alert` bir xil bo'ladi: `1`.

Amalda biz kamdan-kam hollarda bitta va'da uchun bir nechta ishlov beruvchiga muhtojmiz. Zanjirlash juda tez-tez ishlatiladi.

## Va'dalarni qaytarish

<<<<<<< HEAD
Odatda, `.then` ishlov beruvchisi tomonidan qaytarilgan qiymat darhol keyingi ishlov beruvchiga uzatiladi. Ammo istisno mavjud.

Agar qaytarib berilgan qiymat va'da bo'lsa, unda keyingi ijro to'xtaguncha to'xtatiladi. Shundan so'ng, ushbu va'daning natijasi keyingi `.then` ishlov beruvchiga beriladi.
=======
A handler, used in `.then(handler)` may create and return a promise.

In that case further handlers wait until it settles, and then get its result.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

<<<<<<< HEAD
<<<<<<< HEAD
Bu yerda birinchi `.then` `1` `(*)` satrida `new Promise(…)` ni qaytaradi. Bir soniyadan so'ng u hal bo'ladi va natija (`resolve` argumenti, bu yerda `result*2`) `(**)` satridagi ikkinchi `.then` ishlov beruvchiga uzatiladi. Bu `2` ni ko'rsatadi va xuddi shu narsani qiladi.

Shunday qilib, chiqish yana 1 -> 2 -> 4 ni tashkil qiladi, ammo endi `alert` chaqiruvlari o'rtasida 1 soniya kechikish mavjud.
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to the handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

So the output is the same as in the previous example: 1 -> 2 -> 4, but now with 1 second delay between `alert` calls.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Va'dalarni qaytarish bizga asinxron harakatlar zanjirlarini yaratishga imkon beradi.

## Misol: loadScript

<<<<<<< HEAD
Skriptlarni navbatma-navbat yuklash uchun ushbu funktsiyani `loadScript` bilan ishlatamiz:
=======
Let's use this feature with the promisified `loadScript`, defined in the [previous chapter](info:promise-basics#loadscript), to load scripts one by one, in sequence:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // skriptlarda e'lon qilingan funktsiyalardan foydalaning
    // haqiqatan ham yuklanganligini ko'rsatish uchun
    one();
    two();
    three();
  });
```

Ushbu kod o'q funktsiyalari bilan biroz qisqartirilishi mumkin:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // skriptlar yuklangan, biz u erda e'lon qilingan funktsiyalardan foydalanishimiz mumkin
    one();
    two();
    three();
  });
```


Bu yerda har bir `loadScript` chaqiruvi va'da qaytaradi va keyingi `.then` hal bo'lganda ishlaydi. So'ng u keyingi skriptni yuklashni boshlaydi. Shunday qilib, skriptlar birin-ketin yuklanadi.

<<<<<<< HEAD
Biz zanjirga ko'proq asinxron harakatlarni qo'shishimiz mumkin. Iltimos, unutmangki, kod hali ham "tekis" bo'lib, u o'ngga emas, pastga qarab o'sadi. "Halokat piramidasi" ning alomatlari yo'q.

Iltimos, shuni e'tiborga olingki, texnik jihatdan biz har bir `loadScript` ga to'g'ridan-to'g'ri `.then` qo'sha olamiz:
=======
We can add more asynchronous actions to the chain. Please note that the code is still "flat" — it grows down, not to the right. There are no signs of the "pyramid of doom".

Technically, we could add `.then` directly to each `loadScript`, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // bu funktsiya script1, script2 va script3 o'zgaruvchanlarga kirish huquqiga ega
      one();
      two();
      three();
    });
  });
});
```

Ushbu kod ham xuddi shunday: 3 ta skriptni ketma-ket yuklaydi. Ammo u "o'ng tomonga o'sadi". Shunday qilib, biz chaqiruvlarni qaytarish bilan bir xil muammolarga duch kelamiz.

Va'dalardan foydalanishni boshlagan odamlar ba'zida zanjirlash haqida bilishmaydi, shuning uchun ular shunday yozadilar. Odatda, zanjirlash afzaldir.

Ba'zan to'g'ridan-to'g'ri `.then` yozish yaxshi bo'ladi, chunki ichki funktsiya tashqi doiraga kirish huquqiga ega. Yuqoridagi misolda eng uyali qayta chaqirish `skript1`, `skript2`, `skript3` barcha o'zgaruvchanlariga kirish huquqiga ega. Ammo bu qoidadan ko'ra istisno.


````smart header="Thenables"
<<<<<<< HEAD
Aniqroq qilib aytganda, `.then` tasodifiy "thenable" obyektni qaytarishi mumkin va unga va'da kabi munosabatda bo'lishadi.

"Thenable" obyekt `.then` usuli bo'lgan har qanday obyekt.

Ushbu g'oya shundan iboratki, uchinchi tomon kutubxonalari o'zlariga tegishli "va'dalarga mos" obyektlarni amalga oshirishi mumkin. Ular kengaytirilgan usullar to'plamiga ega bo'lishi mumkin, shuningdek, mahalliy va'dalarga mos kelishi mumkin, chunki ular `.then` ni amalga oshiradilar.
=======
To be precise, a handler may return not exactly a promise, but a so-called "thenable" object - an arbitrary object that has a method `.then`. It will be treated the same way as a promise.

The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own. They can have an extended set of methods, but also be compatible with native promises, because they implement `.then`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Thenable obyektga misol:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // 1000ms dan keyin 2 ni ko'rsatadi
```

<<<<<<< HEAD
JavaScript `.then` `(*)` satridagi `.then` ishlov beruvchisi tomonidan qaytarilgan obyektni tekshiradi: agar u `then` deb nomlanadigan usulga ega bo'lsa, u holda bu tabiiy funktsiyalarni taqdim etadigan ushbu usulni `resolve`, `reject` argument sifatida chaqiradi (ijrochiga o'xshash) va ulardan biri chaqirilguncha kutadi. Yuqoridagi misolda `resolve(2)` 1 soniyadan so'ng chaqiriladi `(**)`. Keyin natija zanjirning pastki qismiga uzatiladi.

Ushbu xususiyat `Promise` dan meros olmasdan, moslashtirilgan moslamalarni va'da zanjirlari bilan birlashtirishga imkon beradi.
=======
JavaScript checks the object returned by the `.then` handler in line `(*)`: if it has a callable method named `then`, then it calls that method providing native functions `resolve`, `reject` as arguments (similar to an executor) and waits until one of them is called. In the example above `resolve(2)` is called after 1 second `(**)`. Then the result is passed further down the chain.

This feature allows us to integrate custom objects with promise chains without having to inherit from `Promise`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````


## Kattaroq misol: fetch

Frontend dasturlash va'dalari ko'pincha tarmoq so'rovlari uchun ishlatiladi. Keling, buning kengaytirilgan namunasini ko'rib chiqaylik.

<<<<<<< HEAD
Uzoq serverdan foydalanuvchi haqidagi ma'lumotlarni yuklash uchun [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) usulidan foydalanamiz. Usul juda murakkab, ko'plab ixtiyoriy parametrlarga ega, ammo asosiy foydalanish juda oddiy:
=======
We'll use the [fetch](info:fetch) method to load the information about the user from the remote server. It has a lot of optional parameters covered in [separate chapters](info:fetch), but the basic syntax is quite simple:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let promise = fetch(url);
```

Bu `url` ga tarmoq so'rovini yuboradi va va'da qaytaradi. Masofaviy server sarlavhalar bilan javob berganida, va *to'liq javob yuklab olinmasdan oldin* va'da `response` obyekti bilan hal qilinadi.

<<<<<<< HEAD
To'liq javobni o'qish uchun biz `response.text()` usulini chaqirishimiz kerak: bu to'liq matnni uzoq serverdan yuklab olganda va natijada ushbu matn bilan hal qilinadigan va'dani qaytaradi.
=======
To read the full response, we should call the method `response.text()`: it returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Quyidagi kod `user.json` ga so'rov yuboradi va uning matnini serverdan yuklaydi:

```js run
fetch('/article/promise-chaining/user.json')
  // .then masofaviy server javob berganida quyida ishlaydi
  .then(function(response) {
<<<<<<< HEAD
    // response.text() javobning to'liq matni bilan hal qilinadigan yangi va'dani qaytaradi
    // uni yuklab olishni tugatgandan so'ng
    return response.text();
  })
  .then(function(text) {
    // ...va bu erda masofaviy faylning mazmuni
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

Masofaviy ma'lumotlarni o'qiydigan va ularni JSON sifatida tahlil qiladigan `response.json()` usuli ham mavjud. Bizning holatda bu yanada qulayroq, shuning uchun unga o'taylik.
=======
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

The `response` object returned from `fetch` also includes the method `response.json()` that reads the remote data and parses it as JSON. In our case that's even more convenient, so let's switch to it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Qisqartirish uchun biz o'q funktsiyalaridan foydalanamiz:

```js run
// yuqoridagi kabi, ammo response.json() masofaviy tarkibni JSON sifatida ajratadi
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name
```

Endi yuklangan foydalanuvchi bilan nimadir qilaylik.

<<<<<<< HEAD
Masalan, github-ga yana bir so'rov yuborishimiz, foydalanuvchi profilini yuklashimiz va avatarni ko'rsatishimiz mumkin:
=======
For instance, we can make one more request to GitHub, load the user profile and show the avatar:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
// User.json uchun so'rov yuboring
fetch('/article/promise-chaining/user.json')
  // Json sifatida yuklang
  .then(response => response.json())
<<<<<<< HEAD
  // Github-ga so'rov yuboring
=======
  // Make a request to GitHub
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Javobni json sifatida yuklang
  .then(response => response.json())
  // Avatar rasmini ko'rsating (githubUser.avatar_url) 3 soniya davomida (balki uni jonlantirish mumkin)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

<<<<<<< HEAD
Kod ishlaydi, tafsilotlar haqidagi sharhlarni ko'ring, lekin u o'zi tavsiflovchi bo'lishi kerak. Garchi unda potentsial muammo mavjud bo'lsa ham, va'da ishlatishni boshlaganlar uchun odatiy xato.
=======
The code works; see comments about the details. However, there's a potential problem in it, a typical error for those who begin to use promises.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`(*)` satriga qarang: avatar ko'rsatilgandan so'ng va olib tashlanganidan *keyin* qanday qilib biron bir narsa qilishimiz mumkin? Masalan, biz ushbu foydalanuvchini yoki boshqa biron bir narsani tahrirlash uchun shaklni ko'rsatmoqchimiz. Hozircha iloj yo'q.

Zanjirni uzaytiradigan qilish uchun, biz avatarni ko'rsatishni tugatgandan so'ng hal qiladigan va'dani qaytarishimiz kerak.

Shunga o'xshash:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser); // (**)
*/!*
    }, 3000);
  }))
  // 3 soniyadan keyin namoyish etadi
  .then(githubUser => alert(`Namoyishni tugadi ${githubUser.name}`));
```

<<<<<<< HEAD
Endi `setTimeout` `img.remove()` ni ishga tushirgandan so'ng, `resolve(githubUser)` ni chaqiradi, shu bilan boshqaruvni zanjirdagi keyingi `.then` ga uzatadi va foydalanuvchi ma'lumotlarini uzatadi.

Qoida tariqasida, asinxron harakat har doim va'dani qaytarishi kerak.

Bu undan keyin harakatlarni rejalashtirishga imkon beradi. Agar biz hozirda zanjirni kengaytirishni rejalashtirmagan bo'lsak ham, keyinroq kerak bo'lishi mumkin.
=======
That is, the `.then` handler in line `(*)` now returns `new Promise`, that becomes settled only after the call of `resolve(githubUser)` in `setTimeout` `(**)`. The next `.then` in the chain will wait for that.

As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions after it; even if we don't plan to extend the chain now, we may need it later.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Va nihoyat, biz kodni qayta ishlatiladigan funktsiyalarga bo'lishimiz mumkin:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Ulardan foydalaning:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Namoyish tugadi ${githubUser.name}`));
  // ...
```

## Xulosa

Agar `.then` (yoki `catch/finally` ahamiyati yo'q) ishlov beruvchisi va'da bersa, qolgan zanjir o'rnashguncha kutadi. Qachonki u bajarilsa, uning natijasi (yoki xatosi) yana uzatiladi.

Mana to'liq rasm:

![](promise-handler-variants.svg)
