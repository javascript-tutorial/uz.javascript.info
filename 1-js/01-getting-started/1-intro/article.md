# JavaScript-ga kirish

<<<<<<< HEAD
Keling, JavaScript-da nima muhimligini, u bilan nimaga erisha olishimizni va qanday boshqa texnologiyalar bilan ushbu til yaxshi qo'llanilishini ko'rib chiqaylik.
=======
Let's see what's so special about JavaScript, what we can achieve with it, and what other technologies play well with it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## JavaScript bu nima?

<<<<<<< HEAD
*JavaScript* dastlab *"veb-sahifalarni jonlantirish"* uchun yaratilgan edi.

Ushbu tilda dasturlar *skript* deb nomlanadi. Ular veb-sahifani HTML-da yozilishi mumkin va sahifa brauzer tomonidan yuklanganidan keyin ular avtomatik ravishda amalga oshiriladi.
=======
*JavaScript* was initially created to "make web pages alive".

The programs in this language are called *scripts*. They can be written right in a web page's HTML and run automatically as the page loads.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Skriptlar oddiy matn sifatida taqdim etiladi va amalga oshiriladi. Ularni ishga tushirish uchun maxsus tayyorgarlik yoki kompilatsiya kerak emas.

Shu jihatdan, JavaScript [Java] (https://en.wikipedia.org/wiki/Java_(programming_language)) tilidan juda farq qiladi.

<<<<<<< HEAD
```smart header="Nega <u>Java</u>Script?"
JavaScript yaratilganda, u dastlab "LiveScript" nomi bilan taqdim etilgan edi. Ammo Java o'sha paytlarda juda mashhur edi, shuning uchun Java tilining "ukasi" sifatida yangi tilni taqdim etish g'oyasi JS mashhur bo'lishga yordam beradi deb hisoblangan .
=======
```smart header="Why is it called <u>Java</u>Script?"
When JavaScript was created, it initially had another name: "LiveScript". But Java was very popular at that time, so it was decided that positioning a new language as a "younger brother" of Java would help.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ammo, rivojlanish jarayonida, JavaScript [ECMAScript] (http://en.wikipedia.org/wiki/ECMAScript) deb ataladigan o'z xususiyatiga ega to'liq mustaqil tilga aylangan va hozirda Java tiliga hech qanday aloqasi yo'q.
```

Bugungi kunda JavaScript nafaqat brauzerda, balki serverda yoki aslida [JavaScript interpretatori](https://en.wikipedia.org/wiki/JavaScript_engine) deb nomlangan maxsus dasturga ega bo'lgan har qanday qurilmada ham bajarilishi mumkin.

Brauzerlar o'z JavaScript interpretatorlariga ega, ular gohida "JavaScript virtual mashinasi" deb atalanadi.

Har bir intetptretatorni o'z nomi mavjud. Masalan:

<<<<<<< HEAD
<<<<<<< HEAD
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome va Opera brauzerlarida qo'llanadi.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- Firefox brauzerida.
- ...net Explorer brauerning turli xil versiyalari uchun "Trident" va "Chakra", Microsoft Edge uchun "ChakraCore", Safari uchun "Nitro" va "SquirrelFish" va boshqalar kabi boshqa kod nomlari mavjud.
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome and Opera.
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Yuqoridagi atamalarni eslab qolish yaxshi, chunki ular netdagi ishlab chiquvchilar maqolalarida qo'llaniladi. Biz ulardan ham foydalanamiz. Masalan, agar "X funktsiyasini V8 qo'llab-quvvatlasa", ehtimol u Chrome va Opera-da ishlaydi.
=======
The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

```smart header="Intetptretatorlar ishni qanday bajarishadi?"

Intetptretatorlar murakkab. Ammo asoslari oson.

1. Intetptretator (agar u brauzer bo'lsa, avtomatik o'rnatilgan) skriptni o'qiydi ("tahlil qiladi").
2. Keyin u skriptni mashina tiliga o'zgartiradi ("kompilyatsiya qiladi").
3. Va keyin mashina kodi juda tez ishlaydi.

<<<<<<< HEAD
Interpretatatsiya jarayonning har bir bosqichida optimallashtirishlarni qo'llaydi. U hattoki kompilyatsiya qilingan skriptni ishlayotganda kuzatib boradi, u orqali oqib o'tadigan ma'lumotlarni tahlil qiladi va shu bilimga asoslangan holda mashina kodiga optimallashtirishlarni qo'llaydi. Tugatgandan so'ng, skriptlar juda tez ishlaydi.
=======
The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and further optimizes the machine code based on that knowledge.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## Brauzerdagi JavaScript nimani bajara oladi?

Zamonaviy JavaScript - bu "xavfsiz" dasturlash tili. Bu xotira yoki protsessorga(CPU) past darajadagi kirishni ta'minlamaydi, chunki dastlab uni talab qilmaydigan brauzerlar uchun yaratilgan.

JavaScript-ning imkoniyatlari u ishlayotgan muhitga juda bog'liq. Masalan, [Node.js](https://wikipedia.org/wiki/Node.js) JavaScript-ga o'zboshimchalik bilan fayllarni o'qish / yozish, tarmoq so'rovlarini bajarish va hk.

Brauzerda JavaScript veb-sahifani boshqarish, foydalanuvchi bilan o'zaro aloqasi va veb-server bilan bog'liq barcha narsani amalga oshirishi mumkin.

Masalan: 

- Sahifaga yangi HTML qo'shish, mavjud tarkibni o'zgartirish, uslublarni o'zgartirish.
- Foydalanuvchining harakatlariga munosabat bildirish, sichqonchani bosish, ko'rsatgich harakatlari, tugmachalarni bosish bilan ishlash.
- Uzoq serverlarga tarmoq orqali so'rov yuboring, fayllarni yuklab olish va yuklash(deb nomlangan [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) va [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) texnologiyalar).
- Cookies-ni olish va o'rnatish, tashrif buyuruvchiga savollar berish, xabarlarni ko'rsatish.
- Mijoz tomonidagi ma'lumotlarni eslab qolish("mahalliy saqlash").

## JavaScript-da brauzerda nima qila olmaysiz?

JavaScript-ning brauzerdagi imkoniyatlari foydalanuvchi xavfsizligi uchun cheklangan. Maqsad yomon veb-sahifaning shaxsiy ma'lumotlarga kirishini yoki foydalanuvchi ma'lumotlariga zarar etkazishini oldini olishdir.

Bunday cheklovlarga quyidagilar kiradi:

<<<<<<< HEAD
- Veb-sahifadagi JavaScript-ni qattiq diskdagi o'zboshimchalik bilan fayllarni o'qish / yozish, ularni nusxalash yoki dasturlarni bajarish mumkin emas. Uning OS tizimi funktsiyalariga to'g'ridan-to'g'ri kirish imkoniyati yo'q.
=======
- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS functions.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Zamonaviy brauzerlar unga fayllar bilan ishlashga imkon beradi, lekin kirish cheklangan va faqat foydalanuvchi brauzer oynasiga faylni "tushirish" yoki uni `<input>` yorlig'i orqali tanlash kabi ba'zi bir amallarni bajargan taqdirdagina taqdim etiladi.

    Kamera / mikrofon va boshqa qurilmalar bilan o'zaro aloqa qilish usullari mavjud, ammo ular foydalanuvchidan aniq ruxsat talab qiladi. Shunday qilib, JavaScript-ni qo'llab-quvvatlaydigan sahifa veb-kamerani yashirincha yoqmasligi, atrofni kuzatishi va ma'lumotni[NSA](https://en.wikipedia.org/wiki/National_Security_Agency) ga yuborishi mumkin emas.
- Turli xil yorliqlar / oynalar odatda bir-birlarini bilishmaydi. Ba'zan ular bilishadi, masalan, bitta oyna ikkinchisini ochish uchun JavaScript-ni ishlatganda. Ammo bu holatda ham bitta sahifadagi JavaScript-ni boshqa saytlarga kirish mumkin emas, agar ular turli saytlardan (boshqa domendan, protokoldan yoki portdan) bo'lsa.

<<<<<<< HEAD
    Bu "Xuddi shu manba siyosati"(Same origin policy) deyiladi. Buning uchun *ikkala sahifa* ma'lumotlar almashinuvi to'g'risida kelishib olishlari va uni boshqaradigan maxsus JavaScript kodini o'z ichiga olishi kerak. Biz buni o'quv qo'llanmasida ko'rib chiqamiz.
=======
    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and contain a special JavaScript code that handles it. We'll cover that in the tutorial.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Ushbu cheklov, yana foydalanuvchi xavfsizligi uchun. Foydalanuvchi ochgan sahifa `http://anysite.com` URL manzili bo'lgan boshqa brauzer yorlig'iga kira olmasligi kerak `http://gmail.com` va u erdan ma'lumotlarni o'g'irlash.
    
- JavaScript joriy sahifa kelgan serverga tarmoq orqali osongina aloqa qilish mumkin. Ammo uning boshqa saytlardan / domenlardan ma'lumotlarni qabul qilish qobiliyati nogiron. Iloji bo'lsa ham, bu uzoqdan aniq kelishuvni (HTTP sarlavhalarida ko'rsatilgan) talab qiladi. Yana bir bor bu xavfsizlikni cheklash.

![](limitations.svg)

Agar JavaScript brauzerdan tashqarida, masalan serverda ishlatilsa, bunday cheklovlar mavjud emas. Zamonaviy brauzerlar kengaytirilgan ruxsat so'rashi mumkin bo'lgan plagin / kengaytmalarga ham imkon beradi.

## JavaScript-ni qaysi xususiyatlari uni noyob qiladi?

JavaScript hech bo'lmaganda *uchta* ajoyib xususiyatga ega:

```solishtiring
+ HTML va CSS bilan to'liq integratsiyasi.
+ Oson ishlar osongina amalga oshiriladi.
+ Barcha asosiy brauzerlar tomonidan qo'llab-quvvatlanadi va ularda standart sifatida yoqilgan.
```
JavaScript - bu uchta narsani birlashtirgan yagona brauzer texnologiyasidir.

Bu JavaScript-ni noyob qiladi. Shuning uchun u brauzer feyslarini yaratishda eng keng tarqalgan vositadir.

<<<<<<< HEAD
Yangi texnologiyani o'rganishni rejalashtirayotib, uning istiqbollarini tekshirish ham muhimdir. Keling, zamonaviy tendentsiyalarga o'taylik.

## JavaScript "ustidan" qo'llanadigan tillar
=======
That said, JavaScript also allows to create servers, mobile applications, etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

JavaScript-ning sintaksisi hammaning ehtiyojlariga mos kelmaydi. Turli odamlar turli xususiyatlarni xohlashadi.

Bu kutilgan hodisa bo'lishi kerak edi, chunki loyihalar va talablar har bir kishi uchun farq qiladi.

Shunday qilib, yaqinda juda ko'p yangi tillar paydo bo'ldi va brauzer ularni ishlatishdan oldin JavaScript-ga aylantirib bajaradi.

Zamonaviy asboblar transpilatsiyani juda tez va shaffof bajaradi, aslida dasturchilar kodni bitta tilda yozganda, ular uni avtomatik tarzda boshqa tilga aylantirish imkonini beradi.

Bunday tillarning namunalari:

- [CoffeeScript] (http://coffeescript.org/) JavaScript uchun "sintaktik shakar" dir. Ushbu til bizga qisqa sintaksisni va aniqroq kodni taqdim etadi. Odatda, Ruby dasurchilari shu tilni afzal ko'rishadi.
- [TypeScript] (http://www.typescriptlang.org/) murakkab tizimlarni ishlab chiqish, soddalashtirish va qo'llab-quvvatlash uchun "strict data typing"ni qo'shishga qaratilgan. Microsoft tomonidan ishlab chiqilgan.
- [Dart] (https://www.dartlang.org/) brauzer bo'lmagan muhitda (mobil ilovalar kabi) ishlaydigan o'z dvigateliga ega bo'lgan mustaqil til. Bu dastlab JavaScript uchun zaxira sifatida Google tomonidan taklif etildi, lekin hozirgi paytda, brauzerlar shu tilni ham JS-ga transpilatsiya bo'lishini talab qilishadi.

<<<<<<< HEAD
Bundan ham ko'proq tillar mavjud. Albatta, biz bu tillardan birini ishlatsak ham, biz nima qilayotganimizni tushunish uchun JavaScript-ni bilishimiz kerak.

## Xulosa

- JavaScript dastlab brauzer tili sifatida yaratilgan, ammo hozirgi paytda ko'pgina boshqa muhitlarda ham qo'llanilmoqda.
- Bugun JavaScript HTML/CSS bilan to'la integratsiyalashgan va eng keng tarqalgan brauzer tili hisoblanadi.
- JavaScript-ga "aylanadigan" va muayyan xususiyatlarni taqdim etadigan ko'plab tillar mavjud. Javascriptni o'zlashtirgandan so'ng kamida qisqacha ularga bir nazar tashlash tavsiya etiladi.
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of transpiled languages, we should also know JavaScript to really understand what we're doing.

## Summary

- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language with full integration in HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
