# Mocha bilan avtomatlashtirilgan test

Keyingi vazifalarda avtomatlashtirilgan testdan foydalaniladi.

Bu aslida dasturchining "minimum ta'limi" ning bir qismidir.

## Nega biz testlarga muhtojmiz?

Funktsiyani yozganimizda, odatda, u nima qilishligini tasavvur qilishimiz mumkin: qaysi parametrlar qaysi natijalarni beradi.

Rivojlanish jarayonida funktsiyani ishga tushirish va natijani kutilgan natijalar bilan taqqoslash orqali tekshirishimiz mumkin. Masalan, biz buni konsolda qilishimiz mumkin.

Agar biror narsa noto'g'ri bo'lsa -- biz kodni tuzatamiz, qayta bajaramiz, natijani tekshiramiz -- va shu qadar kod to'g'ri ishlagunicha.

Ammo bunday qo'lda "qayta ishlash" nomukammaldir.

**Kodni qayta ishlash orqali sinovdan o'tkazayotganda, biror narsani o'tkazib yuborish oson.**

Masalan, biz `f` funktsiyasini yaratmoqdamiz. Ba'zi kodlarni yozib, test o'tkazamiz: `f(1)` ishlaydi, lekin `f(2)` ishlamaydi. Biz kodni tuzatamiz va endi `f(2)` ishlaydi. To'liqmi? Ammo biz `f(1)` ni qayta tekshirishni unutdik. Bu xatoga olib kelishi mumkin.

Bu juda odatiy. Biror narsani ishlab chiqsak, biz foydalanish mumkin bo'lgan ko'p holatlarni yodda tutamiz. Ammo dasturchi har bir o'zgarishidan keyin ularning hammasini qo'lda tekshirishi qiyin. Shunday qilib, bitta narsani tuzatish va boshqasini sindirish osonroq bo'ladi.

**Avtomatik test sinovlari kodga qo'shimcha ravishda alohida yoziladi. Ular osongina bajarilishi va barcha asosiy foydalanish holatlarini tekshirishlari mumkin.**

## Behavior Driven Development (BDD)

Keling, [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) yoki qisqasi BDD nomli texnikadan foydalanamiz. Ushbu yondashuv ko'plab loyihalarda qo'llaniladi. BDD faqat sinovdan iborat emas. Bu ko'proq.

**BDD bitta uchta narsa: testlar, hujjatlar va misollar.**

So'zlar etarli. Keling, misolni ko'rib chiqaylik.

## "Pow" funktsiyasining rivojlanishi: spetsifikatsiya

Aytaylik, biz `x` ni `n` butun sonli darajaga ko'taradigan `pow(x,n)` funktsiyasini yaratishni xohlaymiz. Biz `n≥0` deb taxmin qilamiz.

Bu vazifa shunchaki misol: JavaScript-da buni amalga oshiradigan `**` operatori mavjud, ammo biz bu erda yanada murakkab vazifalarda ham qo'llanilishi mumkin bo'lgan rivojlanish oqimiga e'tibor qaratamiz.

`pow` ning kodini yaratishdan oldin, biz funktsiya nimani bajarishi kerakligini tasavvur qila olamiz va uni tavsiflaymiz.

Bunday tavsif *spetsifikatsiya* quyidagicha ko'rinadi:

