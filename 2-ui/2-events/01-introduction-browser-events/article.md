# Brauzer hodisalariga kirish

*Hodisa* - bu biror narsa sodir bo'lganining signali. Barcha DOM tugunlar bunday signallar hosil qiladi (lekin hodisalar faqat DOM bilan cheklanmaydi).

Eng foydali DOM hodisalarning ro'yxati, shunchaki ko'rib chiqish uchun:

**Sichqoncha hodisalari:**
- `click` -- sichqoncha element ustiga bosganda (sensorli ekran qurilmalari buni teginishda hosil qiladi).
- `contextmenu` -- sichqoncha element ustiga o'ng tugma bilan bosganda.
- `mouseover` / `mouseout` -- sichqoncha kursori element ustiga kelganda / chiqib ketganda.
- `mousedown` / `mouseup` -- sichqoncha tugmasi element ustida bosilganda / qo'yib yuborilganda.
- `mousemove` -- sichqoncha harakatlantirilganda.

**Klaviatura hodisalari:**
- `keydown` va `keyup` -- klaviatura tugmasi bosilganda va qo'yib yuborilganda.

**Forma elementlari hodisalari:**
- `submit` -- tashrif buyuruvchi `<form>` ni yuborganda.
- `focus` -- tashrif buyuruvchi elementga, masalan `<input>` ga fokuslashtirganida.

**Hujjat hodisalari:**
- `DOMContentLoaded` -- HTML yuklanganda va qayta ishlanganda, DOM to'liq qurilganda.

**CSS hodisalari:**
- `transitionend` -- CSS-animatsiya tugaganda.

Boshqa ko'plab hodisalar ham mavjud. Keyingi boblarda ma'lum hodisalarning tafsilotlariga to'xtalamiz.

## Hodisa ishlov beruvchilari

Hodisalarga javob berish uchun biz *ishlov beruvchi* tayinlashimiz mumkin -- hodisa holatida ishlaydigan funksiya.

Ishlov beruvchilar foydalanuvchi harakatlari holatida JavaScript kodini ishga tushirish usuli.

Ishlov beruvchi tayinlashning bir necha usuli mavjud. Keling, ularni ko'rib chiqaylik, eng oddiydan boshlab.

### HTML-atribut

Ishlov beruvchi HTML da `on<event>` nomli atribut bilan o'rnatilishi mumkin.

Masalan, `input` uchun `click` ishlov beruvchisini tayinlash uchun biz `onclick` dan foydalanishimiz mumkin:

```html run
<input value="Menga bosing" *!*onclick="alert('Bosish!')"*/!* type="button">
```

Sichqoncha bosilganda, `onclick` ichidagi kod ishlaydi.

Diqqat qiling, `onclick` ichida biz bitta qo'shtirnoqlardan foydalanamiz, chunki atributning o'zi qo'sh qo'shtirnoqlarda. Agar biz kod atribut ichida ekanligini unutib, ichida qo'sh qo'shtirnoqlardan foydalansak, masalan: `onclick="alert("Bosish!")"`, u to'g'ri ishlamaydi.

HTML-atribut ko'p kod yozish uchun qulay joy emas, shuning uchun JavaScript funksiyasi yaratib, uni chaqirish yaxshiroq.

Bu yerda bosish `countRabbits()` funksiyasini ishga tushiradi:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Quyon raqami " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Quyonlarni sana!">
```

Ma'lumki, HTML atribut nomlari katta-kichik harfga sezgir emas, shuning uchun `ONCLICK` ham `onClick` va `onCLICK` kabi ishlaydi... Lekin odatda atributlar kichik harflarda yoziladi: `onclick`.

### DOM xossasi

Biz `on<event>` DOM xossasidan foydalanib ishlov beruvchi tayinlashimiz mumkin.

Masalan, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Menga bosing">
<script>
*!*
  elem.onclick = function() {
    alert('Rahmat');
  };
*/!*
</script>
```

Agar ishlov beruvchi HTML-atribut yordamida tayinlangan bo'lsa, brauzer uni o'qiydi, atribut mazmunidan yangi funksiya yaratadi va uni DOM xossasiga yozadi.

Demak, bu usul aslida avvalgisi bilan bir xil.

Bu ikki kod qismi bir xil ishlaydi:

1. Faqat HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Bosish!')"*/!* value="Tugma">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Tugma">
    <script>
    *!*
      button.onclick = function() {
        alert('Bosish!');
      };
    */!*
    </script>
    ```

Birinchi misolda HTML atributi `button.onclick` ni ishga tushirish uchun ishlatiladi, ikkinchi misolda esa -- skript, farq faqat shu.

**Faqat bitta `onclick` xossasi borligi sababli, biz birdanortiq hodisa ishlov beruvchisini tayinlay olmaymiz.**

Quyidagi misolda JavaScript bilan ishlov beruvchi qo'shish mavjud ishlov beruvchini ustiga yozadi:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Oldin')" value="Menga bosing">
<script>
*!*
  elem.onclick = function() { // mavjud ishlov beruvchini ustiga yozadi
    alert('Keyin'); // faqat bu ko'rsatiladi
  };
*/!*
</script>
```

Ishlov beruvchini olib tashlash uchun -- `elem.onclick = null` tayinlang.

## Elementga kirish: this

Ishlov beruvchi ichidagi `this` qiymati elementdir. Ishlov beruvchi o'rnatilgan element.

Quyidagi kodda `button` o'z mazmunini `this.innerHTML` yordamida ko'rsatadi:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Menga bosing</button>
```

## Mumkin bo'lgan xatolar

Agar siz hodisalar bilan ishlashni boshlayotgan bo'lsangiz -- ba'zi nozikliklarni yodda tuting.

Biz mavjud funksiyani ishlov beruvchi sifatida o'rnatishimiz mumkin:

```js
function sayThanks() {
  alert('Rahmat!');
}

elem.onclick = sayThanks;
```

Lekin ehtiyot bo'ling: funksiya `sayThanks` sifatida tayinlanishi kerak, `sayThanks()` emas.

```js
// to'g'ri
button.onclick = sayThanks;

// noto'g'ri
button.onclick = sayThanks();
```

Agar qavs qo'shsak, `sayThanks()` funksiya chaqiruvi bo'ladi. Demak, oxirgi qator aslida funksiya bajarilishining *natijasini*, ya'ni `undefined` ni (funksiya hech narsa qaytarmaydi) oladi va uni `onclick` ga tayinlaydi. Bu ishlamaydi.

...Boshqa tomondan, markupda bizga qavslar kerak:

```html
<input type="button" id="button" onclick="sayThanks()">
```

Farqni tushuntirish oson. Brauzer atributni o'qiganda, u atribut mazmunidan tanali ishlov beruvchi funksiyasini yaratadi.

Demak, markup ushbu xossani hosil qiladi:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- atribut mazmuni bu yerga kiradi
*/!*
};
```

**Ishlov beruvchilar uchun `setAttribute` dan foydalanmang.**

Bunday chaqiruv ishlamaydi:

```js run no-beautify
// <body> ga bosish xatolarga olib keladi,
// chunki atributlar doim satrlar, funksiya satrga aylanadi
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-xossasi katta-kichik harf muhim.**

Ishlov beruvchini `elem.onclick` ga tayinlang, `elem.ONCLICK` ga emas, chunki DOM xossalari katta-kichik harfga sezgir.

## addEventListener

Yuqorida aytilgan ishlov beruvchilarni tayinlash usullarining asosiy muammosi -- biz bitta hodisaga bir nechta ishlov beruvchi tayinlay olmaymiz.

Aytaylik, bizning kodimizning bir qismi bosishda tugmani ajratib ko'rsatmoqchi, boshqasi esa bir xil bosishda xabar ko'rsatmoqchi.

Buning uchun ikkita hodisa ishlov beruvchisini tayinlamoqchimiz. Lekin yangi DOM xossasi mavjud birini ustiga yozadi:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // avvalgi ishlov beruvchini almashtiradi
```

Veb standartlari ishlab chiquvchilari buni uzoq vaqt oldin tushunib, `addEventListener` va `removeEventListener` maxsus metodlari yordamida ishlov beruvchilarni boshqarishning muqobil usulini taklif qildilar. Ular bunday muammodan xoli.

Ishlov beruvchi qo'shish sintaksisi:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Hodisa nomi, masalan `"click"`.

`handler`
: Ishlov beruvchi funksiya.

