# ArrayBuffer, binary arraylar

Veb-ishlab chiqishda biz binary ma'lumotlarni asosan fayllar bilan ishlashda uchratamiz (yaratish, yuklash, yuklab olish). Yana bir tipik foydalanish holati rasm qayta ishlash.

Bularning barchasi JavaScript da mumkin va binary operatsiyalar yuqori samarali.

Garchi, biroz chalkashlik bor, chunki ko'plab klasslar mavjud. Bir nechtasini nomlash uchun:
- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File` va hokazo.

JavaScript da binary ma'lumotlar boshqa tillarga nisbatan standart bo'lmagan tarzda amalga oshirilgan. Lekin narsalarni tartibga solsak, hamma narsa juda oddiy bo'ladi.

**Asosiy binary obyekt `ArrayBuffer` -- belgilangan uzunlikdagi uzluksiz xotira sohasiga havola.**

Biz uni shunday yaratamiz:
```js run
let buffer = new ArrayBuffer(16); // 16 uzunlikdagi buffer yaratish
alert(buffer.byteLength); // 16
```

Bu 16 baytlik uzluksiz xotira sohasini ajratadi va uni nollar bilan oldindan to'ldiradi.

```warn header="`ArrayBuffer` biror narsaning arrayi emas"
Keling, mumkin bo'lgan chalkashlik manbasini bartaraf etaylik. `ArrayBuffer` ning `Array` bilan hech qanday umumiylik yo'q:
- U belgilangan uzunlikka ega, biz uni oshira yoki kamaytira olmaymiz.
- U xotirada aniq shuncha joy egallaydi.
- Individual baytlarga kirish uchun boshqa "view" obyekti kerak, `buffer[index]` emas.
```

`ArrayBuffer` xotira sohasi. Unda nima saqlanadi? Uning hech qanday tasavvuri yo'q. Faqat xom baytlar ketma-ketligi.

**`ArrayBuffer` ni boshqarish uchun bizga "view" obyektidan foydalanishimiz kerak.**

View obyekt o'zida hech narsani saqlamaydi. Bu `ArrayBuffer` da saqlangan baytlarning talqinini beradigan "ko'zoynak"dir.

Masalan:

- **`Uint8Array`** -- `ArrayBuffer` dagi har bir baytni 0 dan 255 gacha mumkin bo'lgan qiymatlar bilan alohida raqam sifatida ko'radi (bayt 8-bitli, shuning uchun faqat shuncha saqlashi mumkin). Bunday qiymat "8-bitli belgisiz butun son" deyiladi.
- **`Uint16Array`** -- har 2 baytni 0 dan 65535 gacha mumkin bo'lgan qiymatlar bilan butun son sifatida ko'radi. Bu "16-bitli belgisiz butun son" deyiladi.
- **`Uint32Array`** -- har 4 baytni 0 dan 4294967295 gacha mumkin bo'lgan qiymatlar bilan butun son sifatida ko'radi. Bu "32-bitli belgisiz butun son" deyiladi.
- **`Float64Array`** -- har 8 baytni <code>5.0x10<sup>-324</sup></code> dan <code>1.8x10<sup>308</sup></code> gacha mumkin bo'lgan qiymatlar bilan suzuvchi nuqta raqami sifatida ko'radi.

Shunday qilib, 16 baytli `ArrayBuffer` dagi binary ma'lumotlar 16 ta "kichik raqam" yoki 8 ta kattaroq raqam (har biri 2 bayt) yoki 4 ta yanada kattaroq (har biri 4 bayt) yoki yuqori aniqlikdagi 2 ta suzuvchi nuqta qiymati (har biri 8 bayt) sifatida talqin qilinishi mumkin.

![](arraybuffer-views.svg)

`ArrayBuffer` asosiy obyekt, hamma narsaning ildizi, xom binary ma'lumot.

Lekin agar biz unga yozmoqchi bo'lsak yoki uni takrorlashni istasak, asosan deyarli har qanday operatsiya uchun -- biz view dan foydalanishimiz kerak, masalan:

```js run
let buffer = new ArrayBuffer(16); // 16 uzunlikdagi buffer yaratish

*!*
let view = new Uint32Array(buffer); // buffer ni 32-bitli butun sonlar ketma-ketligi sifatida ko'rish

