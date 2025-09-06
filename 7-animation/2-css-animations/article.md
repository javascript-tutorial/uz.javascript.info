# CSS animatsiyalari

CSS animatsiyalari JavaScript'siz oddiy animatsiyalar yaratish imkonini beradi.

JavaScript CSS animatsiyalarini boshqarish va ularni ozgina kod bilan yanada yaxshilash uchun ishlatilishi mumkin.

## CSS o'tishlar [#css-transition]

CSS o'tishlari g'oyasi oddiy. Biz xususiyatni va uning o'zgarishlarini qanday animatsiya qilish kerakligini tavsiflaymiz. Xususiyat o'zgartirilganda, brauzer animatsiyani chizadi.

Ya'ni, bizga kerak bo'lgan narsa - xususiyatni o'zgartirish, suyuq o'tish esa brauzer tomonidan amalga oshiriladi.

Masalan, quyidagi CSS `background-color` o'zgarishlarini 3 soniya davomida animatsiya qiladi:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Endi agar element `.animated` klassiga ega bo'lsa, `background-color` ning har qanday o'zgarishi 3 soniya davomida animatsiya qilinadi.

Fonga animatsiya berish uchun quyidagi tugmani bosing:

```html run autorun height=60
<button id="color">Meni bosing</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

CSS o'tishlarini tavsiflash uchun 4 ta xususiyat mavjud:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

Ularni bir zumda ko'rib chiqamiz, hozircha umumiy `transition` xususiyati ularni birgalikda `property duration timing-function delay` tartibida e'lon qilish imkonini beradi va bir vaqtning o'zida bir nechta xususiyatni animatsiya qilish imkonini beradi.

Masalan, bu tugma ham `color`, ham `font-size`ni animatsiya qiladi:

```html run height=80 autorun no-beautify
<button id="growing">Meni bosing</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

Endi keling, animatsiya xususiyatlarini birma-bir ko'rib chiqamiz.

## transition-property

`transition-property`da biz animatsiya qilinadigan xususiyatlar ro'yxatini yozamiz, masalan: `left`, `margin-left`, `height`, `color`. Yoki biz `all` yozishimiz mumkin, bu "barcha xususiyatlarni animatsiya qil" degani.

