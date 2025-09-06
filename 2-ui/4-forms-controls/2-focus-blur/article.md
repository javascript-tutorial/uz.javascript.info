# Fokus: focus/blur

Element foydalanuvchi unga bosganda yoki klaviaturada `key:Tab` tugmasidan foydalanganda fokusni oladi. Shuningdek, sahifa yuklanganda sukut bo'yicha elementga fokus qo'yadigan `autofocus` HTML atributi va fokusni olishning boshqa usullari ham mavjud.

Elementga fokus qilish odatda "bu yerda ma'lumot qabul qilishga tayyorlaning" degan ma'noni anglatadi, shuning uchun kerakli funksionallikni ishga tushirish uchun kodni ishlatish momenti shu paytdir.

Fokusni yo'qotish ("blur") momenti yanada muhim bo'lishi mumkin. Bu foydalanuvchi boshqa joyga bosganda yoki keyingi forma maydoniga o'tish uchun `key:Tab` tugmasini bosganda yoki boshqa usullar ham mavjud.

Fokusni yo'qotish odatda "ma'lumot kiritilgan" degan ma'noni anglatadi, shuning uchun uni tekshirish yoki hatto serverga saqlash uchun kodni ishga tushirishimiz mumkin.

Fokus hodisalari bilan ishlashda muhim xususiyatlar mavjud. Ularni keyinroq eng yaxshi tarzda ko'rib chiqamiz.

## Hodisalar focus/blur

`focus` hodisasi fokus qilishda chaqiriladi, `blur` esa element fokusni yo'qotganda.

Ularni input maydonini tekshirish uchun ishlatamiz.

Quyidagi misolda:

- `blur` ishlov beruvchi maydon email kiritilganligini tekshiradi va agar yo'q bo'lsa -- xatoni ko'rsatadi.
- `focus` ishlov beruvchi xato xabarini yashiradi (`blur` da u yana tekshiriladi):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Emailingizni kiriting: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // email emas
    input.classList.add('invalid');
    error.innerHTML = 'Iltimos, to\'g\'ri email kiriting.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // "xato" ko'rsatkichini olib tashlang, chunki foydalanuvchi biror narsani qayta kiritmoqchi
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Zamonaviy HTML bizga input atributlari yordamida ko'plab tekshiruvlarni amalga oshirish imkonini beradi: `required`, `pattern` va boshqalar. Va ba'zan ular aynan bizga kerak bo'lgan narsa. Ko'proq moslashuvchanlikni xohlasak JavaScript dan foydalanish mumkin. Shuningdek, agar qiymat to'g'ri bo'lsa, o'zgartirilgan qiymatni serverga avtomatik yuborishimiz mumkin.

## Metodlar focus/blur

`elem.focus()` va `elem.blur()` metodlari elementda fokusni o'rnatadi/o'chiradi.

Masalan, agar qiymat noto'g'ri bo'lsa, tashrif buyuruvchining inputni tark etishiga imkon bermaymiz:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Emailingizni kiriting: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="emailni noto'g'ri qiling va bu yerga fokus qilishga harakat qiling">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // email emas
      // xatoni ko'rsatish
      this.classList.add("error");
*!*
      // ...va fokusni qaytarish
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Bu Firefox bundan mustasno ([xato](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)) barcha brauzerlarda ishlaydi.

Agar biz inputga biror narsa kiritsak va keyin `key:Tab` dan foydalanishga harakat qilsak yoki `<input>` dan uzoqlashsak, `onblur` fokusni qaytaradi.

Diqqat qiling, `onblur` da `event.preventDefault()` ni chaqirish orqali "fokusni yo'qotishning oldini ololmaymiz", chunki `onblur` element fokusni yo'qotgandan *keyin* ishlaydi.

```warn header="JavaScript tomonidan boshlangan fokus yo'qolishi"
Fokus yo'qolishi ko'p sabablarga ko'ra sodir bo'lishi mumkin.

Ulardan biri tashrif buyuruvchi boshqa joyga bosganda. Lekin JavaScript ning o'zi ham bunga sabab bo'lishi mumkin, masalan:

- `alert` fokusni o'ziga o'tkazadi, shuning uchun u elementda fokus yo'qolishiga sabab bo'ladi (`blur` hodisasi), va `alert` yopilganda, fokus qaytib keladi (`focus` hodisasi).
- Agar element DOM dan olib tashlansa, u ham fokus yo'qolishiga sabab bo'ladi. Agar u keyinroq qayta qo'shilsa, fokus qaytmaydi.

Bu xususiyatlar ba'zan `focus/blur` ishlov beruvchilarining noto'g'ri ishlashiga sabab bo'ladi -- kerak bo'lmaganda ishga tushirish.

Eng yaxshi maslahat bu hodisalardan foydalanganda ehtiyot bo'lishdir. Agar biz foydalanuvchi tomonidan boshlangan fokus yo'qolishini kuzatmoqchi bo'lsak, o'zimiz bunga sabab bo'lishdan qochinishimiz kerak.
```

## Har qanday elementga fokus qilishga ruxsat berish: tabindex

Sukut bo'yicha, ko'plab elementlar fokusni qo'llab-quvvatlamaydi.

