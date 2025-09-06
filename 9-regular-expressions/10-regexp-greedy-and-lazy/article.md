# Ochko'z va dangasa miqdorchilar

Miqdorchilar birinchi qarashda juda oddiy ko'rinadi, lekin aslida ular murakkab bo'lishi mumkin.

Agar biz `pattern:/\d+/` dan murakkabroq narsalarni qidirishni rejalashtirmoqchi bo'lsak, qidiruvning qanday ishlashini yaxshi tushunishimiz kerak.

Quyidagi vazifani misol sifatida olaylik.

Bizda matn bor va barcha qo'shtirnoqlar `"..."` ni guillemet belgilari bilan almashtirish kerak: `«...»`. Ular ko'plab mamlakatlarda tipografiya uchun afzalroq.

Masalan: `"Hello, world"` `«Hello, world»` ga aylanishi kerak. Boshqa qo'shtirnoqlar ham mavjud, masalan `„Witam, świat!"` (polyakcha) yoki `「你好，世界」` (xitoycha), lekin bizning vazifamiz uchun `«...»` ni tanlaymiz.

Birinchi navbatda qo'shtirnoqlangan satrlarni topish, keyin ularni almashtirish kerak.

`pattern:/".+"/g` kabi doimiy ifoda (qo'shtirnoq, keyin biror narsa, keyin boshqa qo'shtirnoq) yaxshi ko'rinishi mumkin, lekin bunday emas!

Sinab ko'raylik:

```js run
let regexp = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch" and her "broom"
```

...Ko'ramizki, u mo'ljallanganidek ishlamaydi!

Ikkita moslik `match:"witch"` va `match:"broom"` ni topish o'rniga, bittasini topadi: `match:"witch" and her "broom"`.

Buni "ochko'zlik barcha yovuzlikning sababi" deb ta'riflash mumkin.

## Ochko'z qidiruv

Moslikni topish uchun doimiy ifoda dvigateli quyidagi algoritmdan foydalanadi:

- Satrdagi har bir pozitsiya uchun
    - Shu pozitsiyada naqshni moslashtirishga harakat qiling.
    - Agar moslik bo'lmasa, keyingi pozitsiyaga o'ting.

Bu oddiy so'zlar regexp nima uchun muvaffaqiyatsiz ekanligini aniq qilmaydi, shuning uchun `pattern:".+"` naqshi uchun qidiruv qanday ishlashini batafsil ko'rib chiqaylik.

1. Birinchi naqsh belgisi qo'shtirnoq `pattern:"`.

    Doimiy ifoda dvigateli uni manba satrining nol pozitsiyasida `subject:a "witch" and her "broom" is one` topishga harakat qiladi, lekin u yerda `subject:a` bor, shuning uchun darhol moslik yo'q.

    Keyin u oldinga siljiydi: manba satrining keyingi pozitsiyalariga o'tadi va u yerda naqshning birinchi belgisini topishga harakat qiladi, yana muvaffaqiyatsiz tugaydi va nihoyat 3-pozitsiyada qo'shtirnoqni topadi:

    ![](witch_greedy1.svg)

2. Qo'shtirnoq aniqlanadi, keyin dvigatel naqshning qolgan qismiga mos kelishni topishga harakat qiladi. U manba satrining qolgan qismi `pattern:.+"` ga mos keladimi yoki yo'qligini tekshirishga harakat qiladi.

    Bizning holatimizda keyingi naqsh belgisi `pattern:.` (nuqta). U "yangi qatordan tashqari har qanday belgi"ni bildiradi, shuning uchun keyingi satr harfi `match:'w'` mos keladi:

    ![](witch_greedy2.svg)

3. Keyin nuqta `pattern:.+` miqdorchisi tufayli takrorlanadi. Doimiy ifoda dvigateli moslikka birin-ketin belgilarni qo'shadi.

    ...Qachongacha? Barcha belgilar nuqtaga mos keladi, shuning uchun u faqat satr oxiriga yetganda to'xtaydi:

    ![](witch_greedy3.svg)

