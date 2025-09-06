# JavaScript animatsiyalari

JavaScript animatsiyalari CSS bilan amalga oshirib bo'lmaydigan narsalarni boshqarishi mumkin.

Masalan, murakkab yo'l bo'ylab harakat qilish, Bezier egri chiziqlaridan farqli timing funksiyasi bilan yoki canvas ustida animatsiya.

## setInterval dan foydalanish

Animatsiyani kadrlar ketma-ketligi sifatida amalga oshirish mumkin -- odatda HTML/CSS xususiyatlarining kichik o'zgarishlari.

Masalan, `style.left`ni `0px`dan `100px`gacha o'zgartirish elementni harakatga keltiradi. Va agar biz uni `setInterval`da oshirsak, sekundiga taxminan 50 marta 2px ga kichik kechikish bilan o'zgartirsak, u silliq ko'rinadi. Bu kinematografiya bilan bir xil printsip: sekundiga 24 kadr silliq ko'rinish uchun etarli.

Psevdo-kod quyidagicha ko'rinishi mumkin:

```js
let timer = setInterval(function() {
  if (animation complete) clearInterval(timer);
  else increase style.left by 2px
}, 20); // har 20ms da 2px ga o'zgartirish, sekundiga taxminan 50 kadr
```

Animatsiyaning to'liqroq misoli:

```js
let start = Date.now(); // boshlanish vaqtini eslab qolish

let timer = setInterval(function() {
  // boshlanishdan qancha vaqt o'tdi?
  let timePassed = Date.now() - start;

  if (timePassed >= 2000) {
    clearInterval(timer); // 2 soniyadan keyin animatsiyani tugatish
    return;
  }

  // timePassed momentida animatsiyani chizish
  draw(timePassed);

}, 20);

// timePassed 0 dan 2000 gacha o'tganda
// left qiymatlari 0px dan 400px gacha oladi
function draw(timePassed) {
  train.style.left = timePassed / 5 + 'px';
}
```

Demo uchun bosing:

[codetabs height=200 src="move"]

## requestAnimationFrame dan foydalanish

Faraz qilaylik, bizda bir vaqtning o'zida bir nechta animatsiyalar ishlayapti.

Agar biz ularni alohida ishga tushirsak, har birida `setInterval(..., 20)` bo'lsa ham, brauzer har `20ms`dan ko'ra tez-tez qayta chizishga majbur bo'ladi.

Buning sababi ular turli boshlanish vaqtiga ega, shuning uchun "har 20ms" turli animatsiyalar o'rtasida farq qiladi. Intervallar bir xil emas. Shunday qilib, `20ms` ichida bir nechta mustaqil ishga tushirish bo'ladi.

Boshqacha qilib aytganda, bu:

```js
setInterval(function() {
  animate1();
  animate2();
  animate3();
}, 20)
```

...Uchta mustaqil chaqiruvdan yengilroq:

```js
setInterval(animate1, 20); // mustaqil animatsiyalar
setInterval(animate2, 20); // skriptning turli joylarida
setInterval(animate3, 20);
```

Bu bir nechta mustaqil qayta chizishlar birlashtirilishi kerak, brauzer uchun qayta chizishni osonlashtirish va shu bilan CPU yukini kamaytirish va silliqroq ko'rinish uchun.

