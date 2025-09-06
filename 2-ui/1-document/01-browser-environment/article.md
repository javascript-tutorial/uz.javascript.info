# Brauzer muhiti, xususiyatlari

JavaScript tili dastlab veb-brauzerlar uchun yaratilgan. O'shandan beri u rivojlanib, ko'plab foydalanish va platformalarga ega tilga aylandi.

Platforma JavaScript-ni ishga tushira olsa, brauzer yoki veb-server yoki boshqa _host_, hatto "aqlli" qahva mashinasi bo'lishi mumkin. Ularning har biri platformaga xos funksiyalarni taqdim etadi. JavaScript spetsifikatsiyasi buni _host muhiti_ deb ataydi.

Xost muhiti til yadrosiga qo'shimcha ravishda o'z ob'ektlari va funktsiyalarini ta'minlaydi. Veb-brauzerlar veb-sahifalarni boshqarish vositalarini beradi. Node.js server tomonidagi xususiyatlarni taqdim etadi va hokazo.

JavaScript veb-brauzerda ishlayotganida bizda nima borligini qushning nazari bilan ko'rib chiqamiz:

![](windowObjects.svg)

`Oyna` deb nomlangan "ildiz" ob'ekti mavjud. Uning ikkita roli bor:

1. Birinchidan, bu <info:global-object> bobida tasvirlanganidek, JavaScript kodi uchun global obyektdir.
2. Ikkinchidan, u "brauzer oynasi" ni ifodalaydi va uni boshqarish usullarini taqdim etadi.

Masalan, biz uni global ob'ekt sifatida ishlatamiz:

```js run
function sayHi() {
  alert("Hello");
}

// global funktsiyalar global ob'ektning usullari:
window.sayHi();
```

Va bu erda biz uni brauzer oynasi sifatida ishlatamiz, oyna balandligini ko'rish uchun:

```js run
alert(window.innerHeight); // oynaning ichki balandligi
```

Ko'proq oynaga xos usullar va xususiyatlar mavjud, biz ularni keyinroq ko'rib chiqamiz.

## DOM (Document Object Model)

Hujjat ob'ekt modeli yoki qisqacha DOM barcha sahifa mazmunini o'zgartirish mumkin bo'lgan ob'ektlar sifatida ifodalaydi.

`Hujjat` ob'ekti sahifaning asosiy "kirish nuqtasi" hisoblanadi. Uning yordamida biz sahifadagi biror narsani o'zgartirishimiz yoki yaratishimiz mumkin.

Masalan:

```js run
// fon rangini qizil rangga o'zgartiring
document.body.style.background = "red";

// 1 soniyadan keyin uni qayta o'zgartiring
setTimeout(() => (document.body.style.background = ""), 1000);
```

Bu erda biz `document.body.style` dan foydalandik, lekin yana ko'p narsalar bor. Xususiyatlar va usullar spetsifikatsiyada tasvirlangan: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM faqat brauzerlar uchun emas"
DOM spetsifikatsiyasi hujjatning tuzilishini tushuntiradi va uni boshqarish uchun ob'ektlarni taqdim etadi. DOM-dan foydalanadigan brauzer bo'lmagan asboblar ham mavjud.

Masalan, HTML-sahifalarni yuklaydigan va ularni qayta ishlovchi server tomonidagi skriptlar ham DOM-dan foydalanishi mumkin. Ular spetsifikatsiyaning faqat bir qismini qo'llab-quvvatlashi mumkin.
```

```smart header="Styling uchun CSSOM"
Shuningdek, CSS qoidalari va uslublar jadvallari uchun [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) alohida spetsifikatsiya mavjud bo'lib, ular qanday ob'ektlar sifatida taqdim etilishini, ularni qanday o'qish va yozishni tushuntiradi.

