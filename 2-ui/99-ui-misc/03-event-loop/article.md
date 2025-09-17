# Event loop: microtasks va macrotasks

Brauzer JavaScript bajarilish oqimi, shuningdek Node.js da ham *event loop* ga asoslangan.

Event loop qanday ishlashini tushunish optimallashtirish uchun va ba'zan to'g'ri arxitektura uchun muhim.

Bu bobda avval narsalar qanday ishlashi haqidagi nazariy tafsilotlarni ko'rib chiqamiz, keyin esa bu bilimlarning amaliy qo'llanilishini ko'ramiz.

## Event Loop

*Event loop* kontseptsiyasi juda oddiy. Cheksiz sikl mavjud bo'lib, JavaScript dvigateli vazifalarni kutadi, ularni bajaradi va keyin uyquga ketadi, ko'proq vazifalarni kutadi.

Dvigatelning umumiy algoritmi:

1. Vazifalar mavjud bo'lganda:
    - ularni bajaring, eng eski vazifadan boshlab.
2. Vazifa paydo bo'lguncha uyqu, keyin 1-qadamga o'ting.

Bu sahifani ko'rib chiqayotganda ko'rgan narsalarimizning rasmiylashtirishidir. JavaScript dvigateli ko'p vaqt hech narsa qilmaydi, u faqat skript/ishlov beruvchi/hodisa faollashgandagina ishlaydi.

Vazifalar misollari:

- Tashqi skript `<script src="...">` yuklanganda, vazifa uni bajarishdir.
- Foydalanuvchi sichqonchasini harakatlantirganda, vazifa `mousemove` hodisasini jo'natish va ishlov beruvchilarni bajarishdir.
- Rejalashtirilgan `setTimeout` vaqti kelganda, vazifa uning callback ni ishga tushirishdir.
- ...va hokazo.