alert(Uint32Array.BYTES_PER_ELEMENT); // har butun son uchun 4 bayt
*/!*

alert(view.length); // 4, shuncha butun sonni saqlaydi
alert(view.byteLength); // 16, baytlardagi o'lcham

// keling, qiymat yozaylik
view[0] = 123456;

// qiymatlar bo'ylab takrorlash
for(let num of view) {
  alert(num); // 123456, keyin 0, 0, 0 (jami 4 ta qiymat)
}
```

## TypedArray

Bu barcha view larning (`Uint8Array`, `Uint32Array` va hokazo) umumiy atamasi [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects). Ular bir xil usullar va xossalar to'plamini baham ko'radi.

Esda tuting, `TypedArray` deb nomlangan konstruktor yo'q, bu shunchaki `ArrayBuffer` ustidagi view lardan birini ifodalash uchun umumiy "soyabon" atama: `Int8Array`, `Uint8Array` va hokazo, to'liq ro'yxat tez orada keladi.

`new TypedArray` kabi narsani ko'rganingizda, bu `new Int8Array`, `new Uint8Array` va hokazolardan birini anglatadi.

Typed arraylar oddiy arraylar kabi ishlaydi: indekslarga ega va takrorlanadi.

Typed array konstruktori (bu `Int8Array` yoki `Float64Array` bo'lishidan qat'i nazar, muhim emas) argument turlariga qarab turlicha ishlaydi.

5 ta argument varianti bor:

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

1. Agar `ArrayBuffer` argumenti berilsa, view uning ustida yaratiladi. Biz bu sintaksisni allaqachon ishlatdik.

    Ixtiyoriy ravishda boshlanish uchun `byteOffset` (standart bo'yicha 0) va `length` (standart bo'yicha buffer oxirigacha) berishimiz mumkin, keyin view faqat `buffer` ning bir qismini qamrab oladi.

2. Agar `Array` yoki biron bir array-ga o'xshash obyekt berilsa, u bir xil uzunlikdagi typed array yaratadi va kontentni nusxalaydi.

    Biz uni ma'lumotlar bilan oldindan to'ldirish uchun ishlatishimiz mumkin:
    ```js run
    *!*
    let arr = new Uint8Array([0, 1, 2, 3]);
    */!*
    alert( arr.length ); // 4, bir xil uzunlikdagi binary array yaratildi
    alert( arr[1] ); // 1, berilgan qiymatlar bilan 4 bayt (belgisiz 8-bitli butun sonlar) bilan to'ldirildi
    ```

3. Agar boshqa `TypedArray` berilsa, u bir xil ish qiladi: bir xil uzunlikdagi typed array yaratadi va qiymatlarni nusxalaydi. Kerak bo'lsa, qiymatlar jarayonda yangi turga aylantiriladi.
    ```js run
    let arr16 = new Uint16Array([1, 1000]);
    *!*
    let arr8 = new Uint8Array(arr16);
    */!*
    alert( arr8[0] ); // 1
    alert( arr8[1] ); // 232, 1000 ni nusxalashga harakat qildi, lekin 1000 ni 8 bitga sig'dira olmadi (quyida tushuntirishlar)
    ```

4. Raqamli argument `length` uchun -- shuncha elementga ega typed array yaratadi. Uning bayt uzunligi `length` ni bitta elementdagi baytlar soniga `TypedArray.BYTES_PER_ELEMENT` ga ko'paytirilganiga teng bo'ladi:
    ```js run
    let arr = new Uint16Array(4); // 4 ta butun son uchun typed array yaratish
    alert( Uint16Array.BYTES_PER_ELEMENT ); // har butun son uchun 2 bayt
    alert( arr.byteLength ); // 8 (baytlardagi o'lcham)
    ```

5. Argumentlarsiz, nol uzunlikdagi typed array yaratadi.

Biz `ArrayBuffer` ni eslatmasdan to'g'ridan-to'g'ri `TypedArray` yaratishimiz mumkin. Lekin view asosiy `ArrayBuffer` siz mavjud bo'la olmaydi, shuning uchun birinchisidan tashqari (berilgan vaqtda) barcha hollarda avtomatik yaratiladi.

`ArrayBuffer` ga kirish uchun xossalar mavjud:
- `arr.buffer` -- `ArrayBuffer` ga ishora qiladi.
- `arr.byteLength` -- `ArrayBuffer` ning uzunligi.

Shunday qilib, biz har doim bir view dan boshqasiga o'tishimiz mumkin:
```js
let arr8 = new Uint8Array([0, 1, 2, 3]);

