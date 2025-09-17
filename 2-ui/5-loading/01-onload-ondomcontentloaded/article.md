# HTML sahifa hodisalari: DOMContentLoaded, load, beforeunload, unload

HTML sahifaning hayot tsikli uchta muhim hodisaga ega:

- `DOMContentLoaded` -- brauzer HTML ni to'liq yukladi va DOM daraxti qurildi, lekin tashqi resurslar (rasmlar `<img>` va stil fayllari) hali yuklanmagandir.
- `load` -- nafaqat HTML, balki barcha tashqi resurslar ham yuklandi: rasmlar, stillar va boshqalar.
- `beforeunload/unload` -- foydalanuvchi sahifani tark etmoqda.

Har bir hodisa foydali bo'lishi mumkin:

- `DOMContentLoaded` hodisasi -- DOM tayyor, shuning uchun biz DOM elementlarini topishimiz va interfeys bilan ishlashimiz mumkin.
- `load` hodisasi -- tashqi resurslar yuklandi, stillar qo'llanildi, rasm o'lchamlari ma'lum va hokazo.
- `beforeunload` hodisasi -- foydalanuvchi ketmoqda: biz o'zgarishlarni saqlaganligini tekshirib, haqiqatdan ham ketishni xohlashini so'rashimiz mumkin.
- `unload` -- foydalanuvchi deyarli ketdi, lekin biz hali ham ba'zi operatsiyalarni boshlashimiz mumkin, masalan, statistika jo'natish.

Keling, bu hodisalarni batafsil o'rganamiz.

## DOMContentLoaded

`DOMContentLoaded` hodisasi `document` obyektida sodir bo'ladi.

Uni ushlash uchun `addEventListener` dan foydalanishimiz kerak:

```js
document.addEventListener("DOMContentLoaded", ready);
// "document.onDOMContentLoaded = ..." emas
```

Masalan:

```html
<script>
  function ready() {
    alert('DOM tayyor');

    // rasm hali yuklanmagan (keshlanmagan bo'lsa), shuning uchun o'lchami 0x0
    alert(`Rasm o'lchami: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

Misolda, `DOMContentLoaded` ishlov beruvchisi hujjat yuklanganda ishlaydi, shuning uchun u barcha elementlarni ko'rishi mumkin, jumladan quyidagi `<img>` ni ham.

Lekin u rasmning yuklanishini kutmaydi. Shuning uchun `alert` nol o'lchamlarni ko'rsatadi.

Bir qarashda, `DOMContentLoaded` hodisasi juda oddiy. DOM daraxti tayyor -- mana hodisa. Lekin ba'zi xususiyatlar bor.

### DOMContentLoaded va skriptlar

Brauzer HTML-hujjatni qayta ishlaganda `<script>` tegiga duch kelsa, DOM qurishni davom ettirishdan oldin uni bajarishi kerak. Bu ehtiyot chorasi, chunki skriptlar DOM ni o'zgartirishi va hatto unga `document.write` qilishi mumkin, shuning uchun `DOMContentLoaded` kutishi kerak.

Demak, DOMContentLoaded bunday skriptlardan keyin sodir bo'ladi:

```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM tayyor!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Kutubxona yuklandi, ichki skript bajarildi");
</script>
```

Yuqoridagi misolda biz avval "Kutubxona yuklandi..." ni, keyin "DOM tayyor!" ni ko'ramiz (barcha skriptlar bajarildi).

**DOMContentLoaded ni bloklamaydigan skriptlar:**
Bu qoidadan ikki istisno bor:
1. `async` atributiga ega skriptlar `DOMContentLoaded` ni bloklamaydi.
2. `document.createElement('script')` bilan dinamik ravishda yaratilgan va sahifaga qo'shilgan skriptlar ham bu hodisani bloklamaydi.

### DOMContentLoaded va stillar

Tashqi stil fayllari DOM ga ta'sir qilmaydi, shuning uchun `DOMContentLoaded` ularni kutmaydi.

Lekin bu yerda tuzoq bor. Agar stildan keyin skript bo'lsa, u holda skript stil faylining yuklanishini kutishi kerak:

```html
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // skript stil yuklangunga qadar bajarilinaydi
  alert(getComputedStyle(document.body).marginTop);
</script>
```

Buning sababi shundaki, skript elementlarning koordinatalari va boshqa stilga bog'liq xususiyatlarini olishi mumkin, yuqoridagi misoldagidek. Tabiiyki, u stillarning yuklanishini kutishi kerak.

`DOMContentLoaded` skriptlarni kutgani uchun, u endi ulardan oldingi stillarni ham kutadi.

### Brauzerning avtomatik to'ldirishi

Firefox, Chrome va Opera `DOMContentLoaded` da formalarni avtomatik to'ldiradi.