Yodda tutish kerak bo'lgan yana bir narsa bor. Ba'zida CPU yuklanadi yoki kamroq tez qayta chizish uchun boshqa sabablar bor (masalan, brauzer yorlig'i yashiringanda), shuning uchun biz uni har `20ms`da ishlatmasligimiz kerak.

Lekin buni JavaScript-da qanday bilamiz? [Animation timing](http://www.w3.org/TR/animation-timing/) spetsifikatsiyasi mavjud bo'lib, u `requestAnimationFrame` funksiyasini taqdim etadi. U bu barcha masalalarni va undan ham ko'pini hal qiladi.

Sintaksis:
```js
let requestId = requestAnimationFrame(callback)
```

Bu brauzer animatsiya qilmoqchi bo'lgan eng yaqin vaqtda `callback` funksiyasini ishga tushirishni rejalashtiradi.

Agar biz `callback`da elementlarda o'zgarishlar qilsak, ular boshqa `requestAnimationFrame` callback-lari va CSS animatsiyalari bilan birlashtiriladi. Shunday qilib, ko'p marta emas, balki bitta geometriya qayta hisoblanishi va qayta chizilishi bo'ladi.

Qaytarilgan qiymat `requestId` chaqiruvni bekor qilish uchun ishlatilishi mumkin:
```js
// callback-ning rejalashtirilgan bajarilishini bekor qilish
cancelAnimationFrame(requestId);
```

`callback` bitta argumentni oladi -- sahifa yuklanishining boshlanishidan o'tgan vaqt mikrosoniyalarda. Bu vaqtni [performance.now()](mdn:api/Performance/now) ni chaqirish orqali ham olish mumkin.

Odatda `callback` juda tez ishlaydi, CPU yuklanmagan yoki noutbukning batareyasi deyarli tugamagan yoki boshqa sabab bo'lmasa.

Quyidagi kod `requestAnimationFrame` uchun dastlabki 10 ta ishga tushirish orasidagi vaqtni ko'rsatadi. Odatda bu 10-20ms:

```html run height=40 refresh
<script>
  let prev = performance.now();
  let times = 0;

  requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;

    if (times++ < 10) requestAnimationFrame(measure);
  })
</script>
```

## Tuzilgan animatsiya

Endi biz `requestAnimationFrame` asosida universal animatsiya funksiyasini yaratishimiz mumkin:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction 0 dan 1 gacha
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // joriy animatsiya holatini hisoblab chiqish
    let progress = timing(timeFraction)

    draw(progress); // uni chizish

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

`animate` funksiyasi animatsiyani asosan tavsiflayotgan 3ta parametrni qabul qiladi:

`duration`
: Animatsiyaning umumiy vaqti. Masalan, `1000`.

`timing(timeFraction)`
: Timing funksiyasi, CSS-xususiyati `transition-timing-function` kabi, o'tgan vaqtning qismini (`boshlanishda 0`, `oxirida 1`) oladi va animatsiya tugallanishini qaytaradi (Bezier egri chizig'idagi `y` kabi).

    Masalan, chiziqli funksiya animatsiya bir xil tezlik bilan bir tekis davom etishini bildiradi:

    ```js
    function linear(timeFraction) {
      return timeFraction;
    }
    ```

    Uning grafigi:
    ![](linear.svg)

    Bu `transition-timing-function: linear` kabi. Quyida ko'rsatilgan qiziqarli variantlar bor.

`draw(progress)`
: Animatsiya tugallanish holatini oladigan va uni chizadigan funksiya. `progress=0` qiymati boshlang'ich animatsiya holatini, `progress=1` esa oxirgi holatni bildiradi.

    Bu animatsiyani haqiqatan ham chizadigan funksiya.

    U elementni harakatga keltirishi mumkin:
    ```js
    function draw(progress) {
      train.style.left = progress + 'px';
    }
    ```

    ...Yoki boshqa istalgan narsani qilishi mumkin, biz har qanday narsani, har qanday usulda animatsiya qilishimiz mumkin.

Keling, funksiyamizdan foydalanib element `width`ini `0`dan `100%`gacha animatsiya qilaylik.

Demo uchun elementga bosing:

[codetabs height=60 src="width"]

Uning kodi:

```js
animate({
  duration: 1000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    elem.style.width = progress * 100 + '%';
  }
});
```

CSS animatsiyasidan farqli o'laroq, biz bu yerda har qanday timing funksiyasi va har qanday chizish funksiyasini yaratishimiz mumkin. Timing funksiyasi Bezier egri chiziqlari bilan cheklanmagan. Va `draw` xususiyatlardan tashqariga chiqishi mumkin, masalan, otashin animatsiyasi yoki shunga o'xshash narsalar uchun yangi elementlar yaratishi mumkin.

## Timing funksiyalari

Biz yuqorida eng oddiy, chiziqli timing funksiyasini ko'rdik.

Keling, ulardan ko'proqini ko'raylik. Biz ular qanday ishlashini ko'rish uchun turli timing funksiyalari bilan harakat animatsiyalarini sinab ko'ramiz.

### n darajasi

Agar biz animatsiyani tezlashtirmoqchi bo'lsak, `progress`ni `n` darajasida ishlatishimiz mumkin.

Masalan, parabola egri chizig'i:

```js
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
```

Grafik:

![](quad.svg)

Harakatda ko'ring (faollashtirish uchun bosing):

[iframe height=40 src="quad" link]

...Yoki kub egri chizig'i yoki undan ham katta `n`. Darajani oshirish tezroq harakat qilishga olib keladi.

Mana `progress`ning `5` darajasidagi grafigi:

![](quint.svg)

Harakatda:

[iframe height=40 src="quint" link]

### Yoy

Funksiya:

```js
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
```

Grafik:

![](circ.svg)

[iframe height=40 src="circ" link]

### Orqaga: kamon otish

Bu funksiya "kamon otish"ni amalga oshiradi. Avval biz "kamon torini tortamiz", keyin "otamiz".

Oldingi funksiyalardan farqli o'laroq, u qo'shimcha parametr `x` - "elastiklik koeffitsienti"ga bog'liq. "Kamon torini tortish" masofasi uni belgilaydi.

Kod:

```js
function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
```

**`x = 1.5` uchun grafik:**

![](back.svg)

Animatsiya uchun biz uni `x`ning aniq qiymati bilan ishlatamiz. `x = 1.5` uchun misol:

[iframe height=40 src="back" link]

### Sakrash

Tasavvur qiling, biz to'pni tashlaymiz. U pastga tushadi, keyin bir necha marta sakrab qaytadi va to'xtaydi.

`bounce` funksiyasi xuddi shunday qiladi, lekin teskari tartibda: "sakrash" darhol boshlanadi. U buning uchun bir nechta maxsus koeffitsientlardan foydalanadi:

```js
function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}
```

Harakatda:

[iframe height=40 src="bounce" link]

### Elastik animatsiya

"Boshlang'ich diapazon" uchun qo'shimcha parametr `x`ni qabul qiladigan yana bitta "elastik" funksiya.

```js
function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
```

**`x=1.5` uchun grafik:**
![](elastic.svg)

`x=1.5` uchun harakatda:

[iframe height=40 src="elastic" link]

## Teskari: ease*

Shunday qilib, bizda timing funksiyalari to'plami bor. Ularning to'g'ridan-to'g'ri qo'llanilishi "easeIn" deb ataladi.

Ba'zan biz animatsiyani teskari tartibda ko'rsatishimiz kerak. Bu "easeOut" transformatsiyasi bilan amalga oshiriladi.

### easeOut

"easeOut" rejimida `timing` funksiyasi `timingEaseOut` wrapper-ga o'raladi:

```js
timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)
```

Boshqacha qilib aytganda, bizda "oddiy" timing funksiyasini oladigan va uning atrofida wrapper qaytaradigan "transform" funksiyasi `makeEaseOut` bor:

```js
// timing funksiyasini qabul qiladi, o'zgartirilgan variantni qaytaradi
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
```

Masalan, biz yuqorida tasvirlangan `bounce` funksiyasini olib uni qo'llashimiz mumkin:

```js
let bounceEaseOut = makeEaseOut(bounce);
```

Keyin sakrash animatsiyaning boshida emas, balki oxirida bo'ladi. Yanada yaxshi ko'rinadi:

[codetabs src="bounce-easeout"]

Bu yerda biz transformatsiya funksiya harakatini qanday o'zgartirishini ko'rishimiz mumkin:

![](bounce-inout.svg)

Agar boshida animatsiya effekti bo'lsa, masalan, sakrash -- u oxirida ko'rsatiladi.

Yuqoridagi grafikda <span style="color:#EE6B47">oddiy bounce</span> qizil rang bilan, <span style="color:#62C0DC">easeOut bounce</span> esa ko'k rang bilan.

- Oddiy bounce -- ob'ekt pastda sakraydi, keyin oxirida keskin tepaga sakraydi.
- `easeOut` dan keyin -- u avval tepaga sakraydi, keyin u yerda sakraydi.

### easeInOut

Shuningdek, biz effektni animatsiyaning boshida ham, oxirida ham ko'rsatishimiz mumkin. Bu transformatsiya "easeInOut" deb ataladi.

Timing funksiyasi berilgan holda, biz animatsiya holatini quyidagicha hisoblaymiz:

```js
if (timeFraction <= 0.5) { // animatsiyaning birinchi yarmi
  return timing(2 * timeFraction) / 2;
} else { // animatsiyaning ikkinchi yarmi
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
```

Wrapper kodi:

```js
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(bounce);
```

Harakatda, `bounceEaseInOut`:

[codetabs src="bounce-easeinout"]

"easeInOut" transformatsiyasi ikkita grafikni birlashtiradi: animatsiyaning birinchi yarmi uchun `easeIn` (oddiy) va ikkinchi qism uchun `easeOut` (teskari).

Agar biz `circ` timing funksiyasining `easeIn`, `easeOut` va `easeInOut` grafiklarini solishtirsak, effekt aniq ko'rinadi:

![](circ-ease.svg)

- <span style="color:#EE6B47">Qizil</span> - `circ` (`easeIn`) ning oddiy varianti.
- <span style="color:#8DB173">Yashil</span> -- `easeOut`.
- <span style="color:#62C0DC">Ko'k</span> -- `easeInOut`.

Ko'rib turganingizdek, animatsiyaning birinchi yarmining grafigi kichraytirilgan `easeIn`, ikkinchi yarmi esa kichraytirilgan `easeOut`. Natijada, animatsiya bir xil effekt bilan boshlanadi va tugaydi.

## Qiziqarli "draw"

Elementni harakatga keltirish o'rniga boshqa narsani qilishimiz mumkin. Bizga kerak bo'lgan narsa - to'g'ri `draw` yozish.

Mana animatsiyalangan "sakrash" matn yozishi:

[codetabs src="text"]

## Xulosa

CSS yaxshi boshqara olmaydigan animatsiyalar yoki qat'iy nazorat kerak bo'lganlar uchun JavaScript yordam berishi mumkin. JavaScript animatsiyalari `requestAnimationFrame` orqali amalga oshirilishi kerak. Bu o'rnatilgan metod brauzer qayta chizishga tayyorlanayotganda callback funksiyasini ishga tushirish imkonini beradi. Odatda bu juda tez, lekin aniq vaqt brauzerga bog'liq.

Sahifa fonda bo'lganda, qayta chizishlar umuman bo'lmaydi, shuning uchun callback ishlamaydi: animatsiya to'xtatiladi va resurslarni iste'mol qilmaydi. Bu ajoyib.

Mana ko'pchilik animatsiyalarni sozlash uchun yordamchi `animate` funksiyasi:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction 0 dan 1 gacha
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // joriy animatsiya holatini hisoblash
    let progress = timing(timeFraction);

    draw(progress); // uni chizish

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

Opsiyalar:

- `duration` -- ms da umumiy animatsiya vaqti.
- `timing` -- animatsiya jarayonini hisoblash funksiyasi. 0 dan 1 gacha vaqt qismini oladi, animatsiya jarayonini qaytaradi, odatda 0 dan 1 gacha.
- `draw` -- animatsiyani chizish funksiyasi.

Albatta biz uni yaxshilashimiz, ko'proq xususiyatlar qo'shishimiz mumkin, lekin JavaScript animatsiyalari har kuni qo'llanilmaydi. Ular qiziqarli va nostandart narsalar qilish uchun ishlatiladi. Shuning uchun siz kerak bo'lganda kerakli xususiyatlarni qo'shmoqchi bo'lasiz.

JavaScript animatsiyalari har qanday timing funksiyasidan foydalanishi mumkin. Biz ularni yanada ko'p qirrali qilish uchun ko'plab misollar va transformatsiyalarni ko'rib chiqdik. CSS dan farqli o'laroq, biz bu yerda Bezier egri chiziqlari bilan cheklanmaymiz.

`draw` haqida ham xuddi shunday: biz CSS xususiyatlari emas, balki har qanday narsani animatsiya qilishimiz mumkin.