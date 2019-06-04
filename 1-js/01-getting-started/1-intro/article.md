# JavaScript-ga kirish

Keling, JavaScript-da nima muhimligini, u bilan nimaga erisha olishimizni va qanday boshqa texnologiyalar bilan ushbu til yaxshi qo'llanilishini ko'rib chiqaylik.

## JavaScript bu nima?

*JavaScript* dastlab *"veb-sahifalarni jonlantirish"* uchun yaratilgan edi.

<<<<<<< HEAD
Ushbu tilda dasturlar *skript* deb nomlanadi. Ular veb-sahifani HTML-da yozilishi mumkin va sahifa brauzer tomonidan yuklanganidan keyin ular avtomatik ravishda amalga oshiriladi.
=======
The programs in this language are called *scripts*. They can be written right in a web page's HTML and run automatically as the page loads.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Skriptlar oddiy matn sifatida taqdim etiladi va amalga oshiriladi. Ularni ishga tushirish uchun maxsus tayyorgarlik yoki kompilatsiya kerak emas.

Shu jihatdan, JavaScript [Java] (https://en.wikipedia.org/wiki/Java_(programming_language)) tilidan juda farq qiladi.

```smart header="Nega <u>Java</u>Script?"
JavaScript yaratilganda, u dastlab "LiveScript" nomi bilan taqdim etilgan edi. Ammo Java o'sha paytlarda juda mashhur edi, shuning uchun Java tilining "ukasi" sifatida yangi tilni taqdim etish g'oyasi JS mashhur bo'lishga yordam beradi deb hisoblangan .

Ammo, rivojlanish jarayonida, JavaScript [ECMAScript] (http://en.wikipedia.org/wiki/ECMAScript) deb ataladigan o'z xususiyatiga ega to'liq mustaqil tilga aylangan va hozirda Java tiliga hech qanday aloqasi yo'q.
```

Bugungi kunda JavaScript nafaqat brauzerda, balki serverda yoki aslida [JavaScript interpretatori](https://en.wikipedia.org/wiki/JavaScript_engine) deb nomlangan maxsus dasturga ega bo'lgan har qanday qurilmada ham bajarilishi mumkin.

Brauzerlar o'z JavaScript interpretatorlariga ega, ular gohida "JavaScript virtual mashinasi" deb atalanadi.

Har bir interpretatorni o'z nomi mavjud. Masalan:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome va Opera brauzerlarida qo'llanadi.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- Firefox brauzerida.
- ...There are other codenames like "Trident" and "Chakra" for different versions of IE, "ChakraCore" for Microsoft Edge, "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome and Opera.

```smart header="Interpretatorlar ishni qanday bajarishadi?"

Engines are complicated. But the basics are easy.

1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to the machine language.
3. And then the machine code runs, pretty fast.

The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and applies optimizations to the machine code based on that knowledge. When it's done, scripts run quite fast.
```

## What can in-browser JavaScript do? Brauzerdagi JavaScript nimani bajara oladi?

Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it.

JavaScript's capabilities greatly depend on the environment it's running in. For instance, [Node.js](https://wikipedia.org/wiki/Node.js) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.

In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the webserver.

Masalan: 

- Add new HTML to the page, change the existing content, modify styles.
- React to user actions, run on mouse clicks, pointer movements, key presses.
- Send requests over the network to remote servers, download and upload files (so-called [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) and [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) technologies).
- Get and set cookies, ask questions to the visitor, show messages.
- Remember the data on the client-side ("local storage").

## What CAN'T in-browser JavaScript do?

JavaScript's abilities in the browser are limited for the sake of the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS system functions.

    Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

    There are ways to interact with camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and contain a special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.png)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugin/extensions which may ask for extended permissions.

## JavaScript-ni qaysi xususiyatlari uni noyob qiladi?

JavaScript hech bo'lmaganda *uchta* ajoyib xususiyatga ega:

```solishtiring
+ HTML/CSS bilan to'liq integratsiyasi.
+ Oson ishlar osongina amalga oshiriladi.
+ Barcha asosiy brauzerlar tomonidan qo'llab-quvvatlanadi va ularda sukut bo'yicha yoqilgan.
```
JavaScript - bu uchta narsani birlashtirgan yagona brauzer texnologiyasidir.

Bu JavaScript-ni noyob qiladi. Shuning uchun u brauzer interfeyslarini yaratishda eng keng tarqalgan vositadir.

Yangi texnologiyani o'rganishni rejalashtirayotib, uning istiqbollarini tekshirish ham muhimdir. Keling, zamonaviy tendentsiyalarga o'taylik.

## JavaScript "ustidan" qo'llanadigan tillar

JavaScript-ning sintaksisi hammaning ehtiyojlariga mos kelmaydi. Turli odamlar turli xususiyatlarni xohlashadi.

Bu kutilgan hodisa bo'lishi kerak edi, chunki loyihalar va talablar har bir kishi uchun farq qiladi.

Shunday qilib, yaqinda juda ko'p yangi tillar paydo bo'ldi va brauzer ularni ishlatishdan oldin JavaScript-ga aylantirib bajaradi.

Zamonaviy asboblar transpilatsiyani juda tez va shaffof bajaradi, aslida dasturchilar kodni bitta tilda yozganda, ular uni avtomatik tarzda boshqa tilga aylantirish imkonini beradi.

Bunday tillarning namunalari:

- [CoffeeScript] (http://coffeescript.org/) JavaScript uchun "sintaktik shakar" dir. Ushbu til bizga qisqa sintaksisni va aniqroq kodni taqdim etadi. Odatda, Ruby dasurchilari shu tilni afzal ko'rishadi.
- [TypeScript] (http://www.typescriptlang.org/) murakkab tizimlarni ishlab chiqish, soddalashtirish va qo'llab-quvvatlash uchun "strict data typing"ni qo'shishga qaratilgan. Microsoft tomonidan ishlab chiqilgan.
- [Dart] (https://www.dartlang.org/) brauzer bo'lmagan muhitda (mobil ilovalar kabi) ishlaydigan o'z dvigateliga ega bo'lgan mustaqil til. Bu dastlab JavaScript uchun zaxira sifatida Google tomonidan taklif etildi, lekin hozirgi paytda, brauzerlar shu tilni ham JS-ga transpilatsiya bo'lishini talab qilishadi.

Bundan ham ko'proq tillar mavjud. Albatta, biz bu tillardan birini ishlatsak ham, biz nima qilayotganimizni tushunish uchun JavaScript-ni bilishimiz kerak.

## Xulosa

- JavaScript dastlab brauzer tili sifatida yaratilgan, ammo hozirgi paytda ko'pgina boshqa muhitlarda ham qo'llanilmoqda.
- Bugun JavaScript HTML/CSS bilan to'la integratsiyalashgan va eng keng tarqalgan brauzer tili hisoblanadi.
- JavaScript-ga "aylanadigan" va muayyan xususiyatlarni taqdim etadigan ko'plab tillar mavjud. Javascriptni o'zlashtirgandan so'ng kamida qisqacha ularga bir nazar tashlash tavsiya etiladi.