Masalan, agar sahifada login va parol bilan forma bo'lsa va brauzer qiymatlarni eslab qolgan bo'lsa, `DOMContentLoaded` da u ularni avtomatik to'ldirishga harakat qilishi mumkin (foydalanuvchi ruxsat bersa).

Agar `DOMContentLoaded` sekin yuklanadigan skriptlar tufayli kechiktirilsa, avtomatik to'ldirish ham kutadi. Siz buni ba'zi saytlarda ko'rgan bo'lsangiz kerak (agar brauzer avtomatik to'ldirishdan foydalansangiz) -- login/parol maydonlari darhol to'ldirilmaydi, balki sahifa to'liq yuklanguncha kechikish bo'ladi. Bu aslida `DOMContentLoaded` hodisasigacha bo'lgan kechikish.

## window.onload

`window` obyektidagi `load` hodisasi butun sahifa yuklanganda, jumladan stillar, rasmlar va boshqa resurslar bilan birga ishga tushadi. Bu hodisaga `onload` xususiyati orqali kirish mumkin.

Quyidagi misol rasm o'lchamlarini to'g'ri ko'rsatadi, chunki `window.onload` barcha rasmlarni kutadi:

```html
<script>
  window.onload = function() { // window.addEventListener('load', (event) => { bilan bir xil
    alert('Sahifa yuklandi');

    // rasm shu vaqtda yuklangan
    alert(`Rasm o'lchami: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

Tashrif buyuruvchi sahifani tark etganda, `window` da `unload` hodisasi ishga tushadi. U yerda kechikishni o'z ichiga olmaydigan ishlarni qilishimiz mumkin, masalan, bog'liq popup oynalarni yopish.

E'tiborga loyiq istisno - analitika jo'natish.

Aytaylik, biz sahifadan qanday foydalanilganligi haqida ma'lumot to'playmiz: sichqoncha bosilishi, skrollash, ko'rilgan sahifa hududlari va hokazo.

Tabiiyki, `unload` hodisasi foydalanuvchi bizni tark etayotgan payt va biz ma'lumotlarni serverimizda saqlamoqchimiz.

Bunday ehtiyojlar uchun maxsus `navigator.sendBeacon(url, data)` usuli mavjud.

U ma'lumotlarni fon rejimida jo'natadi. Boshqa sahifaga o'tish kechiktirilmaydi: brauzer sahifani tark etadi, lekin baribir `sendBeacon` ni bajaradi.

Qanday foydalanish:
```js
let analyticsData = { /* to'plangan ma'lumotlar obyekti */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});
```

- So'rov POST sifatida jo'natiladi.
- Biz nafaqat satr, balki formalar va boshqa formatlarni ham jo'natishimiz mumkin.
- Ma'lumotlar 64kb bilan cheklangan.

`sendBeacon` so'rovi tugaganda, brauzer ehtimol hujjatni allaqachon tark etgan, shuning uchun server javobini olishning iloji yo'q (odatda analitika uchun bo'sh).

Boshqa sahifaga o'tishni bekor qilishni istasak, buni bu yerda qila olmaymiz. Lekin boshqa hodisadan foydalanishimiz mumkin -- `onbeforeunload`.

## window.onbeforeunload

Agar tashrif buyuruvchi sahifadan ketishga yoki oynani yopishga harakat qilsa, `beforeunload` ishlov beruvchisi qo'shimcha tasdiqlash so'raydi.

Agar biz hodisani bekor qilsak, brauzer tashrif buyuruvchidan haqiqatdan ham ishonch hosil qilishini so'rashi mumkin.

Buni sinab ko'rish uchun ushbu kodni ishga tushiring va keyin sahifani yangilang:

```js
window.onbeforeunload = function() {
  return false;
};
```

Tarixiy sabablarga ko'ra, bo'sh bo'lmagan satrni qaytarish ham hodisani bekor qilish hisoblanadi. Ba'zi vaqtlar oldin brauzerlar buni xabar sifatida ko'rsatishgan, lekin zamonaviy spetsifikatsiyaga ko'ra, ular buni qilmasligi kerak.

Misol:

```js
window.onbeforeunload = function() {
  return "Saqlanmagan o'zgarishlar bor. Hozir chiqasizmi?";
};
```

Xatti-harakat o'zgartirildi, chunki ba'zi veb-masterlar bu hodisa ishlov beruvchisidan noto'g'ri va bezovta qiluvchi xabarlarni ko'rsatish uchun suiiste'mol qilishgan. Shuning uchun eski brauzerlar hali ham buni xabar sifatida ko'rsatishi mumkin, lekin bundan tashqari -- foydalanuvchiga ko'rsatiladigan xabarni sozlashning iloji yo'q.

## readyState

Agar biz `DOMContentLoaded` ishlov beruvchisini hujjat yuklangandan keyin o'rnatsak nima bo'ladi?

Tabiiyki, u hech qachon ishlamaydi.

Hujjat tayyor yoki yo'qligini bilmaydigan holatlar bor. Biz funksiyamizning DOM yuklanganda ishlashini xohlaymiz, hozir bo'lsin yoki keyinroq.

`document.readyState` xususiyati bizga joriy yuklash holatini aytadi.

3 ta mumkin bo'lgan qiymat bor:

- `"loading"` -- hujjat yuklanmoqda.
- `"interactive"` -- hujjat to'liq o'qildi.
- `"complete"` -- hujjat to'liq o'qildi va barcha resurslar (rasmlar kabi) ham yuklandi.

Shuning uchun biz `document.readyState` ni tekshirib, ishlov beruvchini o'rnatishimiz yoki tayyor bo'lsa darhol kodni bajarishimiz mumkin.

Masalan:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  // hali yuklanmoqda, hodisani kuting
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM tayyor!
  work();
}
```

Holat o'zgarganda ishga tushadigan `readystatechange` hodisasi ham bor, shuning uchun barcha bu holatlarni quyidagicha chop etishimiz mumkin:

```js
// joriy holat
console.log(document.readyState);

// holat o'zgarishlarini chop etish
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

`readystatechange` hodisasi hujjat yuklash holatini kuzatishning muqobil mexanizmidir, u uzoq vaqt oldin paydo bo'lgan. Hozirda kamdan-kam ishlatiladi.

To'liqlik uchun barcha hodisalar oqimini ko'raylik.

Mana `<iframe>`, `<img>` va hodisalarni qayd etuvchi ishlov beruvchilar bilan hujjat:

```html
<script>
  log('boshlang\'ich readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

Odatiy chiqish:
1. [1] boshlang'ich readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

Kvadrat qavs ichidagi raqamlar bu taxminan qachon sodir bo'lishini bildiradi. Bir xil raqam bilan belgilangan hodisalar taxminan bir vaqtda sodir bo'ladi (+- bir necha ms).

- `document.readyState` `DOMContentLoaded` dan oldin `interactive` bo'ladi. Bu ikki narsa aslida bir xil ma'noni bildiradi.
- Barcha resurslar (`iframe` va `img`) yuklanganda `document.readyState` `complete` bo'ladi. Bu `img.onload` (`img` oxirgi resurs) va `window.onload` bilan bir vaqtda sodir bo'ladi. `complete` holatga o'tish `window.onload` bilan bir xil ma'noni bildiradi. Farqi shundaki, `window.onload` har doim boshqa barcha `load` ishlov beruvchilardan keyin ishlaydi.

## Xulosa

Sahifa yuklash hodisalari:

- `DOMContentLoaded` hodisasi DOM tayyor bo'lganda `document` da ishga tushadi. Bu bosqichda biz elementlarga JavaScript qo'llashimiz mumkin.
  - `<script>...</script>` yoki `<script src="..."></script>` kabi skriptlar DOMContentLoaded ni bloklaydi, brauzer ularning bajarilishini kutadi.
  - Rasmlar va boshqa resurslar yuklashda davom etishi mumkin.
- `window` dagi `load` hodisasi sahifa va barcha resurslar yuklanganda ishga tushadi. Biz uni kamdan-kam ishlatamiz, chunki odatda buncha uzoq kutishning hojati yo'q.
- `window` dagi `beforeunload` hodisasi foydalanuvchi sahifani tark etmoqchi bo'lganda ishga tushadi. Agar biz hodisani bekor qilsak, brauzer foydalanuvchidan haqiqatdan ham ketishni xohlashini so'raydi (masalan, bizda saqlanmagan o'zgarishlar bor).
- `window` dagi `unload` hodisasi foydalanuvchi nihoyat ketayotganda ishga tushadi, ishlov beruvchida faqat kechikish yoki foydalanuvchidan so'rashni o'z ichiga olmaydigan oddiy ishlarni qilishimiz mumkin. Shu cheklov tufayli u kamdan-kam ishlatiladi. Biz `navigator.sendBeacon` bilan tarmoq so'rovini jo'natishimiz mumkin.
- `document.readyState` hujjatning joriy holati, o'zgarishlar `readystatechange` hodisasida kuzatilishi mumkin:
  - `loading` -- hujjat yuklanmoqda.
  - `interactive` -- hujjat tahlil qilindi, `DOMContentLoaded` bilan taxminan bir vaqtda, lekin undan oldin sodir bo'ladi.
  - `complete` -- hujjat va resurslar yuklandi, `window.onload` bilan taxminan bir vaqtda, lekin undan oldin sodir bo'ladi.