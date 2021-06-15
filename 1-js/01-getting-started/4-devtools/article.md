# Dasturchi consoli

Kod hatolarga moyil. Siz dastur jarayonida ehtimol hatolar qilasiz... Voy, men nma haqida gapiryapman? Siz *albatta* hatolar qilasiz, agar siz inson bo'lsangiz, [robot](https://en.wikipedia.org/wiki/Bender_(Futurama))emas.

Ammo brauzerda foydalanuvchilar standart sifatida xatolarni ko'rmaydilar. Shunday qilib, agar skriptda biron bir narsa noto'g'ri bo'lsa, biz buzilgan narsani ko'rmaymiz va uni tuzatolmaymiz.

Xatolarni ko'rish va skriptlar haqida ko'plab boshqa foydali ma'lumotlarga ega bo'lish uchun brauzerlarda "dasturchilar uchun ko'makchi vositalari" joylashtirilgan.

Ko'p dasturchilar Chrome yoki Firefox brauzerlarni ishlatadilar, chunki ular eng zo'r dasturchilar uchun ko'makchi vositalari bilan jihozlangan. Boshqa brauzerlar ham ba'zan maxsus xususiyatlarga ega, dasturchilar uchun ko'makchi vositalari bilan ta'minlangan, lekin, odatda, Chrome yoki Firefox ishlatilinadi. Shunday qilib, ko'pchilik dasturchilar "sevimli" brauzerga ega va agar muammo brauzerga xos bo'lsa, boshqalarga o'tadi.

Developer tools are potent; they have many features. To start, we'll learn how to open them, look at errors, and run JavaScript commands.
Dasturchilar uchun ko'makchi vositalari kuchli bo'ladi; ular ko'p xususiyatlarga ega. Boshlash uchun, biz ularni qanday ochishni o'rganamiz, xatolarni ko'rish, va JavaScript buyruqlarni ishlatish.

## Google Chrome

[bug.html](bug.html) sahifani oching.

Unda JavaScript kodida xatolik bor. Bu muntazam mehmonning ko'zidan yashirin, shuning uchun uni ko'rish uchun dasturchilar uchun ko'makchi vositalarni ochaylik.

`key:F12` bosing yoki, agar siz Mac ishlatsangiz,`key:Cmd+Opt+J` bosing.

The developer tools will open on the Console tab by default.
Dasturchilar uchun ko'makchi vositalari standart sifatida consol yorlig'ida ochiladi.

Bu shunday ko'rinadi:

![chrome](chrome.png)

Ishlab chiquvchi vositalarning aniq ko'rinishi sizning Chrome versiyangizga bog'liq. U vaqti-vaqti bilan o'zgarib turadi, ammo shunga o'xshash bo'lishi kerak.

- Bu erda biz qizil rangli xato xabarini ko'rishimiz mumkin. Bunday holda, skriptda noma'lum "lalala" buyrug'i mavjud.
- O'ng tomonda xatolik yuzaga kelgan satr raqami bilan `bug.html:12` manbasiga bosish mumkin bo'lgan havola mavjud.

<<<<<<< HEAD:1-js/01-getting-started/3-devtools/article.md
Xato xabari ostida ko'k `>` belgisi mavjud. Bu biz JavaScript buyruqlarini kiritishimiz mumkin bo'lgan "buyruq satri" ni belgilaydi. Ularni ishga tushirish uchun `key:Enter` tugmachasini bosing. (Ko'p qatorli buyruqlarni kiritish uchun `key:Shift+Enter` tugmachasini bosing).
=======
Below the error message, there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands. Press `key:Enter` to run them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/01-getting-started/4-devtools/article.md

Now we can see errors, and that's enough for a start. We'll come back to developer tools later and cover debugging more in-depth in the chapter 
Endi biz xatolarni ko'rishimiz mumkin va bu boshlanish uchun etarli. Biz keyinchalik dasturchilar uchun ko'makchi vositalariga qaytamiz va debagging(ingliz tilidan "debugging" dastur kodidagi xatolarni tuzatish) bo'limida batafsilroq ko'rib chiqamiz<info:debugging-chrome>.

```smart header="Multi-line input"
Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`. This way one can enter long fragments of JavaScript code.
```

## Firefox, Edge, va boshqalar

Ko'pgina boshqa brauzerlar dasturchilar uchun ko'makchi vositalarni ochish uchun `key:F12` dan foydalanadilar.

Ularning tashqi ko'rinishi va his qilishi o'xshash. Ushbu vositalardan birini qanday ishlatishni bilsangiz (Chrome dan boshlashingiz mumkin), boshqasiga osongina o'tishingiz mumkin.

## Safari

Safari (Windows / Linux tomonidan qo'llab-quvvatlanmaydigan Mac brauzeri) bu erda biroz o'ziga xosdir. Avval "Dasturchi menyusi" ni yoqishimiz kerak.

Preferences-ni oching va "Advanced" oynasiga o'ting. Pastki qismida belgilash katakchasi mavjud:

![safari](safari.png)

Endi `key:Cmd+Opt+C` tugmasini bosib konsolni faollashtirish mumkin. Bundan tashqari, "Dasturlash"("Develop") deb nomlangan yangi yuqori menyu elementiga e'tibor bering. Bu juda ko'p buyruqlar va variantlarga ega.

<<<<<<< HEAD:1-js/01-getting-started/3-devtools/article.md
## Keyingi satrga o’tkazish imkoniyat

Odatda, konsolga kod satrini qo'yib, keyin `key:Enter` tugmasini bossak, u amalga oshadi.

Keyingi satrga o’tkazish uchun `key:Shift+Enter` bosing.

## Xulosa
=======
## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/01-getting-started/4-devtools/article.md

- Developer tools allow us to see errors, run commands, examine variables, and much more.
dasturchilar uchun ko'makchi vositalari bizga xatolarni ko'rish imkonini beradi, buyruqlar ishga tushirish, o'zgaruvchilar tekshirish, va hokazo.
- Ular ko'plar brauzerlarda `key:F12` tugmasi bilan ochilishi mumkun. Chrome Mac uchun `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (avval "Dasturchi menyusi" ni yoqishingiz kerak).

Hozir bizda muhit tayyor. Keyingi bo'limda JavaScriptga kirishamiz.