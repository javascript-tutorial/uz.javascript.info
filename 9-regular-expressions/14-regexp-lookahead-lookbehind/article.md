# Oldinga va orqaga qarash

Ba'zan bizga faqat boshqa naqsh tomonidan kuzatib borilgan yoki undan oldin kelgan naqsh uchun mosliklarni topish kerak.

Buning uchun "oldinga qarash" va "orqaga qarash" deb ataladigan maxsus sintaksis mavjud, ular birgalikda "atrofga qarash" deb ataladi.

Boshida, `subject:1 turkey costs 30€` kabi satrdan narxni topaylik. Ya'ni: raqam, keyin `subject:€` belgisi.

## Oldinga qarash

Sintaksis: `pattern:X(?=Y)`, bu "`pattern:X` ni qidir, lekin faqat `pattern:Y` tomonidan kuzatib borilganda mos kel" degani. `pattern:X` va `pattern:Y` o'rniga har qanday naqsh bo'lishi mumkin.

`subject:€` tomonidan kuzatib boriladigan butun son uchun regexp `pattern:\d+(?=€)` bo'ladi:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30, 1 raqami e'tiborga olinmaydi, chunki u € bilan kuzatib borilmaydi
```

E'tibor bering: oldinga qarash shunchaki test, qavslar ichidagi mazmun `pattern:(?=...)` natija `match:30` ga kiritilmaydi.

`pattern:X(?=Y)` ni qidirganimizda, doimiy ifoda dvigateli `pattern:X` ni topadi, keyin undan keyin darhol `pattern:Y` bormi deb tekshiradi. Agar bo'lmasa, potensial moslik o'tkazib yuboriladi va qidiruv davom etadi.

Murakkabroq testlar ham mumkin, masalan `pattern:X(?=Y)(?=Z)` quyidagini bildiradi:

1. `pattern:X` ni top.
2. `pattern:X` dan keyin darhol `pattern:Y` bormi tekshir (bo'lmasa o'tkazib yubor).
3. `pattern:X` dan keyin darhol `pattern:Z` ham bormi tekshir (bo'lmasa o'tkazib yubor).
4. Agar ikkala test ham o'tgan bo'lsa, `pattern:X` moslik, aks holda qidirishni davom ettir.

Boshqacha qilib aytganda, bunday naqsh `pattern:X` ni bir vaqtning o'zida `pattern:Y` va `pattern:Z` tomonidan kuzatib boriladigan qidirishni bildiradi.

Bu faqat `pattern:Y` va `pattern:Z` naqshlari bir-birini istisno qilmagan holda mumkin.

Masalan, `pattern:\d+(?=\s)(?=.*30)` bo'shliq `pattern:(?=\s)` tomonidan kuzatib boriladigan va undan keyin biror joyda `30` bor `pattern:(?=.*30)` `pattern:\d+` ni qidiradi:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

Bizning satrda bu aynan `1` raqamiga mos keladi.

## Salbiy oldinga qarash

Aytaylik, biz narx emas, balki bir xil satrdan miqdorni xohlaymiz. Bu `pattern:\d+` raqam, `subject:€` tomonidan kuzatib borilMAYDI.

Buning uchun salbiy oldinga qarashndan foydalanish mumkin.

Sintaksis: `pattern:X(?!Y)`, bu "`pattern:X` ni qidir, lekin faqat `pattern:Y` tomonidan kuzatib borilmaganda" degani.

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (narx mos kelmaydi)
```

## Orqaga qarash

Oldinga qarash "nima keyin keladi" uchun shart qo'shish imkonini beradi.

Orqaga qarash o'xshash, lekin orqaga qaradi. Ya'ni, faqat undan oldin biror narsa bo'lgan holda naqshga mos kelish imkonini beradi.

Sintaksis:
- Ijobiy orqaga qarash: `pattern:(?<=Y)X`, `pattern:X` ga mos keladi, lekin faqat undan oldin `pattern:Y` bo'lganda.
- Salbiy orqaga qarash: `pattern:(?<!Y)X`, `pattern:X` ga mos keladi, lekin faqat undan oldin `pattern:Y` bo'lmaganda.

Masalan, narxni AQSh dollariga o'zgartiraylik. Dollar belgisi odatda raqamdan oldin keladi, shuning uchun `$30` ni qidirish uchun `pattern:(?<=\$)\d+` ishlatamiz -- `subject:$` tomonidan oldin kelgan miqdor:

```js run
let str = "1 turkey costs $30";

// dollar belgisi ekranlangan \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (yagona raqam o'tkazib yuborildi)
```

Va agar bizga miqdor kerak bo'lsa -- `subject:$` tomonidan oldin kelmaydigan raqam, unda salbiy orqaga qarash `pattern:(?<!\$)\d+` ishlatishimiz mumkin:

```js run
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (narx mos kelmaydi)
```

## Ushlash guruhlari

Umuman olganda, atrofga qarash qavslar ichidagi mazmun natijaning bir qismi bo'lmaydi.

Masalan, `pattern:\d+(?=€)` naqshida `pattern:€` belgisi moslikning bir qismi sifatida ushlanmaydi. Bu tabiiy: biz `pattern:\d+` raqamini qidirapmiz, `pattern:(?=€)` esa u `subject:€` tomonidan kuzatib borilishi kerakligi uchun shunchaki test.

Lekin ba'zi hollarda biz atrofga qarash ifodasi yoki uning bir qismini ham ushlashni xohlashimiz mumkin. Bu mumkin. Shu qismni qo'shimcha qavslarga o'rab oling.

Quyidagi misolda valyuta belgisi `pattern:(€|kr)` miqdor bilan birga ushlanadi:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // €|kr atrofida qo'shimcha qavslar

alert( str.match(regexp) ); // 30, €
```

Va mana orqaga qarash uchun xuddi shunday:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Xulosa

Oldinga va orqaga qarash (odatda "atrofga qarash" deb ataladi) undan oldin/keyin kontekstga qarab biror narsaga mos kelishni xohlaganimizda foydali.

Oddiy regexplar uchun biz xuddi shunday narsani qo'lda qilishimiz mumkin. Ya'ni: hamma narsani, istalgan kontekstda moslashtirib, keyin tsiklda kontekst bo'yicha filtrlash.

Eslatib qo'yamiz, `str.match` (`pattern:g` bayrog'isiz) va `str.matchAll` (har doim) mosliklarni `index` xususiyati bilan massivlar sifatida qaytaradi, shuning uchun biz matnda aniq qayerda ekanligini bilamiz va kontekstni tekshira olamiz.

Lekin umuman olganda atrofga qarash qulayroq.

Atrofga qarash turlari:

| Naqsh            | turi             | mos keladi |
|--------------------|------------------|---------|
| `X(?=Y)`   | Ijobiy oldinga qarash | agar `pattern:Y` tomonidan kuzatib borilsa `pattern:X` |
| `X(?!Y)`   | Salbiy oldinga qarash | agar `pattern:Y` tomonidan kuzatib borilmasa `pattern:X` |
| `(?<=Y)X` |  Ijobiy orqaga qarash | agar `pattern:Y` dan keyin bo'lsa `pattern:X` |
| `(?<!Y)X` | Salbiy orqaga qarash | agar `pattern:Y` dan keyin bo'lmasa `pattern:X` |