`options`
: Xossalari bilan qo'shimcha ixtiyoriy obyekt:
    - `once`: agar `true` bo'lsa, tinglovchi ishga tushgandan keyin avtomatik ravishda olib tashlanadi.
    - `capture`: hodisani qaysi fazada qayta ishlash kerakligi, keyinroq <info:bubbling-and-capturing> bobida ko'rib chiqiladi. Tarixiy sabablarga ko'ra, `options` `false/true` ham bo'lishi mumkin, bu `{capture: false/true}` bilan bir xil.
    - `passive`: agar `true` bo'lsa, ishlov beruvchi `preventDefault()` ni chaqirmaydi, buni keyinroq <info:default-browser-action> da tushuntiramiz.

Ishlov beruvchini olib tashlash uchun `removeEventListener` dan foydalaning:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Olib tashlash uchun bir xil funksiya kerak"
Ishlov beruvchini olib tashlash uchun tayinlangan funksiya bilan aynan bir xil funksiyani uzatishimiz kerak.

Bu ishlamaydi:

```js no-beautify
elem.addEventListener( "click" , () => alert('Rahmat!'));
// ....
elem.removeEventListener( "click", () => alert('Rahmat!'));
```

Ishlov beruvchi olib tashlanmaydi, chunki `removeEventListener` boshqa funksiyani oladi -- bir xil kod bilan, lekin bu muhim emas, chunki bu boshqa funksiya obyekti.

To'g'ri usul:

```js
function handler() {
  alert( 'Rahmat!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Diqqat qiling -- agar biz funksiyani o'zgaruvchida saqlamasak, uni olib tashlay olmaymiz. `addEventListener` tomonidan tayinlangan ishlov beruvchilarni "qayta o'qish" imkoni yo'q.
````

`addEventListener` ga bir nechta chaqiruv bir nechta ishlov beruvchi qo'shishga imkon beradi:

```html run no-beautify
<input id="elem" type="button" value="Menga bosing"/>

<script>
  function handler1() {
    alert('Rahmat!');
  };

  function handler2() {
    alert('Yana rahmat!');
  }

*!*
  elem.onclick = () => alert("Salom");
  elem.addEventListener("click", handler1); // Rahmat!
  elem.addEventListener("click", handler2); // Yana rahmat!
*/!*
</script>
```

Yuqoridagi misolda ko'rib turganimizdek, biz ishlov beruvchilarni *ham* DOM-xossasi, *ham* `addEventListener` yordamida o'rnatishimiz mumkin. Lekin odatda biz faqat bitta usuldan foydalanamiz.

````warn header="Ba'zi hodisalar uchun ishlov beruvchilar faqat `addEventListener` bilan ishlaydi"
DOM-xossasi orqali tayinlab bo'lmaydigan hodisalar mavjud. Faqat `addEventListener` bilan.

Masalan, hujjat yuklanganda va DOM qurilganda ishga tushadigan `DOMContentLoaded` hodisasi.

```js
// hech qachon ishlamaydi
document.onDOMContentLoaded = function() {
  alert("DOM qurildi");
};
```

```js
// shu usul bilan ishlaydi
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM qurildi");
});
```
Demak `addEventListener` universalroq. Garchi, bunday hodisalar istisno, qoida emas.
````

## Hodisa obyekti

Hodisani to'g'ri qayta ishlash uchun nima sodir bo'lganligi haqida ko'proq bilmoqchimiz. Faqat "bosish" yoki "tugma bosish" emas, balki ko'rsatkich koordinatalari qanday? Qaysi tugma bosilgan? Va hokazo.

Hodisa sodir bo'lganda, brauzer *hodisa obyekti* yaratadi, unga tafsilotlarni joylashtiradi va uni ishlov beruvchiga argument sifatida uzatadi.

Hodisa obyektidan ko'rsatkich koordinatalarini olish misoli:

```html run
<input type="button" value="Menga bosing" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // hodisa turi, elementi va bosish koordinatalarini ko'rsatish
    alert(event.type + " da " + event.currentTarget);
    alert("Koordinatalar: " + event.clientX + ":" + event.clientY);
  };