// bir xil ma'lumotlardagi boshqa view
let arr16 = new Uint16Array(arr8.buffer);
```

Mana typed arraylar ro'yxati:

- `Uint8Array`, `Uint16Array`, `Uint32Array` -- 8, 16 va 32 bitli butun sonlar uchun.
  - `Uint8ClampedArray` -- 8-bitli butun sonlar uchun, tayinlashda ularni "siqadi" (quyida qarang).
- `Int8Array`, `Int16Array`, `Int32Array` -- belgili butun sonlar uchun (salbiy bo'lishi mumkin).
- `Float32Array`, `Float64Array` -- 32 va 64 bitli belgili suzuvchi nuqta sonlari uchun.

```warn header="`int8` yoki shunga o'xshash bitta qiymatli turlar yo'q"
Esda tuting, `Int8Array` kabi nomlarga qaramay, JavaScript da `int` yoki `int8` kabi bitta qiymatli tur yo'q.

Bu mantiqiy, chunki `Int8Array` bu individual qiymatlarning arrayi emas, balki `ArrayBuffer` ustidagi view.
```

### Chegara tashqaridagi xatti-harakat

Agar biz typed array ga chegara tashqaridagi qiymat yozishga harakat qilsak nima bo'ladi? Hech qanday xato bo'lmaydi. Lekin qo'shimcha bitlar kesiladi.

Masalan, `Uint8Array` ga 256 ni qo'yishga harakat qilaylik. Binary shaklda 256 `100000000` (9 bit), lekin `Uint8Array` har qiymat uchun faqat 8 bit beradi, bu 0 dan 255 gacha bo'lgan diapazonni yaratadi.

Kattaroq sonlar uchun faqat eng o'ngdagi (kamroq muhim) 8 bit saqlanadi va qolgan qism kesiladi:

![](8bit-integer-256.svg)

Shunday qilib, biz nol olamiz.

257 uchun binary shakl `100000001` (9 bit), eng o'ngdagi 8 ta saqlanadi, shuning uchun arrayda `1` ga ega bo'lamiz:

![](8bit-integer-257.svg)

Boshqacha qilib aytganda, 2<sup>8</sup> ga bo'lingan qoldiq saqlanadi.

Mana demo:

```js run
let uint8array = new Uint8Array(16);

let num = 256;
alert(num.toString(2)); // 100000000 (binary ko'rinish)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); // 0
alert(uint8array[1]); // 1
```

`Uint8ClampedArray` bu jihatdan maxsus, uning xatti-harakati boshqacha. U 255 dan katta har qanday raqam uchun 255 ni va har qanday salbiy raqam uchun 0 ni saqlaydi. Bu xatti-harakat rasm qayta ishlash uchun foydali.

## TypedArray usullari

`TypedArray` oddiy `Array` usullariga ega, e'tiborli istisnolar bilan.

Biz takrorlashimiz, `map`, `slice`, `find`, `reduce` va hokazolarni qilishimiz mumkin.

Biroq, biz qila olmaydigan bir necha narsa bor:

- `splice` yo'q -- biz qiymatni "o'chira" olmaymiz, chunki typed arraylar buffer ustidagi view lar va bular belgilangan, uzluksiz xotira sohalari. Biz faqat nol belgilashimiz mumkin.
- `concat` usuli yo'q.

Ikkita qo'shimcha usul bor:

- `arr.set(fromArr, [offset])` `fromArr` dan barcha elementlarni `arr` ga nusxalaydi, `offset` pozitsiyasidan boshlab (standart bo'yicha 0).
- `arr.subarray([begin, end])` `begin` dan `end` gacha (eksklyuziv) bir xil turdagi yangi view yaratadi. Bu `slice` usuliga o'xshash (bu ham qo'llab-quvvatlanadi), lekin hech narsani nusxalamaydi -- faqat berilgan ma'lumot qismi bilan ishlash uchun yangi view yaratadi.

Bu usullar bizga typed arraylarni nusxalash, aralashtirishimiz, mavjudlaridan yangi arraylar yaratishimiz va hokazolarni qilish imkonini beradi.

## DataView

[DataView](mdn:/JavaScript/Reference/Global_Objects/DataView) `ArrayBuffer` ustidagi maxsus super-moslashuvchan "tursiz" view. U har qanday offsetda har qanday formatda ma'lumotlarga kirishga imkon beradi.

- Typed arraylar uchun konstruktor format nima ekanligini belgilaydi. Butun array bir xil bo'lishi kerak. i-chi raqam `arr[i]`.
- `DataView` bilan biz `.getUint8(i)` yoki `.getUint16(i)` kabi usullar bilan ma'lumotlarga kiramiz. Biz konstruksiya vaqti o'rniga usul chaqirish vaqtida formatni tanlaymiz.

Sintaksis:

```js
new DataView(buffer, [byteOffset], [byteLength])
```

- **`buffer`** -- asosiy `ArrayBuffer`. Typed arraylardan farqli o'laroq, `DataView` o'zida buffer yaratmaydi. Bizda u tayyor bo'lishi kerak.
- **`byteOffset`** -- view ning boshlanuvchi bayt pozitsiyasi (standart bo'yicha 0).
- **`byteLength`** -- view ning bayt uzunligi (standart bo'yicha `buffer` oxirigacha).

Masalan, bu yerda biz bir xil bufferdan turli formatlarda raqamlarni chiqaramiz:

```js run
// 4 baytli binary array, hammasi maksimal qiymat 255 ga ega
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// 0 offsetda 8-bitli raqam olish
alert( dataView.getUint8(0) ); // 255

