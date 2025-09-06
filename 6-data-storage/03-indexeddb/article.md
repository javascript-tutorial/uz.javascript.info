---
libs:
  - 'https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js'
---

# IndexedDB

IndexedDB - bu brauzerga o'rnatilgan ma'lumotlar bazasi bo'lib, `localStorage`dan ancha kuchlidir.

- Kalitlar bo'yicha deyarli har qanday turdagi qiymatlarni saqlaydi, bir nechta kalit turlarini qo'llab-quvvatlaydi.
- Ishonchlilik uchun tranzaksiyalarni qo'llab-quvvatlaydi.
- Kalit oralig'i so'rovlari, indekslarni qo'llab-quvvatlaydi.
- `localStorage`dan ancha katta hajmdagi ma'lumotlarni saqlashi mumkin.

Bu quvvat odatda an'anaviy mijoz-server ilovalari uchun ortiqcha hisoblanadi. IndexedDB offline ilovalar uchun mo'ljallangan bo'lib, ServiceWorkers va boshqa texnologiyalar bilan birgalikda ishlatiladi.

IndexedDB uchun spetsifikatsiyada <https://www.w3.org/TR/IndexedDB> tasvirlangan mahalliy interfeys hodisalarga asoslangan.

Shuningdek, biz `async/await`ni promise-ga asoslangan wrapper yordamida ishlatishimiz mumkin, masalan <https://github.com/jakearchibald/idb>. Bu juda qulay, lekin wrapper mukammal emas, u barcha holatlar uchun hodisalarni almashtira olmaydi. Shuning uchun biz hodisalardan boshlaymiz va IndexedDb-ni tushungandan so'ng, wrapper-dan foydalanamiz.

```smart header="Ma'lumotlar qayerda?"
Texnik jihatdan, ma'lumotlar odatda tashrif buyuruvchining uy katalogida, brauzer sozlamalari, kengaytmalar va boshqalar bilan birga saqlanadi.

Har xil brauzerlar va OS darajasidagi foydalanuvchilar har birining mustaqil xotirasiga ega.
```

## Ma'lumotlar bazasini ochish

IndexedDB bilan ishlashni boshlash uchun avval ma'lumotlar bazasini `ochish` (ulash) kerak.

Sintaksis:

```js
let openRequest = indexedDB.open(name, version);
```

- `name` -- satr, ma'lumotlar bazasi nomi.
- `version` -- musbat butun son versiyasi, sukut bo'yicha `1` (quyida tushuntiriladi).

Bizda turli nomli ko'plab ma'lumotlar bazalari bo'lishi mumkin, lekin ularning barchasi joriy origin (domen/protokol/port) doirasida mavjud. Turli veb-saytlar bir-birlarining ma'lumotlar bazalariga kira olmaydi.

Chaqiruv `openRequest` ob'ektini qaytaradi, biz unda hodisalarni tinglashimiz kerak:
- `success`: ma'lumotlar bazasi tayyor, `openRequest.result`da "ma'lumotlar bazasi ob'ekti" mavjud, biz uni keyingi chaqiruvlar uchun ishlatishimiz kerak.
- `error`: ochish muvaffaqiyatsiz tugadi.
- `upgradeneeded`: ma'lumotlar bazasi tayyor, lekin uning versiyasi eskirgan (quyida ko'ring).

**IndexedDB server tomonidagi ma'lumotlar bazalarida yo'q bo'lgan "sxema versiyalash" o'rnatilgan mexanizmiga ega.**

Server tomonidagi ma'lumotlar bazalaridan farqli o'laroq, IndexedDB mijoz tomonida joylashgan, ma'lumotlar brauzerde saqlanadi, shuning uchun biz, dasturchilar, unga to'liq vaqt kirish huquqiga ega emasmiz. Shunday qilib, ilovamizning yangi versiyasini nashr etganimizda va foydalanuvchi bizning veb-sahifamizga tashrif buyurganda, ma'lumotlar bazasini yangilashimiz kerak bo'lishi mumkin.

Agar mahalliy ma'lumotlar bazasi versiyasi `open`da ko'rsatilganidan kam bo'lsa, maxsus `upgradeneeded` hodisasi ishga tushadi va biz versiyalarni solishtirish va ma'lumotlar tuzilmalarini kerak bo'lganda yangilashimiz mumkin.

Shuningdek, ma'lumotlar bazasi hali mavjud bo'lmaganda (texnik jihatdan uning versiyasi `0`) `upgradeneeded` hodisasi ham ishga tushadi, shuning uchun biz initsializatsiyani amalga oshirishimiz mumkin.

Faraz qilaylik, biz ilovamizning birinchi versiyasini nashr etdik.

Keyin biz ma'lumotlar bazasini `1` versiya bilan ochishimiz va `upgradeneeded` ishlovchisida initsializatsiyani quyidagicha amalga oshirishimiz mumkin:

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
  // mijozda ma'lumotlar bazasi yo'q bo'lsa ishga tushadi
  // ...initsializatsiyani amalga oshirish...
};

