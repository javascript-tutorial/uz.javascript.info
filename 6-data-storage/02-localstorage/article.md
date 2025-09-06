# LocalStorage, sessionStorage

Veb-saqlash obyektlari `localStorage` va `sessionStorage` brauzerda kalit/qiymat juftlarini saqlash imkonini beradi.

Ularning qiziq tomoni shundaki, ma'lumotlar sahifani yangilashdan keyin ham (`sessionStorage` uchun) va hatto brauzerni to'liq qayta ishga tushirishdan keyin ham (`localStorage` uchun) saqlanib qoladi. Buni tez orada ko'ramiz.

Bizda allaqachon cookie'lar bor. Nima uchun qo'shimcha obyektlar kerak?

- Cookie'lardan farqli o'laroq, veb-saqlash obyektlari har bir so'rov bilan serverga yuborilmaydi. Shu sababli biz ancha ko'p ma'lumot saqlashimiz mumkin. Ko'pchilik brauzerlar kamida 2 megabayt ma'lumotga (yoki undan ko'piga) ruxsat beradi va buni sozlash uchun sozlamalar mavjud.
- Shuningdek cookie'lardan farqli o'laroq, server HTTP sarlavhalar orqali saqlash obyektlarini boshqara olmaydi. Hammasi JavaScript'da amalga oshiriladi.
- Saqlash origin'ga (domen/protokol/port uchtaligi) bog'langan. Ya'ni turli protokollar yoki subdomenlar turli saqlash obyektlariga ega bo'ladi, ular bir-birlarining ma'lumotlariga kira olmaydi.

Ikkala saqlash obyekti ham bir xil metodlar va xususiyatlarni taqdim etadi:

- `setItem(key, value)` -- kalit/qiymat juftligini saqlash.
- `getItem(key)` -- kalit bo'yicha qiymatni olish.
- `removeItem(key)` -- kalitni qiymati bilan birga o'chirish.
- `clear()` -- hamma narsani o'chirish.
- `key(index)` -- berilgan pozitsiyadagi kalitni olish.
- `length` -- saqlangan elementlar soni.

Ko'rib turganingizdek, bu `Map` kolleksiyasiga o'xshaydi (`setItem/getItem/removeItem`), lekin `key(index)` orqali indeks bo'yicha kirishga ham imkon beradi.

Bu qanday ishlashini ko'raylik.

## localStorage namunasi

`localStorage`ning asosiy xususiyatlari:

- Bir xil origin'dan kelgan barcha tab va oynalar o'rtasida umumlashtiriladi.
- Ma'lumotlar muddati tugamaydi. Brauzer qayta ishga tushirilgandan va hatto OS qayta yuklangandan keyin ham saqlanib qoladi.

Masalan, agar siz ushbu kodni ishga tushirsangiz...

```js run
localStorage.setItem('test', 1);
```

...Va brauzerni yopib/ochsangiz yoki xuddi shu sahifani boshqa oynada ochsangiz, uni quyidagicha olishingiz mumkin:

```js run
alert( localStorage.getItem('test') ); // 1
```

Biz faqat bir xil origin'da (domen/port/protokol) bo'lishimiz kerak, URL yo'li boshqacha bo'lishi mumkin.

`localStorage` bir xil origin'ga ega bo'lgan barcha oynalar o'rtasida umumlashtiriladi, shuning uchun agar biz bir oynada ma'lumotni o'rnatsak, o'zgarish boshqa oynada ko'rinadigan bo'ladi.

## Obyekt kabi kirish

Shuningdek kalitlarni olish/o'rnatish uchun oddiy obyekt usulidan foydalanishimiz mumkin:

```js run
// kalitni o'rnatish
localStorage.test = 2;

// kalitni olish
alert( localStorage.test ); // 2

// kalitni o'chirish
delete localStorage.test;
```

Bu tarixiy sabablarga ko'ra ruxsat etilgan va asosan ishlaydi, lekin odatda tavsiya etilmaydi, chunki:

