# Foydalanuvchi bilan muloqot: alert, prompt, confirm

Ushbu bo'limda biz Javascript ni brauzer yoki serverdan bog'liq emas taraflarini ko'rib chiqamiz

Ammo biz hali ham brauzerni demo muhitimiz sifatida ishlatamiz, shuning uchun uning kamida bir nechta foydalanuvchi interfeysi funktsiyalarini bilishimiz kerak. Ushbu bobda biz brauzerning ogohlantirish `alert`, so'rov `prompt` va tasdiqlash `confirm` funktsiyalari bilan tanishamiz.

## alert

Sintaksis:

```js
alert(message);
```

Bu xabarni ko'rsatadi va foydalanuvchi "OK" tugmachasini bosguncha skriptni bajarilishini to'xtatmaydi.

Masalan:

```js run
alert("Hello");
```

Xabar berilgan mini-oyna *modal oyna* deb nomlanadi. "Modal" so'zi, tashrif buyuruvchining sahifaning qolgan qismi bilan aloqa qila olmasligini, boshqa tugmachalarni bosolmashini va hokazolarni anglatadi, qachonki ular derazani yopmagunicha. Bunday holda -- ular "OK" tugmachasini bosmaguncha.

## prompt

`prompt` funktsiyasi ikkita parametrni qabul qiladi:

```js no-beautify
result = prompt(title, [default]);
```

Bu matn xabari bilan bir modal oyna ko'rsatadi, mehmon uchun kiritish maydoni, va tugmalari OK/CANCEL.

`title`
: Foydalanuvchiga ko'rsatish uchun matn.

`default`
: Ixtiyoriy ikkinchi parametr, kiritish maydoni uchun boshlang'ich qiymat.

Foydalanuvchi kiritish maydoniga biror narsani yozishi va OK tugmachasini bosishi mumkin. Yoki CANCEL yoki `key:Esc` tugmasini bosib kiritishni bekor qilishlari mumkin.

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

`confirm` funktsiyasi modal oynani, `savol` va ikkita tugmachani ko'rsatadi: OK va CANCEL.

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
: foydalanuvchidan matn kiritishni so'ragan xabarni ko'rsatadi. Bu matnni qaytaradi yoki `null` ni, agar CANCEL yoki "key:Esc" tugmasi bosilsa.

`confirm`
: xabarni ko'rsatadi va foydalanuvchi "OK" yoki "CANCEL" tugmachasini bosishini kutadi. OK uchun `true` va CANCEL/`key:Esc` uchun `false` ni qaytaradi.

Ushbu usullarning barchasi modaldir: ular skriptni bajarilishini to'xtatib turadi va oyna yopilmaguncha, tashrif buyuruvchiga sahifaning qolgan qismi bilan ishlashiga yo'l qo'ymaydi.

Yuqoridagi barcha usullar bo'yicha ikkita cheklov mavjud:

1. Modal oynaning aniq joylashuvi brauzer tomonidan belgilanadi. Odatda, bu markazda.
2. Oynaning aniq ko'rinishi brauzerga ham bog'liq. Biz uni o'zgartira olmaymiz.

Bu soddalik uchun narx. Yaxshi derazalarni va mehmon bilan yanada boyroq o'zaro aloqalarni ko'rsatish uchun boshqa usullari mavjud, ammo agar "qo'ng'iroqlar va hushtaklar" juda katta ahamiyatga ega bo'lmasa, bu usullar juda yaxshi ishlaydi.
