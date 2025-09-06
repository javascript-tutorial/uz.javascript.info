# TextDecoder va TextEncoder

Agar binary ma'lumot aslida string bo'lsa nima bo'ladi? Masalan, biz matnli ma'lumotlarga ega faylni oldik.

O'rnatilgan [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) obyekti buffer va kodlashni hisobga olgan holda qiymatni haqiqiy JavaScript string ga o'qish imkonini beradi.

Avval uni yaratishimiz kerak:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- kodlash, standart bo'yicha `utf-8`, lekin `big5`, `windows-1251` va ko'p boshqalar ham qo'llab-quvvatlanadi.
- **`options`** -- ixtiyoriy obyekt:
  - **`fatal`** -- boolean, agar `true` bo'lsa, yaroqsiz (decode qilib bo'lmaydigan) belgilar uchun istisno tashlaydi, aks holda (standart) ularni `\uFFFD` belgisi bilan almashtiradi.
  - **`ignoreBOM`** -- boolean, agar `true` bo'lsa, BOM ni (ixtiyoriy bayt-tartib Unicode belgisi) e'tiborsiz qoldiradi, kamdan-kam kerak bo'ladi.

...Va keyin decode qilish:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- decode qilinadigan `BufferSource`.
- **`options`** -- ixtiyoriy obyekt:
  - **`stream`** -- oqimlarni decode qilish uchun true, `decoder` kiruvchi ma'lumot bo'laklari bilan takroran chaqirilganda. Bu holda ko'p baytli belgi ba'zan bo'laklar orasida bo'linishi mumkin. Bu parametr `TextDecoder` ga "tugallanmagan" belgilarni eslab qolish va keyingi bo'lak kelganda ularni decode qilish haqida aytadi.

Masalan:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```

```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Buffer ning bir qismini uning uchun subarray view yaratish orqali decode qilishimiz mumkin:

```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// string o'rtada
// hech narsani nusxalamasdan uning ustida yangi view yaratish
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) teskari ishni bajaradi -- string ni baytlarga aylantiradi.

Sintaksis:

```js
let encoder = new TextEncoder();
```

U qo'llab-quvvatlaydigan yagona kodlash "utf-8".

Uning ikkita usuli bor:
- **`encode(str)`** -- string dan `Uint8Array` qaytaradi.
- **`encodeInto(str, destination)`** -- `str` ni `Uint8Array` bo'lishi kerak bo'lgan `destination` ga kodlaydi.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```