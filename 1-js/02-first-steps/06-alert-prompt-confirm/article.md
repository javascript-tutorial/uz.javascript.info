# Foydalanuvchi bilan muloqot: alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Ushbu bo'limda biz Javascript ni brauzer yoki serverdan bog'liq emas taraflarini ko'rib chiqamiz

Ammo biz hali ham brauzerni demo muhitimiz sifatida ishlatamiz, shuning uchun uning kamida bir nechta foydalanuvchi interfeysi funktsiyalarini bilishimiz kerak. Ushbu bobda biz brauzerning ogohlantirish `alert`, so'rov `prompt` va tasdiqlash `confirm` funktsiyalari bilan tanishamiz.

## alert

Sintaksis:

```js
alert(message);
```

Bu xabarni ko'rsatadi va foydalanuvchi "OK" tugmachasini bosguncha skriptni bajarilishini to'xtatmaydi.
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to press "OK".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Masalan:

```js run
alert("Hello");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Xabar berilgan mini-oyna *modal oyna* deb nomlanadi. "Modal" so'zi, tashrif buyuruvchining sahifaning qolgan qismi bilan aloqa qila olmasligini, boshqa tugmachalarni bosolmashini va hokazolarni anglatadi, qachonki ular derazani yopmagunicha. Bunday holda -- ular "OK" tugmachasini bosmaguncha.
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

`prompt` funktsiyasi ikkita parametrni qabul qiladi:

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Bu matn xabari bilan bir modal oyna ko'rsatadi, mehmon uchun kiritish maydoni, va tugmalari OK/CANCEL.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/06-alert-prompt-confirm/article.md

`title`
: Foydalanuvchiga ko'rsatish uchun matn.

`default`
: Ixtiyoriy ikkinchi parametr, kiritish maydoni uchun boshlang'ich qiymat.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Foydalanuvchi kiritish maydoniga biror narsani yozishi va OK tugmachasini bosishi mumkin. Yoki CANCEL yoki `key:Esc` tugmasini bosib kiritishni bekor qilishlari mumkin.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter is optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/06-alert-prompt-confirm/article.md

`prompt` funktsiyasi kiritish maydoniga yozilgan matni qaytaradi, agar kiritish bekor qilingan bo'lsa `null` ni.

Masalan:

```js run
let age = prompt('Yoshingiz nechida?', 100);

alert(`Siz ${age} yoshsiz`); // Siz 100 yoshsiz!
```

````warn header="IE da: har doim `default` ni taqdim eting"
Ikkinchi parametr ixtiyoriy, ammo agar biz uni qo'shmasak, Internet Explorer prompt(so'rovga) `"undefined"` matnini qo'shadi.

Ushbu kodni Internet Explorer da ko'rish uchun ishga tushiring:

```js run
let test = prompt("Test");
```

Shunday qilib, prompt(so'rovlar) IE da yaxshi ko'rinishi uchun har doim ikkinchi parametrni keltirishni tavsiya etamiz:

```js run
let test = prompt("Test", ''); // <-- IE uchun
```
````

## confirm

Sintaksis:

```js
result = confirm(question);
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
`confirm` funktsiyasi modal oynani, `savol` va ikkita tugmachani ko'rsatadi: OK va CANCEL.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Natija OK tugmachasi bosilsa `true` bo'ladi, aks holda `false` bo'ladi.

Masalan:

```js run
let isBoss = confirm("Siz xo'jayinmisiz?");

alert( isBoss ); // true agar OK bosilgan bo'lsa
```

## Xulosa

Biz tashrif buyuruvchilar bilan aloqa o'rnatish uchun uchta brauzerga xos funktsiyalarni ko'rib chiqdik:

`alert`
: xabarni ko'rsatadi.

`prompt`
<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
: foydalanuvchidan matn kiritishni so'ragan xabarni ko'rsatadi. Bu matnni qaytaradi yoki `null` ni, agar CANCEL yoki "key:Esc" tugmasi bosilsa.

`confirm`
: xabarni ko'rsatadi va foydalanuvchi "OK" yoki "CANCEL" tugmachasini bosishini kutadi. OK uchun `true` va CANCEL/`key:Esc` uchun `false` ni qaytaradi.
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Ushbu usullarning barchasi modaldir: ular skriptni bajarilishini to'xtatib turadi va oyna yopilmaguncha, tashrif buyuruvchiga sahifaning qolgan qismi bilan ishlashiga yo'l qo'ymaydi.

Yuqoridagi barcha usullar bo'yicha ikkita cheklov mavjud:

1. Modal oynaning aniq joylashuvi brauzer tomonidan belgilanadi. Odatda, bu markazda.
2. Oynaning aniq ko'rinishi brauzerga ham bog'liq. Biz uni o'zgartira olmaymiz.

Bu soddalik uchun narx. Yaxshi derazalarni va mehmon bilan yanada boyroq o'zaro aloqalarni ko'rsatish uchun boshqa usullari mavjud, ammo agar "qo'ng'iroqlar va hushtaklar" juda katta ahamiyatga ega bo'lmasa, bu usullar juda yaxshi ishlaydi.
