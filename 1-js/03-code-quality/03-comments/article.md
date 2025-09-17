# Izohlar

<Info:structure> bobidan ma'lum bo'lganidek, sharhlar bitta satrli `//` va ko'p satrli: `/ * ... * /` bo'lishi mumkin.

Odatda ularni kod qanday va nima uchun ishlashini tavsiflash uchun ishlatamiz.

Birinchi qarashdanoq, izohlar oson va aniq tuyulishi mumkin, ammo boshlang'ich dasturchilar odatda uni noto'g'ri qabul qilishadi.

## Yomon izohlar

Boshlang'ich dasturchilar "kodda nima bo'layotganini" tushuntirish uchun izohlardan foydalanadilar. Shunga o'xshash:

```js
// Ushbu kod bu narsani (...) va (...) shu narsani qiladi
// ...va yana kim biladi nimani...
juda;
murakkab;
kod;
```

Ammo yaxshi kodda bunday "tushuntirish" izohlarni miqdori minimal bo'lishi kerak. Jiddiy ravishda, ularsiz kodni tushunish oson bo'lishi kerak.

Bu borada ajoyib qoida mavjud: "agar kod shunchalik noaniq bo'lib, u izohni talab qiladigan bo'lsa, ehtimol uning o'rniga uni qayta yozish kerak".

### Yo'nalish: kodni funktsiyaga kiriting

Ba'zan kod qismini funktsiya bilan almashtirish foydali bo'ladi, masalan:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // i bosh son ekanligini tekshiring
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Eng yaxshi variant – alohida `isPrime` funksiyasidan foydalanish:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Endi biz kodni osongina tushunamiz. Funktsiyaning o'zi izohga aylanadi. Bunday kod _o'zini o'zi tavsiflovchi_ deb nomlanadi.

### Yo'nalish: funksiyalarni yaratish

Va agar bizda shunday uzun "kod oqimi" bo'lsa:

```js
// bu erda biz viski qo'shamiz
for (let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// bu erda biz sharbat qo'shamiz
for (let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Bu funksiyalar yordamida uni qayta yozish yaxshiroq bo'ladi:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for (let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for (let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Bu erda sharhlar ham kerak emas: funktsiyalar o'zlari nima qilishlarini aytishadi (agar siz ingliz tilini tushunsangiz). Va shuningdek, kod tuzilishi bo'linganda yaxshiroqdir. Har bir funktsiya nimani bajarishi, nimani talab qilishi va nimani qaytarishi aniq.

Aslida biz "tushuntirish" izohlaridan butunlay qochib qutula olmaymiz. Murakkab algoritmlar mavjud. Va optimallashtirish uchun aqlli "tweaks" lar mavjud. Ammo, odatda, biz kodni sodda va o'z-o'zini tavsiflovchi qilishga harakat qilishimiz kerak.

## Yaxshi izohlar

Shunday qilib, tushuntirish izohlari odatda yomon. Qaysi izohlar yaxshi?

Arxitekturasini tavsiflang
: Komponentlarning yuqori darajadagi sharhini, ular qanday ta'sir o'tkazayotganini, turli vaziyatlarda nazorat oqimining nima ekanligini... agar qisqacha bo'lsa, qushning ko'zidan kodni ko'rib chiqing. Kod arxitekturasini tushuntiruvchi diagrammalarni yaratish uchun maxsus [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) tili mavjud. Bu, albatta, o'rganishga arziydi.

Funktsiyadan foydalanishni hujjatlashtiring
: Funktsiyani hujjatlashtirish uchun [JSDoc](http://en.wikipedia.org/wiki/JSDoc) maxsus sintaksis mavjud: foydalanish, parametrlar, qaytarilgan qiymat.

    Masalan:
    ```js
    /**
     * n-darajaga ko'tarilgan x ni qaytaradi.
     *
     * @param {number} x Ko'payishi kerak bo'lgan raqam.
     * @param {number} n Daraja, tabiiy son bo'lishi kerak.
     * @return {number} x n-darajaga ko'tarildi.
     */
    function pow(x, n) {
      ...
    }
    ```

    Bunday izohlar funktsiya maqsadini tushunmasdan va uning kodiga qaramasdan uni to'g'ri ishlatishga imkon beradi.

    Aytgancha, [WebStorm](https://www.jetbrains.com/webstorm/) kabi ko'plab tahrirlovchilar ularni ham tushunishlari mumkin va ularni avtomatik to'ldirish va ba'zi bir avtomatik kodlarni tekshirish uchun ishlatishlari mumkin.

    Shuningdek, [JSDoc 3] (https://github.com/jsdoc3/jsdoc) kabi vositalar mavjud, ular izohlardan HTML-hujjatlarni yaratishlari mumkin. JSDoc haqida ko'proq ma'lumotni <http://usejsdoc.org/> sahifasida o'qishingiz mumkin.

Nima uchun vazifa shu tarzda hal qilinadi?
: Yozilgan kod muhim. Ammo nima yozilganini tushunish uchun _yozilmagan_ narsalar yanada muhimroq bo'lishi mumkin. Nima uchun vazifa aynan shu tarzda hal qilinadi? Kod hech qanday javob bermaydi.

    Agar vazifani hal qilishning bir necha yo'li mavjud bo'lsa, unda nima uchun buni tanladingiz? Ayniqsa, sizning usulingiz eng aniq bo'lmasa.

    Izohlarsiz quyidagi holatlar sodir bo'lishi mumkin:
    1. Siz (yoki sizning hamkasbingiz) bir muncha vaqt oldin yozilgan kodni ochasiz va uning "suboptimal" ekanligini ko'rasiz.
    2. Siz shunday deb o'ylaysiz: "Men o'sha paytda qanday ahmoq edim va hozir qanchalik aqlliroqman" va "aniqroq va to'g'ri" variantidan foydalanib qayta yozasiz.
    3. ...Qayta yozish istagi yaxshi edi. Ammo bu jarayonda "aniqroq" yechim aslida yetishmayotganini ko'rasiz. Siz hatto nima uchun unday bo'lganini xira eslaysiz, chunki siz buni allaqachon sinab ko'rgansiz. Siz to'g'ri variantga qaytdingiz, ammo vaqt behuda ketdi.

    Yechimni tushuntiradigan izohlar juda muhimdir. Ular rivojlanishni to'g'ri yo'lda davom ettirishga yordam beradi.

Kodning nozik xususiyatlari bormi? Ular qayerda ishlatiladi?
: Agar kodda nozik va qarshi intuitiv narsa bo'lsa, albatta izoh berishga arziydi.

## Xulosa

Yaxshi dasturchining muhim belgisi bu izohlar: ularning mavjudligi va hatto yo'qligi.

Yaxshi sharhlar bizga kodni yaxshi saqlashga imkon beradi, vaqt o'tgach keyin unga qaytamiz va undan samarali foydalanamiz.

**Bunga izoh bering:**

- Umumiy arxitektura, yuqori darajadagi ko'rinish.
- Function usage.
- Muhim yechimlar, ayniqsa darhol aniq bo'lmaganda.

**Izohlashdan saqlaning:**

- Bu "kod qanday ishlaydi" va "u nima qiladi".
- Ularni faqat oddiy va o'zini o'zi tavsiflovchi kodni bajarish mumkin bo'lmagan hollarda foydalaning, bu izohni talab qilmaydi.

Izohlar JSDoc3 kabi avtomatik hujjatlashtirish vositalari uchun ham qo'llaniladi: ularni o'qiydilar va HTML-hujjatlarni (yoki boshqa formatdagi hujjatlarni) yaratadilar.
