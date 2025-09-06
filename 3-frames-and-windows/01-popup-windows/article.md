# Popuplar va window usullari

Popup oynasi foydalanuvchiga qo'shimcha hujjatni ko'rsatishning eng qadimiy usullaridan biri.

Asosan, siz shunchaki ishga tushirasiz:
```js
window.open('https://javascript.info/')
```

...Va u berilgan URL bilan yangi oyna ochadi. Ko'pgina zamonaviy brauzerlar alohida oynalar o'rniga yangi tablarda url ochish uchun sozlangan.

Popuplar juda qadimiy zamonlardan mavjud. Dastlabki g'oya asosiy oynani yopmasdan boshqa kontentni ko'rsatish edi. Hozirgi vaqtda buni qilishning boshqa usullari ham bor: biz kontentni [fetch](info:fetch) bilan dinamik ravishda yuklab, uni dinamik yaratilgan `<div>` da ko'rsatishimiz mumkin. Shuning uchun popuplar har kuni foydalanadigan narsa emas.

Shuningdek, popuplar bir vaqtning o'zida bir nechta oynani ko'rsatmaydigan mobil qurilmalarda muammoli.

Shunga qaramay, popuplar hali ham ishlatiladigan vazifalar mavjud, masalan OAuth avtorizatsiyasi (Google/Facebook/... bilan kirish) uchun, chunki:

