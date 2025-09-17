# Halokatli orqaga qaytish (Catastrophic backtracking)

Ba'zi muntazam ifodalar oddiy ko'rinsa ham, juda uzoq vaqt ishlaydi va hatto JavaScript dvigatelini "osib qo'yadi".

Ertami-kechmi deyarli barcha dasturchilarga bunday holatlar duch keladi. Odatiy alomat -- muntazam ifoda ba'zan yaxshi ishlaydi, lekin muayyan satrlar uchun "osilib qoladi", CPU ning 100% ni iste'mol qiladi.

Bunday holatlarda veb-brauzer skriptni o'chirib, sahifani qayta yuklashni taklif qiladi. Bu albatta yaxshi narsa emas.

Server tomonidagi JavaScript uchun bunday regexp server jarayonini osib qo'yishi mumkin, bu yanada yomonroq. Shuning uchun biz buni albatta ko'rib chiqishimiz kerak.

## Misol

Aytaylik, bizda satr bor va biz uni so'zlardan `pattern:\w+` iborat ekanligini, har biridan keyin ixtiyoriy bo'sh joy `pattern:\s?` bilan tekshirmoqchimiz.

Regexp yaratishning aniq usuli so'zni ixtiyoriy bo'sh joy bilan `pattern:\w+\s?` olib, keyin uni `*` bilan takrorlash bo'ladi.

Bu bizni `pattern:^(\w+\s?)*$` regexpiga olib boradi, u satr boshida `pattern:^` boshlanib, oxirida `pattern:$` tugaydigan nol yoki ko'proq bunday so'zlarni belgilaydi.

Amalda:

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

Regexp ishlaganga o'xshaydi. Natija to'g'ri. Biroq, ba'zi satrlarda u juda ko'p vaqt oladi. Shunchalik uzoqki, JavaScript dvigateli 100% CPU iste'moli bilan "osilib qoladi".

