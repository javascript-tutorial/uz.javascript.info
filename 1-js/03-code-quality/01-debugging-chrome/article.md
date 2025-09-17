# Chrome da koddagi nosozliklarni tuzatish

Keyinchalik murakkab kodni yozishdan oldin, koddagi nosozliklar haqida gapiraylik.

Barcha zamonaviy brauzerlar va boshqa ko'pgina muhitlar "koddagi nosozliklarni tuzatish" ni qo'llab-quvvatlaydi -- ishlab chiquvchi vositalaridagi maxsus interfeys, bu xatolarni topish va tuzatishni ancha osonlashtiradi.

Biz bu erda Chrome-dan foydalanamiz, chunki u bu jihatlarga ko'ra eng boy xususiyatlarga ega.

## "Manbalar" oynasi («Sources»)

Chrome versiyangiz biroz boshqacha ko'rinishi mumkin, ammo u yerda nima borligi aniq bo'lishi kerak.

- Chrome-da [misol sahifasini](debugging/index.html) oching.
- Dastruchi vositalarini oching `key:F12` (Mac: `key:Cmd+Opt+I`).
- `manbalar` panelini tanlang.

Agar buni birinchi marta qilsangiz, nimani ko'rishingiz kerak:

![](chrome-open-sources.svg)

Radio tugmasi <span class="devtools" style="background-position:-168px -76px"></span> fayllar ro'yxati bilan yorliqni ochadi.

Keling, uni bosing va `index.html` ni tanlang va keyin daraxt ko'rinishida `hello.js` ni tanlang. Mana nimani ko'rsatishi kerak:

![](chrome-tabs.svg)

Bu yerda uchta zonani ko'rishimiz mumkin:

1. **Resurslar zonasi** HTML, JavaScript, CSS va boshqa fayllarni, shu jumladan sahifaga biriktirilgan rasmlarni ro'yxatlaydi. Chrome kengaytmalari bu yerda ham paydo bo'lishi mumkin.
2. **Manba zonasi** manba kodini ko'rsatadi.
3. **Axborot va boshqaruv zonasi** koddagi nosozliklarni tuzatish uchun mo'ljallangan, biz uni tez orada o'rganib chiqamiz.

Resurslar ro'yxatini yashirish va manba kodi uchun ekran maydonini bo'shatish uchun usha radio tugmasini bosing <span class="devtools" style="background-position:-200px -76px"></span>

## Konsol

Agar biz `Esc` tugmachasini bossak, u holda konsol quyida ochiladi. Biz u erga buyruqlar yozib, `key:Enter` tugma yordamida bajarishimiz mumkin.

Ifoda bajarilgandan so'ng uning natijasi quyida ko'rsatiladi.

Masalan, bu yerda `1+2` ning natijasi `3` ga teng, va `hello("debugger")` hech narsa qaytarmaydi, shuning uchun natijasi `undefined`:

![](chrome-sources-console.svg)

## To'xtash nuqtalari

Keling, [misol sahifasi](debugging/index.html) kodida nimalar bo'layotganini ko'rib chiqaylik. `Hello.js` dagi `4` chi satrni bosing. Ha, kodda emas, balki `4` raqamni.

Tabriklaymiz! Siz to'xtash nuqtasini o'rnatdingiz. Iltimos, shuningdek, `8` satr raqamini bosing.

Bu shunday ko'rinishi kerak (ko'k bu bosish kerak bo'lgan joy):

![](chrome-sources-breakpoint.svg)

_To'xtash nuqtasi_ - bu koddagi nosozliklarni tuzatuvchi JavaScript-ni bajarilishini avtomatik ravishda to'xtatib turadigan kod nuqtasi.

Kod to'xtatib turilsa, biz mavjud o'zgaruvchanlarni tekshirib ko'rishimiz, konsolda buyruqlar bajarishimiz va h.k. Boshqacha qilib aytganda, koddagi nosozliklarni tuzatishimiz mumkin.

Biz har doim o'ng oynada to'xtash nuqtalarining ro'yxatini topishimiz mumkin. Bu turli xil fayllarda juda ko'p to'xtash nuqtalari mavjud bo'lganda foydalidir. Bu bizga quyidagilarga imkon beradi:

- Koddagi to'xtash nuqtasiga tezda o'tish (o'ng oynada uni bosish orqali).
- Tekshirish nuqtasini olib tashlab, uni o'chirib qo'yish.
- Sichqonchaning o'ng tugmachasini bosib, remove(o'chirish)-ni tanlab, to'xtash nuqtasini olib tashlash.
- ...Va hokazo.