openRequest.onerror = function() {
  console.error("Xato", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // db ob'ekti yordamida ma'lumotlar bazasi bilan ishlashni davom ettiramiz
};
```

Keyin, keyinroq, biz 2-versiyani nashr etamiz.

Uni `2` versiya bilan ochish va yangilashni quyidagicha amalga oshirishimiz mumkin:

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

openRequest.onupgradeneeded = function(event) {
  // mavjud ma'lumotlar bazasi versiyasi 2dan kam (yoki mavjud emas)
  let db = openRequest.result;
  switch(event.oldVersion) { // mavjud db versiyasi
    case 0:
      // versiya 0 mijozda ma'lumotlar bazasi yo'qligini bildiradi
      // initsializatsiyani amalga oshirish
    case 1:
      // mijozda 1-versiya mavjud edi
      // yangilash
  }
};
```

E'tibor bering: bizning joriy versiyamiz `2` bo'lgani uchun, `onupgradeneeded` ishlovchisida versiya `0` uchun kod bo'limi mavjud bo'lib, u birinchi marta kirgan va ma'lumotlar bazasi yo'q foydalanuvchilar uchun mos keladi, shuningdek versiya `1` uchun ham yangilashlar uchun.

Va faqat `onupgradeneeded` ishlovchisi xatosiz tugagandan so'ng, `openRequest.onsuccess` ishga tushadi va ma'lumotlar bazasi muvaffaqiyatli ochilgan deb hisoblanadi.

Ma'lumotlar bazasini o'chirish uchun:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror natijani kuzatib boradi
```

```warn header="Biz ma'lumotlar bazasining eski versiyasini ocha olmaymiz"
Agar joriy foydalanuvchi ma'lumotlar bazasi `open` chaqiruvida ko'rsatilganidan yuqori versiyaga ega bo'lsa, masalan, mavjud DB versiyasi `3`, va biz `open(...2)` ni sinab ko'rsak, bu xato bo'ladi, `openRequest.onerror` ishga tushadi.

Bu kamdan-kam hollarda sodir bo'ladi, lekin bunday holat tashrif buyuruvchi eskirgan JavaScript kodini yuklayotganda, masalan, proksi keshidan sodir bo'lishi mumkin. Shunday qilib, kod eski, lekin uning ma'lumotlar bazasi yangi.

Xatolardan himoyalanish uchun biz `db.version`ni tekshirishimiz va sahifani qayta yuklashni taklif qilishimiz kerak. Eski kodni yuklashdan qochish uchun to'g'ri HTTP kesh sarlavhalaridan foydalaning, shunda sizda bunday muammolar hech qachon bo'lmaydi.
```

### Parallel yangilash muammosi

Versiyalash haqida gapirganimizda, kichik tegishli muammoni ko'rib chiqaylik.

Faraz qilaylik:
1. Tashrif buyuruvchi bizning saytimizni brauzer yorlig'ida, ma'lumotlar bazasi `1` versiyasida ochdi.
2. Keyin biz yangilanishni chiqardik, shuning uchun bizning kodimiz yangirok.
3. Va keyin xuddi shu tashrif buyuruvchi bizning saytimizni boshqa yorliqda ochadi.

Shunday qilib, DB `1` versiyasiga ochiq ulanish bo'lgan yorliq mavjud, ikkinchisi esa uni `upgradeneeded` ishlovchisida `2` versiyaga yangilashga harakat qilmoqda.

Muammo shundaki, ma'lumotlar bazasi ikkita yorliq o'rtasida baham ko'riladi, chunki bu bir xil sayt, bir xil origin. Va u bir vaqtning o'zida ham `1`, ham `2` versiya bo'la olmaydi. `2` versiyaga yangilashni amalga oshirish uchun `1` versiyaga barcha ulanishlar yopilishi kerak, shu jumladan birinchi yorliqdagi ham.

Buni tashkil qilish uchun "eskirgan" ma'lumotlar bazasi ob'ektida `versionchange` hodisasi ishga tushadi. Biz uni tinglashimiz va eski ma'lumotlar bazasi ulanishini yopishimiz kerak (va ehtimol sahifani qayta yuklashni taklif qilishimiz kerak, yangilangan kodni yuklash uchun).

Agar biz `versionchange` hodisasini tinglamasak va eski ulanishni yopmasak, u holda ikkinchi, yangi ulanish amalga oshirilmaydi. `openRequest` ob'ekti `success` o'rniga `blocked` hodisasini chiqaradi. Shunday qilib, ikkinchi yorliq ishlamaydi.

Mana parallel yangilashni to'g'ri boshqarish kodi. U `onversionchange` ishlovchisini o'rnatadi, bu joriy ma'lumotlar bazasi ulanishi eskirganda (db versiyasi boshqa joyda yangilanganda) ishga tushadi va ulanishni yopadi.

```js
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = ...;
openRequest.onerror = ...;

openRequest.onsuccess = function() {
  let db = openRequest.result;

  *!*
  db.onversionchange = function() {
    db.close();
    alert("Ma'lumotlar bazasi eskirgan, iltimos sahifani qayta yuklang.")
  };
  */!*

  // ...db tayyor, uni ishlating...
};

*!*
openRequest.onblocked = function() {
  // bu hodisa onversionchange-ni to'g'ri boshqarsak ishga tushmasligi kerak

  // bu bir xil ma'lumotlar bazasiga boshqa ochiq ulanish borligini bildiradi
  // va u uchun db.onversionchange ishga tushgandan keyin yopilmagan
};
*/!*
```

...Boshqacha qilib aytganda, biz bu yerda ikkita narsa qilamiz:

1. `db.onversionchange` tinglovchisi bizni parallel yangilash urinishi haqida xabardor qiladi, agar joriy ma'lumotlar bazasi versiyasi eskirgan bo'lsa.
2. `openRequest.onblocked` tinglovchisi bizni qarama-qarshi vaziyat haqida xabardor qiladi: boshqa joyda eskirgan versiyaga ulanish mavjud va u yopilmaydi, shuning uchun yangirok ulanish amalga oshirilmaydi.

Biz `db.onversionchange`da narsalarni yanada inoyatli tarzda boshqarishimiz mumkin, ulanish yopilishidan oldin tashrif buyuruvchini ma'lumotlarni saqlashga undashimiz va hokazo.

Yoki, muqobil yondashuv `db.onversionchange`da ma'lumotlar bazasini yopmaslik, balki `onblocked` ishlovchisini (yangi yorliqda) ishlatib tashrif buyuruvchiga ogohlik berish, unga yangirok versiya boshqa yorliqlarni yopmaguncha yuklanmasligini aytish bo'ladi.

Bu yangilash to'qnashuvlari kamdan-kam sodir bo'ladi, lekin biz ular uchun hech bo'lmaganda qandaydir boshqaruvga ega bo'lishimiz kerak, hech bo'lmaganda `onblocked` ishlovchisiga ega bo'lishimiz kerak, skriptimiz jimgina o'lib qolishining oldini olish uchun.

## Ob'ekt do'koni

IndexedDB-da biror narsani saqlash uchun bizga *ob'ekt do'koni* kerak.

Ob'ekt do'koni - IndexedDB-ning asosiy tushunchasi. Boshqa ma'lumotlar bazalarida ana bunga o'xshash narsalar "jadval" yoki "to'plam" deb ataladi. Bu ma'lumotlar saqlanadigan joy. Ma'lumotlar bazasida bir nechta do'kon bo'lishi mumkin: biri foydalanuvchilar uchun, boshqasi tovarlar uchun va hokazo.

"Ob'ekt do'koni" deb nomlanishiga qaramay, primitivlar ham saqlanishi mumkin.

**Biz murakkab ob'ektlar bilan birga deyarli har qanday qiymatni saqlashimiz mumkin.**

IndexedDB ob'ektni klonlash va saqlash uchun [standart serializatsiya algoritmi](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage)dan foydalanadi. Bu `JSON.stringify` ga o'xshash, lekin kuchliroq, ko'plab ma'lumot turlarini saqlash imkonini beradi.

Saqlanishi mumkin bo'lmagan ob'ektga misol: aylanma havolalar bilan ob'ekt. Bunday ob'ektlar serializatsiya qilinmaydi. `JSON.stringify` ham bunday ob'ektlar uchun muvaffaqiyatsiz tugaydi.

**Do'kondagi har bir qiymat uchun noyob `kalit` bo'lishi kerak.**

Kalit quyidagi turlardan biri bo'lishi kerak - raqam, sana, satr, ikkilik yoki massiv. Bu noyob identifikator, shuning uchun biz kalitlar bo'yicha qiymatlarni qidirishimiz/olib tashlashimiz/yangilashimiz mumkin.

![](indexeddb-structure.svg)

Ko'p o'tmay ko'rib chiqamizki, biz do'konga qiymat qo'shganimizda kalitni taqdim etishimiz mumkin, `localStorage`ga o'xshash. Lekin ob'ektlarni saqlashda, IndexedDB ob'ekt xususiyatini kalit sifatida o'rnatishga imkon beradi, bu ancha qulaydir. Yoki biz kalitlarni avtomatik generatsiya qilishimiz mumkin.

Lekin avval ob'ekt do'konini yaratishimiz kerak.

Ob'ekt do'konini yaratish sintaksisi:
```js
db.createObjectStore(name[, keyOptions]);
```

E'tibor bering, operatsiya sinxron, `await` kerak emas.

- `name` do'kon nomi, masalan, kitoblar uchun `"books"`,
- `keyOptions` - ikkita xususiyatdan birini o'z ichiga olgan ixtiyoriy ob'ekt:
  - `keyPath` -- IndexedDB kaliti sifatida ishlatadigan ob'ekt xususiyatining yo'li, masalan `id`.
  - `autoIncrement` -- agar `true` bo'lsa, yangi saqlangan ob'ekt uchun kalit avtomatik ravishda, doimo ortib boruvchi raqam sifatida generatsiya qilinadi.

Agar biz `keyOptions`ni taqdim etmasak, keyinroq ob'ektni saqlashda kalitni aniq ko'rsatishimiz kerak bo'ladi.

Masalan, bu ob'ekt do'koni `id` xususiyatini kalit sifatida ishlatadi:
```js
db.createObjectStore('books', {keyPath: 'id'});
```

**Ob'ekt do'koni faqat DB versiyasini yangilash paytida, `upgradeneeded` ishlovchisida yaratilishi/o'zgartirilishi mumkin.**

Bu texnik cheklov. Ishlovchidan tashqarida biz ma'lumotlarni qo'shish/olib tashlash/yangilash imkoniga ega bo'lamiz, lekin ob'ekt do'konlari faqat versiya yangilanishi paytida yaratilishi/olib tashlanishi/o'zgartirilishi mumkin.

Ma'lumotlar bazasi versiyasini yangilashni amalga oshirish uchun ikkita asosiy yondashuv mavjud:
1. Biz versiya bo'yicha yangilash funksiyalarini amalga oshirishimiz mumkin: 1 dan 2 ga, 2 dan 3 ga, 3 dan 4 ga va hokazo. Keyin `upgradeneeded`da biz versiyalarni solishtirish (masalan, eski 2, hozir 4) va har bir oraliq versiya uchun versiya bo'yicha yangilashlarni bosqichma-bosqich ishga tushirishimiz mumkin (2 dan 3 ga, keyin 3 dan 4 ga).
2. Yoki biz shunchaki ma'lumotlar bazasini tekshirishimiz mumkin: mavjud ob'ekt do'konlari ro'yxatini `db.objectStoreNames` sifatida olishimiz mumkin. Bu ob'ekt mavjudligini tekshirish uchun `contains(name)` metodini taqdim etuvchi [DOMStringList](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#domstringlist) hisoblanadi. Va keyin nima mavjud va nima yo'qligiga qarab yangilashlarni amalga oshirishimiz mumkin.

Kichik ma'lumotlar bazalari uchun ikkinchi variant oddiyroq bo'lishi mumkin.

Mana ikkinchi yondashuvning namunasi:

```js
let openRequest = indexedDB.open("db", 2);

// versiya tekshiruvlarisiz ma'lumotlar bazasini yaratish/yangilash
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // agar "books" do'koni yo'q bo'lsa
    db.createObjectStore('books', {keyPath: 'id'}); // uni yaratish
  }
};
```

Ob'ekt do'konini o'chirish uchun:

```js
db.deleteObjectStore('books')
```

## Tranzaksiyalar

"Tranzaksiya" termini umumiy bo'lib, ko'plab ma'lumotlar bazalarida ishlatiladi.

Tranzaksiya - bu operatsiyalar guruhi bo'lib, ular yoki hammasi muvaffaqiyatli bo'lishi yoki hammasi muvaffaqiyatsiz bo'lishi kerak.

Masalan, odam biror narsa sotib olganda bizga kerak:
1. Ularning hisobidan pulni ayirish.
2. Mahsulotni ularning inventariga qo'shish.

Agar biz 1-operatsiyani bajarib, keyin nimadir noto'g'ri ketsa, masalan, elektr o'chib qolsa va 2-sini bajara olmasak, bu juda yomon bo'ladi. Ikkalasi ham muvaffaqiyatli bo'lishi kerak (xarid yakunlandi, yaxshi!) yoki ikkalasi ham muvaffaqiyatsiz bo'lishi kerak (hech bo'lmaganda odam pulini saqlab qoldi, shuning uchun ular qayta urinib ko'rishlari mumkin).

Tranzaksiyalar buni kafolatlashi mumkin.

**IndexedDB-da barcha ma'lumotlar operatsiyalari tranzaksiya ichida amalga oshirilishi kerak.**

Tranzaksiyani boshlash uchun:

```js
db.transaction(store[, type]);
```

- `store` - tranzaksiya kirish huquqiga ega bo'ladigan do'kon nomi, masalan, `"books"`. Agar biz bir nechta do'konlarga kirishimiz kerak bo'lsa, do'kon nomlarining massivi bo'lishi mumkin.
- `type` – tranzaksiya turi, quyidagilardan biri:
  - `readonly` -- faqat o'qish, sukut bo'yicha.
  - `readwrite` -- faqat ma'lumotlarni o'qish va yozish mumkin, lekin ob'ekt do'konlarini yaratish/olib tashlash/o'zgartirish mumkin emas.

`versionchange` tranzaksiya turi ham mavjud: bunday tranzaksiyalar hamma narsani qila oladi, lekin biz ularni qo'lda yarata olmaymiz. IndexedDB ma'lumotlar bazasini ochishda `updateneeded` ishlovchisi uchun avtomatik ravishda `versionchange` tranzaksiyasini yaratadi. Shuning uchun bu ma'lumotlar bazasi tuzilmasini yangilash, ob'ekt do'konlarini yaratish/olib tashlash imkoniyatiga ega bo'lgan yagona joy.

```smart header="Nima uchun har xil turdagi tranzaksiyalar mavjud?"
Ishlash - tranzaksiyalarni `readonly` va `readwrite` deb belgilash zarurligining sababi.

