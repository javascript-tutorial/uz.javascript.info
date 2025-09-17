# Fetch: Cross-Origin So'rovlari

Agar biz `fetch` so'rovini boshqa veb-saytga yubortsak, u ehtimol muvaffaqiyatsiz bo'ladi.

Masalan, `http://example.com` ni fetch qilishga harakat qilaylik:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
```

Kutilganidek, Fetch muvaffaqiyatsiz.

Bu yerda asosiy tushuncha *origin* - domen/port/protokol uchligiBu yerda asosiy tushuncha *origin* - domen/port/protokol uchligi.

Cross-origin so'rovlari -- boshqa domanga (hatto subdomenga), protokol yoki portga yuborilgan so'rovlar -- masofaviy tomondan maxsus header'larni talab qiladi.

Bu siyosat "CORS" deb ataladi: Cross-Origin Resource Sharing.

## Nega CORS kerak? Qisqa tarix

CORS internetni yomon hakerlardan himoya qilish uchun mavjud.

Jiddiy gapirmoqchiman. Juda qisqa tarixiy chetga chiqish qilaylik.

**Ko'p yillar davomida bitta saytdan script boshqa saytning kontentiga kira olmardi.**

Bu oddiy, ammo kuchli qoida internet xavfsizligining poydevori edi. Masalan, `hacker.com` saytidan yomon script foydalanuvchining `gmail.com` saytidagi pochta qutisiga kira olmardi. Odamlar o'zlarini xavfsiz his qilishardi.

O'sha paytda JavaScript'da tarmoq so'rovlarini bajarish uchun maxsus metodlar ham yo'q edi. Bu veb-sahifani bezash uchun o'yinchoq til edi.

Lekin veb dasturchilari ko'proq quvvat talab qilishdi. Cheklovni aylanib o'tish va boshqa veb-saytlarga so'rov yuborish uchun turli xil hiyla-nayranglar ixtiro qilindi.

### Formalardan foydalanish

Boshqa server bilan muloqot qilishning bir yo'li `<form>` ni u yerga yuborish edi. Odamlar uni `<iframe>` ga yuborishdi, shunchaki joriy sahifada qolish uchun, masalan:

```html
<!-- form target -->
*!*
<iframe name="iframe"></iframe>
*/!*

<!-- form dinamik ravishda yaratilishi va JavaScript orqali yuborilishi mumkin -->
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

Shunday qilib, tarmoq metodlarisiz ham boshqa saytga GET/POST so'rov yuborish mumkin edi, chunki formalar ma'lumotlarni istalgan joyga yuborishi mumkin. Lekin boshqa saytdan `<iframe>` ning kontentiga kirish taqiqlanganligi sababli, javobni o'qish mumkin emas edi.

Aniq aytganda, buning uchun aslida hiyla-nayranglar mavjud edi, ular iframe va sahifada maxsus script'larni talab qilardi. Shunday qilib, iframe bilan aloqa texnik jihatdan mumkin edi. Hozir batafsil ma'lumot berish ma'nosi yo'q, bu dinozavrlar tinch yotsin.

### Script'lardan foydalanish

Yana bir hiyla `script` tegidan foydalanish edi. Script `<script src="http://another.com/…">` kabi istalgan domen bilan istalgan `src` ga ega bo'lishi mumkin. Istalgan veb-saytdan script'ni bajarish mumkin.

Agar veb-sayt, masalan `another.com` bunday kirish uchun ma'lumotlarni ochiq qilmoqchi bo'lsa, "JSONP (JSON with padding)" deb ataladigan protokol ishlatiladi.

Bu qanday ishlagan.

Aytaylik, bizning saytimizda `http://another.com` dan, masalan, ob-havo ma'lumotlarini olishimiz kerak:

1. Avval, oldindan ma'lumotlarni qabul qilish uchun global funktsiya e'lon qilamiz, masalan `gotWeather`.

    ```js
    // 1. Ob-havo ma'lumotlarini qayta ishlash uchun funktsiyani e'lon qilish
    function gotWeather({ temperature, humidity }) {
      alert(`harorat: ${temperature}, namlik: ${humidity}`);
    }
    ```