Ro'yxat brauzerlar o'rtasida biroz farq qiladi, lekin bir narsa doim to'g'ri: tashrif buyuruvchi bilan o'zaro ta'sir qilishi mumkin bo'lgan elementlar uchun `focus/blur` qo'llab-quvvatlash kafolatlanadi: `<button>`, `<input>`, `<select>`, `<a>` va boshqalar.

Boshqa tomondan, biror narsani formatlash uchun mavjud bo'lgan elementlar, masalan `<div>`, `<span>`, `<table>` -- sukut bo'yicha fokus qilib bo'lmaydi. `elem.focus()` metodi ularda ishlamaydi va `focus/blur` hodisalar hech qachon ishga tushmaydi.

Buni `tabindex` HTML-atributi yordamida o'zgartirish mumkin.

Agar `tabindex` ga ega bo'lsa, har qanday element fokus qilinadigan bo'ladi. Atributning qiymati ular orasida almashinish uchun `key:Tab` (yoki shunga o'xshash narsa) ishlatilganda elementning tartib raqamidir.

Ya'ni: agar bizda ikkita element bo'lsa, birinchisida `tabindex="1"`, ikkinchisida `tabindex="2"` bo'lsa, birinchi elementda turganida `key:Tab` ni bosish -- fokusni ikkinchisiga o'tkazadi.

Almashinish tartibi: `1` va undan yuqori `tabindex` ga ega elementlar birinchi bo'ladi (`tabindex` tartibida), keyin `tabindex` siz elementlar (masalan, oddiy `<input>`).

Mos keladigan `tabindex` siz elementlar hujjat manba tartibida almashtiriladi (standart tartib).

Ikkita maxsus qiymat mavjud:

- `tabindex="0"` elementni `tabindex` sizlar orasiga qo'yadi. Ya'ni, biz elementlarni almashtirgsak, `tabindex=0` ga ega elementlar `tabindex ≥ 1` ga ega elementlardan keyin keladi.

    Odatda element fokus qilinadigan qilish uchun ishlatiladi, lekin standart almashinish tartibini saqlaydi. Elementni `<input>` bilan teng darajada formaning bir qismiga aylantirish uchun.

- `tabindex="-1"` elementga faqat dasturiy fokus qilish imkonini beradi. `key:Tab` tugmasi bunday elementlarni e'tiborsiz qoldiradi, lekin `elem.focus()` metodi ishlaydi.

Masalan, mana ro'yxat. Birinchi elementga bosing va `key:Tab` ni bosing:

```html autorun no-beautify
Birinchi elementga bosing va Tab ni bosing. Tartibni kuzating. Diqqat qiling, keyingi ko'plab Tab lar fokusni misoldagi iframe dan chiqarishi mumkin.
<ul>
  <li tabindex="1">Bir</li>
  <li tabindex="0">Nol</li>
  <li tabindex="2">Ikki</li>
  <li tabindex="-1">Minus bir</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

Tartib bunday: `1 - 2 - 0`. Odatda, `<li>` fokusni qo'llab-quvvatlamaydi, lekin `tabindex` uni to'liq yoqadi, hodisalar va `:focus` bilan styling bilan birga.

```smart header="`elem.tabIndex` xossasi ham ishlaydi"
JavaScript dan `elem.tabIndex` xossasidan foydalanib `tabindex` qo'shishimiz mumkin. Bu bir xil ta'sirga ega.
```

## Delegatsiya: focusin/focusout

`focus` va `blur` hodisalar bubble qilmaydi.

Masalan, uni ajratib ko'rsatish uchun `<form>` ga `onfocus` qo'ya olmaymiz:

```html autorun height=80
<!-- formaga fokus qilishda -- sinf qo'shing -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Ism">
  <input type="text" name="surname" value="Familiya">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

Yuqoridagi misol ishlamaydi, chunki foydalanuvchi `<input>` ga fokus qilganda, `focus` hodisasi faqat o'sha inputda ishga tushadi. U yuqoriga bubble qilmaydi. Shuning uchun `form.onfocus` hech qachon ishga tushmaydi.

Ikkita yechim mavjud.

Birinchidan, qiziq tarixiy xususiyat bor: `focus/blur` yuqoriga bubble qilmaydi, lekin capturing fazasida pastga tarqaladi.

Bu ishlaydi:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Ism">
  <input type="text" name="surname" value="Familiya">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // ishlov beruvchini capturing fazasiga qo'ying (oxirgi argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Ikkinchidan, `focusin` va `focusout` hodisalar mavjud -- `focus/blur` bilan aynan bir xil, lekin ular bubble qiladilar.

Diqqat qiling, ular `on<event>` emas, `elem.addEventListener` yordamida tayinlanishi kerak.

Demak, mana yana bir ishlaydigan variant:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Ism">
  <input type="text" name="surname" value="Familiya">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Xulosa

`focus` va `blur` hodisalar elementda fokus qilish/fokusni yo'qotishda ishga tushadi.

Ularning xususiyatlari:
- Ular bubble qilmaydi. O'rniga capturing holatini yoki `focusin/focusout` dan foydalanish mumkin.
- Ko'pgina elementlar sukut bo'yicha fokusni qo'llab-quvvatlamaydi. Har qanday narsani fokus qilinadigan qilish uchun `tabindex` dan foydalaning.

Joriy fokus qilingan element `document.activeElement` sifatida mavjud.