Ko'plab `readonly` tranzaksiyalar bir vaqtning o'zida bitta do'konga kirish imkoniyatiga ega, lekin `readwrite` tranzaksiyalar buni qila olmaydi. `readwrite` tranzaksiyasi do'konni yozish uchun "qulflaydi". Keyingi tranzaksiya bir xil do'konga kirishdan oldin oldingi tranzaksiya tugashini kutishi kerak.
```

Tranzaksiya yaratilgandan so'ng, biz do'konga element qo'shishimiz mumkin:

```js
let transaction = db.transaction("books", "readwrite"); // (1)

// ishlatish uchun ob'ekt do'konini olish
*!*
let books = transaction.objectStore("books"); // (2)
*/!*

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

*!*
let request = books.add(book); // (3)
*/!*

request.onsuccess = function() { // (4)
  console.log("Kitob do'konga qo'shildi", request.result);
};

request.onerror = function() {
  console.log("Xato", request.error);
};
```

Asosan to'rtta qadam bo'ldi:

1. `(1)`da barcha do'konlarni eslatib, tranzaksiya yaratish.
2. `(2)`da `transaction.objectStore(name)` yordamida do'kon ob'ektini olish.
3. `(3)`da ob'ekt do'koni `books.add(book)` ga so'rov amalga oshirish.
4. `(4)`da so'rov success/error ni boshqarish, keyin kerak bo'lsa boshqa so'rovlar qilish va hokazo.

Ob'ekt do'konlari qiymatni saqlash uchun ikkita metodga ega:

- **put(value, [key])**
    `value`ni do'konga qo'shish. `key` faqat ob'ekt do'koni `keyPath` yoki `autoIncrement` opsiyasiga ega bo'lmagan holda taqdim etiladi. Agar bir xil kalitga ega qiymat mavjud bo'lsa, u almashtiriladi.

- **add(value, [key])**
    `put` bilan bir xil, lekin agar bir xil kalitga ega qiymat mavjud bo'lsa, so'rov muvaffaqiyatsiz tugaydi va `"ConstraintError"` nomli xato generatsiya qilinadi.

Ma'lumotlar bazasini ochishga o'xshab, biz so'rov yuborishimiz mumkin: `books.add(book)`, va keyin `success/error` hodisalarini kutishimiz mumkin.

- `add` uchun `request.result` yangi ob'ektning kaliti hisoblanadi.
- Xato `request.error`da (agar mavjud bo'lsa).

## Tranzaksiyalarning avtomatik commit

Yuqoridagi misolda biz tranzaksiyani boshladik va `add` so'rovini qildik. Lekin avval aytganimizdek, tranzaksiyada bir nechta bog'langan so'rovlar bo'lishi mumkin, ular yoki hammasi muvaffaqiyatli yoki hammasi muvaffaqiyatsiz bo'lishi kerak. Tranzaksiyani tugallangan deb qanday belgilaymiz, boshqa so'rovlar kelmaydi?

Qisqa javob: biz belgilamaymiz.

Spetsifikatsiyaning keyingi 3.0 versiyasida, ehtimol, tranzaksiyani qo'lda tugatishning yo'li bo'ladi, lekin hozir 2.0 da yo'q.

**Barcha tranzaksiya so'rovlari tugaganda va [mikrotasklar navbati](info:microtask-queue) bo'sh bo'lganda, u avtomatik ravishda commit qilinadi.**

Odatda, biz tranzaksiya barcha so'rovlari bajarilganda va joriy kod tugaganda commit qilinadi deb hisoblashimiz mumkin.

Shunday qilib, yuqoridagi misolda tranzaksiyani tugatish uchun maxsus chaqiruv kerak emas.

Tranzaksiyalarning avto-commit printsipi muhim yon ta'sirga ega. Biz tranzaksiya o'rtasiga `fetch`, `setTimeout` kabi asinxron operatsiyani kirita olmaymiz. IndexedDB tranzaksiyani bular tugashini kutmaydi.

Quyidagi kodda `(*)` satrida `request2` muvaffaqiyatsiz tugaydi, chunki tranzaksiya allaqachon commit qilingan va unda biron bir so'rov qila olmaydi:

```js
let request1 = books.add(book);