1. Popup o'zining mustaqil JavaScript muhitiga ega alohida oyna. Shuning uchun uchinchi tomon, ishonchsiz saytdan popup ochish xavfsiz.
2. Popup ochish juda oson.
3. Popup navigatsiya qilishi (URL ni o'zgartirishi) va ochuvchi oynaga xabarlar yuborishi mumkin.

## Popup bloklash

O'tmishda yomon saytlar popuplar bilan juda ko'p suiiste'mol qilishgan. Yomon sahifa reklamalar bilan ko'plab popup oynalarini ocha olgan. Shuning uchun endi ko'pgina brauzerlar popuplarni bloklashga va foydalanuvchini himoya qilishga harakat qiladi.

**Ko'pgina brauzerlar `onclick` kabi foydalanuvchi tomonidan ishga tushirilgan hodisa ishlov beruvchilari tashqarisida chaqirilsa popuplarni bloklaydi.**

Masalan:
```js
// popup bloklangan
window.open('https://javascript.info');

// popup ruxsat etilgan
button.onclick = () => {
  window.open('https://javascript.info');
};
```

Shunday qilib foydalanuvchilar keraksiz popuplardan ma'lum darajada himoyalangan, lekin funksionallik to'liq o'chirilmagan.

Agar popup `onclick` dan ochilsa, lekin `setTimeout` dan keyin nima bo'ladi? Bu biroz murakkab.

Bu kodni sinab ko'ring:

```js run
// 3 soniyadan keyin ochish
setTimeout(() => window.open('http://google.com'), 3000);
```

Popup Chrome da ochiladi, lekin Firefox da bloklanadi.

...Agar kechikishni kamaytirsak, popup Firefox da ham ishlaydi:

```js run
// 1 soniyadan keyin ochish
setTimeout(() => window.open('http://google.com'), 1000);
```

Farqi shundaki, Firefox 2000ms yoki undan kam timeout ni maqbul deb hisoblaydi, lekin undan keyin -- "ishonch"ni olib tashlaydi, endi bu "foydalanuvchi harakatidan tashqarida" deb hisoblaydi. Shuning uchun birinchisi bloklanadi, ikkinchisi esa yo'q.

## window.open

Popup ochish sintaksisi: `window.open(url, name, params)`:

url
: Yangi oynaga yuklanadigan URL.

name
: Yangi oynaning nomi. Har bir oynada `window.name` mavjud va bu yerda popup uchun qaysi oynadan foydalanishni belgilashimiz mumkin. Agar bunday nomli oyna allaqachon mavjud bo'lsa -- berilgan URL unda ochiladi, aks holda yangi oyna ochiladi.

params
: Yangi oyna uchun konfiguratsiya qatori. U vergul bilan ajratilgan sozlamalarni o'z ichiga oladi. Params da bo'shliqlar bo'lmasligi kerak, masalan: `width=200,height=100`.

`params` uchun sozlamalar:

- Pozitsiya:
  - `left/top` (raqamli) -- ekrandagi oynaning yuqori-chap burchagi koordinatalari. Cheklov bor: yangi oyna ekrandan tashqarida joylashtirilishi mumkin emas.
  - `width/height` (raqamli) -- yangi oynaning kengligi va balandligi. Minimal kenglik/balandlik chegarasi bor, shuning uchun ko'rinmas oyna yaratish mumkin emas.
- Oyna xususiyatlari:
  - `menubar` (yes/no) -- yangi oynada brauzer menyusini ko'rsatish yoki yashirish.
  - `toolbar` (yes/no) -- yangi oynada brauzer navigatsiya panelini (orqaga, oldinga, qayta yuklash va hokazo) ko'rsatish yoki yashirish.
  - `location` (yes/no) -- yangi oynada URL maydonini ko'rsatish yoki yashirish. FF va IE standart bo'yicha uni yashirishga ruxsat bermaydi.
  - `status` (yes/no) -- status panelini ko'rsatish yoki yashirish. Shunga qaramay, ko'pgina brauzerlar uni ko'rsatishga majbur qiladi.
  - `resizable` (yes/no) -- yangi oyna uchun o'lchamini o'zgartirishni o'chirishga imkon beradi. Tavsiya etilmaydi.
  - `scrollbars` (yes/no) -- yangi oyna uchun scroll panellarini o'chirishga imkon beradi. Tavsiya etilmaydi.

Shuningdek, odatda ishlatilmaydigan kamroq qo'llab-quvvatlanadigan brauzerga xos xususiyatlar ham mavjud. Misollar uchun <a href="https://developer.mozilla.org/en/DOM/window.open">MDN dagi window.open</a> ni tekshiring.

## Misol: minimalistik oyna

Keling, minimal xususiyatlar to'plami bilan oyna ochamiz, shunchaki brauzer qaysi birlarini o'chirishga ruxsat berishini ko'rish uchun:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

Bu yerda ko'pgina "oyna xususiyatlari" o'chirilgan va oyna ekrandan tashqarida joylashtirilgan. Uni ishga tushiring va nima sodir bo'lishini ko'ring. Ko'pgina brauzerlar nol `width/height` va ekrandan tashqaridagi `left/top` kabi g'alati narsalarni "tuzatadi". Masalan, Chrome bunday oynani to'liq kenglik/balandlik bilan ochadi, shuning uchun u butun ekranni egallaydi.

Keling, normal joylashish parametrlarini va o'rtacha `width`, `height`, `left`, `top` koordinatalarini qo'shamiz:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

Ko'pgina brauzerlar yuqoridagi misolni kerak bo'lganidek ko'rsatadi.

Qoldirilgan sozlamalar uchun qoidalar:

- Agar `open` chaqiruvida 3-chi argument yo'q bo'lsa yoki bo'sh bo'lsa, standart oyna parametrlari ishlatiladi.
- Agar params qatori mavjud bo'lsa, lekin ba'zi `yes/no` xususiyatlari qoldirilgan bo'lsa, qoldirilgan xususiyatlar `no` qiymatiga ega deb hisoblanadi. Shuning uchun agar params ni belgilasangiz, barcha kerakli xususiyatlarni aniq ravishda yes ga o'rnatganingizga ishonch hosil qiling.
- Agar params da `left/top` yo'q bo'lsa, brauzer oxirgi ochildigan oyna yaqinida yangi oyna ochishga harakat qiladi.
- Agar `width/height` yo'q bo'lsa, yangi oyna oxirgi ochildigan bilan bir xil o'lchamda bo'ladi.

## Oynadan popup ga kirish

`open` chaqiruvi yangi oynaga havola qaytaradi. U xususiyatlarini boshqarish, joylashuvni o'zgartirish va hatto ko'proq narsalar uchun ishlatilishi mumkin.

Bu misolda biz popup kontentini JavaScript dan yaratamiz:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Salom, dunyo!");
```

Va bu yerda yuklanishdan keyin kontentni o'zgartiramiz:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, yuklash hali boshlanmagan

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Xush kelibsiz!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Esda tuting: `window.open` dan darhol keyin yangi oyna hali yuklanmagan. Bu `(*)` qatordagi `alert` orqali ko'rsatilgan. Shuning uchun uni o'zgartirish uchun `onload` ni kutamiz. Shuningdek, `newWin.document` uchun `DOMContentLoaded` ishlov beruvchisidan ham foydalanishimiz mumkin.

```warn header="Bir xil kelib chiqish siyosati"
Oynalar bir-birining kontentiga faqat bir xil kelib chiqishdan (bir xil protocol://domain:port) kelgan taqdirdagina erkin kirishlari mumkin.

Aks holda, masalan asosiy oyna `site.com` dan, popup esa `gmail.com` dan bo'lsa, foydalanuvchi xavfsizligi sabablariga ko'ra bu mumkin emas. Tafsilotlar uchun <info:cross-window-communication> bobini ko'ring.
```

## Popup dan oynaga kirish

Popup ham `window.opener` havolasi yordamida "ochuvchi" oynaga kirishi mumkin. Bu popuplardan tashqari barcha oynalar uchun `null`.

Agar quyidagi kodni ishga tushirsangiz, u ochuvchi (joriy) oyna kontentini "Test" bilan almashtiradi:

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

Shunday qilib, oynalar orasidagi aloqa ikki tomonlama: asosiy oyna va popup bir-biriga havolaga ega.

## Popup ni yopish

Oynani yopish uchun: `win.close()`.

Oyna yopilganligini tekshirish uchun: `win.closed`.

Texnik jihatdan, `close()` usuli har qanday `window` uchun mavjud, lekin `window` `window.open()` bilan yaratilmagan bo'lsa, ko'pgina brauzerlar `window.close()` ni e'tiborsiz qoldiradi. Shuning uchun u faqat popup da ishlaydi.

`closed` xossasi oyna yopilgan bo'lsa `true` bo'ladi. Bu popup (yoki asosiy oyna) hali ochiq yoki yo'qligini tekshirish uchun foydali. Foydalanuvchi uni istalgan vaqtda yopishi mumkin va bizning kodimiz bu imkoniyatni hisobga olishi kerak.

Bu kod oynani yuklaydi va keyin yopadi:

```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

## Harakatlantirish va o'lchamini o'zgartirish

Oynani harakatlantirish/o'lchamini o'zgartirish uchun usullar mavjud:

`win.moveBy(x,y)`
: Oynani joriy pozitsiyadan nisbatan `x` piksel o'ngga va `y` piksel pastga siljitish. Salbiy qiymatlar ruxsat etilgan (chapga/yuqoriga siljitish uchun).

`win.moveTo(x,y)`
: Oynani ekrandagi `(x,y)` koordinatalariga siljitish.

`win.resizeBy(width,height)`
: Oynani joriy o'lchamga nisbatan berilgan `width/height` ga o'zgartirish. Salbiy qiymatlar ruxsat etilgan.

`win.resizeTo(width,height)`
: Oynani berilgan o'lchamga o'zgartirish.

`window.onresize` hodisasi ham mavjud.

```warn header="Faqat popuplar"
Suiiste'molni oldini olish uchun, brauzer odatda bu usullarni bloklaydi. Ular faqat biz ochgan, qo'shimcha tablarisiz popuplarda ishonchli ishlaydi.
```

```warn header="Kichraytirish/kattalashtirishsiz"
JavaScript da oynani kichraytirish yoki kattalashtirish imkoni yo'q. Bu OS darajasidagi funksiyalar Frontend-ishlab chiquvchilardan yashirilgan.

Harakatlantirish/o'lchamini o'zgartirish usullari maksimallashtirilen/minimallashtirilen oynalar uchun ishlamaydi.
```

## Oynani aylantirish

Biz <info:size-and-scroll-window> bobida oynani aylantirish haqida allaqachon gaplashdik.

`win.scrollBy(x,y)`
: Oynani joriy aylantirish nisbatan `x` piksel o'ngga va `y` pastga aylantirish. Salbiy qiymatlar ruxsat etilgan.

`win.scrollTo(x,y)`
: Oynani berilgan `(x,y)` koordinatalariga aylantirish.

`elem.scrollIntoView(top = true)`
: `elem` ni yuqorida (standart) ko'rsatish uchun oynani aylantirish yoki `elem.scrollIntoView(false)` uchun pastda.

`window.onscroll` hodisasi ham mavjud.

## Oynada fokus/blur

Nazariy jihatdan, oynaga fokus/fokusni yo'qotish uchun `window.focus()` va `window.blur()` usullari mavjud. Va shuningdek tashrif buyuruvchi oynaga fokuslanish va boshqa joyga o'tish paytini ushlash uchun `focus/blur` hodisalari ham bor.

Garchi, amalda ular jiddiy cheklangan, chunki o'tmishda yomon sahifalar ularni suiiste'mol qilgan.

Masalan, bu kodga qarang:

```js run
window.onblur = () => window.focus();
```

Foydalanuvchi oynadan chiqishga harakat qilganda (`window.onblur`), u oynani yana fokusga qaytaradi. Maqsad foydalanuvchini `window` ichida "qulflash".

Shuning uchun brauzerlar bunday kodni taqiqlash va foydalanuvchini reklamalar va yomon sahifalardan himoya qilish uchun ko'plab cheklovlarni kiritishga majbur bo'ldi. Ular brauzerga bog'liq.

Masalan, mobil brauzer odatda `window.focus()` ni butunlay e'tiborsiz qoldiradi. Shuningdek, popup yangi oyna emas, balki alohida tabda ochilganda fokuslash ishlamaydi.

Shunga qaramay, bunday chaqiruvlar ishlaydigan va foydali bo'lishi mumkin bo'lgan ba'zi foydalanish holatlari mavjud.

Masalan:

- Popup ochganimizda, unda `newWindow.focus()` ni ishga tushirish yaxshi fikr bo'lishi mumkin. Har ehtimolga qarshi, ba'zi OS/brauzer kombinatsiyalari uchun bu foydalanuvchi endi yangi oynada ekanligini ta'minlaydi.
- Agar tashrif buyuruvchi haqiqatda bizning veb-ilovamizni ishlatayotganini kuzatishni xohlasak, `window.onfocus/onblur` ni kuzatishimiz mumkin. Bu bizga sahifa ichidagi faoliyatlar, animatsiyalar va hokazolarni to'xtatish/davom ettirish imkonini beradi. Lekin esda tutingki, `blur` hodisasi tashrif buyuruvchi oynadan chiqib ketganini anglatadi, lekin ular uni hali ham kuzatishlari mumkin. Oyna fonda, lekin hali ham ko'rinadigan bo'lishi mumkin.

## Xulosa

Popup oynalar kamdan-kam ishlatiladi, chunki muqobillar mavjud: ma'lumotni sahifa ichida yoki iframe da yuklash va ko'rsatish.

Agar popup ochmoqchi bo'lsak, yaxshi amaliyot foydalanuvchini bu haqda xabardor qilish. Havola yoki tugma yaqinidagi "oyna ochish" belgisi tashrif buyuruvchiga fokus o'zgarishidan omon qolish va ikkala oynani ham esda saqlash imkonini beradi.

- Popup `open(url, name, params)` chaqiruvi bilan ochilishi mumkin. U yangi ochildigan oynaga havolani qaytaradi.
- Brauzerlar foydalanuvchi harakatlaridan tashqaridagi koddan `open` chaqiruvlarini bloklaydi. Odatda bildirishnoma paydo bo'ladi, shunda foydalanuvchi ularga ruxsat berishi mumkin.
- Brauzerlar standart bo'yicha yangi tab ochadi, lekin o'lchamlar berilgan bo'lsa, popup oyna bo'ladi.
- Popup `window.opener` xossasi yordamida ochuvchi oynaga kirishi mumkin.
- Asosiy oyna va popup bir xil kelib chiqishga ega bo'lsa, bir-birini erkin o'qishi va o'zgartirishi mumkin. Aks holda, ular bir-birining joylashuvini o'zgartirishi va [xabarlar almashishi](info:cross-window-communication) mumkin.

Popup ni yopish uchun: `close()` chaqiruvidan foydalaning. Shuningdek, foydalanuvchi ularni (boshqa oynalar kabi) yopishi mumkin. Undan keyin `window.closed` `true` bo'ladi.

- `focus()` va `blur()` usullari oynaga fokus/fokusni yo'qotish imkonini beradi. Lekin ular har doim ham ishlamaydi.
- `focus` va `blur` hodisalari oynaga kirish va undan chiqishni kuzatish imkonini beradi. Lekin esda tutingki, `blur` dan keyin ham oyna fon holatida ko'rinishi mumkin.