Agar quyidagi misolni ishga tushirsangiz, ehtimol hech narsa ko'rmaysiz, chunki JavaScript shunchaki "osilib qoladi". Veb-brauzer voqealarga javob berishni to'xtatadi, UI ishlamay qoladi (ko'pchilik brauzerlar faqat aylantirishga ruxsat beradi). Bir muncha vaqt o'tgach, sahifani qayta yuklashni taklif qiladi. Shuning uchun ehtiyot bo'ling:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// juda uzoq vaqt oladi
alert( regexp.test(str) );
```

Adolatli bo'lish uchun, ba'zi muntazam ifoda dvigatelari bunday qidiruvni samarali bajarishi mumkinligini ta'kidlaymiz, masalan, V8 dvigateli 8.8 versiyasidan boshlab buni qila oladi (shuning uchun Google Chrome 88 bu yerda osilib qolmaydi), Firefox brauzer esa osilib qoladi.

## Soddalashtirilgan misol

Nima gap? Nima uchun muntazam ifoda osilib qolyapti?

Buni tushunish uchun, misolni soddalashtiraylik: bo'sh joylarni `pattern:\s?` olib tashlaylik. Keyin u `pattern:^(\w+)*$` bo'ladi.

Va ishlarni yanada aniqroq qilish uchun, `pattern:\w` ni `pattern:\d` bilan almashtiring. Natijada hosil bo'lgan muntazam ifoda hali ham osilib qoladi, masalan:

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// juda uzoq vaqt oladi (ehtiyot bo'ling!)
alert( regexp.test(str) );
```

Xo'sh, regexpda nima noto'g'ri?

Birinchidan, `pattern:(\d+)*` regexp biroz g'alati ekanligini payqash mumkin. `pattern:*` kvantifikatori ortiqcha ko'rinadi. Agar biz raqam istasak, `pattern:\d+` dan foydalanishimiz mumkin.

Darhaqiqat, regexp sun'iy; biz uni oldingi misolni soddalashtirib oldik. Ammo uning sekin bo'lish sababi bir xil. Keling, buni tushunamiz, shunda oldingi misol ham aniq bo'ladi.

`subject:123456789z` satrida `pattern:^(\d+)*$` qidirish vaqtida nima sodir bo'ladi (aniqlik uchun biroz qisqartirilgan, oxirida `subject:z` raqam bo'lmagan belgini e'tibor bering, bu muhim), nima uchun bu shunchalik uzoq vaqt oladi?

Mana regexp dvigateli nima qiladi:

1. Birinchidan, regexp dvigateli qavslar ichidagi tarkibni topishga harakat qiladi: `pattern:\d+` raqami. `pattern:+` standart ravishda ochko'z, shuning uchun u barcha raqamlarni iste'mol qiladi:

    ```
    \d+.......
    (123456789)z
    ```

    Barcha raqamlar iste'mol qilingandan so'ng, `pattern:\d+` topilgan deb hisoblanadi (`match:123456789` sifatida).

    Keyin yulduzcha kvantifikatori `pattern:(\d+)*` qo'llaniladi. Ammo matnda boshqa raqamlar yo'q, shuning uchun yulduzcha hech narsa bermaydi.

    Naqshdagi keyingi belgi satr oxiri `pattern:$`. Ammo matnda uning o'rniga `subject:z` bor, shuning uchun mos kelish yo'q:

    ```
               X
    \d+........$
    (123456789)z
    ```

2. Mos kelish yo'q bo'lgani uchun, ochko'z kvantifikator `pattern:+` takrorlashlar sonini kamaytiradi, bir belgini orqaga qaytaradi.

    Endi `pattern:\d+` oxirgisidan tashqari barcha raqamlarni oladi (`match:12345678`):
    ```
    \d+.......
    (12345678)9z
    ```

3. Keyin dvigatel keyingi pozitsiyadan (`match:12345678` dan keyin) qidiruvni davom ettirishga harakat qiladi.

    Yulduzcha `pattern:(\d+)*` qo'llanishi mumkin -- u `pattern:\d+` ning yana bir mosligini beradi, `match:9` raqami:

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    Dvigatel `pattern:$` ni yana moslashtirishga harakat qiladi, ammo muvaffaqiyatsiz bo'ladi, chunki u o'rniga `subject:z` ni uchratadi:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```

4. Mos kelish yo'q, shuning uchun dvigatel orqaga qaytishni davom ettiradi, takrorlashlar sonini kamaytiradi. Orqaga qaytish odatda shunday ishlaydi: oxirgi ochko'z kvantifikator minimal darajaga yetguncha takrorlashlar sonini kamaytiradi. Keyin oldingi ochko'z kvantifikator kamayadi va hokazo.

    Barcha mumkin bo'lgan kombinatsiyalar sinab ko'riladi. Mana ularning misollari.

    Birinchi raqam `pattern:\d+` da 7 ta raqam bor, keyin 2 ta raqamli raqam:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    Birinchi raqamda 7 ta raqam bor, keyin har birida 1 ta raqamdan ikkita raqam:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    Birinchi raqamda 6 ta raqam bor, keyin 3 ta raqamli raqam:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    Birinchi raqamda 6 ta raqam bor, keyin 2 ta raqam:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...Va hokazo.

`123456789` raqamlar ketma-ketligini raqamlarga bo'lishning ko'p usullari bor. Aniq qilib aytganda, <code>2<sup>n</sup>-1</code> ta yo'l bor, bu yerda `n` ketma-ketlik uzunligi.

- `123456789` uchun bizda `n=9`, bu 511 ta kombinatsiya beradi.
- `n=20` bilan uzunroq ketma-ketlik uchun taxminan bir million (1048575) kombinatsiya bor.
- `n=30` uchun - ming marta ko'p (1073741823 kombinatsiya).

Ularning har birini sinab ko'rish qidiruvning uzoq vaqt olishining aniq sababidir.

## So'zlar va satrlar uchun qaytish

Birinchi misolimizda ham xuddi shunday narsa sodir bo'ladi, `subject:An input that hangs!` satrida `pattern:^(\w+\s?)*$` naqsh bilan so'zlarni qidirganimizda.

Sababi shundaki, so'z bitta `pattern:\w+` yoki ko'p qismlarda ifodalanishi mumkin:

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

Inson uchun mos kelish bo'lmasligi aniq, chunki satr undov belgisi `!` bilan tugaydi, ammo muntazam ifoda oxirida so'z belgisi `pattern:\w` yoki bo'sh joy `pattern:\s` ni kutadi. Ammo dvigatel buni bilmaydi.

U regexp `pattern:(\w+\s?)*` satrni qanday "iste'mol qilishi" mumkinligining barcha kombinatsiyalarini sinab ko'radi, jumladan bo'sh joylar bilan `pattern:(\w+\s)*` va ularsiz `pattern:(\w+)*` variantlarni (chunki bo'sh joylar `pattern:\s?` ixtiyoriy). Bunday kombinatsiyalar ko'p bo'lgani uchun (biz buni raqamlar bilan ko'rdik), qidiruv ko'p vaqt oladi.

Nima qilish kerak?

Dangasa rejimni yoqish kerakmi?

Afsuski, bu yordam bermaydi: agar biz `pattern:\w+` ni `pattern:\w+?` bilan almashtirsa, regexp hali ham osilib qoladi. Kombinatsiyalar tartibi o'zgaradi, ammo ularning umumiy soni emas.

Ba'zi muntazam ifoda dvigatellari barcha kombinatsiyalarni ko'rib chiqishdan qochish yoki uni ancha tezlashtirish imkonini beradigan murakkab testlar va chekli avtomatlarga ega, ammo ko'pchilik dvigatellar yo'q va bu har doim ham yordam bermaydi.

## Qanday tuzatish kerak?

Muammoni hal qilishning ikkita asosiy usuli bor.

Birinchisi mumkin bo'lgan kombinatsiyalar sonini kamaytirish.

Bo'sh joyni majburiy qilib, muntazam ifodani `pattern:^(\w+\s)*\w*$` deb qayta yozaylik - biz bo'sh joy bilan so'zlangan istalgan miqdordagi so'zlarni `pattern:(\w+\s)*`, keyin (ixtiyoriy) oxirgi so'zni `pattern:\w*` qidiramiz.

Bu regexp avvalgisiga teng (bir xil mosliklar) va yaxshi ishlaydi:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false
```

Nega muammo yo'qoldi?

Buning sababi endi bo'sh joy majburiy.

Oldingi regexp, agar biz bo'sh joyni chiqarib tashlasak, `pattern:(\w+)*` bo'lib, bitta so'z ichida `\w+` ning ko'p kombinatsiyalariga olib keladi.

Shunday qilib, `subject:input` `pattern:\w+` ning ikki takrorlanishi sifatida moslashtirishi mumkin, masalan:

```
\w+  \w+
(inp)(ut)
```

Yangi naqsh boshqacha: `pattern:(\w+\s)*` bo'sh joy bilan so'zlangan so'zlarning takrorlanishini belgilaydi! `subject:input` satri `pattern:\w+\s` ning ikki takrorlanishi sifatida moslashtirila olmaydi, chunki bo'sh joy majburiy.

Ko'p (aslida ko'pchilik) kombinatsiyalarni sinab ko'rish uchun zarur bo'lgan vaqt endi tejaldi.

