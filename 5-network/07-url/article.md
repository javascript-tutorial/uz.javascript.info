# URL obyektlari

O'rnatilgan [URL](https://url.spec.whatwg.org/#api) klassi URL yaratish va tahlil qilish uchun qulay interfeys taqdim etadi.

Aynan `URL` obyektini talab qiladigan tarmoq metodlari yo'q, stringlar yetarli. Shuning uchun texnik jihatdan `URL` dan foydalanishimiz shart emas. Lekin ba'zida bu juda foydali bo'lishi mumkin.

## URL yaratish

Yangi `URL` obyektini yaratish sintaksisi:

```js
new URL(url, [base])
```

- **`url`** -- to'liq URL yoki faqat yo'l (agar base o'rnatilgan bo'lsa, pastga qarang),
- **`base`** -- ixtiyoriy bazaviy URL: agar o'rnatilgan bo'lsa va `url` argumenti faqat yo'lga ega bo'lsa, URL `base`ga nisbatan yaratiladi.

Masalan:

```js
let url = new URL('https://javascript.info/profile/admin');
```

Bu ikki URL bir xil:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Mavjud URL ga nisbatan yo'l asosida yangi URL ni osonlik bilan yaratishimiz mumkin:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

`URL` obyekti darhol uning komponentlariga kirishga imkon beradi, shuning uchun bu url ni tahlil qilishning yaxshi usuli, masalan:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Mana URL komponentlari uchun eslatma varaqasi:

![](url-object.svg)

- `href` to'liq url, `url.toString()` bilan bir xil
- `protocol` ikki nuqta belgisi `:` bilan tugaydi
- `search` - parametrlar satri, savol belgisi `?` bilan boshlanadi
- `hash` hash belgisi `#` bilan boshlanadi
- HTTP autentifikatsiya mavjud bo'lsa `user` va `password` xususiyatlari ham bo'lishi mumkin: `http://login:password@site.com` (yuqorida chizilmagan, kamdan-kam ishlatiladi).

```smart header="Biz string o'rniga tarmoq (va boshqa ko'plab) metodlarga `URL` obyektlarini berishimiz mumkin"
Biz `URL` obyektini `fetch` yoki `XMLHttpRequest` da, URL-string kutilgan deyarli hamma joyda ishlatishimiz mumkin.

Umuman olganda, `URL` obyekti string o'rniga istalgan metodga berilishi mumkin, chunki ko'pchilik metodlar string konvertatsiyasini bajaradi, bu esa `URL` obyektini to'liq URL bilan stringga aylantiradi.
```

## SearchParams "?..."

Faraz qilaylik, biz berilgan qidiruv parametrlari bilan url yaratmoqchimiz, masalan, `https://google.com/search?query=JavaScript`.

Biz ularni URL stringida berishimiz mumkin:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Lekin parametrlar bo'shliqlar, lotin bo'lmagan harflar va boshqalarni o'z ichiga olgan bo'lsa kodlanishi kerak (bu haqda pastda batafsil).

Buning uchun URL xususiyati bor: `url.searchParams`, [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) turida obyekt.

U qidiruv parametrlari uchun qulay metodlarni taqdim etadi:

- **`append(name, value)`** -- `name` bo'yicha parametr qo'shish,
- **`delete(name)`** -- `name` bo'yicha parametrni o'chirish,
- **`get(name)`** -- `name` bo'yicha parametrni olish,
- **`getAll(name)`** -- bir xil `name` bilan barcha parametrlarni olish (bu mumkin, masalan `?user=John&user=Pete`),
- **`has(name)`** -- `name` bo'yicha parametrning mavjudligini tekshirish,
- **`set(name, value)`** -- parametrni o'rnatish/almashtirish,
- **`sort()`** -- parametrlarni nom bo'yicha tartiblash, kamdan-kam kerak,
- ...va u ham takrorlanuvchi, `Map`ga o'xshash.

Bo'shliqlar va tinish belgilarini o'z ichiga olgan parametrlar bilan misol:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // bo'shliq va ! bilan parametr qo'shildi

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // ikki nuqta : bilan parametr qo'shildi

