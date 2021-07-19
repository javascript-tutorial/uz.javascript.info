# JavaScript-ga kirish


Keling, JavaScript-da nima muhimligini, u bilan nimaga erisha olishimizni va qanday boshqa texnologiyalar bilan ushbu til yaxshi qo'llanilishini ko'rib chiqaylik.

## JavaScript bu nima?


*JavaScript* dastlab *"veb-sahifalarni jonlantirish"* uchun yaratilgan edi.

Ushbu tilda dasturlar *skript* deb nomlanadi. Ular veb-sahifani HTML-da yozilishi mumkin va sahifa brauzer tomonidan yuklanganidan keyin ular avtomatik ravishda amalga oshiriladi.

Skriptlar oddiy matn sifatida taqdim etiladi va amalga oshiriladi. Ularni ishga tushirish uchun maxsus tayyorgarlik yoki kompilatsiya kerak emas.

Shu jihatdan, JavaScript [Java] (https://en.wikipedia.org/wiki/Java_(programming_language)) tilidan juda farq qiladi.


```smart header="Nega <u>Java</u>Script?"
JavaScript yaratilganda, u dastlab "LiveScript" nomi bilan taqdim etilgan edi. Ammo Java o'sha paytlarda juda mashhur edi, shuning uchun Java tilining "ukasi" sifatida yangi tilni taqdim etish g'oyasi JS mashhur bo'lishga yordam beradi deb hisoblangan .

Ammo, rivojlanish jarayonida, JavaScript [ECMAScript] (http://en.wikipedia.org/wiki/ECMAScript) deb ataladigan o'z xususiyatiga ega to'liq mustaqil tilga aylangan va hozirda Java tiliga hech qanday aloqasi yo'q.
```

Bugungi kunda JavaScript nafaqat brauzerda, balki serverda yoki aslida [JavaScript interpretatori](https://en.wikipedia.org/wiki/JavaScript_engine) deb nomlangan maxsus dasturga ega bo'lgan har qanday qurilmada ham bajarilishi mumkin.

Brauzerlar o'z JavaScript interpretatorlariga ega, ular gohida "JavaScript virtual mashinasi" deb atalanadi.

Har bir intetptretatorni o'z nomi mavjud. Masalan:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome va Opera brauzerlarida qo'llanadi.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- Firefox brauzerida.
- ...net Explorer brauerning turli xil versiyalari uchun "Trident" va "Chakra", Microsoft Edge uchun "ChakraCore", Safari uchun "Nitro" va "SquirrelFish" va boshqalar kabi boshqa kod nomlari mavjud.


Yuqoridagi atamalarni eslab qolish yaxshi, chunki ular netdagi ishlab chiquvchilar maqolalarida qo'llaniladi. Biz ulardan ham foydalanamiz. Masalan, agar "X funktsiyasini V8 qo'llab-quvvatlasa", ehtimol u Chrome va Opera-da ishlaydi.

```smart header="Intetptretatorlar ishni qanday bajarishadi?"

Intetptretatorlar murakkab. Ammo asoslari oson.

1. Intetptretator (agar u brauzer bo'lsa, avtomatik o'rnatilgan) skriptni o'qiydi ("tahlil qiladi").
2. Keyin u skriptni mashina tiliga o'zgartiradi ("kompilyatsiya qiladi").
3. Va keyin mashina kodi juda tez ishlaydi.

Interpretatatsiya jarayonning har bir bosqichida optimallashtirishlarni qo'llaydi. U hattoki kompilyatsiya qilingan skriptni ishlayotganda kuzatib boradi, u orqali oqib o'tadigan ma'lumotlarni tahlil qiladi va shu bilimga asoslangan holda mashina kodiga optimallashtirishlarni qo'llaydi. Tugatgandan so'ng, skriptlar juda tez ishlaydi.


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

- Veb-sahifadagi JavaScript-ni qattiq diskdagi o'zboshimchalik bilan fayllarni o'qish / yozish, ularni nusxalash yoki dasturlarni bajarish mumkin emas. Uning OS tizimi funktsiyalariga to'g'ridan-to'g'ri kirish imkoniyati yo'q.

    Zamonaviy brauzerlar unga fayllar bilan ishlashga imkon beradi, lekin kirish cheklangan va faqat foydalanuvchi brauzer oynasiga faylni "tushirish" yoki uni `<input>` yorlig'i orqali tanlash kabi ba'zi bir amallarni bajargan taqdirdagina taqdim etiladi.

    Kamera / mikrofon va boshqa qurilmalar bilan o'zaro aloqa qilish usullari mavjud, ammo ular foydalanuvchidan aniq ruxsat talab qiladi. Shunday qilib, JavaScript-ni qo'llab-quvvatlaydigan sahifa veb-kamerani yashirincha yoqmasligi, atrofni kuzatishi va ma'lumotni[NSA](https://en.wikipedia.org/wiki/National_Security_Agency) ga yuborishi mumkin emas.
- Turli xil yorliqlar / oynalar odatda bir-birlarini bilishmaydi. Ba'zan ular bilishadi, masalan, bitta oyna ikkinchisini ochish uchun JavaScript-ni ishlatganda. Ammo bu holatda ham bitta sahifadagi JavaScript-ni boshqa saytlarga kirish mumkin emas, agar ular turli saytlardan (boshqa domendan, protokoldan yoki portdan) bo'lsa.


    Bu "Xuddi shu manba siyosati"(Same origin policy) deyiladi. Buning uchun *ikkala sahifa* ma'lumotlar almashinuvi to'g'risida kelishib olishlari va uni boshqaradigan maxsus JavaScript kodini o'z ichiga olishi kerak. Biz buni o'quv qo'llanmasida ko'rib chiqamiz.


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
