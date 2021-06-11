# Qat'iy rejim, "use strict"

Uzoq vaqt davomida JavaScript moslik muammosiz rivojlanib bordi. Eski funktsiyalar o'zgarmagan holda tilga yangi xususiyatlar qo'shildi.

Buning uchun mavjud kodni hech qachon buzmaslik foydasi bor edi. Ammo salbiy tomoni shundaki, JavaScript-ni yaratuvchilar tomonidan qilingan har qanday xato yoki nomukammal qaror tilda abadiy qolib ketgan.

Bu ECMAScript 5 (ES5) paydo bo'lgan 2009 yilgacha bo'lgan. Tilga yangi xususiyatlar qo'shilgan va mavjudlarining bir qismi o'zgartirilgan. Eski kodning ishlashini ta'minlash uchun ko'pgina o'zgartirishlar sukut bo'yicha o'chirilgan. Siz ularni maxsus ko'rsatma bilan yoqishingiz kerak: `"use strict"`.

## "use strict"

Direktiv satrga o'xshaydi: `"use strict"` yoki `'use strict'`. U skriptning yuqori qismida joylashgan bo'lsa, butun skript "zamonaviy" usulda ishlaydi.

Masalan:

```js
"use strict";

// ushbu kod zamonaviy usulda ishlaydi
...
```

Yaqinda biz funktsiyalarni (buyruqlarni guruhlash usulini) o'rganamiz.

Oldinga qarab, shuni ta'kidlash kerakki, `"use strict"` butun skriptning o'rniga barcha funktsiyalarning boshiga qo'yilishi mumkin. Bu faqat ushbu funktsiyada qat'iy rejimni yoqadi. Ammo, odatda, odamlar uni butun skript uchun ishlatadilar.


````warn header="\"use strict\" tepada ekanligiga ishonch hosil qiling"
Iltimos, `"use strict"` skriptingizning yuqori qismida ekanligiga ishonch hosil qiling, aks holda qat'iy rejim yoqilmasligi mumkin.

Bu erda qa'tiy rejim yoqilmagan:

```js no-strict
alert("some code");
// "use strict" quyida e'tiborga olinmaydi--u yuqori qismida bo'lishi kerak

"use strict";

// qat'iy rejim yoqilmagan
```

`"use strict"` yuqorida faqat izohlar paydo bo'lishi mumkin .
````

```warn header="`use strict` ni bekor qilishning iloji yo'q"
Interpretatorni eski xatti-harakatga qaytaradigan `"no use strict"` kabi ko'rsatma mavjud emas.

Qat'iy rejimga o'tgandan so'ng, qaytish mumkin emas.
```

## Brauzer konsoli

Kelajakda funktsiyalarni sinash uchun brauzer konsolidan foydalanganda, u sukut bo'yicha `use strict(qat'iy rejim)` ishlatmasligini unutmang.

Ba'zan, `use strict(qat'iy rejimni)` foydalanganda, siz noto'g'ri natijalarga erishasiz.

Siz bir nechta satrlarni kiritish uchun `key:Shift+Enter` tugmachani bosing va scriptning ustidan `use strict`(qat'iy rejim) dan foydalaning:

```js
'use strict'; <Shift+Enter yangi satr uchun>
//  ...sizning kodingiz
<Enter to run>
```

Bu kod ko'pgina brauzerlarda, ya'ni Firefox va Chrome da ishlaydi.

Agar shunday bo'lmasa, `use strict(qat'iy rejim)` ni ta'minlashning eng ishonchli usuli bu kabi konsolga kodni kiritish bo'ladi:

```js
(function() {
  'use strict';

  // ...sizning kodingiz...
})()
```

## Har doim "use strict(qat'iy rejim)" ni foydalaning

Biz qat'iy rejimning va "standart" rejiming o'rtasidagi farqlarni qoplashimiz uchun hali bor.

Keyingi boblarda til xususiyatlarini o'rganar ekanmiz, qat'iy va standart rejimlar o'rtasidagi farqlarni qayd etamiz. Yaxshiyamki, u erda ma'lumot ko'p emas va ular aslida hayotimizni yaxshiroq qilishadi.

Hozircha bu haqda bilish kifoya:

1. `"use strict"` direktivasi interpretatorni "zamonaviy" rejimga o'tkazadi va ba'zi ichki xususiyatlarning xatti-harakatlarini o'zgartiradi. Tafsilotlarni keyinroq o'rganib chiqamiz.
2. Qat'iy rejimi skript yoki funktsiya yuqoriga `"use strict"` ni joylashtirish tomonidan yoqiladi. Bir necha til xususiyatlari, "sinflar" va "modullar" kabi, avtomatik ravishda qat'iy rejimini faollashtirishadi.
3. Qat'iy rejim barcha zamonaviy brauzerlar tomonidan qo'llab-quvvatlanadi.
4. Biz har doim `"use strict"` bilan skriptlarni boshlash tavsiya qilamiz. Bu o'quv qo'llanmaning barcha misollar qat'iy rejimda (juda kamdan-kam hollarda) aks holda belgilangan.