// parametrlar avtomatik kodlanadi
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// qidiruv parametrlari bo'ylab takrorlash (dekodlangan)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, keyin tbs=qdr:y
}
```

## Kodlash

URL'larda qaysi belgilarga ruxsat berilgani va qaysilariga ruxsat berilmagani belgilaydigan [RFC3986](https://tools.ietf.org/html/rfc3986) standarti mavjud.

Ruxsat berilmaganlar kodlanishi kerak, masalan lotin bo'lmagan harflar va bo'shliqlar - ularning UTF-8 kodlari bilan almashtiriladi, `%` bilan prefiks qo'yiladi, masalan `%20` (bo'shliq `+` bilan kodlanishi mumkin, tarixiy sabablarga ko'ra, lekin bu istisno).

Yaxshi xabar shundaki, `URL` obyektlari bularning barchasini avtomatik boshqaradi. Biz barcha parametrlarni kodlanmagan holda beramiz, so'ngra `URL` ni stringga aylantiramiz:

```js run
// bu misol uchun kirill harflaridan foydalanish

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

Ko'rib turganingizdek, url yo'lidagi `Тест` ham, parametrdagi `ъ` ham kodlangan.

URL uzunroq bo'ldi, chunki har bir kirill harfi UTF-8 da ikki bayt bilan ifodalanadi, shuning uchun ikkita `%..` entity bor.

### Stringlarni kodlash

Qadim zamonlarda, `URL` obyektlari paydo bo'lishidan oldin, odamlar URL'lar uchun stringlardan foydalanishgan.

Hozirgi kunda `URL` obyektlari ko'pincha qulayroq, lekin stringlar ham ishlatilishi mumkin. Ko'p hollarda string ishlatish kodni qisqartiradi.

Agar biz stringdan foydalansak, maxsus belgilarni qo'lda kodlash/dekodlash kerak.

Buning uchun o'rnatilgan funktsiyalar bor:

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - URL ni butunlay kodlaydi.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - uni orqaga dekodlaydi.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - qidiruv parametri, hash yoki pathname kabi URL komponentini kodlaydi.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - uni orqaga dekodlaydi.

Tabiiy savol: "`encodeURIComponent` va `encodeURI` o'rtasidagi farq nima? Qachon qaysi birini ishlatishimiz kerak?"

Buni tushunish oson, agar yuqoridagi rasmda komponentlarga bo'lingan URL ga qaratsak:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Ko'rib turganingizdek, `:`, `?`, `=`, `&`, `#` kabi belgilarga URL da ruxsat berilgan.

...Boshqa tomondan, agar biz qidiruv parametri kabi yagona URL komponentiga qaratsak, bu belgilar formatni buzmaslik uchun kodlanishi kerak.

- `encodeURI` faqat URL da butunlay taqiqlangan belgilarni kodlaydi.
- `encodeURIComponent` bir xil belgilarni kodlaydi va ularga qo'shimcha ravishda `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` va `@` belgilarini ham kodlaydi.

Shunday qilib, butun URL uchun biz `encodeURI` dan foydalanishimiz mumkin:

```js run
// url yo'lida kirill harflaridan foydalanish
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...URL parametrlari uchun esa `encodeURIComponent` dan foydalanishimiz kerak:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Buni `encodeURI` bilan solishtiring:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Ko'rib turganingizdek, `encodeURI` `&` ni kodlamaydi, chunki bu URL da umuman qonuniy belgi.

Lekin biz qidiruv parametri ichida `&` ni kodlashimiz kerak, aks holda `q=Rock&Roll` olamiz - bu aslida `q=Rock` va noma'lum `Roll` parametri. Niyat qilinganidek emas.

Shuning uchun har bir qidiruv parametri uchun uni URL stringga to'g'ri qo'shish uchun faqat `encodeURIComponent` dan foydalanishimiz kerak. Eng xavfsizi ham nom, ham qiymatni kodlash, faqat ruxsat etilgan belgilarga ega ekanligiga mutlaqo ishonch hosil qilmagan taqdirda.

````smart header="`URL` ga nisbatan kodlash farqi"
[URL](https://url.spec.whatwg.org/#url-class) va [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) klasslari eng so'nggi URI spetsifikatsiyasiga asoslangan: [RFC3986](https://tools.ietf.org/html/rfc3986), `encode*` funktsiyalar esa eski versiyaga asoslangan [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

Bir nechta farqlar bor, masalan IPv6 manzillari boshqacha kodlanadi:

```js run
// IPv6 manzili bilan yaroqli url
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Ko'rib turganingizdek, `encodeURI` kvadrat qavslarni `[...]` almashtirdi, bu noto'g'ri, sababi: IPv6 url'lari RFC2396 davridai (1998-yil avgust) mavjud emas edi.

Bunday holatlar kamdan-kam uchraydi, `encode*` funktsiyalar ko'p vaqtda yaxshi ishlaydi.
````