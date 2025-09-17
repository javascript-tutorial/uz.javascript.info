3 xonali `#abc` rangini qidirish uchun regexp: `pattern:/#[a-f0-9]{3}/i`.

Biz yana 3 ta ixtiyoriy olti burchakli raqamni qo'shishimiz mumkin. Bizga ko'proq yoki kamroq kerak emas. Rangda 3 yoki 6 ta raqam mavjud.

Buning uchun `pattern:{1,2}` kvantatoridan foydalanamiz: bizda `pattern:/#([a-f0-9]{3}){1,2}/i` bo'ladi.

Bu yerda `pattern:[a-f0-9]{3}` namunasi `pattern:{1,2}` kvantini qo'llash uchun qavslar ichiga olingan.

Amalda:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert(str.match(regexp)); // #3f3 #AA00ef #abc
```

Bu yerda kichik muammo bor: naqsh `mavzu:#abcd` da `match:#abc` topildi. Buning oldini olish uchun oxiriga `pattern:\b` qo'shishimiz mumkin:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert(str.match(regexp)); // #3f3 #AA00ef
```