// endi 0 offsetda 16-bitli raqam olish, u 2 baytdan iborat, birga 65535 sifatida talqin qilinadi
alert( dataView.getUint16(0) ); // 65535 (eng katta 16-bitli belgisiz int)

// 0 offsetda 32-bitli raqam olish
alert( dataView.getUint32(0) ); // 4294967295 (eng katta 32-bitli belgisiz int)

dataView.setUint32(0, 0); // 4-baytli raqamni nolga o'rnatish, shu tariqa barcha baytlarni 0 ga o'rnatish
```

`DataView` bir xil bufferda aralash formatli ma'lumotlarni saqlashda ajoyib. Masalan, juftlik ketma-ketligini (16-bitli butun son, 32-bitli float) saqlashda, `DataView` ularga osongina kirish imkonini beradi.

## Xulosa

`ArrayBuffer` asosiy obyekt, belgilangan uzunlikdagi uzluksiz xotira sohasiga havola.

`ArrayBuffer` da deyarli har qanday operatsiya uchun bizga view kerak.

- Bu `TypedArray` bo'lishi mumkin:
    - `Uint8Array`, `Uint16Array`, `Uint32Array` -- 8, 16 va 32 bitli belgisiz butun sonlar uchun.
    - `Uint8ClampedArray` -- 8-bitli butun sonlar uchun, tayinlashda ularni "siqadi".
    - `Int8Array`, `Int16Array`, `Int32Array` -- belgili butun sonlar uchun (salbiy bo'lishi mumkin).
    - `Float32Array`, `Float64Array` -- 32 va 64 bitli belgili suzuvchi nuqta sonlari uchun.
- Yoki `DataView` -- formatni belgilash uchun usullardan foydalanadigan view, masalan `getUint8(offset)`.

Ko'p hollarda biz to'g'ridan-to'g'ri typed arraylarni yaratamiz va ular bilan ishlaymiz, `ArrayBuffer` ni qopqoq ostida "umumiy maxraj" sifatida qoldiramiz. Biz unga `.buffer` sifatida kirishimiz va kerak bo'lsa boshqa view yaratishimiz mumkin.

Binary ma'lumotlar bilan ishlaydigan usullarning tavsiflarida ishlatiladigan yana ikkita qo'shimcha atama bor:
- `ArrayBufferView` bu barcha bunday view turlarining soyabon atamasi.
- `BufferSource` `ArrayBuffer` yoki `ArrayBufferView` uchun soyabon atama.

Biz bu atamalarni keyingi boblarda ko'ramiz. `BufferSource` eng keng tarqalgan atamalardan biri, chunki u "har qanday binary ma'lumot" ni anglatadi -- `ArrayBuffer` yoki uning ustidagi view.

Mana cheat sheet:

![](arraybuffer-view-buffersource.svg)