4. Endi dvigatel `pattern:.+` ni takrorlashni tugatdi va naqshning keyingi belgisini topishga harakat qiladi. Bu qo'shtirnoq `pattern:"`. Lekin muammo bor: satr tugadi, boshqa belgilar yo'q!

    Doimiy ifoda dvigateli haddan tashqari ko'p `pattern:.+` olganini tushunadi va *orqaga qaytishni* boshlaydi.

    Boshqacha qilib aytganda, u miqdorchi uchun moslikni bir belgi qisqartiradi:

    ![](witch_greedy4.svg)

    Endi u `pattern:.+` satr oxiridan bir belgi oldin tugaydi deb hisoblaydi va shu pozitsiyadan naqshning qolgan qismiga mos kelishga harakat qiladi.

    Agar u yerda qo'shtirnoq bo'lganida, qidiruv tugaydi, lekin oxirgi belgi `subject:'e'`, shuning uchun moslik yo'q.

5. ...Shunday qilib, dvigatel `pattern:.+` ning takrorlanish sonini yana bir belgi kamaytiradi:

    ![](witch_greedy5.svg)

    Qo'shtirnoq `pattern:'"'` `subject:'n'` ga mos kelmaydi.

6. Dvigatel orqaga qaytishni davom ettiradi: naqshning qolgan qismi (bizning holatimizda `pattern:'"'`) mos kelguncha `pattern:'.'` ning takrorlanish sonini kamaytiradi:

    ![](witch_greedy6.svg)

7. Moslik tugallandi.

8. Shunday qilib, birinchi moslik `match:"witch" and her "broom"`. Agar doimiy ifodada `pattern:g` bayrog'i bo'lsa, qidiruv birinchi moslik tugagan joydan davom etadi. Satrning qolgan qismida `subject:is one` boshqa qo'shtirnoqlar yo'q, shuning uchun boshqa natijalar yo'q.

Bu biz kutgan narsa emasligimiz mumkin, lekin u shunday ishlaydi.

**Ochko'z rejimda (sukut bo'yicha) miqdorli belgi imkon qadar ko'p marta takrorlanadi.**

Regexp dvigateli `pattern:.+` uchun imkon qadar ko'p belgilarni moslikka qo'shadi, keyin agar naqshning qolgan qismi mos kelmasa, uni birin-ketin qisqartiradi.

Bizning vazifamiz uchun biz boshqa narsani xohlaymiz. Bu yerda dangasa rejim yordam berishi mumkin.

## Dangasa rejim

Miqdorchilarning dangasa rejimi ochko'z rejimga qarama-qarshi. Bu degani: "minimal marta takrorlang".

Biz uni miqdorchidan keyin savol belgisi `pattern:'?'` qo'yish orqali yoqishimiz mumkin, shunda u `pattern:*?` yoki `pattern:+?` yoki hatto `pattern:?` uchun `pattern:??` bo'ladi.