1. Agar kalit foydalanuvchi tomonidan yaratilgan bo'lsa, u har qanday narsa bo'lishi mumkin, masalan `length` yoki `toString`, yoki `localStorage`ning boshqa ichki metodi. Bunday holda `getItem/setItem` yaxshi ishlaydi, obyekt kabi kirish esa muvaffaqiyatsiz bo'ladi:
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Xatolik, length tayinlab bo'lmaydi
    ```

2. `storage` hodisasi mavjud, u ma'lumotni o'zgartirganimizda ishga tushadi. Bu hodisa obyekt kabi kirishda sodir bo'lmaydi. Buni keyinroq ushbu bobda ko'ramiz.

## Kalitlar bo'ylab aylanish

Ko'rib turganingizdek, metodlar "kalit bo'yicha olish/o'rnatish/o'chirish" funksionalligini taqdim etadi. Lekin barcha saqlangan qiymatlar yoki kalitlarni qanday olish mumkin?

Afsuski, saqlash obyektlari takrorlanuvchi emas.

Bir usul ular ustida massiv kabi aylanishdir:

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Boshqa usul `for key in localStorage` tsiklidan foydalanish, xuddi oddiy obyektlar bilan qilganimizdek.

U kalitlar bo'ylab takrorlanadi, lekin bizga kerak bo'lmagan bir nechta ichki maydonlarni ham chiqaradi:

```js run
// yomon urinish
for(let key in localStorage) {
  alert(key); // getItem, setItem va boshqa ichki narsalarni ko'rsatadi
}
```

...Shuning uchun bizga `hasOwnProperty` tekshiruvi bilan prototipdan maydonlarni filtrlash kerak:

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // "setItem", "getItem" va boshqalar kabi kalitlarni o'tkazib yuborish
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

...Yoki shunchaki `Object.keys` bilan "o'z" kalitlarini olib, kerak bo'lsa ular bo'ylab aylanish:

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Ikkinchisi ishlaydi, chunki `Object.keys` faqat obyektga tegishli kalitlarni qaytaradi, prototipni e'tiborsiz qoldiradi.

## Faqat stringlar

Iltimos, e'tibor bering, kalit ham, qiymat ham string bo'lishi kerak.

Agar boshqa turdagi bo'lsa, masalan raqam yoki obyekt, u avtomatik ravishda stringga aylantiriladi:

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

Obyektlarni saqlash uchun `JSON`dan foydalanishimiz mumkin:

```js run
localStorage.user = JSON.stringify({name: "John"});

// bir muncha vaqt o'tgach
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

Shuningdek, masalan debug maqsadlari uchun butun saqlash obyektini stringlashtirish mumkin:

```js run
// obyektni chiroyli ko'rinishda qilish uchun JSON.stringify'ga formatlash parametrlarini qo'shdik
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

`sessionStorage` obyekti `localStorage`dan ancha kamroq ishlatiladi.

Xususiyatlar va metodlar bir xil, lekin u ancha cheklangan:

- `sessionStorage` faqat joriy brauzer tabida mavjud.
  - Xuddi shu sahifaga ega bo'lgan boshqa tab boshqa saqlashga ega bo'ladi.
  - Lekin u bir xil tabdagi iframe'lar o'rtasida umumlashtiriladi (bir xil origin'dan kelgan deb hisoblasak).
- Ma'lumotlar sahifani yangilashdan omon qoladi, lekin tabni yopish/ochishdan emas.

Buni amalda ko'raylik.

Ushbu kodni ishga tushiring...

```js run
sessionStorage.setItem('test', 1);
```

...Keyin sahifani yangilang. Endi ham ma'lumotni olishingiz mumkin:

```js run
alert( sessionStorage.getItem('test') ); // yangilashdan keyin: 1
```

...Lekin agar siz xuddi shu sahifani boshqa tabda ochsangiz va u yerda qaytadan urinib ko'rsangiz, yuqoridagi kod `null` qaytaradi, ya'ni "hech narsa topilmadi".

Aynan shuning uchun `sessionStorage` nafaqat origin'ga, balki brauzer tabiga ham bog'langan. Shu sababli `sessionStorage` kam ishlatiladi.

## Storage hodisasi

`localStorage` yoki `sessionStorage`da ma'lumotlar yangilanganda, [storage](https://www.w3.org/TR/webstorage/#the-storage-event) hodisasi ishga tushadi va quyidagi xususiyatlarga ega:

- `key` – o'zgartirilgan kalit (agar `.clear()` chaqirilsa `null`).
- `oldValue` – eski qiymat (kalit yangi qo'shilgan bo'lsa `null`).
- `newValue` – yangi qiymat (kalit o'chirilgan bo'lsa `null`).
- `url` – yangilanish sodir bo'lgan hujjatning url'i.
- `storageArea` – yangilanish sodir bo'lgan `localStorage` yoki `sessionStorage` obyekti.

Muhim narsa: hodisa saqlashga kira oladigan barcha `window` obyektlarida ishga tushadi, faqat uni sabab bo'lgan obyektdan tashqari.

Batafsil tushuntiramiz.

Tasavvur qiling, sizda bir xil saytga ega ikkita oyna bor. Demak `localStorage` ular o'rtasida umumlashtirilgan.

```online
Quyidagi kodni sinab ko'rish uchun ushbu sahifani ikkita brauzer oynasida ochishingiz mumkin.
```

Agar ikkala oyna ham `window.onstorage`ni tinglayotgan bo'lsa, har biri boshqasida sodir bo'lgan yangilanishlarga javob beradi.

```js run
// boshqa hujjatlardan bir xil saqlashga kiritilgan yangilanishlarda ishga tushadi
window.onstorage = event => { // window.addEventListener('storage', event => { bilan bir xil
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

Iltimos, e'tibor bering, hodisa shuningdek: `event.url`ni ham o'z ichiga oladi -- ma'lumotlar yangilangan hujjatning url'i.

Shuningdek, `event.storageArea` saqlash obyektini o'z ichiga oladi -- hodisa `sessionStorage` va `localStorage` uchun bir xil, shuning uchun `event.storageArea` o'zgartirilgan obyektga havola qiladi. Hatto o'zgarishga "javob berish" uchun unga biror narsani qaytarib o'rnatishimiz ham mumkin.

**Bu bir xil origin'dagi turli oynalarning xabar almashishiga imkon beradi.**

Zamonaviy brauzerlar shuningdek [Broadcast channel API](mdn:/api/Broadcast_Channel_API)ni qo'llab-quvvatlaydi, bir xil origin'li oynalar orasidagi muloqot uchun maxsus API, u ko'proq xususiyatlarga ega, lekin kamroq qo'llab-quvvatlanadi. `localStorage` asosidagi API'ni polyfill qiladigan va uni hamma joyda mavjud qiladigan kutubxonalar mavjud.

## Xulosa

Veb-saqlash obyektlari `localStorage` va `sessionStorage` brauzerda kalit/qiymat saqlash imkonini beradi.
- `key` ham, `value` ham string bo'lishi kerak.
- Chegara 5mb+, brauzerga bog'liq.
- Ularning muddati tugamaydi.
- Ma'lumotlar origin'ga (domen/port/protokol) bog'langan.

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Bir xil origin'ga ega barcha tab va oynalar o'rtasida umumlashtiriladi | Brauzer tabi ichida ko'rinadi, bir xil origin'dan kelgan iframe'larni ham o'z ichiga oladi |
| Brauzer qayta ishga tushirilgandan omon qoladi | Sahifani yangilashdan omon qoladi (lekin tabni yopishdan emas) |

API:

- `setItem(key, value)` -- kalit/qiymat juftligini saqlash.
- `getItem(key)` -- kalit bo'yicha qiymatni olish.
- `removeItem(key)` -- kalitni qiymati bilan birga o'chirish.
- `clear()` -- hamma narsani o'chirish.
- `key(index)` -- `index` raqamli kalitni olish.
- `length` -- saqlangan elementlar soni.
- Barcha kalitlarni olish uchun `Object.keys`dan foydalaning.
- Biz kalitlarga obyekt xususiyatlari sifatida kiramiz, bu holda `storage` hodisasi ishga tushmaydi.

Storage hodisasi:

- `setItem`, `removeItem`, `clear` chaqiruvlarida ishga tushadi.
- Operatsiya haqidagi barcha ma'lumotlarni (`key/oldValue/newValue`), hujjat `url`ini va saqlash obyekti `storageArea`ni o'z ichiga oladi.
- Saqlashga kira oladigan barcha `window` obyektlarida ishga tushadi, faqat uni yaratgan obyektdan tashqari (`sessionStorage` uchun tab ichida, `localStorage` uchun global miqyosda).