</script>
```

`event` obyektining ba'zi xossalari:

`event.type`
: Hodisa turi, bu yerda `"click"`.

`event.currentTarget`
: Hodisani qayta ishlovchi element. Bu `this` bilan aynan bir xil, agar ishlov beruvchi o'q funksiya bo'lmasa yoki uning `this` boshqa narsaga bog'lanmagan bo'lsa, u holda biz elementni `event.currentTarget` dan olishimiz mumkin.

`event.clientX / event.clientY`
: Ko'rsatkich hodisalari uchun kursorning oynaga nisbatan koordinatalari.

Ko'proq xossalar mavjud. Ularning ko'pchiligi hodisa turiga bog'liq: klaviatura hodisalarida bir xossalar to'plami, ko'rsatkich hodisalarida - boshqasi, biz ularni keyinroq turli hodisalarni batafsil ko'rib chiqishda o'rganamiz.

````smart header="Hodisa obyekti HTML ishlov beruvchilarida ham mavjud"
Agar biz HTML da ishlov beruvchi tayinlasak, `event` obyektini ham ishlatishimiz mumkin:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Hodisa turi">
```

Bu mumkin, chunki brauzer atributni o'qiganda, u shunday ishlov beruvchi yaratadi: `function(event) { alert(event.type) }`. Ya'ni: uning birinchi argumenti `"event"` deb ataladi va tanasi atributdan olinadi.
````

## Obyekt ishlov beruvchilari: handleEvent

Biz `addEventListener` yordamida hodisa ishlov beruvchi sifatida faqat funksiya emas, balki obyektni ham tayinlashimiz mumkin. Hodisa sodir bo'lganda, uning `handleEvent` metodi chaqiriladi.

Masalan:

```html run
<button id="elem">Menga bosing</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " da " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Ko'rib turganimizdek, `addEventListener` ishlov beruvchi sifatida obyektni qabul qilganda, u hodisa holatida `obj.handleEvent(event)` ni chaqiradi.

Buning uchun sinfdan ham foydalanishimiz mumkin:

```html run
<button id="elem">Menga bosing</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Sichqoncha tugmasi bosildi";
          break;
        case 'mouseup':
          elem.innerHTML += "...va qo'yib yuborildi.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Bu yerda bir xil obyekt ikkala hodisani qayta ishlaydi. Diqqat qiling, biz `addEventListener` yordamida tinglash uchun hodisalarni aniq o'rnatishimiz kerak. `menu` obyekti faqat `mousedown` va `mouseup` ni oladi, boshqa turdagi hodisalarni emas.

`handleEvent` metodi barcha ishni o'zi qilishi shart emas. U o'rniga hodisaga xos boshqa metodlarni chaqirishi mumkin:

```html run
<button id="elem">Menga bosing</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Sichqoncha tugmasi bosildi";
    }

    onMouseup() {
      elem.innerHTML += "...va qo'yib yuborildi.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Endi hodisa ishlov beruvchilari aniq ajratildi, uni qo'llab-quvvatlash osonroq bo'lishi mumkin.

## Xulosa

Hodisa ishlov beruvchilarni tayinlashning 3 usuli bor:

1. HTML atributi: `onclick="..."`.
2. DOM xossasi: `elem.onclick = function`.
3. Metodlar: qo'shish uchun `elem.addEventListener(event, handler[, phase])`, olib tashlash uchun `removeEventListener`.

HTML atributlari kamdan-kam ishlatiladi, chunki HTML tegi o'rtasidagi JavaScript biroz g'alati va begona ko'rinadi. Shuningdek, u yerda ko'p kod yozib bo'lmaydi.

DOM xossalarini ishlatish yaxshi, lekin biz ma'lum hodisaning birdanortiq ishlov beruvchisini tayinlay olmaymiz. Ko'p hollarda bu cheklov bosim o'tkazmaydi.

Oxirgi usul eng moslashuvchan, lekin u ham eng uzun yoziladi. Faqat u bilan ishlaydigan kam hodisalar bor, masalan `transitionend` va `DOMContentLoaded` (ko'rib chiqiladi). Shuningdek `addEventListener` hodisa ishlov beruvchilari sifatida obyektlarni qo'llab-quvvatlaydi. Bunday holda hodisa holatida `handleEvent` metodi chaqiriladi.

Ishlov beruvchini qanday tayinlashingizdan qat'i nazar -- u birinchi argument sifatida hodisa obyektini oladi. Bu obyekt nima sodir bo'lganligi haqidagi tafsilotlarni o'z ichiga oladi.

Keyingi boblarda biz hodisalar haqida umumiy va turli xil hodisa turlari haqida ko'proq o'rganamiz.