Vazifalar o'rnatiladi -- dvigatel ularni boshqaradi -- keyin ko'proq vazifalarni kutadi (uyquda va deyarli nol CPU iste'mol qiladi).

Dvigatel band bo'lganida vazifa kelishi mumkin, u holda u navbatga qo'yiladi.

Vazifalar navbat hosil qiladi, "macrotask queue" deb ataladi (v8 terminologiyasi):

![](eventLoop.svg)

Masalan, dvigatel `script` ni bajarayotgan vaqtda foydalanuvchi sichqonchasini harakatlantirib `mousemove` ga sabab bo'lishi va `setTimeout` vaqti kelishi mumkin va hokazo, bu vazifalar yuqoridagi rasmda ko'rsatilganidek navbat hosil qiladi.

Navbatdagi vazifalar "birinchi kelgan - birinchi xizmat ko'rsatilgan" asosida qayta ishlanadi. Brauzer dvigateli `script` bilan ishini tugatganda, u `mousemove` hodisasini, keyin `setTimeout` ishlov beruvchisini va hokazolarni boshqaradi.

Hozirgacha, juda oddiy, shunday emasmi?

Yana ikkita tafsilot:
1. Dvigatel vazifani bajarayotgan vaqtda render hech qachon sodir bo'lmaydi. Vazifa qanchalik uzoq davom etishidan qat'i nazar. DOM ga o'zgarishlar faqat vazifa tugagandan keyin bo'yaladi.
2. Agar vazifa juda uzoq davom etsa, brauzer foydalanuvchi hodisalarini qayta ishlash kabi boshqa vazifalarni bajara olmaydi. Shuning uchun bir muncha vaqtdan keyin u "Page Unresponsive" kabi ogohlantirish beradi va vazifani butun sahifa bilan birga o'ldirishni taklif qiladi. Bu juda ko'p murakkab hisob-kitoblar yoki cheksiz siklga olib keladigan dasturlash xatosi bo'lganda sodir bo'ladi.

Bu nazariya edi. Endi bu bilimni qanday qo'llashimizni ko'raylik.

## Foydalanish holati 1: CPU-och vazifalarni bo'lish

Aytaylik, bizda CPU-och vazifa bor.

Masalan, sintaksis-ta'kidlash (bu sahifadagi kod misollarini ranglash uchun ishlatiladi) CPU uchun juda og'ir. Kodni ta'kidlash uchun u tahlil qiladi, ko'plab rangli elementlar yaratadi, ularni hujjatga qo'shadi -- katta miqdordagi matn uchun bu juda ko'p vaqt talab qiladi.

Dvigatel sintaksis ta'kidlash bilan band bo'lganida, u boshqa DOM bilan bog'liq ishlarni bajara olmaydi, foydalanuvchi hodisalarini qayta ishlay olmaydi va hokazo. Bu hatto brauzerning biroz "hiqichoq" yoki "osilib qolishiga" sabab bo'lishi mumkin, bu qabul qilinishi mumkin emas.

Katta vazifani bo'laklarga bo'lish orqali muammolardan qochishimiz mumkin. Dastlabki 100 qatorni ta'kidlaymiz, keyin keyingi 100 qator uchun `setTimeout` (nol kechikish bilan) rejalashtiramiz va hokazo.

Bu yondashuvni namoyish qilish uchun, soddalik uchun, matn ta'kidlash o'rniga `1` dan `1000000000` gacha sanash funksiyasini olaylik.

Agar quyidagi kodni ishga tushirsangiz, dvigatel bir muncha vaqt "osilib qoladi". Server tomonidagi JS uchun bu aniq seziladi va agar uni brauzerde ishga tushirayotgan bo'lsangiz, sahifadagi boshqa tugmalarni bosishga harakat qiling -- sanash tugamaguncha boshqa hodisalar boshqarilmasligini ko'rasiz.

```js run
let i = 0;

let start = Date.now();

function count() {

  // og'ir ishni bajaring
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

Brauzer hatto "skript juda uzoq vaqt ishlayapti" ogohlantirishini ham ko'rsatishi mumkin.

Ichki `setTimeout` chaqiruvlari yordamida ishni bo'laylik:

```js run
let i = 0;

let start = Date.now();

function count() {

  // og'ir ishning bir qismini bajaring (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // yangi chaqiruvni rejalashtiring (**)
  }

}

count();
```

Endi brauzer interfeysi "sanash" jarayonida to'liq funktsional.

`count` ning bitta ishga tushishi ishning bir qismini bajaradi `(*)` va keyin kerak bo'lsa o'zini qayta rejalashtiradi `(**)`:

1. Birinchi ishga tushish sanaydi: `i=1...1000000`.
2. Ikkinchi ishga tushish sanaydi: `i=1000001..2000000`.
3. ...va hokazo.

Endi, agar dvigatel 1-qismni bajarayotgan vaqtda yangi yon vazifa (masalan `onclick` hodisasi) paydo bo'lsa, u navbatga qo'yiladi va keyin 1-qism tugagandan so'ng, keyingi qismdan oldin bajariladi. `count` bajarilishlari orasidagi davriy event loop ga qaytishlar JavaScript dvigateli uchun boshqa ish qilish, boshqa foydalanuvchi harakatlariga javob berish uchun etarli "havo" beradi.

E'tiborli narsa shundaki, ikkala variant -- `setTimeout` bilan ishni bo'lish va bo'lmaslik -- tezlikda taqqoslanadigan. Umumiy sanash vaqtida unchalik katta farq yo'q.

Ularni yaqinroq qilish uchun yaxshilash qilaylik.

Rejalashtirishni `count()` ning boshiga ko'chiramiz:

```js run
let i = 0;

let start = Date.now();