Shuni ta'kidlaymizki, animatsiya qilinmaydigan xususiyatlar mavjud. Ammo, [ko'pgina odatda ishlatiladigan xususiyatlar animatsiya qilish mumkin](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## transition-duration

`transition-duration`da biz animatsiya qancha davom etishini belgilashimiz mumkin. Vaqt [CSS vaqt formatida](http://www.w3.org/TR/css3-values/#time) bo'lishi kerak: soniyalarda `s` yoki millisioniyalarda `ms`.

## transition-delay

`transition-delay`da biz animatsiya *oldidan* kechikishni belgilashimiz mumkin. Masalan, agar `transition-delay` `1s` va `transition-duration` `2s` bo'lsa, animatsiya xususiyat o'zgarishidan 1 soniya keyin boshlanadi va umumiy davomiyligi 2 soniya bo'ladi.

Manfiy qiymatlar ham mumkin. Keyin animatsiya darhol ko'rsatiladi, lekin animatsiyaning boshlang'ich nuqtasi berilgan qiymatdan (vaqt) keyin bo'ladi. Masalan, agar `transition-delay` `-1s` va `transition-duration` `2s` bo'lsa, animatsiya yarim yo'ldan boshlanadi va umumiy davomiyligi 1 soniya bo'ladi.

Bu yerda animatsiya CSS `translate` xususiyatidan foydalanib raqamlarni `0`dan `9`gacha siljitadi:

[codetabs src="digits"]

`transform` xususiyati quyidagicha animatsiya qilinadi:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

Yuqoridagi misolda JavaScript elementga `.animate` klassini qo'shadi -- va animatsiya boshlanadi:

```js
stripe.classList.add('animate');
```

Shuningdek, biz uni o'tishning o'rtasidan, aniq raqamdan, masalan, joriy soniyaga mos keluvchi, manfiy `transition-delay` yordamida boshlashimiz mumkin.

Bu yerda raqamni bossangiz -- u joriy soniyadan animatsiyani boshlaydi:

[codetabs src="digits-negative-delay"]

JavaScript buni qo'shimcha satr bilan qiladi:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // masalan, bu yerda -3s animatsiyani 3-soniyadan boshlaydi
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

Timing funksiyasi animatsiya jarayoni uning vaqt chizig'i bo'yicha qanday taqsimlanishini tavsiflaydi. U sekin boshlanib, keyin tez boradimi yoki aksincha.

Dastlab eng murakkab xususiyat bo'lib ko'rinadi. Lekin agar biz unga ozgina vaqt ajratsak, u juda oddiy bo'ladi.

Bu xususiyat ikki xil qiymatni qabul qiladi: Bezier egri chizig'i yoki qadamlar. Keling, egri chiziqdan boshlaylik, chunki u tez-tez ishlatiladi.

### Bezier egri chizig'i

Timing funksiyasi quyidagi shartlarni qondiradigan 4 ta nazorat nuqtasi bilan [Bezier egri chizig'i](/bezier-curve) sifatida o'rnatilishi mumkin:

1. Birinchi nazorat nuqtasi: `(0,0)`.
2. Oxirgi nazorat nuqtasi: `(1,1)`.
3. Oraliq nuqtalar uchun `x` qiymatlari `0..1` intervalida bo'lishi kerak, `y` har qanday bo'lishi mumkin.

CSS da Bezier egri chizig'i sintaksisi: `cubic-bezier(x2, y2, x3, y3)`. Bu yerda biz faqat 2-chi va 3-chi nazorat nuqtalarini belgilashimiz kerak, chunki 1-chi `(0,0)`ga, 4-chisi esa `(1,1)`ga mahkamlangan.

Timing funksiyasi animatsiya jarayoni qanchalik tez borishini tavsiflaydi.

- `x` o'qi vaqt: `0` -- boshlanish, `1` -- `transition-duration` oxiri.
- `y` o'qi jarayonning tugallanishini bildiradi: `0` -- xususiyatning boshlang'ich qiymati, `1` -- yakuniy qiymat.

Eng oddiy variant animatsiya bir xil chiziqli tezlik bilan bir tekis borishidir. Bu `cubic-bezier(0, 0, 1, 1)` egri chizig'i bilan belgilanishi mumkin.

Bu egri chiziq quyidagicha ko'rinadi:

![](bezier-linear.svg)

...Ko'rib turganingizdek, bu shunchaki to'g'ri chiziq. Vaqt (`x`) o'tishi bilan animatsiyaning tugallanishi (`y`) barqaror ravishda `0`dan `1`gacha boradi.

Quyidagi misoldagi poyezd chapdan o'ngga doimiy tezlik bilan boradi (uni bosing):

[codetabs src="train-linear"]

CSS `transition` shu egri chiziqqa asoslangan:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript left ni 450px ga o'rnatadi */
}
```

...Va poyezdning sekinlashuvini qanday ko'rsatishimiz mumkin?

Biz boshqa Bezier egri chizig'idan foydalanishimiz mumkin: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

Grafik:

![](train-curve.svg)

Ko'rib turganingizdek, jarayon tez boshlanadi: egri chiziq yuqoriga ko'tariladi, keyin sekinroq va sekinroq.

Timing funksiyasi amalda (poyezdni bosing):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript left ni 450px ga o'rnatadi */
}
```

Bir nechta o'rnatilgan egri chiziqlar mavjud: `linear`, `ease`, `ease-in`, `ease-out` va `ease-in-out`.

`linear` - `cubic-bezier(0, 0, 1, 1)` uchun qisqartma -- to'g'ri chiziq, yuqorida tasvirlagan.

Boshqa nomlar quyidagi `cubic-bezier` uchun qisqartmalar:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, rasm](ease.svg) | ![ease-in, rasm](ease-in.svg) | ![ease-out, rasm](ease-out.svg) | ![ease-in-out, rasm](ease-in-out.svg) |

`*` -- sukut bo'yicha, agar timing funksiyasi bo'lmasa, `ease` ishlatiladi.

Shunday qilib, sekinlashayotgan poyezd uchun `ease-out` ishlatishimiz mumkin:

```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Lekin u biroz boshqacha ko'rinadi.

**Bezier egri chizig'i animatsiyani o'z oralig'idan oshirib yuborishi mumkin.**

Egri chiziqdagi nazorat nuqtalari har qanday `y` koordinatlariga ega bo'lishi mumkin: hatto manfiy yoki kattaroq. Keyin Bezier egri chizig'i ham juda past yoki baland cho'ziladi va animatsiya normal oralig'idan tashqariga chiqadi.

Quyidagi misolda animatsiya kodi:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript left ni 400px ga o'rnatadi */
}
```

`left` xususiyati `100px`dan `400px`gacha animatsiya qilinishi kerak.

Lekin poyezdni bossangiz, quyidagini ko'rasiz:

- Avval poyezd *orqaga* boradi: `left` `100px`dan kam bo'ladi.
- Keyin u oldinga, `400px`dan biroz uzoqroq boradi.
- Va keyin yana orqaga -- `400px`gacha.

[codetabs src="train-over"]

Nima uchun bu sodir bo'lishi berilgan Bezier egri chizig'ining grafikiga qarash bilan aniq:

![](bezier-train-over.svg)

Biz 2-nuqtaning `y` koordinatasini noldan pastga surdik va 3-nuqta uchun uni `1`dan yuqori qildik, shuning uchun egri chiziq "oddiy" kvadrantdan chiqadi. `y` "standart" `0..1` oralig'idan tashqarida.

Bilganimizdek, `y` "animatsiya jarayonining tugallanishini" o'lchaydi. `y = 0` qiymati boshlang'ich xususiyat qiymatiga, `y = 1` esa yakuniy qiymatga mos keladi. Shunday qilib, `y<0` qiymatlar xususiyatni boshlang'ich `left`dan tashqariga, `y>1` esa yakuniy `left`dan tashqariga siljitadi.

Bu, albatta, "yumshoq" variant. Agar biz `-99` va `99` kabi `y` qiymatlarini qo'ysak, poyezd oraliqdan ancha tashqariga chiqib ketardi.

Lekin muayyan vazifa uchun Bezier egri chizig'ini qanday yaratamiz? Ko'pgina vositalar mavjud. Masalan, buni <http://cubic-bezier.com/> saytida qilishimiz mumkin.

### Qadamlar

Timing funksiyasi `steps(qadamlar soni[, start/end])` animatsiyani qadamlarga bo'lish imkonini beradi.

Keling, buni raqamlar misolida ko'raylik.

Mana animatsiyasiz raqamlar ro'yxati, faqat manba sifatida:

[codetabs src="step-list"]

Biz raqamlarni diskret tarzda paydo qilish uchun qizil "oyna"dan tashqaridagi ro'yxat qismini ko'rinmas qilamiz va har qadamda ro'yxatni chapga siljitamiz.

9 qadam bo'ladi, har bir raqam uchun qadam-harakat:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

Amalda:

[codetabs src="step"]

`steps(9, start)` ning birinchi argumenti qadamlar soni. Transformatsiya 9 qismga bo'linadi (har biri 10%). Vaqt intervali ham avtomatik ravishda 9 qismga bo'linadi, shuning uchun `transition: 9s` bizga butun animatsiya uchun 9 soniya beradi -- har raqam uchun 1 soniya.

Ikkinchi argument ikkita so'zdan biri: `start` yoki `end`.

`start` degani, animatsiya boshida biz birinchi qadamni darhol qilishimiz kerak.

Buni animatsiya davomida kuzatishimiz mumkin: raqamni bossak, u darhol `1`ga o'zgaradi (birinchi qadam), keyin keyingi soniya boshida o'zgaradi.

Jarayon quyidagicha boradi:

- `0s` -- `-10%` (1-soniyaning boshida birinchi o'zgarish, darhol)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (oxirgi soniya yakuniy qiymatni ko'rsatadi).

Muqobil qiymat `end` o'zgarish har soniyaning boshida emas, balki oxirida qo'llanilishi kerakligini bildiradi.

Shunday qilib, jarayon quyidagicha boradi:

- `0s` -- `0`
- `1s` -- `-10%` (1-soniya oxirida birinchi o'zgarish)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Mana `steps(9, end)` amalda (birinchi raqam o'zgarishi orasidagi pauza'ga e'tibor bering):

[codetabs src="step-end"]

Qisqartma qiymatlari ham mavjud:

- `step-start` -- `steps(1, start)` bilan bir xil. Ya'ni, animatsiya darhol boshlanadi va 1 qadam oladi. Shunday qilib, u darhol boshlanadi va tugaydi, go'yo animatsiya yo'qdek.
- `step-end` -- `steps(1, end)` bilan bir xil: animatsiyani `transition-duration` oxirida bitta qadamda amalga oshiring.

Bu qiymatlar kamdan-kam ishlatiladi, chunki bu haqiqatan ham animatsiya emas, balki bitta qadam o'zgarishi.

## transitionend hodisasi

CSS animatsiyasi tugaganda `transitionend` hodisasi ishga tushadi.

U animatsiya tugagandan keyin harakat qilish uchun keng qo'llaniladi. Shuningdek, biz animatsiyalarni birlashtirishimiz mumkin.

Masalan, quyidagi misoldagi kema bosilganda u yerga va qaytganda suzib boradi, har safar o'ngga qarab uzoqroq va uzoqroq:

[iframe src="boat" height=300 edit link]

Animatsiya har safar o'tish tugaganda qayta ishlaydigan va yo'nalishni o'zgartiradigan `go` funksiyasi tomonidan boshlanadi:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // o'ngga suzish
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // chapga suzish
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

`transitionend` uchun hodisa ob'ekti bir nechta maxsus xususiyatlarga ega:

`event.propertyName`
: Animatsiyasi tugagan xususiyat. Bir vaqtning o'zida bir nechta xususiyatni animatsiya qilsak foydali bo'lishi mumkin.

`event.elapsedTime`
: Animatsiya olgan vaqt (soniyalarda), `transition-delay`siz.

## Keyframes

Biz `@keyframes` CSS qoidasidan foydalanib bir nechta oddiy animatsiyalarni birlashtirishimiz mumkin.

U animatsiyaning "nomi"ni va qoidalarni belgilaydi - nimani, qachon va qayerda animatsiya qilishni. Keyin `animation` xususiyatidan foydalanib, biz animatsiyani elementga biriktirish va uning uchun qo'shimcha parametrlarni belgilashimiz mumkin.

Mana tushuntirishlar bilan misol:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* unga nom bering: "go-left-right" */
    from { left: 0px; }             /* left: 0px dan animatsiya qiling */
    to { left: calc(100% - 50px); } /* left: 100%-50px gacha animatsiya qiling */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* "go-left-right" animatsiyasini elementga qo'llang
       davomiyligi 3 soniya
       marta soni: cheksiz
       har safar yo'nalishni o'zgartiring
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

`@keyframes` haqida ko'plab maqolalar va [batafsil spetsifikatsiya](https://drafts.csswg.org/css-animations/) mavjud.

Saytlaringizda hamma narsa doimiy harakatda bo'lmasa, ehtimol sizga `@keyframes` tez-tez kerak bo'lmaydi.

## Xulosa

CSS animatsiyalari bitta yoki bir nechta CSS xususiyatlarining silliq (yoki yo'q) animatsiya o'zgarishlariga imkon beradi.

Ular ko'pchilik animatsiya vazifalari uchun yaxshi. Shuningdek, biz animatsiyalar uchun JavaScript'dan foydalanishimiz mumkin, keyingi bob bunga bag'ishlangan.

JavaScript animatsiyalariga nisbatan CSS animatsiyalarining cheklovlari:

```compare plus="CSS animatsiyalari" minus="JavaScript animatsiyalari"
+ Oddiy ishlar oddiy amalga oshiriladi.
+ CPU uchun tez va yengil.
- JavaScript animatsiyalari moslashuvchan. Ular element "portlashi" kabi har qanday animatsiya mantiqini amalga oshirishi mumkin.
- Faqat xususiyat o'zgarishlari emas. Biz JavaScript'da animatsiyaning bir qismi sifatida yangi elementlar yaratishimiz mumkin.
```

Animatsiyalarning aksariyati ushbu bobda tasvirlanganidek CSS yordamida amalga oshirilishi mumkin. Va `transitionend` hodisasi animatsiyadan keyin JavaScript'ni ishga tushirish imkonini beradi, shuning uchun u kod bilan yaxshi integratsiya qilinadi.

Lekin keyingi bobda biz murakkabroq holatlarni qamrab olish uchun JavaScript animatsiyalarini qilamiz.