```smart header="Shartli to'xtash nuqtalari"
Satr raqamidagi *o'ng tugmachani* bosish *shartli* to'xtash nuqtasini yaratishga imkon beradi. Bu faqat berilgan ifoda haqiqat bo'lganda boshlanadi.

Bu faqat ma'lum bir o'zgaruvchan qiymat yoki funktsiya parametrlari uchun to'xtashimiz kerak bo'lganda qulay.
```

## Koddagi nosozliklarni tuzatuvchi buyrug'i

Kodni quyidagi kabi `koddagi nosozliklarni tuzatuvchi` buyrug'i yordamida to'xtatib turishimiz mumkin:

```js
function hello(name) {
  let phrase = `Salom, ${name}!`;

*!*
  debugger;  // <-- koddagi nosozliklarni tuzatuvchi shu yerda to'xtaydi
*/!*

  say(phrase);
}
```

Bu biz kod muharririda bo'lganimizda va brauzerga o'tishni xohlamasak va to'xtash nuqtasini o'rnatish uchun ishlab chiquvchi vositalarida skriptni qidirishni istamasak, bu juda qulay.

## Kodni to'xtatib turing va atrofga nazar tashlang

Bizning misolimizda sahifani yuklash paytida `hello()` chaqiriladi, shuning uchun koddagi nosozliklarni tuzatuvchi faollashtirishning eng oson usuli bu sahifani qayta yuklashdir. Keling, `key:F5` (Windows, Linux) yoki `key:Cmd+R` (Mac) bosing.

To'xtash nuqtasi o'rnatilganda, ijro 4-satrda to'xtatiladi:

![](chrome-sources-debugger-pause.svg)