```js
describe("pow", function() {

  it("n darajaga ko'taradi", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Spetsifikatsiyada yuqorida ko'rishingiz mumkin bo'lgan uchta asosiy qurilish bloklari mavjud:

`describe("sarlavha", function() { ... })`
: What functionality we're describing. Uses to group "workers" -- the `it` blocks. In our case we're describing the function `pow`.
Biz qaysi funktsiyalarni tasvirlaymiz. Bizning holatda biz `pow` funktsiyasini tasvirlaymiz. Ishchi otlarni - `it` bloklarni guruhlash uchun ishlatiladi.

`it("sarlavha", function() { ... })`
: `it` blokining birinchi argumentida biz *inson tilida* funktsiyadan foydalanishning aniq usulini tasvirlaymiz, ikkinchisida esa bu ishni sinab ko'radigan funktsiyani yozamiz.

`assert.equal(qiymat1, qiymat2)`
: `it` blok ichidagi kod, agar bajarilishi to'g'ri bo'lsa, xatosiz bajarilishi kerak.

    `assert.*` funktsiyalari `pow` ning kutilganidek ishlashini tekshirish uchun ishlatiladi. Aynan shu yerda biz ulardan birini ishlatamiz -- `assert.equal`, u argumentlarni taqqoslaydi va agar ular teng bo'lmasa, xatoga yo'l qo'yadi. Bu yerda u `pow(2,3)` ning natijasi `8` ga tengligini tekshiradi.

    Taqqoslash va tekshirishning boshqa turlari mavjud, biz ularni ham ko'rib chiqamiz.

## Rivojlanish oqimi

Rivojlanish oqimi odatda quyidagicha ko'rinadi:

1. Dastlabki spetsifikatsiya asosiy funksiyani tekshiradigan testlar bilan yoziladi.
2. Dastlabki dastur yaratiladi.
3. Uning ishlashini tekshirish uchun biz spetsifikatsiyani boshqaradigan sinov tizimini [Mocha](http://mochajs.org/) (yaqinda batafsil ma'lumot) ishlatamiz. Xatolar ko'rsatiladi. Hamma narsa ishlamaguncha biz tuzatishlar kiritamiz.
4. Endi bizda testlar bilan ishlaydigan dastlabki dastur mavjud.
5. Sinov kodida hali amalga oshirilmagan bo'lishi mumkin bo'lgan foydalanishning yangi usullarini qo'shamiz. Testlar "tushib" (xatolar berish) boshlaydi.
6. 3-ga o'ting, testlar xato qilmaguncha dasturni yangilang.
7. Dastur tayyor bo'lguncha 3-6 bosqichlarni takrorlang.

Shunday qilib, rivojlanish *takrorlanadigan*. Biz spetsifikatsiyani yozamiz, uni amalga oshiramiz, testlar o'tganligiga ishonch hosil qilamiz, so'ngra ko'proq testlarni yozamiz, ularning ishlashiga ishonch hosil qilamiz va hokazo. Oxirida bizda ishlaydigan dastur ham, testlar ham mavjud.

Bizning holatlarimizda birinchi qadam tugallandi: bizda `pow` uchun boshlang'ich spetsifikatsiya mavjud. Keling, amalga oshiraylik. Ammo bundan oldin testlarning ishlayotganligini ko'rish uchun spetsifikatsiyani "nolga" o'tkazamiz (barchasi muvaffaqiyatsiz bo'ladi).

## Amaldagi spetsifikatsiya

Bu qo'llanmada biz testlar uchun quyidagi JavaScript kutubxonalaridan foydalanamiz:

- [Mocha](http://mochajs.org/) -- asosiy framework: u `describe` va `it` va testlarni boshqaradigan asosiy funktsiyalarni o'z ichiga olgan umumiy sinov funktsiyalarini taqdim etadi.
- [Chai](http://chaijs.com) -- ko'plab tasdiqlar bilan kutubxona. Bu juda ko'p tasdiqlardan foydalanishga imkon beradi, hozirda bizga faqat `assert.equal` kerak.
- [Sinon](http://sinonjs.org/) -- funksiyalarni kuzatish, ichki xususiyatlarni taqlid qilish va boshqa ko'p narsalarni ko'rish imkonini beruvchi kutubxona. Keyinchalik biz uchun foydali bo'ladi.

Ushbu kutubxonalar brauzerda ham, serverda ham sinov uchun javob beradi. Bu erda biz brauzer variantini ko'rib chiqamiz.

Ushbu framework-lar va `pow` spetsifikatsiya bilan to'liq HTML-sahifa:

```html src="index.html"
```

Sahifani besh qismga bo'lish mumkin:

1. `<head>` tegi uchinchi tomon kutubxonalari va test uslublarini o'z ichiga oladi.
2. `<script>` tegi sinovdan o'tayotgan funktsiyani o'z ichiga oladi, bizning holatimizda – pow.
3. Testlar - bizning holatda tashqi test skripti `describe("pow",...)` xususiyatlarini o'z ichiga olgan `test.js` yuqorida keltirilgan.
4. HTML elementi `<div id="mocha">` Mocha tomonidan natijalarni chiqarish uchun ishlatiladi.
5. Testlar `mocha.run()` buyrug'i bilan boshlanadi.

Natija:

[iframe height=250 src="pow-1" border=1 edit]

Hozircha test muvaffaqiyatsiz tugadi, xato yuz berdi. Bu aniq: bizda `pow` da bo'sh funktsiya kodi mavjud, shuning uchun `pow(2,3)` `8` o'rniga `undefined` ni qaytaradi.

Kelajak uchun shuni ta'kidlaymizki, [karma](https://karma-runner.github.io/) va boshqalar kabi ilg'or sinovchilar mavjud. Shuning uchun odatda turli xil testlarni o'rnatish muammo emas.

## Dastlabki dastur

Testlar o'tishi uchun `pow` ning sodda dasturini yarataylik:

```js
function pow(x, n) {
  return 8; // :) biz g'irromlik qildik!
}
```

Vau, endi u ishlaydi!

[iframe height=250 src="pow-min" border=1 edit]

## Texnik xususiyatlarini takomillashtirish

Biz qilgan narsa, albatta, g'irromlik. Funktsiya ishlamayapti: `pow(3,4)` ni hisoblash urinishi noto'g'ri natija berishi mumkin, ammo testlar o'tib ketadi.

...Ammo vaziyat odatiy holdir, bu amalda sodir bo'ladi. Sinovlar muvaffaqiyatli o'tadi, ammo funktsiya noto'g'ri ishlaydi. Bizning xususiyatlarimiz nomukammal. Biz unga ko'proq foydalanish holatlarini qo'shishimiz kerak.

`pow(3, 4) = 81` ekanligini tekshirish uchun yana bitta testni qo'shamiz.

Testni tashkil qilishning ikkita usulidan birini bu yerda tanlashimiz mumkin:

1. Birinchi variant - yana bitta `assert` ni xuddi shu `it` ga qo'shish:

    ```js
    describe("pow", function() {

      it("n darajaga ko'taradi", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. Ikkinchisi - ikkinchi testni yaratish:

    ```js
    describe("pow", function() {

      it("2 ning 3 chi darajasi 8 ga teng", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 ning 3 chi darajasi 27 ga teng", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

Asosiy farq shundaki, `assert` xatoga yo'l qo'yganda, `it` bloki darhol tugaydi. Shunday qilib, birinchi variantda birinchi `assert` bajarilmasa, biz ikkinchi `assert` natijasini hech qachon ko'rmaymiz.

Testlarni alohida qilish nima bo'layotgani haqida ko'proq ma'lumot olish uchun foydalidir, shuning uchun ikkinchi variant yaxshiroqdir.

Va bundan tashqari, yana bitta qoidaga amal qilish kerak.

**Bitta test bitta narsani tekshiradi.**

Agar biz testni ko'rib chiqsak va unda ikkita mustaqil tekshiruvni ko'rsak, uni yana ikkita oddiyroq tekshiruvga ajratganimiz ma'qul.

Keling, ikkinchi variant bilan davom etamiz.

Natija:

[iframe height=250 src="pow-2" edit border="1"]

Biz kutganimizdek, ikkinchi sinov muvaffaqiyatsiz tugadi. Albatta, bizning funktsiyamiz har doim `8` ni qaytaradi, `assert` esa `27` ni kutadi.

## Dasturni yaxshilash

Sinovlar muvaffaqiyatli o'tishi uchun aniq narsani yozaylik:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Funktsiyaning yaxshi ishlashiga ishonch hosil qilish uchun uni ko'proq qiymatlar uchun sinab ko'raylik. `it` bloklarini qo'lda yozish o'rniga ularni `for` tsiklida yaratishimiz mumkin:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} ning 3 darajasi ${expected} ga teng`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Natija:

[iframe height=250 src="pow-3" edit border="1"]

## Ichki describe bloklari 

Biz bundan ham ko'proq testlarni qo'shmoqchimiz. Ammo bundan oldin yordamchi funktsiya `makeTest` va `for` birlashtirilishi kerak. Bizga boshqa testlarda `makeTest` kerak bo'lmaydi, faqat `for` da kerak bo'ladi: ularning umumiy vazifasi `pow` ning ushbu darajaga qanday ko'tarilishini tekshirish.

Guruhlash ichki `describe` bloklari bilan amalga oshiriladi:

```js
describe("pow", function() {

*!*
  describe("x ni 3 chi darajaga ko'taradi", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} ning 3 darajasi ${expected} ga teng`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... ko'proq testlar yaratilsa bo'ladi
});
```

Ichki `describe` testlarning yangi "kichik guruhini" tashkil qiladi. Natijada biz nomlangan sinovlani ko'rishimiz mumkin.

[iframe height=250 src="pow-4" edit border="1"]

Kelajakda biz o'z yordamchi funktsiyalari bilan yuqori darajadagi yangi `it` va `describe` bloklarini yozishimiz mumkin. Yuqoridagi misoldan `makeTest` xususiyati mavjud bo'lmaydi.

````smart header="`before/after` va `beforeEach/afterEach`"
Sinovlarni boshlashdan oldin/keyin bajaradigan `before/after` funktsiyalarini, shuningdek *har* `it` dan oldin/keyin bajaradigan `beforeEach/afterEach` funktsiyalarini sozlashimiz mumkin.

Masalan:

```js no-beautify
describe("test", function() {

  before(() => alert("Sinov boshlandi - barcha testlardan oldin"));
  after(() => alert("Sinov tugadi - barcha testlardan so'ng"));

  beforeEach(() => alert("Test oldidan - testni kiriting"));
  afterEach(() => alert("Testdan so'ng - testdan chiqing"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

Bajarilish ketma-ketligi quyidagicha bo'ladi:

```
Sinov boshlandi - barcha testlardan oldin (before)
Test oldidan - testni kiriting (beforeEach)
1
Testdan so'ng - testdan chiqing  (afterEach)
Test oldidan - testni kiriting (beforeEach)
2
Testdan so'ng - testdan chiqing   (afterEach)
Sinov tugadi - barcha testlardan so'ng (after)
```

[edit src="beforeafter" title="Misolni sandbox-da oching."]

Odatda, `beforeEach/afterEach` (`before/after`) ishga tushirishni amalga oshirish, hisoblagichlarni nolga chiqarish yoki testlar (yoki test guruhlari) o'rtasida boshqa bir narsa qilish uchun ishlatiladi.
````

## Texnik xususiyatni kengaytirish

`pow` ning asosiy funktsionalligi to'liq. Rivojlanishning birinchi takrorlanishi amalga oshirildi. Biz nishonlashni va qanday aqlli ekanligimizni aytib bo'lgach, keling, texnik xususiyatlarni yaxshilaymiz.

Yuqorida aytib o'tilganidek, `pow(x,n)` funktsiyasi musbat tamsayı `n` qiymatlari bilan ishlashni anglatadi.

Matematik xatoni ko'rsatish uchun JavaScript funktsiyalari odatda `NaN` ni qaytaradi. Yaroqsiz `n` qiymatlari uchun ham shunday qilaylik.

Birinchidan, bu xatti-harakatni spetsifikatsiyada tasvirlaylik(!).

```js
describe("pow", function() {

  // ...

  it("salbiy n uchun natija NaN bo'ladi", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("n butun son bo'lasa natija NaN bo'ladi", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

Natija yangi testlar bilan:

[iframe height=530 src="pow-nan" edit border="1"]

Yangi qo'shilgan testlar muvaffaqiyatsiz tugadi, chunki bizning dasturimiz ularni qo'llab-quvvatlamaydi. BDD shunday amalga oshirilgan: avval biz muvaffaqiyatsiz testlarni yozamiz, so'ngra ularni amalga oshiramiz.

```smart header="Boshqa tasdiqlar"

Iltimos, `assert.isNaN` tasdiqiga e'tibor bering: u `NaN` ni tekshiradi.

Chai-da boshqa tasdiqlar ham mavjud, masalan:

- `assert.equal(qiymat1, qiymat2)` -- tenglikni tekshiradi `qiymat1 == qiymat2`.
- `assert.strictEqual(qiymat1, qiymat2)` -- qat'iy tenglikni tekshiradi `qiymat1 === qiymat2`.
- `assert.notEqual`, `assert.notStrictEqual` -- yuqoridagilarga teskari tekshiruvlar.
- `assert.isTrue(qiymat)` -- `qiymat === true` tekshiradi
- `assert.isFalse(qiymat)` -- `qiymat === false` tekshiradi
- ...to'liq ro'yxat [hujjatlar](http://chaijs.com/api/assert/)
```

Shunday qilib, biz `pow` ga bir nechta satr qo'shishimiz kerak:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Endi u ishlaydi, barcha testlar o'tadi:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="To'liq yakuniy namunani sandbox-da oching."]

## Xulosa

BDD-da, birinchi navbatda, spetsifikatsiyani yozing va keyin amalga oshiring. Oxir-oqibat bizda ham xususiyat, ham kod mavjud.

Spetsifikatsiyani uchta usulda ishlatish mumkin:

1. **Testlar** kodning to'g'ri ishlashiga kafolat beradi.
2. **Hujjatlar** -- `describe` va `it` funktsiya nimani anglatishini bildiradi.
3. **Misollar** -- testlar aslida funktsiyalardan qanday foydalanish mumkinligini ko'rsatadigan ishchi misollardir.

Xususiyatlar bilan biz funktsiyani noldan xavfsiz ravishda yaxshilay olamiz, o'zgartiramiz, hatto qayta yozamiz va uning hali ham to'g'ri ishlashiga ishonch hosil qilamiz.

Bu katta loyihalarda funktsiyalar ko'p joylarda ishlatilganda, ayniqsa muhimdir. Bunday funktsiyani o'zgartirganimizda, uni ishlatadigan har qanday joyi hali ham to'g'ri ishlashini qo'lda tekshirishni imkoniyati yo'q.

Testlarsiz odamlar ikkita yo'lga ega:

1. O'zgarishlarni nima bo'lishidan qat'iy nazar amalga oshirish. Keyin bizning foydalanuvchilarimizda xatolar paydo bo'ladi, chunki biz, albatta, biror narsani qo'lda tekshirishni unutamiz.
2. Yoki koddagi xatolar uchun jazo jiddiy bo'lsa, odamlar bunday funktsiyalarda o'zgarishlar qilishdan qo'rqishadi. Keyin u eski, o'rgimchak to'ri bilan o'ralgan bo'lib, hech kim unga kirishni xohlamaydi. Bu rivojlanish uchun yaxshi emas.

**Avtomatik testdan o'tgan kod bunga ziddir!**

Agar loyiha testlar bilan qoplangan bo'lsa, unda bunday muammo yo'q. Biz testlarni o'tkazib, bir necha soniya ichida ko'plab tekshiruvlarni ko'rishimiz mumkin.

**Bundan tashqari, yaxshi sinovdan o'tgan kod yaxshi arxitekturaga ega.**

Tabiiyki, uni o'zgartirish va takomillashtirish osonroq. Ammo bu nafaqat.

Sinovlarni yozish uchun kodni shunday tuzish kerakki, har bir funktsiya aniq tavsiflangan vazifa, kirish va chiqish belgilangan bo'lishi kerak. Bu boshidanoq yaxshi arxitekturani anglatadi.

Haqiqiy hayotda bu ba'zan oson emas. Ba'zan haqiqiy koddan oldin spetsifikatsiyani yozish qiyin, chunki u qanday ishlashi kerakligi hali aniq emas. Ammo umuman yozma testlar rivojlanishni tezroq va barqaror qiladi.

## Endi nima?

Keyinchalik, o'quv qo'llanmada, testlar bilan ko'plab vazifalarni uchratamiz, shuning uchun siz ko'plab amaliy misollarni ko'rasiz.

Testlarni yozish uchun JavaScript-ni yaxshi bilish kerak. Ammo biz buni endi o'rganishni boshladik. Shunday qilib, hamma narsani hal qilish uchun, hozirgi kunga kelib sizdan test yozish talab qilinmaydi, lekin siz ushbu bobdan bir oz murakkabroq bo'lsa ham, ularni o'qaolishingiz kerak.
