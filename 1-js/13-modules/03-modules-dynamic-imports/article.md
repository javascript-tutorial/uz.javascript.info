
# Dinamik import

Avvalgi boblarda ko'rib chiqilgan eksport va import ifodalari "statik" deb nomlanadi.

Buning sababi, ular haqiqatan ham statik. Sintaksis juda qat'iy.

Birinchidan, biz `import` parametrlarini dinamik ravishda ishlab chiqa olmaymiz.

The module path must be a primitive string, can't be a function call. This won't work:

```js
import ... from *!*getModuleName()*/!*; // Xato, faqat "string" dan ruxsat berilgan
```

Ikkinchidan, biz shartli ravishda yoki ish vaqtida import qila olmaymiz:

```js
if(...) {
  import ...; // Xato, ruxsat berilmagan!
}

{
  import ...; // Xato, biz importni biron bir blokga joylashtirolmaymiz
}
```

Buning sababi, import/eksport kod tuzilishi uchun magistralni ta'minlashdir. Bu yaxshi narsa, chunki kodlar tuzilishini tahlil qilish, modullarni yig'ish va birlashtirish, foydalanilmagan eksportlarni olib tashlash mumkin. Bu faqat hamma narsa aniqlanganligi sababli mumkin.

Ammo modulni talabga binoan qanday qilib dinamik ravishda import qilamiz?

## import() funktsiya

`import(module)` funksiyasini istalgan joydan chaqirish mumkin. Bu modul obyektida hal qilinadigan va'dani qaytaradi.

Foydalanish tartibi quyidagicha:

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

Yoki, agar mos kelmaydigan funktsiya ichida bo'lsa, `let module = await import(modulePath)` dan foydalanishimiz mumkin.

Shunga o'xshash:

[codetabs src="say" current="index.html"]

Shunday qilib, dinamik importni ishlatish juda oddiy.

Shuningdek, dinamik import oddiy skriptlarda ishlaydi, ular uchun `script type="module"` kerak emas.
