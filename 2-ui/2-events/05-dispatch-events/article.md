# Maxsus eventlarni jo'natish

Biz nafaqat handlerlar belgilashimiz, balki JavaScript dan eventlar ham yaratishimiz mumkin.

Maxsus eventlar "grafik komponentlar" yaratish uchun ishlatilishi mumkin. Masalan, o'zimizning JS-ga asoslangan menyumizning ildiz elementi menyu bilan nima bo'layotganini bildiruvchi eventlarni ishga tushirishi mumkin: `open` (menyu ochish), `select` (element tanlash) va boshqalar. Boshqa kod eventlarni tinglashi va menyu bilan nima bo'layotganini kuzatishi mumkin.

Biz nafaqat o'z maqsadlarimiz uchun ixtiro qilgan butunlay yangi eventlarni, balki `click`, `mousedown` va boshqalar kabi o'rnatilgan eventlarni ham yaratishimiz mumkin. Bu avtomatlashtirilgan test qilish uchun foydali bo'lishi mumkin.

## Event konstruktor

O'rnatilgan event sinflari DOM element sinflariga o'xshash ierarxiya hosil qiladi. Ildizi o'rnatilgan [Event](http://www.w3.org/TR/dom/#event) sinfi.

Biz `Event` obyektlarini quyidagicha yaratishimiz mumkin:

```js
let event = new Event(type[, options]);
```

Argumentlar:

- *type* -- event turi, `"click"` kabi satr yoki `"my-event"` kabi o'zimizniki.
- *options* -- ikkita ixtiyoriy xususiyatga ega obyekt:
  - `bubbles: true/false` -- agar `true` bo'lsa, event pufaklanadi.
  - `cancelable: true/false` -- agar `true` bo'lsa, "standart amal" oldini olish mumkin. Keyinroq bu maxsus eventlar uchun nimani anglatishini ko'ramiz.

  Standart bo'yicha ikkalasi ham false: `{bubbles: false, cancelable: false}`.

## dispatchEvent

Event obyekti yaratilgandan keyin, uni `elem.dispatchEvent(event)` chaqiruvi yordamida elementda "ishga tushirish"imiz kerak.

Keyin handlerlar xuddi oddiy brauzer eventi bo'lgandek unga javob beradi. Agar event `bubbles` bayrog'i bilan yaratilgan bo'lsa, u pufaklanadi.

Quyidagi misolda `click` eventi JavaScript da ishga tushiriladi. Handler tugma bosilgandagi kabi ishlaydi:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
"Haqiqiy" foydalanuvchi eventini skript tomonidan yaratilgandan farqlashning usuli bor.

`event.isTrusted` xususiyati haqiqiy foydalanuvchi amallaridan kelgan eventlar uchun `true` va skript tomonidan yaratilgan eventlar uchun `false`.
```

## Pufaklash misoli

Biz `"hello"` nomi bilan pufaklanadigan event yaratib, uni `document` da tutishimiz mumkin.

Bizga faqat `bubbles` ni `true` ga o'rnatish kerak:

```html run no-beautify
<h1 id="elem">Skriptdan salom!</h1>

<script>
  // document da tutish...
  document.addEventListener("hello", function(event) { // (1)
    alert("Salom " + event.target.tagName + " dan"); // Salom H1 dan
  });

  // ...elem da jo'natish!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // document dagi handler faollashadi va xabarni ko'rsatadi.