Hujjat uchun uslub qoidalarini o'zgartirganda CSSOM DOM bilan birgalikda ishlatiladi. Amalda, CSSOM kamdan-kam talab qilinadi, chunki biz kamdan-kam hollarda JavaScript-dan CSS qoidalarini o'zgartirishimiz kerak (odatda biz CSS sinflarini qo'shamiz/o'chiramiz, ularning CSS qoidalarini o'zgartirmaymiz), lekin bu ham mumkin.
```

## BOM (Browser Object Model)

Brauzer ob'ekt modeli (BOM) hujjatdan tashqari hamma narsa bilan ishlash uchun brauzer (xost muhiti) tomonidan taqdim etilgan qo'shimcha ob'ektlarni ifodalaydi.

Masalan:

- [navigator](mdn:api/Window/navigator) obyekti brauzer va operatsion tizim haqida fon maʼlumotlarini taqdim etadi. Ko'pgina xususiyatlar mavjud, lekin eng ko'p ma'lum bo'lgan ikkitasi: `navigator.userAgent` -- joriy brauzer haqida va `navigator.platform` -- platforma haqida (Windows/Linux/Mac va boshqalar o'rtasidagi farqni aniqlashga yordam beradi).
- [location](mdn:api/Window/location) obyekti bizga joriy URL manzilini o‘qish imkonini beradi va brauzerni yangisiga yo‘naltirishi mumkin.

`location` obyektidan shunday foydalanishimiz mumkin:

```js run
alert(location.href); // hozirgi urlni ko'rsatadi
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // boshqa url ga yo'naltiradi
}
```

`alert/confirm/prompt` funksiyalari ham BOMning bir qismidir: ular hujjat bilan bevosita bog'liq emas, lekin foydalanuvchi bilan muloqot qilishning sof brauzer usullarini ifodalaydi.

```smart header="Xususiyatlar"
BOM umumiy [HTML spetsifikatsiyasi] (https://html.spec.whatwg.org) qismidir.

Ha, siz buni to'g'ri eshitdingiz. <https://html.spec.whatwg.org> saytidagi HTML spetsifikatsiyasi nafaqat "HTML tili" (teglar, atributlar), balki bir qator ob'ektlar, usullar va brauzerga xos DOM kengaytmalarini ham qamrab oladi. Bu "keng ma'noda HTML". Shuningdek, ba'zi qismlarda <https://spec.whatwg.org> ro'yxatida qo'shimcha xususiyatlar mavjud.
```

## Xulosa

Standartlar haqida gapiradigan bo'lsak, bizda:

DOM spetsifikatsiyasi
: Hujjat tuzilishi, manipulyatsiyalar va hodisalarni tavsiflaydi, qarang: <https://dom.spec.whatwg.org>.

CSSOM spetsifikatsiyasi
: Uslublar jadvallari va uslublar qoidalarini, ular bilan manipulyatsiyalarni va ularni hujjatlarga bog'lashni tavsiflaydi, qarang: <https://www.w3.org/TR/cssom-1/>.

HTML spetsifikatsiyasi
: HTML tilini (masalan, teglar) va shuningdek, BOMni (brauzer ob'ekt modeli) tavsiflaydi -- turli xil brauzer funktsiyalari: `setTimeout`, `alert`, `location` va boshqalar, qarang: <https://html.spec.whatwg.org>. U DOM spetsifikatsiyasini oladi va uni ko'plab qo'shimcha xususiyatlar va usullar bilan kengaytiradi.

Bundan tashqari, ba'zi sinflar <https://spec.whatwg.org/> da alohida tasvirlangan.

Iltimos, ushbu havolalarga e'tibor bering, chunki o'rganish uchun juda ko'p narsa bor, hamma narsani qamrab olish va eslab qolish mumkin emas.

Xususiyat yoki usul haqida oʻqishni istasangiz, <https://developer.mozilla.org/en-US/search> sahifasidagi Mozilla qoʻllanmasi ham yaxshi manba boʻlib xizmat qiladi, ammo mos keladigan xususiyat yaxshiroq boʻlishi mumkin: u murakkabroq va oʻqish uchun uzoqroq, lekin asosiy bilimlaringizni mustahkam va toʻliq qiladi.

Biror narsani topish uchun "WHATWG [term]" yoki "MDN [term]" kabi internet qidiruvidan foydalanish qulay, masalan, <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Endi biz DOMni o'rganishga kirishamiz, chunki hujjat UIda markaziy rol o'ynaydi.
