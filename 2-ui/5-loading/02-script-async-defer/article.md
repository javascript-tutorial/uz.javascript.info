# Skriptlar: async, defer

Zamonaviy veb-saytlarda skriptlar ko'pincha HTML dan "og'irroq" bo'ladi: ularning yuklash hajmi kattaroq va qayta ishlash vaqti ham uzoqroq.

Brauzer HTML ni yuklayotganda `<script>...</script>` tegiga duch kelsa, u DOM qurishni davom ettira olmaydi. U skriptni darhol bajarishi kerak. Xuddi shu narsa tashqi skriptlar uchun ham amal qiladi `<script src="..."></script>`: brauzer skriptning yuklanishini kutishi, yuklangan skriptni bajarishi va faqat shundan keyin sahifaning qolgan qismini qayta ishlashi mumkin.

Bu ikki muhim muammoga olib keladi:

1. Skriptlar o'zidan pastda joylashgan DOM elementlarini ko'ra olmaydi, shuning uchun ular ishlov beruvchilarni qo'sha olmaydi va hokazo.
2. Agar sahifaning yuqori qismida katta skript bo'lsa, u "sahifani bloklaydi". Foydalanuvchilar u yuklanib ishlamaguncha sahifa mazmunini ko'ra olmaydi:

```html
<p>...skriptdan oldingi kontent...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Bu skript yuklanmaguncha ko'rinmaydi -->
<p>...skriptdan keyingi kontent...</p>
```

Buning ba'zi yechimlari bor. Masalan, biz skriptni sahifaning pastki qismiga qo'yishimiz mumkin. Shunda u o'zidan yuqoridagi elementlarni ko'rishi mumkin va sahifa mazmunining ko'rsatilishini bloklamaydi:

```html
<body>
  ...barcha kontent skriptdan yuqorida...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Lekin bu yechim mukammal emas. Masalan, brauzer skriptni faqat to'liq HTML hujjatini yuklagan so'ngina sezadi (va uni yuklay boshlaydi). Uzun HTML hujjatlari uchun bu sezilarli kechikish bo'lishi mumkin.

Bunday narsalar juda tez internet bilan foydalanuvchilar uchun ko'rinmaydi, lekin dunyodagi ko'plab odamlar hali ham sekin internet tezligiga ega va mukammallikdan yiroq mobil internet ulanishidan foydalanadilar.

Yaxshiyamki, muammoni hal qiluvchi ikkita `<script>` atributi bor: `defer` va `async`.

## defer

`defer` atributi brauzerga skriptni kutmaslikni aytadi. Buning o'rniga, brauzer HTML ni qayta ishlashni davom ettiradi va DOM ni quradi. Skript "fon rejimida" yuklanadi va DOM to'liq qurilgandan keyin ishlaydi.

Mana yuqoridagi misol, lekin `defer` bilan:

```html
<p>...skriptdan oldingi kontent...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- darhol ko'rinadi -->
<p>...skriptdan keyingi kontent...</p>
```

Boshqacha qilib aytganda:

- `defer` li skriptlar hech qachon sahifani bloklamaydi.
- `defer` li skriptlar har doim DOM tayyor bo'lganda bajariladi (lekin `DOMContentLoaded` hodisasidan oldin).

Quyidagi misol ikkinchi qismni ko'rsatadi:

```html
<p>...skriptlardan oldingi kontent...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM defer dan keyin tayyor!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...skriptlardan keyingi kontent...</p>
```

1. Sahifa mazmuni darhol ko'rsatiladi.
2. `DOMContentLoaded` hodisa ishlov beruvchisi kechiktirilgan skriptni kutadi. U faqat skript yuklanganda va bajarilganda ishga tushadi.

**Kechiktirilgan skriptlar oddiy skriptlar kabi nisbiy tartibni saqlaydi.**

Aytaylik, bizda ikkita kechiktirilgan skript bor: `long.js` va keyin `small.js`:

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

Brauzerlar unumdorlikni oshirish uchun sahifani skriptlar uchun skanerlaydi va ularni parallel ravishda yuklaydi. Shuning uchun yuqoridagi misolda ikkala skript ham parallel ravishda yuklanadi. `small.js` ehtimol birinchi bo'lib tugaydi.

...Lekin `defer` atributi brauzerga "bloklamaslik" ni aytishdan tashqari, nisbiy tartibni saqlashni ta'minlaydi. Shuning uchun `small.js` birinchi yuklanganiga qaramay, u hali ham kutadi va `long.js` bajarilgandan keyin ishlaydi.

Bu JavaScript kutubxonasini va keyin unga bog'liq skriptni yuklashimiz kerak bo'lgan hollarda muhim bo'lishi mumkin.

**`defer` atributi faqat tashqi skriptlar uchun**
Agar `<script>` tegida `src` yo'q bo'lsa, `defer` atributi e'tiborga olinmaydi.

## async

`async` atributi `defer` ga o'xshaydi. U ham skriptni bloklamaydigan qiladi. Lekin xatti-harakatda muhim farqlar bor.

`async` atributi skript butunlay mustaqil ekanligini bildiradi:

- Brauzer `async` skriptlarda bloklanmaydi (`defer` kabi).
- Boshqa skriptlar `async` skriptlarni kutmaydi va `async` skriptlar ularni kutmaydi.
- `DOMContentLoaded` va async skriptlar bir-birini kutmaydi:
    - `DOMContentLoaded` async skriptdan oldin ham sodir bo'lishi mumkin (agar async skript sahifa tugagandan keyin yuklanishni tugatsa)
    - ...yoki async skriptdan keyin (agar async skript qisqa bo'lsa yoki HTTP-keshda bo'lsa)

Boshqacha qilib aytganda, `async` skriptlar fon rejimida yuklanadi va tayyor bo'lganda ishlaydi. DOM va boshqa skriptlar ularni kutmaydi va ular hech narsani kutmaydi. Yuklanganda ishlaydigan to'liq mustaqil skript. Iloji boricha sodda, shunday emasmi?

Mana `defer` bilan ko'rgan narsaga o'xshash misol: ikkita skript `long.js` va `small.js`, lekin endi `defer` o'rniga `async` bilan.

Ular bir-birini kutmaydi. Qaysi biri birinchi yuklanadi (ehtimol `small.js`) -- birinchi ishlaydi:

```html
<p>...skriptlardan oldingi kontent...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM tayyor!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...skriptlardan keyingi kontent...</p>
```

- Sahifa mazmuni darhol ko'rsatiladi: `async` uni bloklamaydi.
- `DOMContentLoaded` async dan oldin ham, keyin ham bo'lishi mumkin, bu yerda kafolat yo'q.
- Kichikroq skript `small.js` ikkinchi turadi, lekin ehtimol `long.js` dan oldin yuklanadi, shuning uchun `small.js` birinchi ishlaydi. Garchi, agar `long.js` keshlanganida birinchi bo'lib yuklansa, u birinchi ishlashi mumkin. Boshqacha qilib aytganda, async skriptlar "birinchi-yuklangan" tartibida ishlaydi.

Async skriptlar sahifaga mustaqil uchinchi tomon skriptlarini: hisoblagichlar, reklamalar va hokazolarni birlashtirganda juda yaxshi, chunki ular bizning skriptlarimizga bog'liq emas va bizning skriptlarimiz ularni kutmasligi kerak:

```html
<!-- Google Analytics odatda shunday qo'shiladi -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