## Orqaga qaytishni oldini olish

Biroq regexp ni qayta yozish har doim ham qulay emas. Yuqoridagi misolda bu oson edi, ammo buni qanday qilish har doim ham aniq emas.

Bundan tashqari, qayta yozilgan regexp odatda murakkabroq va bu yaxshi emas. Regexplar qo'shimcha harakatlarsiz ham etarlicha murakkab.

Yaxshiyamki, muqobil yondashuv bor. Biz kvantifikator uchun orqaga qaytishni taqiqlashimiz mumkin.

Muammoning ildizi shundaki, regexp dvigateli inson uchun aniq noto'g'ri bo'lgan ko'p kombinatsiyalarni sinab ko'radi.

Masalan, `pattern:(\d+)*$` regexpida inson uchun `pattern:+` orqaga qaytmasligi kerakligi aniq. Agar biz bitta `pattern:\d+` ni ikkita alohida `pattern:\d+\d+` bilan almashtirsa, hech narsa o'zgarmaydi:

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

Va asl misolda `pattern:^(\w+\s?)*$` da biz `pattern:\w+` da orqaga qaytishni taqiqlashni xohlashimiz mumkin. Ya'ni: `pattern:\w+` maksimal mumkin bo'lgan uzunlik bilan butun so'zga mos kelishi kerak. `pattern:\w+` da takrorlashlar sonini kamaytirish yoki uni ikkita so'zga `pattern:\w+\w+` bo'lish va hokazolar kerak emas.

Zamonaviy muntazam ifoda dvigatellari buning uchun egalik kvantifikatorlarini qo'llab-quvvatlaydi. Oddiy kvantifikatorlar, agar biz ulardan keyin `pattern:+` qo'shsak, egalik bo'ladi. Ya'ni, biz `pattern:+` ni orqaga qaytishdan to'xtatish uchun `pattern:\d+` o'rniga `pattern:\d++` dan foydalanamiz.

Egalik kvantifikatorlari aslida "oddiy" lardan sodda. Ular shunchaki iloji boricha ko'p moslashtiradi, hech qanday orqaga qaytishsiz. Orqaga qaytishsiz qidiruv jarayoni soddaroq.