request1.onsuccess = function() {
  fetch('/').then(response => {
*!*
    let request2 = books.add(anotherBook); // (*)
*/!*
    request2.onerror = function() {
      console.log(request2.error.name); // TransactionInactiveError
    };
  });
};
```

Buning sababi `fetch` - asinxron operatsiya, macrotask. Tranzaksiyalar brauzer macrotasklarni bajarishni boshlashdan oldin yopiladi.

IndexedDB spetsifikatsiyasining mualliflari tranzaksiyalar qisqa muddatli bo'lishi kerak deb hisoblaydilar. Asosan, ishlash sabablari tufayli.

Xususan, `readwrite` tranzaksiyalar yozish uchun do'konlarni "qulflaydi". Shunday qilib, agar ilovaning bir qismi `books` ob'ekt do'konida `readwrite` ni boshlagan bo'lsa, u holda xuddi shuni qilishni xohlovchi boshqa qism kutishi kerak: yangi tranzaksiya birinchisi tugaguncha "osilib" qoladi. Bu tranzaksiyalar uzoq vaqt davom etsa, g'alati kechikishlarga olib kelishi mumkin.

Xo'sh, nima qilish kerak?

Yuqoridagi misolda biz yangi so'rov `(*)` dan oldin yangi `db.transaction` ni qilishimiz mumkin.

Lekin operatsiyalarni birgalikda, bir tranzaksiyada ushlab turmoqchi bo'lsak, IndexedDB tranzaksiyalari va "boshqa" asinxron narsalarni ajratish yaxshiroq bo'ladi.

Birinchi, `fetch`ni bajaring, ma'lumotlarni tayyorlang, agar kerak bo'lsa, keyin tranzaksiya yarating va barcha ma'lumotlar bazasi so'rovlarini bajaring, u holda ishlaydi.

Muvaffaqiyatli bajarilish momentini aniqlash uchun biz `transaction.oncomplete` hodisasini tinglashimiz mumkin:

```js
let transaction = db.transaction("books", "readwrite");

