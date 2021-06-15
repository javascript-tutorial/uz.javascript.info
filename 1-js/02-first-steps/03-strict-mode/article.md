# Qat'iy rejim, "use strict"

Uzoq vaqt davomida JavaScript moslik muammosiz rivojlanib bordi. Eski funktsiyalar o'zgarmagan holda tilga yangi xususiyatlar qo'shildi.

Buning uchun mavjud kodni hech qachon buzmaslik foydasi bor edi. Ammo salbiy tomoni shundaki, JavaScript-ni yaratuvchilar tomonidan qilingan har qanday xato yoki nomukammal qaror tilda abadiy qolib ketgan.

<<<<<<< HEAD
Bu ECMAScript 5 (ES5) paydo bo'lgan 2009 yilgacha bo'lgan. Tilga yangi xususiyatlar qo'shilgan va mavjudlarining bir qismi o'zgartirilgan. Eski kodning ishlashini ta'minlash uchun ko'pgina o'zgartirishlar sukut bo'yicha o'chirilgan. Siz ularni maxsus ko'rsatma bilan yoqishingiz kerak: `"use strict"`.
=======
This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## "use strict"

Direktiv satrga o'xshaydi: `"use strict"` yoki `'use strict'`. U skriptning yuqori qismida joylashgan bo'lsa, butun skript "zamonaviy" usulda ishlaydi.

Masalan:

```js
"use strict";

// ushbu kod zamonaviy usulda ishlaydi
...
```

<<<<<<< HEAD
Yaqinda biz funktsiyalarni (buyruqlarni guruhlash usulini) o'rganamiz.

Oldinga qarab, shuni ta'kidlash kerakki, `"use strict"` butun skriptning o'rniga barcha funktsiyalarning boshiga qo'yilishi mumkin. Bu faqat ushbu funktsiyada qat'iy rejimni yoqadi. Ammo, odatda, odamlar uni butun skript uchun ishlatadilar.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Qat'iy rejimga o'tgandan so'ng, qaytish mumkin emas.
=======
Once we enter strict mode, there's no going back.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## Brauzer konsoli

<<<<<<< HEAD
Kelajakda funktsiyalarni sinash uchun brauzer konsolidan foydalanganda, u sukut bo'yicha `use strict(qat'iy rejim)` ishlatmasligini unutmang.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ba'zan, `use strict(qat'iy rejimni)` foydalanganda, siz noto'g'ri natijalarga erishasiz.

<<<<<<< HEAD
Siz bir nechta satrlarni kiritish uchun `key:Shift+Enter` tugmachani bosing va scriptning ustidan `use strict`(qat'iy rejim) dan foydalaning:

```js
'use strict'; <Shift+Enter yangi satr uchun>
//  ...sizning kodingiz
<Enter to run>
```

Bu kod ko'pgina brauzerlarda, ya'ni Firefox va Chrome da ishlaydi.

Agar shunday bo'lmasa, `use strict(qat'iy rejim)` ni ta'minlashning eng ishonchli usuli bu kabi konsolga kodni kiritish bo'ladi:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

It works in most browsers, namely Firefox and Chrome.

If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
(function() {
  'use strict';

<<<<<<< HEAD
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
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