2. Keyin biz funktsiyamiz nomini `callback` URL-parametri sifatida ishlatib, `src="http://another.com/weather.json?callback=gotWeather"` bilan `<script>` tegi yaratamiz.

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.body.append(script);
    ```
3. Masofaviy server `another.com` bizning qabul qilishimizni xohlagan ma'lumotlar bilan `gotWeather(...)` ni chaqiradigan script'ni dinamik ravishda yaratadi.
    ```js
    // Serverdan kutilgan javob bunday ko'rinadi:
    gotWeather({
      temperature: 25,
      humidity: 78
    });
    ```
4. Masofaviy script yuklanib va bajarilganda, `gotWeather` ishlaydi va bu bizning funktsiyamiz bo'lgani uchun bizda ma'lumot bor.

Bu ishlaydi va xavfsizlikni buzmaydi, chunki ikkala tomon ham ma'lumotlarni shu tarzda uzatishga rozi. Va ikkala tomon rozi bo'lganda, bu albatta hack emas. Bunday kirish imkonini beradigan xizmatlar hali ham mavjud, chunki bu juda eski brauzerlar uchun ham ishlaydi.

Bir muncha vaqt o'tgach, brauzer JavaScript'da tarmoq metodlari paydo bo'ldi.

Dastlab, cross-origin so'rovlari taqiqlangan edi. Lekin uzoq muhokamalar natijasida cross-origin so'rovlariga ruxsat berildi, ammo har qanday yangi imkoniyatlar server tomonidan maxsus header'larda ifodalangan aniq ruxsatni talab qildi.

## Xavfsiz so'rovlar

Cross-origin so'rovlarining ikki turi bor:

1. Xavfsiz so'rovlar.
2. Qolganlari.

Xavfsiz so'rovlar yaratish osonroq, shuning uchun ulardan boshlaylik.

Agar so'rov ikkita shartni qanoatlantirsa, u xavfsiz hisoblanadi:

1. [Xavfsiz metod](https://fetch.spec.whatwg.org/#cors-safelisted-method): GET, POST yoki HEAD
2. [Xavfsiz header'lar](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) -- faqat ruxsat etilgan maxsus header'lar:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` `application/x-www-form-urlencoded`, `multipart/form-data` yoki `text/plain` qiymati bilan.

Boshqa har qanday so'rov "xavfsiz emas" deb hisoblanadi. Masalan, `PUT` metodi yoki `API-Key` HTTP-header bilan so'rov cheklovlarga mos kelmaydi.

**Muhim farq shundaki, xavfsiz so'rovni `<form>` yoki `<script>` bilan, hech qanday maxsus metodlarsiz qilish mumkin.**

Shunday qilib, hatto juda eski server ham xavfsiz so'rovni qabul qilishga tayyor bo'lishi kerak.

Buning aksiga, nostandart header'lar yoki masalan `DELETE` metodi bilan so'rovlarni shu tarzda yaratib bo'lmaydi. Uzoq vaqt davomida JavaScript bunday so'rovlarni bajara olmadi. Shuning uchun eski server bunday so'rovlar imtiyozli manbadan keladi deb taxmin qilishi mumkin, "chunki veb-sahifa ularni yubora olmaydi".

Biz xavfsiz bo'lmagan so'rov qilishga harakat qilganda, brauzer serverga so'raydi -- u bunday cross-origin so'rovlarni qabul qilishga rozimi yoki yo'qmi degan maxsus "preflight" so'rovni yuboradi?

Va server header'lar bilan aniq tasdiqlasa, xavfsiz bo'lmagan so'rov yuborilmaydi.

Endi batafsil ko'rib chiqamiz.

## Xavfsiz so'rovlar uchun CORS

Agar so'rov cross-origin bo'lsa, brauzer har doim unga `Origin` header'ini qo'shadi.

Masalan, agar biz `https://javascript.info/page` dan `https://anywhere.com/request` ga so'rov yubortsak, header'lar quyidagicha bo'ladi:

```http
GET /request
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

Ko'rib turganingizdek, `Origin` header yo'lsiz, aynan origin (domen/protokol/port) ni o'z ichiga oladi.

Server `Origin` ni tekshirishi va bunday so'rovni qabul qilishga rozi bo'lsa, javobga maxsus `Access-Control-Allow-Origin` header'ini qo'shishi mumkin. Bu header ruxsat etilgan origin (`https://javascript.info`) yoki yulduzcha `*` ni o'z ichiga olishi kerak. Shunda javob muvaffaqiyatli bo'ladi, aks holda xato.