</script>
```

Eslatmalar:

1. Maxsus eventlarimiz uchun `addEventListener` dan foydalanishimiz kerak, chunki `on<event>` faqat o'rnatilgan eventlar uchun mavjud, `document.onhello` ishlamaydi.
2. `bubbles:true` o'rnatish kerak, aks holda event yuqoriga pufaklanmaydi.

Pufaklash mexanizmi o'rnatilgan (`click`) va maxsus (`hello`) eventlar uchun bir xil. Tutish va pufaklash bosqichlari ham mavjud.

## MouseEvent, KeyboardEvent va boshqalar

Mana [UI Event spetsifikatsiyasi](https://www.w3.org/TR/uievents) dan UI Eventlari uchun sinflarning qisqa ro'yxati:

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Agar biz bunday eventlarni yaratmoqchi bo'lsak, `new Event` o'rniga ulardan foydalanishimiz kerak. Masalan, `new MouseEvent("click")`.

To'g'ri konstruktor o'sha turdagi event uchun standart xususiyatlarni belgilash imkonini beradi.

Sichqon eventi uchun `clientX/clientY` kabi:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

E'tibor bering: umumiy `Event` konstruktor buni imkon bermaydi.

Sinab ko'raylik:

```js run
let event = new Event("click", {
  bubbles: true, // faqat bubbles va cancelable
  cancelable: true, // Event konstruktorida ishlaydi
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, noma'lum xususiyat e'tiborsiz qoldirildi!
*/!*
```

Texnik jihatdan, yaratishdan keyin to'g'ridan-to'g'ri `event.clientX=100` belgilash orqali buni hal qilishimiz mumkin. Demak, bu qulaylik va qoidalarga rioya qilish masalasi. Brauzer tomonidan yaratilgan eventlar har doim to'g'ri turga ega.

Turli UI eventlari uchun xususiyatlarning to'liq ro'yxati spetsifikatsiyada, masalan [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent) da.

## Maxsus eventlar

`"hello"` kabi o'zimizning, butunlay yangi event turlari uchun `new CustomEvent` dan foydalanishimiz kerak. Texnik jihatdan [CustomEvent](https://dom.spec.whatwg.org/#customevent) `Event` bilan bir xil, bitta istisno bilan.

Ikkinchi argumentda (obyekt) biz event bilan uzatmoqchi bo'lgan har qanday maxsus ma'lumot uchun qo'shimcha `detail` xususiyatini qo'sha olamiz.

Masalan:

```html run refresh
<h1 id="elem">John uchun salom!</h1>

<script>
  // qo'shimcha tafsilotlar event bilan handlerga keladi
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

`detail` xususiyati har qanday ma'lumotga ega bo'lishi mumkin. Texnik jihatdan biz busiz yashashimiz mumkin, chunki yaratilgandan keyin oddiy `new Event` obyektiga har qanday xususiyatlarni belgilashimiz mumkin. Ammo `CustomEvent` boshqa event xususiyatlari bilan ziddiyatlardan qochish uchun buning uchun maxsus `detail` maydonini taqdim etadi.

Bundan tashqari, event sinfi "qanday event" ekanligini tasvirlaydi va agar event maxsus bo'lsa, bu nima ekanligini aniq ko'rsatish uchun `CustomEvent` dan foydalanishimiz kerak.

## event.preventDefault()

Ko'plab brauzer eventlari havolaga o'tish, tanlovni boshlash va boshqalar kabi "standart amal"ga ega.

Yangi, maxsus eventlar uchun aniq hech qanday standart brauzer amallari yo'q, lekin bunday eventni jo'natuvchi kod eventni ishga tushirgandan keyin nima qilish kerakligini o'z rejalari bo'lishi mumkin.

`event.preventDefault()` ni chaqirish orqali event handleri bu amallar bekor qilinishi kerakligi haqida signal berishi mumkin.

Bunday holatda `elem.dispatchEvent(event)` ga chaqiruv `false` qaytaradi. Va uni jo'natgan kod davom etmaslik kerakligini biladi.

Keling, amaliy misolni ko'raylik - yashirin quyon (yopilayotgan menyu yoki boshqa narsa bo'lishi mumkin).

Quyida siz `#rabbit` va unga `"hide"` eventini jo'natuvchi `hide()` funksiyasini ko'rishingiz mumkin, bu barcha manfaatdor tomonlarga quyonning yashirinishini bildiradi.

Har qanday handler o'sha eventni `rabbit.addEventListener('hide',...)` bilan tinglashi va kerak bo'lsa `event.preventDefault()` yordamida amaldan voz kechishi mumkin. Shunda quyon yo'qolmaydi:

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // bu bayroqsiz preventDefault ishlamaydi
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('Amal handler tomonidan oldini olindi');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("preventDefault ni chaqirasizmi?")) {
      event.preventDefault();
    }
  });