function count() {

  // rejalashtirishni boshiga ko'chiring
  if (i < 1e9 - 1e6) {
    setTimeout(count); // yangi chaqiruvni rejalashtiring
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

Endi `count()` ni boshlashda va ko'proq `count()` qilishimiz kerakligini ko'rganimizda, biz buni ishni qilishdan oldin darhol rejalashtiramiz.

Agar uni ishga tushirsangiz, sezilarli darajada kamroq vaqt ketishini osongina sezasiz.

Nega?

Bu oddiy: eslab qolganingizdek, ko'plab ichki `setTimeout` chaqiruvlari uchun brauzerdagi minimal kechikish 4ms. `0` o'rnatsak ham, bu `4ms` (yoki biroz ko'proq). Shuning uchun uni qanchalik erta rejalashtarsak - shunchalik tez ishlaydi.

Nihoyat, biz CPU-och vazifani qismlarga bo'ldik - endi u foydalanuvchi interfeysini bloklamaydi. Va uning umumiy bajarilish vaqti unchalik uzoqroq emas.

## Foydalanish holati 2: progress ko'rsatish

Brauzer skriptlari uchun og'ir vazifalarni bo'lishning yana bir foydasi shundaki, biz progress ko'rsatishini ko'rsatishimiz mumkin.

Yuqorida aytilganidek, DOM ga o'zgarishlar faqat hozirda ishlaydigan vazifa tugagandan keyin bo'yaladi, qanchalik uzoq davom etishidan qat'i nazar.

Bir tomondan, bu ajoyib, chunki bizning funksiyamiz ko'plab elementlar yaratishi, ularni hujjatga birma-bir qo'shishi va ularning stillarini o'zgartirishi mumkin -- tashrif buyuruvchi hech qanday "oraliq", tugallanmagan holatni ko'rmaydi. Muhim narsa, shunday emasmi?

Mana demo, `i` ga o'zgarishlar funksiya tugamaguncha ko'rsatilmaydi, shuning uchun biz faqat oxirgi qiymatni ko'ramiz:

```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

...Lekin biz vazifa davomida ham biror narsa, masalan progress barni ko'rsatishni xohlashimiz mumkin.

Agar biz og'ir vazifani `setTimeout` yordamida bo'laklarga bo'lsak, o'zgarishlar ular orasida bo'yaladi.

Bu chiroyliroq ko'rinadi:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // og'ir ishning bir qismini bajaring (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Endi `<div>` `i` ning ortib borayotgan qiymatlarini ko'rsatadi, progress bar kabi.

## Foydalanish holati 3: hodisadan keyin biror narsa qilish

Hodisa ishlov beruvchisida biz ba'zi harakatlarni hodisa ko'tarilgidan va barcha darajalarda boshqarilgandan keyin kechiktirishga qaror qilishimiz mumkin. Buni kodni nol kechikish bilan `setTimeout` ga o'rash orqali qilishimiz mumkin.

<info:dispatch-events> bobida misol ko'rdik: maxsus `menu-open` hodisasi `setTimeout` da jo'natiladi, shunda u "click" hodisasi to'liq boshqarilgandan keyin sodir bo'ladi.

```js
menu.onclick = function() {
  // ...

  // bosilgan menyu elementi ma'lumotlari bilan maxsus hodisa yaratish
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // maxsus hodisani asinxron ravishda jo'natish
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

## Macrotasks va Microtasks

Bu bobda tasvirlangan *macrotasks* bilan bir qatorda, <info:microtask-queue> bobida eslatib o'tilgan *microtasks* ham mavjud.

Microtasks faqat bizning kodimizdan keladi. Ular odatda promiselar tomonidan yaratiladi: `.then/catch/finally` ishlov beruvchisining bajarilishi microtask ga aylanadi. Microtasks `await` ning "qopqog'i ostida" ham ishlatiladi, chunki bu promise bilan ishlashning boshqa shakli.

Shuningdek, `func` ni microtask navbatida bajarish uchun navbatga qo'yadigan maxsus `queueMicrotask(func)` funksiyasi ham mavjud.

**Har bir *macrotask* dan keyin darhol, dvigatel boshqa macrotasks yoki rendering yoki boshqa narsalarni ishga tushirishdan oldin *microtask* navbatidagi barcha vazifalarni bajaradi.**

Masalan, qarang:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

Bu yerda tartib qanday bo'ladi?

1. `code` birinchi ko'rsatiladi, chunki bu muntazam sinxron chaqiruv.
2. `promise` ikkinchi ko'rsatiladi, chunki `.then` microtask navbatidan o'tadi va joriy koddan keyin ishlaydi.
3. `timeout` oxirida ko'rsatiladi, chunki bu macrotask.

Boyroq event loop rasmi shunday ko'rinadi (tartib yuqoridan pastgacha, ya'ni: avval skript, keyin microtasks, rendering va hokazo):

![](eventLoop-full.svg)

Barcha microtasks boshqa hodisalarni boshqarish yoki rendering yoki boshqa macrotask sodir bo'lishidan oldin tugallanadi.

Bu muhim, chunki u microtasks orasida amaliyot muhiti asosan bir xil (sichqoncha koordinatalarining o'zgarishi yo'q, yangi tarmoq ma'lumotlari yo'q va hokazo) ekanligini kafolatlaydi.

Agar biz funksiyani asinxron ravishda (joriy koddan keyin), lekin o'zgarishlar renderlangandan yoki yangi hodisalar boshqarilishidan oldin bajarishni xohlasak, uni `queueMicrotask` bilan rejalashtira olamiz.

Mana avval ko'rsatilganiga o'xshash "sanash progress bari" bilan misol, lekin `setTimeout` o'rniga `queueMicrotask` ishlatilgan. Uni eng oxirida render qilganini ko'rishingiz mumkin. Xuddi sinxron kod kabi:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // og'ir ishning bir qismini bajaring (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

## Xulosa

Yanada batafsil event loop algoritmi ([spetsifikatsiya](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model) ga nisbatan hali ham soddalashtirilgan):

1. *Macrotask* navbatidan eng eski vazifani navbatdan chiqarib ishga tushirish (masalan "script").
2. Barcha *microtasks* ni bajarish:
    - Microtask navbati bo'sh bo'lmagan vaqtda:
        - Eng eski microtask ni navbatdan chiqarib ishga tushirish.
3. Agar biror o'zgarishlar bo'lsa, ularni render qilish.
4. Agar macrotask navbati bo'sh bo'lsa, macrotask paydo bo'lguncha kutish.
5. 1-qadamga o'tish.

Yangi *macrotask* rejalashtirish uchun:
- Nol kechikishli `setTimeout(f)` dan foydalanish.

Bu katta hisob-kitob-og'ir vazifani bo'laklarga bo'lish uchun ishlatilishi mumkin, brauzer ular orasida foydalanuvchi hodisalariga javob berish va progress ko'rsatish uchun.

Shuningdek, hodisa to'liq boshqarilgandan keyin (bubbling tugagandan keyin) harakatni rejalashtirish uchun hodisa ishlov beruvchilarida ishlatiladi.

Yangi *microtask* rejalashtirish uchun:
- `queueMicrotask(f)` dan foydalanish.
- Shuningdek promise ishlov beruvchilari microtask navbatidan o'tadi.

Microtasks orasida UI yoki tarmoq hodisalarini boshqarish yo'q: ular bir-biridan keyin darhol ishlaydi.

Shuning uchun funksiyani asinxron ravishda bajarish uchun, lekin muhit holatida `queueMicrotask` dan foydalanish mumkin.

```smart header="Web Workers"
Event loop ni bloklamasligi kerak bo'lgan uzoq og'ir hisob-kitoblar uchun biz [Web Workers](https://html.spec.whatwg.org/multipage/workers.html) dan foydalanishimiz mumkin.

Bu kodini boshqa, parallel thread da ishga tushirish usuli.

Web Workers asosiy jarayon bilan xabarlar almashishi mumkin, lekin ularda o'zlarining o'zgaruvchilari va o'zlarining event loop i bor.

Web Workers DOM ga kirish huquqiga ega emas, shuning uchun ular asosan bir vaqtning o'zida bir nechta CPU yadrolarini ishlatish uchun hisob-kitoblar uchun foydali.
```