Bu yerda brauzer ishonchli vositachi rolini o'ynaydi:
1. U cross-origin so'rov bilan to'g'ri `Origin` yuborilishini ta'minlaydi.
2. U javobda ruxsat beruvchi `Access-Control-Allow-Origin` ni tekshiradi, agar mavjud bo'lsa, JavaScript javobga kirishi mumkin, aks holda xato bilan muvaffaqiyatsiz bo'ladi.

![](xhr-another-domain.svg)

Mana ruxsat beruvchi server javobining misoli:
```http
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## Javob header'lari

Cross-origin so'rov uchun, sukut bo'yicha JavaScript faqat "xavfsiz" deb ataladigan javob header'lariga kirishi mumkin:

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

Boshqa har qanday javob header'iga kirish xatolikka olib keladi.

```smart
Ro'yxatda `Content-Length` header'i yo'q!

Bu header to'liq javob uzunligini o'z ichiga oladi. Shunday qilib, agar biz biror narsani yuklamoqchi bo'lsak va progress foizini kuzatmoqchi bo'lsak, bu header'ga kirish uchun qo'shimcha ruxsat kerak (pastga qarang).
```

JavaScript'ga boshqa har qanday javob header'iga kirish imkonini berish uchun, server `Access-Control-Expose-Headers` header'ini yuborishi kerak. U kirish mumkin bo'lishi kerak bo'lgan xavfsiz bo'lmagan header nomlari ro'yxatini vergul bilan ajratilgan holda o'z ichiga oladi.

Masalan:

```http
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-Headers: Content-Length,API-Key
*/!*
```

Bunday `Access-Control-Expose-Headers` header bilan script javobning `Content-Length` va `API-Key` header'larini o'qishi mumkin.

## "Xavfsiz bo'lmagan" so'rovlar

Biz istalgan HTTP-metoddan foydalanishimiz mumkin: nafaqat `GET/POST`, balki `PATCH`, `DELETE` va boshqalar ham.

Bir muncha vaqt oldin hech kim veb-sahifa bunday so'rovlarni qila olishini tasavvur ham qila olmasdi. Shuning uchun nostandart metodini "Bu brauzer emas" degan signal sifatida qabul qiladigan veb-xizmatlar hali ham mavjud bo'lishi mumkin. Ular kirish huquqlarini tekshirishda buni hisobga olishi mumkin.

Shunday qilib, tushunmovchiliklar oldini olish uchun, eski paytlarda qilinishi mumkin bo'lmagan har qanday "xavfsiz bo'lmagan" so'rov uchun brauzer bunday so'rovlarni darhol bajarmaydi. Avval u ruxsat so'rash uchun dastlabki, "preflight" deb ataladigan so'rovni yuboradi.

Preflight so'rov `OPTIONS` metodini, body'siz va ikkita header bilan ishlatadi:

- `Access-Control-Request-Method` header xavfsiz bo'lmagan so'rovning metodini o'z ichiga oladi.
- `Access-Control-Request-Headers` header uning xavfsiz bo'lmagan HTTP-header'larining vergul bilan ajratilgan ro'yxatini taqdim etadi.

Agar server so'rovlarni xizmat qilishga rozilashsa, u bo'sh body, 200 status va header'lar bilan javob berishi kerak:

- `Access-Control-Allow-Origin` `*` yoki `https://javascript.info` kabi so'rov qiluvchi origin bo'lishi kerak.
- `Access-Control-Allow-Methods` ruxsat etilgan metodga ega bo'lishi kerak.
- `Access-Control-Allow-Headers` ruxsat etilgan header'lar ro'yxatiga ega bo'lishi kerak.
- Qo'shimcha ravishda, `Access-Control-Max-Age` header ruxsatlarni kesh qilish uchun soniyalar sonini belgilashi mumkin. Shunda brauzer berilgan ruxsatlarni qanoatlantiruvchi keyingi so'rovlar uchun preflight yuborish shart emas.

![](xhr-preflight.svg)