// ...operatsiyalarni bajarish...

transaction.oncomplete = function() {
  console.log("Tranzaksiya bajarildi");
};
```

Faqat `complete` tranzaksiyaning butunlay saqlanganligini kafolatlaydi. Individual so'rovlar muvaffaqiyatli bo'lishi mumkin, lekin yakuniy yozish operatsiyasi noto'g'ri ketishi mumkin (masalan, I/O xatosi yoki boshqa narsa).

Tranzaksiyani qo'lda bekor qilish uchun quyidagini chaqiring:

```js
transaction.abort();
```

Bu undagi so'rovlar tomonidan amalga oshirilgan barcha o'zgarishlarni bekor qiladi va `transaction.onabort` hodisasini ishga tushiradi.

## Xatolarni boshqarish

Yozish so'rovlari muvaffaqiyatsiz tugashi mumkin.

Bu kutilgan holat, nafaqat bizning tomonimizdan mumkin bo'lgan xatolar tufayli, balki tranzaksiyaning o'ziga tegishli bo'lmagan sabablarga ko'ra ham. Masalan, saqlash kvotasi oshib ketishi mumkin. Shuning uchun biz bunday holatni boshqarishga tayyor bo'lishimiz kerak.

**Muvaffaqiyatsiz so'rov avtomatik ravishda tranzaksiyani bekor qiladi va barcha o'zgarishlarini bekor qiladi.**

Ba'zi hollarda, biz muvaffaqiyatsizlikni boshqarishni (masalan, boshqa so'rovni sinab ko'rishni), mavjud o'zgarishlarni bekor qilmasdan va tranzaksiyani davom ettirishni xohlashimiz mumkin. Bu mumkin. `request.onerror` ishlovchisi `event.preventDefault()` ni chaqirish orqali tranzaksiya bekor qilinishining oldini olishi mumkin.

Quyidagi misolda yangi kitob mavjud bilan bir xil kalit (`id`) bilan qo'shiladi. `store.add` metodi bunday holda `"ConstraintError"` generatsiya qiladi. Biz uni tranzaksiyani bekor qilmasdan boshqaramiz:

```js
let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
  // Bir xil id bilan ob'ekt mavjud bo'lganda ConstraintError sodir bo'ladi
  if (request.error.name == "ConstraintError") {
    console.log("Bunday id bilan kitob allaqachon mavjud"); // xatoni boshqarish
    event.preventDefault(); // tranzaksiyani bekor qilmang
    // kitob uchun boshqa kalitdan foydalanish?
  } else {
    // kutilmagan xato, uni boshqara olmaymiz
    // tranzaksiya bekor qilinadi
  }
};