Aniq bo'lishi uchun: odatda savol belgisi `pattern:?` o'zi miqdorchi (nol yoki bir), lekin agar *boshqa miqdorchidan keyin (yoki hatto o'zidan) qo'shilsa* u boshqa ma'no oladi -- u moslashtirish rejimini ochko'zdan dangasaga o'zgartiradi.

`pattern:/".+?"/g` regexp mo'ljallanganidek ishlaydi: u `match:"witch"` va `match:"broom"` ni topadi:

```js run
let regexp = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

O'zgarishni aniq tushunish uchun qidiruvni qadam-baqadam kuzatib boraylik.

1. Birinchi qadam bir xil: u 3-pozitsiyada naqsh boshini `pattern:'"'` topadi:

    ![](witch_greedy1.svg)

2. Keyingi qadam ham o'xshash: dvigatel nuqta `pattern:'.'` uchun moslik topadi:

    ![](witch_greedy2.svg)

3. Va endi qidiruv boshqacha ketadi. Chunki bizda `pattern:+?` uchun dangasa rejim bor, dvigatel nuqtani yana bir marta moslashtirishga harakat qilmaydi, balki to'xtaydi va naqshning qolgan qismi `pattern:'"'` ni hoziroq moslashtirishga harakat qiladi:

    ![](witch_lazy3.svg)

    Agar u yerda qo'shtirnoq bo'lganida, qidiruv tugaydi, lekin `'i'` bor, shuning uchun moslik yo'q.

4. Keyin doimiy ifoda dvigateli nuqtaning takrorlanish sonini oshiradi va yana bir marta harakat qiladi:

    ![](witch_lazy4.svg)

    Yana muvaffaqiyatsizlik. Keyin takrorlanish soni yana va yana oshiriladi...

5. ...Naqshning qolgan qismi uchun moslik topilguncha:

    ![](witch_lazy5.svg)

6. Keyingi qidiruv joriy moslikning oxiridan boshlanadi va yana bir natija beradi:

    ![](witch_lazy6.svg)

Bu misolda biz `pattern:+?` uchun dangasa rejim qanday ishlashini ko'rdik. `pattern:*?` va `pattern:??` miqdorchilar ham xuddi shunday ishlaydi -- regexp dvigateli faqat naqshning qolgan qismi berilgan pozitsiyada mos kelmasa, takrorlanish sonini oshiradi.

**Dangasalik faqat `?` bilan miqdorchi uchun yoqiladi.**

Boshqa miqdorchilar ochko'z bo'lib qoladi.

Masalan:

```js run
alert( "123 456".match(/\d+ \d+?/) ); // 123 4
```

1. `pattern:\d+` naqshi imkon qadar ko'p raqamlarni moslashtirishga harakat qiladi (ochko'z rejim), shuning uchun u `match:123` ni topadi va to'xtaydi, chunki keyingi belgi bo'shliq `pattern:' '`.
2. Keyin naqshda bo'shliq bor, u mos keladi.
3. Keyin `pattern:\d+?` bor. Miqdorchi dangasa rejimda, shuning uchun u bitta raqam `match:4` ni topadi va naqshning qolgan qismi u yerdan mos keladimi deb tekshirishga harakat qiladi.

    ...Lekin `pattern:\d+?` dan keyin naqshda hech narsa yo'q.

    Dangasa rejim zaruratsiz hech narsani takrorlamaydi. Naqsh tugadi, shuning uchun biz tugatdik. Bizda `match:123 4` mosligi bor.

```smart header="Optimallashtirish"
Zamonaviy doimiy ifoda dvigatlari tezroq ishlash uchun ichki algoritmlarni optimallashtirishi mumkin. Shuning uchun ular tasvirlangan algoritmdan biroz farq qilishi mumkin.

Lekin doimiy ifodalar qanday ishlashini tushunish va doimiy ifodalar yaratish uchun biz buni bilishimiz shart emas. Ular faqat narsalarni optimallashtirish uchun ichki ravishda ishlatiladi.

Murakkab doimiy ifodalarni optimallashtirish qiyin, shuning uchun qidiruv aynan tasvirlanganidek ishlashi ham mumkin.
```

## Muqobil yondashuv

Regexplar bilan ko'pincha bir xil narsani qilishning bir nechta yo'li mavjud.

Bizning holatimizda biz `pattern:"[^"]+"` regexpdan foydalanib dangasa rejimisiz qo'shtirnoqlangan satrlarni topishimiz mumkin:

```js run
let regexp = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

`pattern:"[^"]+"` regexp to'g'ri natijalar beradi, chunki u qo'shtirnoq `pattern:'"'` ni, keyin bir yoki ko'p qo'shtirnoq bo'lmagan `pattern:[^"]`, keyin yopuvchi qo'shtirnoqni qidiradi.

Regexp dvigateli `pattern:[^"]+` ni qidirganda, yopuvchi qo'shtirnoqqa duch kelganda takrorlashni to'xtatadi va biz tugatamiz.

E'tibor bering, bu mantiq dangasa miqdorchilarni almashtirmaydi!

Bu shunchaki boshqacha. Ba'zida bizga u yoki bu kerak bo'ladigan vaqtlar bor.

**Dangasa miqdorchilar muvaffaqiyatsiz bo'ladigan va bu variant to'g'ri ishlaydigan misolni ko'raylik.**

