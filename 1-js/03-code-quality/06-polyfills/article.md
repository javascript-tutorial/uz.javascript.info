# Polyfilllar va transpailerlar

JavaScript tili barqaror ravishda rivojlanib boradi. Tilga yangi takliflar muntazam ravishda paydo bo'ladi, ular tahlil qilinadi va agar munosib deb topilsa, <https://tc39.github.io/ecma262/> dagi ro'yxatga qo'shiladi va keyin [spetsifikatsiya](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)ga o'tadi.

<<<<<<< HEAD
JavaScript dvigatellari ortidagi jamoalar birinchi navbatda nimani amalga oshirish haqida o'zlarining g'oyalariga ega. Ular loyiha holatidagi takliflarni amalga oshirishga qaror qilishlari va spetsifikatsiyada allaqachon mavjud bo'lgan narsalarni kechiktirishlari mumkin, chunki ular kamroq qiziqarli yoki shunchaki bajarish qiyinroq.
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Shuning uchun dvigatel standartning faqat bir qismini amalga oshirishi odatiy hol.

<<<<<<< HEAD
Til xususiyatlarini qo'llab-quvvatlashning hozirgi holatini ko'rish uchun yaxshi sahifa <https://compat-table.github.io/compat-table/es6/> (u katta, bizda hali o'rganish uchun ko'p narsa bor).

Dasturchilar sifatida biz eng so'nggi xususiyatlardan foydalanishni xohlaymiz. Ko'proq yaxshi narsa - yaxshiroq!
=======
So it's quite common for an engine to implement only part of the standard.

A good page to see the current state of support for language features is <https://compat-table.github.io/compat-table/es6/> (it's big, we have a lot to study yet).
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Boshqa tomondan, hali so'nggi xususiyatlarni tushunmaydigan eski dvigatellarda zamonaviy kodimiz qanday ishlashini ta'minlash mumkin?

Buning uchun ikkita vosita mavjud:

1. Transpailerlar.
2. Polyfilllar.

Bu bobda bizning maqsadimiz ularning qanday ishlashini va veb-dasturlashdagi o'rnini tushunishdir.

## Transpailerlar

[Transpailer](https://en.wikipedia.org/wiki/Source-to-source_compiler) - bu manba kodini boshqa manba kodiga tarjima qiladigan maxsus dastur. U zamonaviy kodni tahlil qilishi ("o'qish va tushunish") va uni eski sintaksis konstruksiyalaridan foydalanib qayta yozishi mumkin, shunda u eski dvigatellarda ham ishlaydi.

<<<<<<< HEAD
Masalan, 2020 yilgacha JavaScript-da "nullish coalescing operator" `??` mavjud emas edi. Shunday qilib, agar tashrif buyuruvchi eski brauzerni ishlatsa, u `height = height ?? 100` kabi kodni tushunishda muvaffaqiyatsizlikga uchraydi.
=======
A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Transpailer bizning kodimizni tahlil qiladi va `height ?? 100` ni `(height !== undefined && height !== null) ? height : 100` ga qayta yozadi.

```js
// transpailer ishga tushirishdan oldin
height = height ?? 100;

// transpailer ishga tushirgandan keyin
height = height !== undefined && height !== null ? height : 100;
```

Endi qayta yozilgan kod eski JavaScript dvigatellari uchun mos keladi.

Odatda, dasturchi transpailer ni o'z kompyuterida ishga tushiradi va keyin transpaile qilingan kodni serverga joylashtiradi.

<<<<<<< HEAD
Nomlar haqida gapiradigan bo'lsak, [Babel](https://babeljs.io) eng mashhur transpailerlardan biridir.

[Webpack](https://webpack.js.org/) kabi zamonaviy loyiha qurilish tizimlari har bir kod o'zgarishida transpailer ni avtomatik ravishda ishga tushirish vositasini taqdim etadi, shuning uchun uni rivojlanish jarayoniga integratsiya qilish juda oson.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

## Polyfilllar

Yangi til xususiyatlari nafaqat sintaksis konstruksiyalari va operatorlarni, balki o'rnatilgan funktsiyalarni ham o'z ichiga olishi mumkin.

Masalan, `Math.trunc(n)` - bu raqamning kasr qismini "kesib tashlaydigan" funktsiya, masalan `Math.trunc(1.23)` `1` ni qaytaradi.

Ba'zi (juda eski) JavaScript dvigatellarida `Math.trunc` yo'q, shuning uchun bunday kod muvaffaqiyatsizlikka uchraydi.

Biz sintaksis o'zgarishlari emas, balki yangi funktsiyalar haqida gapirayotganimiz uchun, bu yerda hech narsani transpaile qilish shart emas. Biz faqat etishmayotgan funktsiyani e'lon qilishimiz kerak.

Yangi funktsiyalarni yangilaydigan/qo'shadigan skript "polyfill" deb ataladi. U "bo'shliqni to'ldiradi" va etishmayotgan implementatsiyalarni qo'shadi.

Ushbu maxsus holat uchun `Math.trunc` polyfilli uni amalga oshiradigan skript:

```js
if (!Math.trunc) {
  // agar bunday funktsiya yo'q bo'lsa
  // uni amalga oshiring
  Math.trunc = function (number) {
    // Math.ceil va Math.floor hatto qadimgi JavaScript dvigatellarida ham mavjud
    // ular o'quv qo'llanmasida keyinroq yoritilgan
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
JavaScript juda dinamik tildir. Skriptlar har qanday funktsiyani, hatto o'rnatilganlarni ham qo'shishi/o'zgartirishi mumkin.

Qiziqarli polyfill kutubxonalaridan biri [core-js](https://github.com/zloirock/core-js) bo'lib, u keng xususiyatlar spektrini qo'llab-quvvatlaydi va faqat kerakli xususiyatlarni qo'shishga imkon beradi.

## Xulosa
=======
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

One interesting polyfill library is [core-js](https://github.com/zloirock/core-js), which supports a wide range of features and allows you to include only the ones you need.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Ushbu bobda biz sizni zamonaviy va hatto "eng yangi" til xususiyatlarini o'rganishga undashni xohlaymiz, hatto ular hali JavaScript dvigatellari tomonidan yaxshi qo'llab-quvvatlanmasa ham.

Faqat transpailer (zamonaviy sintaksis yoki operatorlardan foydalansangiz) va polyfilllardan (etishmayotgan funktsiyalarni qo'shish uchun) foydalanishni unutmang. Ular kodning ishlashini ta'minlaydi.

<<<<<<< HEAD
Masalan, keyinroq JavaScript bilan tanishganingizdan keyin, [babel-loader](https://github.com/babel/babel-loader) plagini bilan [webpack](https://webpack.js.org/) asosida kod qurilish tizimini o'rnatishingiz mumkin.

Turli xususiyatlarni qo'llab-quvvatlashning hozirgi holatini ko'rsatadigan yaxshi resurslar:

- <https://compat-table.github.io/compat-table/es6/> - sof JavaScript uchun.
- <https://caniuse.com/> - brauzer bilan bog'liq funktsiyalar uchun.
=======
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://compat-table.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

P.S. Google Chrome odatda til xususiyatlari bilan eng yangilangan, agar o'quv qo'llanmasining demo ishlamasa, uni sinab ko'ring. Ko'pchilik o'quv qo'llanmasi demolari har qanday zamonaviy brauzer bilan ishlaydi.