transaction.onabort = function() {
  console.log("Xato", transaction.error);
};
```

### Hodisalar delegatsiyasi

Har bir so'rov uchun onerror/onsuccess kerakmi? Har doim ham emas. Buning o'rniga hodisalar delegatsiyasidan foydalanishimiz mumkin.

**IndexedDB hodisalari ko'piklanadi: `request` -> `transaction` -> `database`.**

Barcha hodisalar DOM hodisalari bo'lib, capturing va bubbling ga ega, lekin odatda faqat bubbling bosqichi ishlatiladi.

Shunday qilib, biz barcha xatolarni `db.onerror` ishlovchisi yordamida hisobot berish yoki boshqa maqsadlar uchun ushlab olishimiz mumkin:

```js
db.onerror = function(event) {
  let request = event.target; // xatoga sabab bo'lgan so'rov

  console.log("Xato", request.error);
};
```

...Lekin xato to'liq boshqarilgan bo'lsa-chi? Biz buni bunday holda xabar berishni xohlamaymiz.

Biz `request.onerror`da `event.stopPropagation()` dan foydalanib bubbling-ni to'xtatishimiz va shu bilan `db.onerror`ni to'xtatishimiz mumkin.

```js
request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
    console.log("Bunday id bilan kitob allaqachon mavjud"); // xatoni boshqarish
    event.preventDefault(); // tranzaksiyani bekor qilmang
    event.stopPropagation(); // xatoni yuqoriga ko'tarib chiqarmang, "chaynang"
  } else {
    // hech narsa qilmang
    // tranzaksiya bekor qilinadi
    // biz transaction.onabort da xato haqida g'amxo'rlik qilishimiz mumkin
  }
};
```

## Qidiruv

Ob'ekt do'konida qidiruvning ikkita asosiy turi mavjud:

1. Kalit qiymati yoki kalit oralig'i bo'yicha. Bizning "books" saqlashimizda bu `book.id` ning qiymati yoki qiymatlari oralig'i bo'ladi.
2. Boshqa ob'ekt maydoni bo'yicha, masalan `book.price`. Bu "indeks" deb nomlangan qo'shimcha ma'lumotlar tuzilmasini talab qiladi.

### Kalit bo'yicha

Birinchi navbatda birinchi turdagi qidiruv bilan shug'ullanamiz: kalit bo'yicha.

Qidiruv metodlari ham aniq kalit qiymatlarini, ham "qiymatlar oralig'i" deb ataladigan narsalarni - [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange) ob'ektlarini qo'llab-quvvatlaydi, ular qabul qilinadigan "kalit oralig'i"ni belgilaydi.

`IDBKeyRange` ob'ektlari quyidagi chaqiruvlar yordamida yaratiladi:

- `IDBKeyRange.lowerBound(lower, [open])` degani: `≥lower` (yoki agar `open` true bo'lsa `>lower`)
- `IDBKeyRange.upperBound(upper, [open])` degani: `≤upper` (yoki agar `open` true bo'lsa `<upper`)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` degani: `lower` va `upper` orasida. Agar ochiq bayroq true bo'lsa, tegishli kalit oraliqqa kiritilmaydi.
- `IDBKeyRange.only(key)` -- faqat bitta `key`dan iborat oraliq, kamdan-kam ishlatiladi.

Ulardan foydalanishning amaliy misollarini tez orada ko'ramiz.

Haqiqiy qidiruvni amalga oshirish uchun quyidagi metodlar mavjud. Ular aniq kalit yoki kalit oralig'i bo'lishi mumkin bo'lgan `query` argumentini qabul qiladi:

- `store.get(query)` -- kalit yoki oraliq bo'yicha birinchi qiymatni qidirish.
- `store.getAll([query], [count])` -- barcha qiymatlarni qidirish, agar berilgan bo'lsa `count` bilan cheklash.
- `store.getKey(query)` -- so'rovni qondiradigan birinchi kalitni qidirish, odatda oraliq.
- `store.getAllKeys([query], [count])` -- so'rovni qondiradigan barcha kalitlarni qidirish, odatda oraliq, agar berilgan bo'lsa `count` gacha.
- `store.count([query])` -- so'rovni qondiradigan kalitlarning umumiy sonini olish, odatda oraliq.

Masalan, bizning do'konimizda ko'plab kitoblar bor. Eslang, `id` maydoni kalit hisoblanadi, shuning uchun bu metodlarning barchasi `id` bo'yicha qidirishlari mumkin.

So'rov misollari:

```js
// bitta kitobni olish
books.get('js')

// 'css' <= id <= 'html' bo'lgan kitoblarni olish
books.getAll(IDBKeyRange.bound('css', 'html'))

// id < 'html' bo'lgan kitoblarni olish
books.getAll(IDBKeyRange.upperBound('html', true))

// barcha kitoblarni olish
books.getAll()

// id > 'js' bo'lgan barcha kalitlarni olish
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="Ob'ekt do'koni har doim tartiblanganʻ
Ob'ekt do'koni ichkarida qiymatlarni kalit bo'yicha tartibga soladi.

Shunday qilib, ko'plab qiymatlarni qaytaradigan so'rovlar ularni har doim kalit bo'yicha tartiblangan holda qaytaradi.
```

### Indeks yordamida maydon bo'yicha

Ob'ektning boshqa maydonlari bo'yicha qidirish uchun "indeks" deb nomlangan qo'shimcha ma'lumotlar tuzilmasini yaratishimiz kerak.

Indeks - bu berilgan ob'ekt maydonini kuzatib turadigan do'konga "qo'shimcha". Shu maydonning har bir qiymati uchun u shu qiymatga ega ob'ektlar kalitlari ro'yxatini saqlaydi. Quyida batafsilroq rasm bo'ladi.

Sintaksis:

```js
objectStore.createIndex(name, keyPath, [options]);
```

- **`name`** -- indeks nomi,
- **`keyPath`** -- indeks kuzatishi kerak bo'lgan ob'ekt maydonining yo'li (biz shu maydon bo'yicha qidiramiz),
- **`option`** -- xususiyatlari bilan ixtiyoriy ob'ekt:
  - **`unique`** -- agar true bo'lsa, `keyPath`da berilgan qiymatga ega do'konda faqat bitta ob'ekt bo'lishi mumkin. Indeks duplikat qo'shishga urinishda xato generatsiya qilish orqali buni ta'minlaydi.
  - **`multiEntry`** -- faqat `keyPath`dagi qiymat massiv bo'lganda ishlatiladi. Bunday holda, sukut bo'yicha, indeks butun massivni kalit sifatida ko'radi. Lekin agar `multiEntry` true bo'lsa, indeks shu massivdagi har bir qiymat uchun saqlangan ob'ektlar ro'yxatini saqlaydi. Shunday qilib, massiv a'zolari indeks kalitlari bo'ladi.

Bizning misolimizda biz `id` bo'yicha kalitlangan kitoblarni saqlaymiz.

Aytaylik, biz `price` bo'yicha qidirishni xohlaymiz.

Birinchi, indeks yaratishimiz kerak. Bu ob'ekt do'koni kabi `upgradeneeded`da amalga oshirilishi kerak:

```js
openRequest.onupgradeneeded = function() {
  // biz bu yerda indeksni yaratishimiz kerak, versionchange tranzaksiyasida
  let books = db.createObjectStore('books', {keyPath: 'id'});
*!*
  let index = books.createIndex('price_idx', 'price');
*/!*
};
```