Masalan, biz `<a href="..." class="doc">` shaklida havolalarni topmoqchimiz, har qanday `href` bilan.

Qaysi doimiy ifodadan foydalanish kerak?

Birinchi g'oya: `pattern:/<a href=".*" class="doc">/g`.

Tekshirib ko'raylik:
```js run
let str = '...<a href="link" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Ishlaydi!
alert( str.match(regexp) ); // <a href="link" class="doc">
```

Bu ishladi. Lekin matnda ko'plab havolalar bo'lsa nima bo'ladi?

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Voy! Bitta moslikda ikkita havola!
alert( str.match(regexp) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
```

Endi natija bizning "jodugarlar" misolidagi kabi sabab tufayli noto'g'ri. `pattern:.*` miqdorchisi haddan tashqari ko'p belgilarni oldi.

Moslik quyidagicha ko'rinadi:

```html
<a href="....................................." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

`pattern:.*?` miqdorchisini dangasa qilish orqali naqshni o'zgartiraylik:

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Ishlaydi!
alert( str.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

Endi u ishlayotganga o'xshaydi, ikkita moslik bor:

```html
<a href="....." class="doc">    <a href="....." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

...Lekin boshqa matn kiritishda sinab ko'raylik:

```js run
let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Noto'g'ri moslik!
alert( str.match(regexp) ); // <a href="link1" class="wrong">... <p style="" class="doc">
```

Endi u muvaffaqiyatsiz. Moslik nafaqat havolani, balki undan keyingi ko'plab matnni ham, `<p...>` ni ham o'z ichiga oladi.

Nega?

Nima bo'layotgani:

1. Birinchi regexp havola boshini topadi `match:<a href="`.
2. Keyin u `pattern:.*?` ni qidiradi: bitta belgini oladi (dangasa!), `pattern:" class="doc">` uchun moslik bormi deb tekshiradi (yo'q).
3. Keyin `pattern:.*?` ga yana bir belgini oladi va hokazo... nihoyat `match:" class="doc">` ga yetguncha.

Lekin muammo shundaki: bu allaqachon `<a...>` havolasidan tashqarida, boshqa `<p>` tegida. Biz xohlagan narsa emas.

Mana matn bilan tekislangan moslikning tasviri:

```html
<a href="..................................." class="doc">
<a href="link1" class="wrong">... <p style="" class="doc">
```

Shunday qilib, bizga `<a href="...biror narsa..." class="doc">` ni qidiradigan naqsh kerak, lekin ochko'z ham, dangasa ham variantlarda muammolar bor.

To'g'ri variant: `pattern:href="[^"]*"` bo'lishi mumkin. U `href` atributi ichidagi barcha belgilarni eng yaqin qo'shtirnoqgacha oladi, aynan bizga kerak bo'lgan narsa.

Ishlaydigan misol:

```js run
let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href="[^"]*" class="doc">/g;

// Ishlaydi!
alert( str1.match(regexp) ); // null, moslik yo'q, bu to'g'ri
alert( str2.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

## Xulosa

Miqdorchilarning ikkita ish rejimi bor:

Ochko'z
: Sukut bo'yicha doimiy ifoda dvigateli miqdorli belgini imkon qadar ko'p marta takrorlashga harakat qiladi. Masalan, `pattern:\d+` barcha mumkin bo'lgan raqamlarni iste'mol qiladi. Ko'proq iste'mol qilish imkonsiz bo'lganda (boshqa raqamlar yo'q yoki satr oxiri), u naqshning qolgan qismiga mos kelishni davom ettiradi. Agar moslik bo'lmasa, u takrorlanish sonini kamaytiradi (orqaga qaytadi) va yana harakat qiladi.

Dangasa
: Miqdorchidan keyin savol belgisi `pattern:?` bilan yoqiladi. Regexp dvigateli miqdorli belgining har bir takrorlanishidan oldin naqshning qolgan qismiga mos kelishga harakat qiladi.

Ko'rganimizdek, dangasa rejim ochko'z qidiruvdan "davo" emas. Muqobil - istisno bilan "nozik sozlangan" ochko'z qidiruv, `pattern:"[^"]+"` naqshidagidek.