"Atom tutuvchi guruhlar" ham bor - qavslar ichida orqaga qaytishni o'chirish usuli.

...Ammo yomon xabar shundaki, afsuski, JavaScript da ular qo'llab-quvvatlanmaydi.

Biroq biz ularni "oldinga qarash o'zgarishi" yordamida taqlid qilishimiz mumkin.

### Oldinga qarash yordamga keladi!

Shunday qilib, biz haqiqiy ilg'or mavzularga keldik. Biz `pattern:+` kabi kvantifikatorning orqaga qaytmasligini istayiz, chunki ba'zan orqaga qaytish ma'noga ega emas.

Orqaga qaytishsiz `pattern:\w` ning iloji boricha ko'p takrorlanishini olish naqshi: `pattern:(?=(\w+))\1`. Albatta, `pattern:\w` o'rniga boshqa naqshni olishimiz mumkin.

Bu g'alati tuyulishi mumkin, ammo bu aslida juda oddiy o'zgartirish.

Keling, uni deshipr qilaylik:

- Oldinga qarash `pattern:?=` joriy pozitsiyadan boshlanadigan eng uzun so'z `pattern:\w+` ni qidiradi.
- `pattern:?=...` bilan qavslar tarkibi dvigatel tomonidan eslab qolinmaydi, shuning uchun `pattern:\w+` ni qavslarga o'rang. Keyin dvigatel ularning tarkibini eslab qoladi
- ...Va naqshda uni `pattern:\1` sifatida murojaat qilishga imkon beradi.

Ya'ni: biz oldinga qaraymiz - va agar so'z `pattern:\w+` bo'lsa, uni `pattern:\1` sifatida moslashtiring.

Nega? Buning sababi shundaki, oldinga qarash so'z `pattern:\w+` ni butunligicha topadi va biz uni naqshga `pattern:\1` bilan qo'lamiz. Shunday qilib, biz mohiyatan egalik plus `pattern:+` kvantifikatorini amalga oshirdik. U faqat butun so'z `pattern:\w+` ni qo'lga oladi, uning bir qismini emas.

Masalan, `subject:JavaScript` so'zida u nafaqat `match:Java` ni moslashishi mumkin, balki naqshning qolgan qismiga mos kelish uchun `match:Script` ni tashlab ketishi mumkin.

Mana ikki naqshning taqqoslashuvi:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. Birinchi variantda `pattern:\w+` avval butun `subject:JavaScript` so'zini qo'lga oladi, ammo keyin `pattern:+` naqshning qolgan qismiga mos kelish uchun belgi bo'yicha orqaga qaytadi, oxir-oqibat muvaffaqiyat qozonadi (`pattern:\w+` `match:Java` ga mos kelganda).
2. Ikkinchi variantda `pattern:(?=(\w+))` oldinga qaradi va `subject:JavaScript` so'zini topadi, bu `pattern:\1` tomonidan naqshga butunligicha kiritiladi, shuning uchun undan keyin `subject:Script` ni topishning yo'li qolmaydi.

Biz `pattern:\w` o'rniga `pattern:(?=(\w+))\1` ga murakkabroq muntazam ifoda qo'yishimiz mumkin, agar undan keyin `pattern:+` uchun orqaga qaytishni taqiqlashimiz kerak bo'lsa.

```smart
Egalik kvantifikatorlari va oldinga qarash o'rtasidagi munosabat haqida ko'proq ma'lumot [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) va [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups) maqolalarida.
```

Keling, orqaga qaytishni oldini olish uchun oldinga qarishdan foydalanib birinchi misolni qayta yozaylik:

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false, ishlaydi va tez!
```

Bu yerda `pattern:\2` `pattern:\1` o'rniga ishlatiladi, chunki qo'shimcha tashqi qavslar bor. Raqamlar bilan aralashmaslik uchun qavslarga nom berishimiz mumkin, masalan `pattern:(?<word>\w+)`.

```js run
// qavslar ?<word> deb nomlangan, \k<word> sifatida murojaat qilingan
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

Ushbu maqolada tasvirlangan muammo "halokatli orqaga qaytish" deb ataladi.

Biz uni hal qilishning ikkita usulini ko'rib chiqdik:
- Mumkin bo'lgan kombinatsiyalar sonini kamaytirish uchun regexp ni qayta yozish.
- Orqaga qaytishni oldini olish.