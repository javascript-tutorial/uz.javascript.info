# Fetch: Yuklash jarayonini kuzatish

`fetch` metodi *yuklash* jarayonini kuzatish imkonini beradi.

Diqqat qiling: hozirda `fetch` uchun *yuborish* jarayonini kuzatish imkoni yo'q. Bu maqsad uchun [XMLHttpRequest](info:xmlhttprequest) dan foydalaning, uni keyinroq ko'rib chiqamiz.

Yuklash jarayonini kuzatish uchun `response.body` xususiyatidan foydalanishimiz mumkin. Bu `ReadableStream` -- kelganda body ni qism-qism taqdim etadigan maxsus obyekt. Readable stream'lar [Streams API](https://streams.spec.whatwg.org/#rs-class) spetsifikatsiyasida tasvirlangan.

`response.text()`, `response.json()` va boshqa metodlardan farqli o'laroq, `response.body` o'qish jarayoni ustidan to'liq nazoratni beradi va biz istalgan paytda qancha iste'mol qilinganini hisoblashimiz mumkin.

`response.body` dan javobni o'qiydigan kodning eskizi:

```js
// response.json() va boshqa metodlar o'rniga
const reader = response.body.getReader();

// body yuklanayotganda cheksiz siklda
while(true) {
  // oxirgi qism uchun done true bo'ladi
  // value - qism baytlarining Uint8Array si
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`${value.length} bayt qabul qilindi`)
}
```

`await reader.read()` chaqiruvining natijasi ikkita xususiyatga ega obyekt:
- **`done`** -- o'qish tugallanganda `true`, aks holda `false`.
- **`value`** -- baytlarning typed array: `Uint8Array`.

```smart
Streams API shuningdek `for await..of` sikli bilan `ReadableStream` ustida asinxron iteratsiyani tasvirlaydi, lekin u hali keng qo'llab-quvvatlanmaydi ([brauzer muammolari](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)ga qarang), shuning uchun biz `while` siklini ishlatamiz.
```

Yuklash tugagunicha, ya'ni `done` `true` bo'lgunicha, biz siklda javob qismlarini qabul qilamiz.

Jarayonni yozib qo'yish uchun, har bir qabul qilingan `value` fragment uchun uning uzunligini hisoblagichga qo'shishimiz kerak.

Mana to'liq ishlaydigan misol, u javobni oladi va konsolda jarayonni yozadi, keyinroq batafsilroq tushuntirishlar keladi:

```js run async
// 1-qadam: fetch'ni boshlash va reader olish
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// 2-qadam: umumiy uzunlikni olish
const contentLength = +response.headers.get('Content-Length');

// 3-qadam: ma'lumotlarni o'qish
let receivedLength = 0; // hozirda qabul qilingan baytlar soni
let chunks = []; // qabul qilingan ikkilik qismlar massivi (body ni tashkil etadi)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`${contentLength} dan ${receivedLength} qabul qilindi`)
}

// 4-qadam: qismlarni yagona Uint8Array ga birlashtirish
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// 5-qadam: stringga dekodlash
let result = new TextDecoder("utf-8").decode(chunksAll);

// Tugadi!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Buni qadam-baqadam tushuntiraylik:

1. Biz `fetch` ni odatdagidek bajaramiz, lekin `response.json()` ni chaqirish o'rniga, stream reader `response.body.getReader()` ni olamiz.

    Diqqat qiling, biz bir xil javobni o'qish uchun ikkala metoddan ham foydalana olmaymiz: natijani olish uchun yoki reader yoki response metodidan foydalaning.
2. O'qishdan oldin, `Content-Length` header'idan to'liq javob uzunligini bilishimiz mumkin.

    U cross-origin so'rovlar uchun mavjud bo'lmasligi mumkin (<info:fetch-crossorigin> bobiga qarang) va, texnik jihatdan, server uni o'rnatishi shart emas. Lekin odatda u o'rnida turadi.
3. Tugagunicha `await reader.read()` ni chaqiring.

    Biz javob qismlarini `chunks` massivida to'playmiz. Bu muhim, chunki javob iste'mol qilingandan keyin, uni `response.json()` yoki boshqa yo'l bilan "qayta o'qish" imkoni bo'lmaydi (sinab ko'ring, xatolik bo'ladi).
4. Oxirida bizda `chunks` - `Uint8Array` bayt qismlari massivi bor. Biz ularni yagona natijaga birlashtirishimiz kerak. Afsuski, ularni birlashtiruvchi yagona metod yo'q, shuning uchun buni amalga oshiradigan kod bor:
    1. Biz `chunksAll = new Uint8Array(receivedLength)` yaratamiz - birlashtirilgan uzunlikka ega bir xil turdagi massiv.
    2. Keyin har bir `chunk` ni birin-ketin nusxalash uchun `.set(chunk, position)` metodidan foydalanamiz.
5. Bizda natija `chunksAll` da bor. Bu bayt massivi, string emas.

    String yaratish uchun bu baytlarni talqin qilishimiz kerak. O'rnatilgan [TextDecoder](info:text-decoder) aynan shuni qiladi. Keyin kerak bo'lsa uni `JSON.parse` qilishimiz mumkin.

    Agar bizga string o'rniga ikkilik kontent kerak bo'lsa-chi? Bu yanada oddiy. 4 va 5-qadamlarni barcha qismlardan `Blob` yaratadigan yagona qator bilan almashtiring:
    ```js
    let blob = new Blob(chunks);
    ```

Oxirida bizda natija (string yoki blob, qaysi biri qulay bo'lsa) va jarayonda progress-tracking bor.

Yana bir bor, diqqat qiling, bu *yuborish* jarayoni uchun emas (`fetch` bilan hozir yo'li yo'q), faqat *yuklash* jarayoni uchun.

Bundan tashqari, agar o'lcham noma'lum bo'lsa, siklda `receivedLength` ni tekshirishimiz va u ma'lum chegaraga yetganda uni to'xtatishimiz kerak. Shunda `chunks` xotirani to'ldirmaydi.