Cross-origin `PATCH` so'rovi misolida (bu metod ko'pincha ma'lumotlarni yangilash uchun ishlatiladi) bu qadam-baqadam qanday ishlashini ko'raylik:

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
});
```

So'rov xavfsiz bo'lmasligining uchta sababi bor (bittasi yetarli):
- `PATCH` metodi
- `Content-Type` quyidagilardan biri emas: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`.
- "Xavfsiz bo'lmagan" `API-Key` header.

### 1-qadam (preflight so'rov)

Bunday so'rovni yuborishdan oldin, brauzer o'zi quyidagicha ko'rinadigan preflight so'rovni yuboradi:

```http
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

- Metod: `OPTIONS`.
- Yo'l -- asosiy so'rov bilan aynan bir xil: `/service.json`.
- Cross-origin maxsus header'lar:
    - `Origin` -- manba origin.
    - `Access-Control-Request-Method` -- so'ralgan metod.
    - `Access-Control-Request-Headers` -- "xavfsiz bo'lmagan" header'larning vergul bilan ajratilgan ro'yxati.

### 2-qadam (preflight javobi)

Server 200 status va header'lar bilan javob berishi kerak:
- `Access-Control-Allow-Origin: https://javascript.info`
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

Bu kelajakdagi aloqani ruxsat beradi, aks holda xato yuzaga keladi.

Agar server kelajakda boshqa metodlar va header'larni kutsa, ularni ro'yxatga qo'shib, oldindan ruxsat berish mantiqiy.

Masalan, bu javob `PUT`, `DELETE` va qo'shimcha header'larga ham ruxsat beradi:

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

Endi brauzer `PATCH` ning `Access-Control-Allow-Methods` da va `Content-Type,API-Key` ning `Access-Control-Allow-Headers` ro'yxatida ekanligini ko'radi, shuning uchun asosiy so'rovni yuboradi.

Agar soniyalar soni bilan `Access-Control-Max-Age` header mavjud bo'lsa, preflight ruxsatlari berilgan vaqt uchun keshlanadi. Yuqoridagi javob 86400 soniya (bir kun) uchun keshlanadi. Ushbu vaqt oralig'ida keyingi so'rovlar preflight'ga sabab bo'lmaydi. Agar ular keshlangan ruxsatlarga mos kelsa, ular to'g'ridan-to'g'ri yuboriladi.

### 3-qadam (haqiqiy so'rov)

Preflight muvaffaqiyatli bo'lganda, brauzer endi asosiy so'rovni bajaradi. Bu yerdagi jarayon xavfsiz so'rovlar bilan bir xil.

Asosiy so'rov `Origin` header'iga ega (chunki u cross-origin):

```http
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

### 4-qadam (haqiqiy javob)

Server asosiy javobga `Access-Control-Allow-Origin` qo'shishni unutmasligi kerak. Muvaffaqiyatli preflight bundan ozod etmaydi:

```http
Access-Control-Allow-Origin: https://javascript.info
```

Keyin JavaScript asosiy server javobini o'qiy oladi.

```smart
Preflight so'rov "sahna ortida" sodir bo'ladi, JavaScript uchun ko'rinmas.

JavaScript faqat asosiy so'rovga javob yoki server ruxsati bo'lmasa xatoni oladi.
```

## Hisob ma'lumotlari (Credentials)

JavaScript kodi tomonidan ishga tushirilgan cross-origin so'rov sukut bo'yicha hech qanday hisob ma'lumotlarini (cookie yoki HTTP autentifikatsiya) olib kelmaydi.

Bu HTTP-so'rovlar uchun odatiy emas. Odatda, `http://site.com` ga so'rov o'sha domendagi barcha cookie'lar bilan birga keladi. JavaScript metodlari tomonidan amalga oshirilgan cross-origin so'rovlar esa bundan mustasno.

Masalan, `fetch('http://another.com')` `another.com` domeniga tegishli cookie'larni ham (!) yubormaydi.

Nega?

Buning sababi, hisob ma'lumotlari bilan so'rov ularsiz so'rovdan ancha kuchliroq. Agar ruxsat berilsa, bu JavaScript'ga foydalanuvchi nomidan to'liq harakat qilish va ularning hisob ma'lumotlaridan foydalanib maxfiy ma'lumotlarga kirish quvvatini beradi.

