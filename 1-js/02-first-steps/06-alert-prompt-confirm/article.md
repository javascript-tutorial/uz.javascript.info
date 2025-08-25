# Foydalanuvchi bilan muloqot: alert, prompt, confirm

Ushbu bo'limda biz JavaScript ning brauzer yoki serverdan bog'liq bo'lmagan taraflarini ko'rib chiqamiz.

Ammo biz hali ham brauzerni demo muhitimiz sifatida ishlatamiz, shuning uchun uning kamida bir nechta foydalanuvchi interfeysi funktsiyalarini bilishimiz kerak. Ushbu bobda biz brauzerning ogohlantirish `alert`, so'rov `prompt` va tasdiqlash `confirm` funktsiyalari bilan tanishamiz.

## alert

Sintaksis:

```js
alert(message);
```

Bu xabarni ko'rsatadi va foydalanuvchi "OK" tugmasini bosguncha skriptning bajarilishini to'xtatadi.

Masalan:

```js run
alert("Hello");
```

Xabar ko'rsatilgan mini-oyna *modal oyna* deb ataladi. "Modal" so'zi tashrif buyuruvchi sahifaning qolgan qismi bilan aloqa qila olmasligi, boshqa tugmalarni bosolmasligi va hokazolarni anglatadi, ta ular oynani yopmaguncha. Bunday holda -- ular "OK" tugmasini bosmaguncha.

## prompt

`prompt` funktsiyasi ikkita parametrni qabul qiladi:

```js no-beautify
result = prompt(title, [default]);
```

Bu matn xabari bilan modal oyna ko'rsatadi, tashrif buyuruvchi uchun kiritish maydoni va OK/CANCEL tugmalari.

`title`
: Foydalanuvchiga ko'rsatish uchun matn.

`default`
: Ixtiyoriy ikkinchi parametr, kiritish maydoni uchun boshlang'ich qiymat.

```smart header="Sintaksisdagi kvadrat qavslar `[...]`"
Yuqoridagi sintaksisdagi `default` atrofidagi kvadrat qavslar parametr ixtiyoriy ekanligini, talab qilinmasligini bildiradi.
```

Tashrif buyuruvchi prompt kiritish maydoniga biror narsa yozishi va OK tugmasini bosishi mumkin. Shunda biz o'sha matnni `result` da olamiz. Yoki ular Cancel tugmasini bosish yoki `key:Esc` tugmasini bosish orqali kiritishni bekor qilishlari mumkin, shunda `result` sifatida `null` olamiz.

`prompt` chaqiruvi kiritish maydoniga yozilgan matnni qaytaradi, agar kiritish bekor qilingan bo'lsa `null` ni.

Masalan:

```js run
let age = prompt('Yoshingiz nechida?', 100);

alert(`Siz ${age} yoshsiz!`); // Siz 100 yoshsiz!
```

````warn header="IE da: har doim `default` ni taqdim eting"
Ikkinchi parametr ixtiyoriy, ammo agar biz uni qo'shmasak, Internet Explorer prompt maydonsiga `"undefined"` matnini qo'yadi.

Ushbu kodni Internet Explorer da ko'rish uchun ishga tushiring:

```js run
let test = prompt("Test");
```

Shunday qilib, promptlar IE da yaxshi ko'rinishi uchun har doim ikkinchi parametrni kiritishni tavsiya etamiz:

```js run
let test = prompt("Test", ''); // <-- IE uchun
```
````

## confirm

Sintaksis:

```js
result = confirm(question);
```

`confirm` funktsiyasi `savol` va ikkita tugma bilan modal oyna ko'rsatadi: OK va Cancel.

Natija OK tugmasi bosilsa `true` bo'ladi, aks holda `false` bo'ladi.

Masalan:

```js run
let isBoss = confirm("Siz rahbarmisiz?");

alert( isBoss ); // true agar OK bosilgan bo'lsa
```

## Xulosa

Biz tashrif buyuruvchilar bilan aloqa o'rnatish uchun uchta brauzerga xos funktsiyani ko'rib chiqdik:

`alert`
: xabarni ko'rsatadi.

`prompt`
: foydalanuvchidan matn kiritishni so'ragan xabarni ko'rsatadi. Matnni qaytaradi yoki Cancel tugmasi yoki `key:Esc` bosilsa `null` ni.

`confirm`
: xabarni ko'rsatadi va foydalanuvchi "OK" yoki "Cancel" tugmasini bosishini kutadi. OK uchun `true` va Cancel/`key:Esc` uchun `false` ni qaytaradi.

Ushbu usullarning barchasi modal: ular skriptning bajarilishini to'xtatadi va oyna yopilmaguncha tashrif buyuruvchiga sahifaning qolgan qismi bilan ishlashga yo'l qo'ymaydi.

Yuqoridagi barcha usullar bo'yicha ikkita cheklov mavjud:

1. Modal oynaning aniq joylashuvi brauzer tomonidan belgilanadi. Odatda, bu markazda.
2. Oynaning aniq ko'rinishi ham brauzerga bog'liq. Biz uni o'zgartira olmaymiz.

Bu soddalik uchun to'lanadigan narx. Chiroyliroq oynalar va foydalanuvchi bilan boyroq o'zaro aloqa uchun boshqa usullar mavjud, ammo agar "qo'ng'iroqlar va hushtaklar" unchalik muhim bo'lmasa, bu usullar juda yaxshi ishlaydi.