Iltimos, ma'lumotlar ochiladigan sahifalarni o'ng tomonga oching (o'qlar bilan belgilangan). Ular sizga joriy kod holatini tekshirishga imkon beradi:

1. **`Watch` -- har qanday ifodalar uchun joriy qiymatlarni ko'rsatadi.**

   Siz ortiqcha `+` tugmachasini bosishingiz va ifodani kiritishingiz mumkin. Koddagi nosozliklarni tuzatuvchi har qanday vaqtda o'z qiymatini ko'rsatadi, uni bajarish jarayonida avtomatik ravishda qayta hisoblab chiqadi.

2. **`Call Stack` -- ulanish chaqiruvlar zanjirini ko'rsatadi.**

   Hozirgi vaqtda koddagi nosozliklarni tuzatuvchi `hello()` chaqiruvi ichida `index.html` dagi skript bilan chaqirilgan (u erda hech qanday funktsiya yo'q, shuning uchun "anonim" deb nomlanadi).

   Agar siz stek elementini bosgan bo'lsangiz, koddagi nosozliklarni tuzatuvchi mos keladigan kodga o'tadi va uning barcha o'zgaruvchanlari ham tekshirishi mumkin.

3. **`Scope` -- joriy o'zgaruvchanlar.**

   `Local` ichki funktsiya o'zgaruvchanlarini ko'rsatadi. Shuningdek, ularning ta'kidlangan qiymatlarini manba ustida ko'rishingiz mumkin.

   `Global` global o'zgaruvchanlarga ega (har qanday funktsiyalardan tashqari).

   U erda biz hali o'rganmagan `this` kalit so'z ham bor, lekin buni tez orada o'rganamiz.

## Ijro etilishini kuzatish

Endi skriptni _ijro etilishini kuzatish_ vaqti keldi.

O'ng oynaning yuqori qismida buning uchun tugmalar mavjud. Keling, ularni o'rganib chiqaylik.

<span class="devtools" style="background-position:-7px -76px"></span> -- ijro etishni davom eting, tezkor tugma `key:F8`.
: Ijro etishni davom ettiradi. Agar qo'shimcha to'xtash nuqtalari bo'lmasa, unda bajarish davom etadi va koddagi nosozliklarni tuzatuvchi boshqaruvni yo'qotadi.

    Uni bosgandan keyin nimani ko'rishimiz mumkin:

    ![](chrome-sources-debugger-trace-1.svg)

    Ijro etilish davom ettirilib, `say()` ichidagi boshqa to'xtash nuqtasiga yetdi va u yerda to'xtab qoldi. O'ng tarafdagi "Chaqiruvlar to'plami" ga qarang. Bu yana bitta chaqiruvga ko'paygan. Biz hozir `say()` ni ichidamiz.

<span class="devtools" style="background-position:-137px -76px"></span> -- qadam qo'yish (keyingi buyruqni bajaring), lekin _funktsiyasiga kirmang_, tezkor tugma `key:F10`.
: Agar hozir uni bossak, `alert` ko'rsatiladi. Muhimi shundaki, `alert` har qanday funktsiya bo'lishi mumkin, ijro etish "undan sakrab o'tadi", ichki funktsiyalarni o'tkazib yuboradi.

<span class="devtools" style="background-position:-72px -76px"></span> -- qadam qo'yish, tezkor tugma `key:F11`.
: Oldingi bilan bir xil, ammo ichki qadam vazifalariga "qadam qo'yadi". Buni bosish barcha skript harakatlariga birma-bir qadam qo'yadi.

<span class="devtools" style="background-position:-104px -76px"></span> -- joriy funktsiyani oxirigacha bajarishni davom etish, tezkor tugma `key:Shift+F11`.
: Ijro etilish joriy funktsiyalarning oxirgi satrda to'xtaydi. Biz tasodifan <span class="devtools" style="background-position:-72px -76px"></span> yordamida ichki chaqiruvni kiritganimizda bu juda qulay, ammo bu bizni qiziqtirmaydi va biz oxirigacha davom etishni imkoni boricha tezda xohlaymiz.

<span class="devtools" style="background-position:-7px -28px"></span> -- barcha to'xtash nuqtalarini yoqish/o'chirish.
: Ushbu tugma ijro etishni harakatga keltirmaydi. To'xtash nuqtalarni faqat yoqadi/o'chiradi.

<span class="devtools" style="background-position:-264px -4px"></span> -- xatolik yuz berganda avtomatik to'xtatishni yoqish/o'chirish.
: Yoqilganda va dasturchi vositalari ochiq bo'lsa, skript xatosi avtomatik ravishda bajarilishini to'xtatadi. Keyin nima o'zgarganligini ko'rish uchun o'zgaruvchanlarni tahlil qilishimiz mumkin. Shunday qilib, agar bizning skriptimiz xato bilan to'xtasa, biz koddagi nosozliklarni tuzatuvchi vositasini ochib, ushbu parametrni yoqib, sahifani qayta yuklashimiz mumkin, u qayerda to'xtashini va o'sha paytda qanday qiymatda ekanligini bilib olishimiz mumkin.

```smart header="Bu erda davom eting"
Kod satriga sichqonchaning o'ng tugmasi bilan bosish kontekst menyusini "Bu erda davom eting" ochadi.

Bu biz bir necha qadam oldinga siljishni xohlaganimizda qulay, ammo biz to'xtash nuqtasini o'rnatishga dangasa bo'lsak.
```

## Konsolga chiqarish

Konsolga biror narsa chiqarish uchun `console.log` funktsiyasi mavjud.

Masalan, bu konsolga `0` dan `4` gacha bo'lgan qiymatlarni chiqaradi:

```js run
// ko'rish uchun konsolni oching
for (let i = 0; i < 5; i++) {
  console.log("qiymat", i);
}
```

Muntazam foydalanuvchilar ushbu chiqishni ko'rmaydilar, u konsolda. Buni ko'rish uchun dasturchi vositalarining konsol yorlig'ini oching yoki boshqa tugmachada: tugmachani ochadigan `key:Esc` tugmachasini bosing.

Agar bizning kodimizga kiritish yetarli bo'lsa, biz nima sodir bo'layotganini koddagi nosozliklarni tuzatuvchisiz ko'rishimiz mumkin.

## Xulosa

Ko'rib turganimizdek, skriptni to'xtatib turishning uchta asosiy usuli mavjud:

1. To'xtash nuqtasi.
2. "Koddagi nosozliklarni tuzatuvchi" ifodalari.
3. Xato (agar dasturchi vositalari ochiq bo'lsa va <span class ="devtools" style ="background-position: -264px -4px"></span> tugmasi "yoqilgan" bo'lsa)

Keyin biz o'zgaruvchanlarni ko'rib chiqamiz va bajarilish qayerda noto'g'ri ketayotganini bilib olamiz.

Dasturchi vositalarda bu yerda ko'rib chiqilganidan ko'ra ko'proq imkoniyatlar mavjud. To'liq qo'llanma <https://developers.google.com/web/tools/chrome-devtools>.

Ushbu bobdan olingan ma'lumotlar koddagi nosozliklarni tuzatishni boshlash uchun yetarli, ammo keyinroq, ayniqsa brauzerda juda ko'p narsalarni qilsangiz, iltimos, u yerga o'ting va dasturchi vositalarning yanada rivojlangan imkoniyatlarini ko'rib chiqing.

Eh, shuningdek, siz dasturchi vositalarning turli joylarini bosishingiz va nima ko'rinishini bilishingiz mumkin. Bu, ehtimol, dasturchi vositalarini o'rganish uchun eng tez marshrut. Sichqonchaning o'ng tugmachasini bosishni ham unutmang!