Server haqiqatan ham scriptga shunchalik ishonadimi? Unda u qo'shimcha header bilan hisob ma'lumotlari bilan so'rovlarga aniq ruxsat berishi kerak.

`fetch` da hisob ma'lumotlarini yuborish uchun `credentials: "include"` opsiyasini qo'shishimiz kerak, masalan:

```js
fetch('http://another.com', {
  credentials: "include"
});
```

Endi `fetch` `another.com` dan kelib chiqkan cookie'larni o'sha saytga so'rov bilan yuboradi.

Agar server *hisob ma'lumotlari bilan* so'rovni qabul qilishga rozilashsa, u `Access-Control-Allow-Origin` ga qo'shimcha ravishda javobga `Access-Control-Allow-Credentials: true` header'ini qo'shishi kerak.

Masalan:

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

Diqqat qiling: hisob ma'lumotlari bilan so'rovlar uchun `Access-Control-Allow-Origin` da yulduzcha `*` ishlatish taqiqlangan. Yuqorida ko'rsatilganidek, u yerda aniq origin bo'lishi kerak. Bu qo'shimcha xavfsizlik chorasi, serverning bunday so'rovlarni kim qilishiga ishonishini bilishini ta'minlash uchun.

## Xulosa

Brauzer nuqtai nazaridan cross-origin so'rovlarining ikki turi bor: "xavfsiz" va boshqalar.

"Xavfsiz" so'rovlar quyidagi shartlarni qanoatlantirishi kerak:
- Metod: GET, POST yoki HEAD.
- Header'lar -- faqat quyidagilarni o'rnatishimiz mumkin:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` `application/x-www-form-urlencoded`, `multipart/form-data` yoki `text/plain` qiymatiga

Muhim farq shundaki, xavfsiz so'rovlar qadim zamonlardan beri `<form>` yoki `<script>` teglari yordamida amalga oshirilishi mumkin edi, xavfsiz bo'lmaganlar esa brauzerlar uchun uzoq vaqt davomida imkonsiz edi.

Shunday qilib, amaliy farq shundaki, xavfsiz so'rovlar `Origin` header bilan darhol yuboriladi, boshqalari uchun esa brauzer ruxsat so'rab dastlabki "preflight" so'rovni bajaradi.

**Xavfsiz so'rovlar uchun:**

- → Brauzer origin bilan `Origin` header'ini yuboradi.
- ← Hisob ma'lumotlarisiz so'rovlar uchun (sukut bo'yicha yuborilmaydi), server quyidagilarni o'rnatishi kerak:
    - `Access-Control-Allow-Origin` `*` ga yoki `Origin` bilan bir xil qiymatga
- ← Hisob ma'lumotlari bilan so'rovlar uchun server quyidagilarni o'rnatishi kerak:
    - `Access-Control-Allow-Origin` `Origin` bilan bir xil qiymatga
    - `Access-Control-Allow-Credentials` `true` ga

Qo'shimcha ravishda, JavaScript'ga `Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` yoki `Pragma` dan tashqari har qanday javob header'lariga kirish imkonini berish uchun server ruxsat etilganlarni `Access-Control-Expose-Headers` header'ida ro'yxatlashi kerak.

**Xavfsiz bo'lmagan so'rovlar uchun so'ralgan so'rovdan oldin dastlabki "preflight" so'rov yuboriladi:**

- → Brauzer bir xil URL ga `OPTIONS` so'rovni header'lar bilan yuboradi:
    - `Access-Control-Request-Method` so'ralgan metodga ega.
    - `Access-Control-Request-Headers` xavfsiz bo'lmagan so'ralgan header'larni ro'yxatlaydi.
- ← Server 200 status va header'lar bilan javob berishi kerak:
    - `Access-Control-Allow-Methods` ruxsat etilgan metodlar ro'yxati bilan,
    - `Access-Control-Allow-Headers` ruxsat etilgan header'lar ro'yxati bilan,
    - `Access-Control-Max-Age` ruxsatlarni kesh qilish uchun soniyalar soni bilan.
- Keyin haqiqiy so'rov yuboriladi va oldingi "xavfsiz" sxema qo'llaniladi.