</script>
```

E'tibor bering: eventda `cancelable: true` bayrog'i bo'lishi kerak, aks holda `event.preventDefault()` chaqiruvi e'tiborsiz qoldiriladi.

## Eventlar ichida eventlar sinxrondir

Odatda eventlar navbatda qayta ishlanadi. Ya'ni: brauzer `onclick` ni qayta ishlayotgan bo'lsa va yangi event sodir bo'lsa, masalan sichqon harakatlandi, uning qayta ishlanishi navbatga qo'yiladi, tegishli `mousemove` handlerlari `onclick` qayta ishlanishi tugagandan keyin chaqiriladi.

Muhim istisno - bitta event boshqasining ichidan ishga tushirilganda, masalan `dispatchEvent` yordamida. Bunday eventlar darhol qayta ishlanadi: yangi event handlerlari chaqiriladi, keyin joriy event qayta ishlanishi davom etadi.

Masalan, quyidagi kodda `menu-open` eventi `onclick` paytida ishga tushiriladi.

U darhol qayta ishlanadi, `onclick` handlerining tugashini kutmaydi:

```html run autorun
<button id="menu">Menu (meni bosing)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // 1 va 2 orasida ishga tushadi
  document.addEventListener('menu-open', () => alert('ichki'));
</script>
```

Chiqish tartibi: 1 -> ichki -> 2.

E'tibor bering, ichki `menu-open` eventi `document` da tutiladi. Ichki eventning tarqalishi va qayta ishlanishi tashqi kodga (`onclick`) qaytishdan oldin tugaydi.

Bu nafaqat `dispatchEvent` haqida, boshqa holatlar ham bor. Agar event handleri boshqa eventlarni ishga tushiradigan usullarni chaqirsa -- ular ham sinxron tarzda, ichki ko'rinishda qayta ishlanadi.

Aytaylik, bu bizga yoqmaydi. Biz `onclick` ning avval to'liq qayta ishlanishini xohlaymiz, `menu-open` yoki boshqa ichki eventlardan mustaqil ravishda.

Keyin biz yoki `dispatchEvent` ni (yoki boshqa eventni ishga tushiruvchi chaqiruvni) `onclick` ning oxiriga qo'yishimiz yoki, ehtimol yaxshiroq, uni nol kechikishli `setTimeout` ga o'rashimiz mumkin:

```html run
<button id="menu">Menu (meni bosing)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('ichki'));
</script>
```

Endi `dispatchEvent` joriy kod bajarilishi tugagandan keyin, `menu.onclick` ni ham qo'shganda, asinxron tarzda ishlaydi, shuning uchun event handlerlari butunlay alohida.

Chiqish tartibi: 1 -> 2 -> ichki bo'ladi.

## Xulosa

Koddan event yaratish uchun avval event obyektini yaratishimiz kerak.

Umumiy `Event(name, options)` konstruktor ixtiyoriy event nomi va ikkita xususiyatga ega `options` obyektini qabul qiladi:
- `bubbles: true` agar event pufaklanishi kerak bo'lsa.
- `cancelable: true` agar `event.preventDefault()` ishlashi kerak bo'lsa.

`MouseEvent`, `KeyboardEvent` va boshqalar kabi mahalliy eventlarning boshqa konstruktorlari o'sha event turiga xos xususiyatlarni qabul qiladi. Masalan, sichqon eventlari uchun `clientX`.

Maxsus eventlar uchun `CustomEvent` konstruktoridan foydalanishimiz kerak. Unda `detail` nomli qo'shimcha variant mavjud, biz eventga xos ma'lumotlarni unga belgilashimiz kerak. Keyin barcha handlerlar uni `event.detail` sifatida olishlari mumkin.

`click` yoki `keydown` kabi brauzer eventlarini yaratishning texnik imkoniyati mavjudligiga qaramay, biz ulardan juda ehtiyotkorlik bilan foydalanishimiz kerak.

Biz brauzer eventlarini yaratmasligimiz kerak, chunki bu handlerlarni ishga tushirishning buzuq usuli. Bu ko'p vaqt yomon arxitektura.

Mahalliy eventlar yaratilishi mumkin:

- Agar uchinchi tomon kutubxonalari boshqa o'zaro ta'sir vositalarini taqdim etmasa, ularni kerakli tarzda ishlash uchun iflos hack sifatida.
- Avtomatlashtirilgan test qilish uchun, skriptda "tugmani bosish" va interfeys to'g'ri javob berishini ko'rish uchun.

O'z nomlarimizga ega maxsus eventlar ko'pincha arxitektura maqsadlari uchun yaratiladi, bizning menyularimiz, slayderlarimiz, karusellarimiz va boshqalarda nima sodir bo'layotganini bildirish uchun.