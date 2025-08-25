# Zamonaviy rejim, "use strict"

Uzoq vaqt davomida JavaScript muvofiqlik muammolarisiz rivojlandi. Tilga yangi xususiyatlar qo'shildi, eski funksionallik esa o'zgarishsiz qoldi.

Buning afzalligi shundaki, mavjud kod hech qachon buzilmasdi. Ammo salbiy tomoni shundaki, JavaScript yaratuvchilari tomonidan qilingan har qanday xato yoki nomukammal qaror abadiy tilga yopishib qoldi.

Bu holat 2009 yilgacha davom etdi, ECMAScript 5 (ES5) paydo bo'lgunga qadar. U tilga yangi xususiyatlar qo'shdi va mavjudlarning ba'zilarini o'zgartirdi. Eski kodning ishlashini ta'minlash uchun bunday o'zgarishlarning aksariyati sukut bo'yicha o'chirilgan. Ularni maxsus direktiva bilan aniq yoqishingiz kerak: `"use strict"`.

## "use strict"

Direktiva string kabi ko'rinadi: `"use strict"` yoki `'use strict'`. U skriptning yuqori qismida joylashgan bo'lsa, butun skript "zamonaviy" usulda ishlaydi.

Masalan:

```js
"use strict";

// bu kod zamonaviy usulda ishlaydi
...
```

Tez orada biz funksiyalarni (buyruqlarni guruhlash usuli) o'rganamiz, shuning uchun oldindan ta'kidlab qo'yamizki, `"use strict"` funksiyaning boshiga ham qo'yilishi mumkin. Buni qilish faqat o'sha funksiyada qattiq rejimni yoqadi. Ammo odatda odamlar uni butun skript uchun ishlatadi.

````warn header="\"use strict\" yuqorida ekanligiga ishonch hosil qiling"
Iltimos, `"use strict"` skriptlaringizning yuqori qismida ekanligiga ishonch hosil qiling, aks holda qattiq rejim yoqilmasligi mumkin.

Bu yerda qattiq rejim yoqilmagan:

```js no-strict
alert("qandaydir kod");
// pastdagi "use strict" e'tiborga olinmaydi -- u yuqorida bo'lishi kerak

"use strict";

// qattiq rejim faollashtirilmagan
```

`"use strict"` ustida faqat izohlar ko'rinishi mumkin.
````

```warn header="`use strict` ni bekor qilish usuli yo'q"
Dvigatelni eski xatti-harakatga qaytaradigan `"no use strict"` kabi direktiva yo'q.

Qattiq rejimga kirganingizdan so'ng, orqaga qaytish yo'q.
```

## Brauzer konsoli

Kodni ishga tushirish uchun [dasturchi konsolidan](info:devtools) foydalanganingizda, u sukut bo'yicha `use strict` ishlatmasligini unutmang.

Ba'zida, `use strict` farq qilganda, siz noto'g'ri natijalar olasiz.

Xo'sh, konsolda aslida `use strict` qanday ishlatish kerak?

Birinchi navbatda, bir nechta satr kiritish uchun `key:Shift+Enter` ni bosishga urinib ko'rishingiz va `use strict` ni yuqoriga qo'yishingiz mumkin:

```js
'use strict'; <Yangi satr uchun Shift+Enter>
//  ...sizning kodingiz
<Ishga tushirish uchun Enter>
```

Bu ko'pchilik brauzerlarda, ya'ni Firefox va Chrome da ishlaydi.

Agar bu ishlamasa, masalan, eski brauzerde, `use strict` ni ta'minlashning yomon, ammo ishonchli usuli bor. Uni bunday wrapper ichiga qo'ying:

```js
(function() {
  'use strict';

  // ...bu yerda sizning kodingiz...
})()
```

## "use strict" dan foydalanishimiz kerakmi?

Savol aniq ko'rinishi mumkin, ammo unchalik emas.

Skriptlarni `"use strict"` bilan boshlashni tavsiya qilish mumkin... Ammo nimani bilasizmi?

Zamonaviy JavaScript "klasslar" va "modullar" ni qo'llab-quvvatlaydi - bu ilg'or til tuzilmalari (biz albatta ularga yetib boramiz), ular `use strict` ni avtomatik ravishda yoqadi. Shuning uchun agar biz ulardan foydalansak, `"use strict"` direktivasini qo'shishimiz shart emas.

**Shunday qilib, hozircha `"use strict";` skriptlaringizning yuqori qismidagi mehmondir. Keyinchalik, kodingiz butunlay klaslar va modullarda bo'lganda, uni tashlab ketishingiz mumkin.**

Hozircha biz `use strict` haqida umumiy ma'lumot oldik.

Keyingi boblarda til xususiyatlarini o'rganar ekanmiz, qattiq va eski rejimlar orasidagi farqlarni ko'ramiz. Baxtimizga, ular ko'p emas va ular aslida hayotimizni yaxshilaydi.

Ushbu o'quv qo'llanmasidagi barcha misollar qattiq rejimni nazarda tutadi, agar (juda kamdan-kam) boshqacha ko'rsatilmagan bo'lsa.