## Dinamik skriptlar

Sahifaga skript qo'shishning yana bir muhim usuli bor.

Biz skript yaratib, uni JavaScript yordamida hujjatga dinamik ravishda qo'shishimiz mumkin:

```js
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

Skript hujjatga qo'shilgan zahotiyoq `(*)` yuklanishni boshlaydi.

**Dinamik skriptlar sukut bo'yicha "async" kabi harakat qiladi.**

Ya'ni:
- Ular hech narsani kutmaydi, hech narsa ularni kutmaydi.
- Birinchi yuklanadigan skript -- birinchi ishlaydi ("birinchi-yuklangan" tartib).

Agar biz aniq `script.async=false` ni o'rnatsak, buni o'zgartirish mumkin. Shunda skriptlar `defer` kabi hujjat tartibida bajariladi.

Ushbu misolda, `loadScript(src)` funksiyasi skript qo'shadi va `async` ni `false` ga o'rnatadi.

Shunday qilib `long.js` har doim birinchi ishlaydi (chunki birinchi qo'shiladi):

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// async=false tufayli long.js birinchi ishlaydi
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

`script.async=false` siz skriptlar standart, birinchi-yuklangan tartibda bajariladi (`small.js` ehtimol birinchi).

Yana, `defer` dagi kabi, agar kutubxona va keyin unga bog'liq boshqa skriptni yuklashni istasak, tartib muhim.

## Xulosa

`async` ham, `defer` ham bir umumiy xususiyatga ega: bunday skriptlarni yuklash sahifa renderingini bloklamaydi. Shuning uchun foydalanuvchi sahifa mazmunini o'qishi va sahifa bilan darhol tanishishi mumkin.

Lekin ular orasida muhim farqlar ham bor:

|         | Tartib | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Birinchi-yuklangan tartib*. Ularning hujjat tartibida ahamiyati yo'q -- qaysi biri birinchi yuklanadi, birinchi ishlaydi |  Ahamiyatsiz. Hujjat hali to'liq yuklanmagan vaqtda yuklash va bajarish mumkin. Bu skriptlar kichik yoki keshlangan va hujjat etarlicha uzun bo'lganda sodir bo'ladi. |
| `defer` | *Hujjat tartibida* (hujjatdagi ketma-ketlikda). |  Hujjat yuklangan va tahlil qilinganidan keyin bajariladi (kerak bo'lsa kutadi), `DOMContentLoaded` dan oldin. |

Amalda, `defer` butun DOM ga muhtoj skriptlar va/yoki nisbiy bajarilish tartibda muhim bo'lgan skriptlar uchun ishlatiladi.

Va `async` mustaqil skriptlar uchun, masalan hisoblagichlar yoki reklamalar uchun ishlatiladi. Ularning nisbiy bajarilish tartibida ahamiyati yo'q.

**Skriptsiz sahifa foydalanishga yaroqli bo'lishi kerak**
E'tibor bering: agar siz `defer` yoki `async` dan foydalansangiz, foydalanuvchi sahifani skript yuklanishidan *oldin* ko'radi.

Bunday holatda, ba'zi grafik komponentlar hali ishga tushirilmagan bo'lishi mumkin.

"Yuklanmoqda" ko'rsatkichini qo'yishni va hali ishlamagan tugmalarni o'chirishni unutmang. Foydalanuvchi sahifada nimani qila olishini va nimalar hali tayyorlanayotganini aniq ko'rsin.