- Indeks `price` maydonini kuzatadi.
- Narx noyob emas, bir xil narxga ega bir nechta kitob bo'lishi mumkin, shuning uchun biz `unique` opsiyasini o'rnatmaymiz.
- Narx massiv emas, shuning uchun `multiEntry` bayrog'i qo'llanilmaydi.

Tasavvur qiling, bizning `inventory`mizda 4 ta kitob bor. Mana `index` nimani anglatishini aniq ko'rsatadigan rasm:

![](indexeddb-index.svg)

Aytilganidek, har bir `price` qiymati (ikkinchi argument) uchun indeks shu narxga ega kalitlar ro'yxatini saqlaydi.

Indeks o'zini avtomatik ravishda yangilanib turadi, biz bu haqda qayg'urmashimiz shart emas.

Endi, berilgan narxni qidirishni xohlaganimizda, biz indeksga bir xil qidiruv metodlarini qo'llaymiz:

```js
let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

*!*
let request = priceIndex.getAll(10);
*/!*

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Kitoblar", request.result); // price=10 bo'lgan kitoblar massivi
  } else {
    console.log("Bunday kitoblar yo'q");
  }
};
```

Shuningdek, oraliq yaratish va arzon/qimmat kitoblarni qidirish uchun `IDBKeyRange`dan ham foydalanishimiz mumkin:

```js
// narxi <= 5 bo'lgan kitoblarni topish
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
```

Indekslar kuzatilayotgan ob'ekt maydoni bo'yicha ichkarida tartiblangan, bizning holatimizda `price`. Shunday qilib, qidiruvni amalga oshirganimizda, natijalar ham `price` bo'yicha tartiblangan.

## Do'kondan o'chirish

`delete` metodi so'rov bo'yicha o'chiriladigan qiymatlarni qidiradi, chaqiruv formati `getAll`ga o'xshash:

- **`delete(query)`** -- so'rov bo'yicha mos qiymatlarni o'chirish.

Masalan:
```js
// id='js' bo'lgan kitobni o'chirish
books.delete('js');
```

Agar narx yoki boshqa ob'ekt maydoni asosida kitoblarni o'chirishni istasak, avval indeksda kalitni topishimiz, keyin `delete`ni chaqirishimiz kerak:

```js
// narxi = 5 bo'lgan kalitni topish
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
```

Hamma narsani o'chirish uchun:
```js
books.clear(); // saqlashni tozalash.
```

## Kursorlar

`getAll/getAllKeys` kabi metodlar kalitlar/qiymatlar massivini qaytaradi.

Lekin ob'ekt saqlashi juda katta bo'lishi mumkin, mavjud xotiradan kattaroq. U holda `getAll` barcha yozuvlarni massiv sifatida olishda muvaffaqiyatsiz bo'ladi.

Nima qilish kerak?

Kursorlar bu masalani hal qilish vositasini taqdim etadi.

**Kursor - bu so'rov berilgan holda ob'ekt saqlashini aylanib chiqadigan maxsus ob'ekt bo'lib, bir vaqtning o'zida bitta kalit/qiymatni qaytaradi va shu bilan xotirani tejaydi.**

Ob'ekt do'koni kalit bo'yicha ichkarida tartiblanganligi sababli, kursor do'konni kalit tartibida aylanib chiqadi (sukut bo'yicha o'sish tartibida).

Sintaksis:
```js
// getAll kabi, lekin kursor bilan:
let request = store.openCursor(query, [direction]);

// qiymatlar emas, kalitlarni olish uchun (getAllKeys kabi): store.openKeyCursor
```

- **`query`** - kalit yoki kalit oralig'i, `getAll` kabi.
- **`direction`** - ixtiyoriy argument, qaysi tartibdan foydalanish kerak:
  - `"next"` -- sukut bo'yicha, kursor eng kichik kalitga ega yozuvdan yuqoriga qarab yuradi.
  - `"prev"` -- teskari tartib: eng katta kalitga ega yozuvdan pastga qarab.
  - `"nextunique"`, `"prevunique"` -- yuqoridagi bilan bir xil, lekin bir xil kalitga ega yozuvlarni o'tkazib yuboradi (faqat indekslar bo'yicha kursorlar uchun, masalan, price=5 bilan bir nechta kitob uchun faqat birinchisi qaytariladi).

**Kursorning asosiy farqi shundaki, `request.onsuccess` bir necha marta ishga tushadi: har bir natija uchun bir marta.**

Kursordan qanday foydalanish misoli:

```js
let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// kursor tomonidan topilgan har bir kitob uchun chaqiriladi
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // kitob kaliti (id maydoni)
    let value = cursor.value; // kitob ob'ekti
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("Boshqa kitoblar yo'q");
  }
};
```

Asosiy kursor metodlari:

- `advance(count)` -- kursorni `count` marta oldinga surish, qiymatlarni o'tkazib yuborish.
- `continue([key])` -- kursorni oraliqda keyingi qiymatga oldinga surish (yoki agar berilgan bo'lsa, `key`dan keyin darhol).

Kursorga mos keladigan qiymatlar ko'proqmi yoki yo'qmi - `onsuccess` chaqiriladi va keyin `result`da keyingi yozuvga ishora qiluvchi kursorni yoki `undefined`ni olishimiz mumkin.

Yuqoridagi misolda kursor ob'ekt do'koni uchun yaratilgan edi.

Lekin biz indeks ustida ham kursor yaratishimiz mumkin. Eslaymizki, indekslar ob'ekt maydoni bo'yicha qidirish imkonini beradi. Indekslar ustidagi kursorlar ob'ekt do'konlaridagi kabi ishlaydi - ular bir vaqtning o'zida bitta qiymat qaytarish orqali xotirani tejadilar.

Indekslar ustidagi kursorlar uchun `cursor.key` - indeks kaliti (masalan, price), va biz ob'ekt kaliti uchun `cursor.primaryKey` xususiyatidan foydalanishimiz kerak:

```js
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// har bir yozuv uchun chaqiriladi
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let primaryKey = cursor.primaryKey; // keyingi ob'ekt do'koni kaliti (id maydoni)
    let value = cursor.value; // keyingi ob'ekt do'koni ob'ekti (kitob ob'ekti)
    let key = cursor.key; // keyingi indeks kaliti (price)
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("Boshqa kitoblar yo'q");
  }
};
```

## Promise wrapper

Har bir so'rovga `onsuccess/onerror` qo'shish juda mashaqqatli vazifa. Ba'zan hodisalar delegatsiyasidan foydalanish orqali hayotimizni osonlashtirishimiz mumkin, masalan, butun tranzaksiyalarda ishlovchilarni o'rnatish, lekin `async/await` ancha qulaydir.

Ushbu bobda quyidagi yupqa promise wrapper <https://github.com/jakearchibald/idb> dan foydalanamiz. U [promisifikatsiya qilingan](info:promisify) IndexedDB metodlari bilan global `idb` ob'ektini yaratadi.

Keyin `onsuccess/onerror` o'rniga biz quyidagicha yozishimiz mumkin:

```js
let db = await idb.openDB('store', 1, db => {
  if (db.oldVersion == 0) {
    // initsializatsiyani amalga oshirish
    db.createObjectStore('books', {keyPath: 'id'});
  }
});

let transaction = db.transaction('books', 'readwrite');
let books = transaction.objectStore('books');

try {
  await books.add(...);
  await books.add(...);

  await transaction.complete;

  console.log('jsbook saqlandi');
} catch(err) {
  console.log('xato', err.message);
}

```

Shunday qilib, bizda barcha "oddiy async kod" va "try..catch" narsalari mavjud.

### Xatolarni boshqarish

Agar biz xatoni ushlab olmasak, u eng yaqin tashqi `try..catch` gacha tushadi.

Ushlilmagan xato `window` ob'ektida "unhandled promise rejection" hodisasiga aylanadi.

Bunday xatolarni quyidagicha boshqarishimiz mumkin:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // IndexedDB mahalliy so'rov ob'ekti
  let error = event.reason; //  Boshqarilmagan xato ob'ekti, request.error bilan bir xil
  ...xato haqida xabar berish...
});
```

### "Nofaol tranzaksiya" tuzog'i

Allaqachon bilganimizdek, brauzer joriy kod va mikrotasklar bilan ishini tugatishi bilan tranzaksiya avtomatik commit qilinadi. Shunday qilib, agar biz tranzaksiya o'rtasiga `fetch` kabi *macrotask* qo'ysak, tranzaksiya uning tugashini kutmaydi. U shunchaki avto-commit qiladi. Shunday qilib, undagi keyingi so'rov muvaffaqiyatsiz bo'ladi.

Promise wrapper va `async/await` uchun vaziyat bir xil.

Mana tranzaksiya o'rtasida `fetch` misoli:

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Xato
```

`fetch` `(*)` dan keyingi `inventory.add` "nofaol tranzaksiya" xatosi bilan muvaffaqiyatsiz bo'ladi, chunki tranzaksiya o'sha vaqtda allaqachon commit qilingan va yopilgan.

Yechim mahalliy IndexedDB bilan ishlashda bilan bir xil: yangi tranzaksiya yarating yoki narsalarni ajrating.
1. Ma'lumotlarni tayyorlang va avval kerak bo'lgan hamma narsani oling.
2. Keyin ma'lumotlar bazasida saqlang.

### Mahalliy ob'ektlarni olish

Ichkarida wrapper mahalliy IndexedDB so'rovini amalga oshiradi, unga `onerror/onsuccess` qo'shadi va natija bilan rad etadigan/hal qiladigan promise qaytaradi.

Bu ko'p hollarda yaxshi ishlaydi. Misollar kutubxona sahifasida <https://github.com/jakearchibald/idb>.

Kamdan-kam hollarda, biz asl `request` ob'ektiga muhtoj bo'lganimizda, uni promise-ning `promise.request` xususiyati sifatida olishimiz mumkin:

```js
let promise = books.add(book); // promise olish (uning natijasini kutmang)

let request = promise.request; // mahalliy so'rov ob'ekti
let transaction = request.transaction; // mahalliy tranzaksiya ob'ekti

// ...ba'zi mahalliy IndexedDB sehrini qiling...

let result = await promise; // agar hali ham kerak bo'lsa
```

## Xulosa

IndexedDB "kuchaytirilgan localStorage" sifatida qarash mumkin. Bu oddiy kalit-qiymat ma'lumotlar bazasi bo'lib, offline ilovalar uchun etarlicha kuchli, ammo ishlatish uchun oddiy.

Eng yaxshi qo'llanma spetsifikatsiyadir, [joriy](https://www.w3.org/TR/IndexedDB-2/) 2.0, lekin [3.0](https://w3c.github.io/IndexedDB/) dagi bir nechta metodlar (u juda ham farq qilmaydi) qisman qo'llab-quvvatlanadi.

Asosiy foydalanish bir necha ibora bilan tasvirlanishi mumkin:

1. [idb](https://github.com/jakearchibald/idb) kabi promise wrapper oling.
2. Ma'lumotlar bazasini oching: `idb.openDb(name, version, onupgradeneeded)`
    - `onupgradeneeded` ishlovchisida ob'ekt saqlashlarini va indekslarini yarating yoki kerak bo'lsa versiya yangilanishini amalga oshiring.
3. So'rovlar uchun:
    - Tranzaksiya yarating `db.transaction('books')` (kerak bo'lsa readwrite).
    - Ob'ekt do'konini oling `transaction.objectStore('books')`.
4. Keyin kalit bo'yicha qidirish uchun ob'ekt do'konida to'g'ridan-to'g'ri metodlarni chaqiring.
    - Ob'ekt maydoni bo'yicha qidirish uchun indeks yarating.
5. Agar ma'lumotlar xotiraga sig'masa, kursordan foydalaning.

Mana kichik demo ilova:

[codetabs src="books" current="index.html"]