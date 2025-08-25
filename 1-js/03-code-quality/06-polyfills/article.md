# Polyfilllar va transpailerlar

JavaScript tili barqaror ravishda rivojlanib boradi. Tilga yangi takliflar muntazam ravishda paydo bo'ladi, ular tahlil qilinadi va agar munosib deb topilsa, <https://tc39.github.io/ecma262/> dagi ro'yxatga qo'shiladi va keyin [spetsifikatsiya](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)ga o'tadi.

JavaScript dvigatellari ortidagi jamoalar birinchi navbatda nimani amalga oshirish haqida o'zlarining g'oyalariga ega. Ular loyiha holatidagi takliflarni amalga oshirishga qaror qilishlari va spetsifikatsiyada allaqachon mavjud bo'lgan narsalarni kechiktirishlari mumkin, chunki ular kamroq qiziqarli yoki shunchaki bajarish qiyinroq.

Shuning uchun dvigatel standartning faqat bir qismini amalga oshirishi odatiy hol.

Til xususiyatlarini qo'llab-quvvatlashning hozirgi holatini ko'rish uchun yaxshi sahifa <https://compat-table.github.io/compat-table/es6/> (u katta, bizda hali o'rganish uchun ko'p narsa bor).

Dasturchilar sifatida biz eng so'nggi xususiyatlardan foydalanishni xohlaymiz. Ko'proq yaxshi narsa - yaxshiroq!

Boshqa tomondan, hali so'nggi xususiyatlarni tushunmaydigan eski dvigatellarda zamonaviy kodimiz qanday ishlashini ta'minlash mumkin?

Buning uchun ikkita vosita mavjud:

1. Transpailerlar.
2. Polyfilllar.

Bu bobda bizning maqsadimiz ularning qanday ishlashini va veb-dasturlashdagi o'rnini tushunishdir.

## Transpailerlar

[Transpailer](https://en.wikipedia.org/wiki/Source-to-source_compiler) - bu manba kodini boshqa manba kodiga tarjima qiladigan maxsus dastur. U zamonaviy kodni tahlil qilishi ("o'qish va tushunish") va uni eski sintaksis konstruksiyalaridan foydalanib qayta yozishi mumkin, shunda u eski dvigatellarda ham ishlaydi.

Masalan, 2020 yilgacha JavaScript-da "nullish coalescing operator" `??` mavjud emas edi. Shunday qilib, agar tashrif buyuruvchi eski brauzerni ishlatsa, u `height = height ?? 100` kabi kodni tushunishda muvaffaqiyatsizlikga uchraydi.

Transpailer bizning kodimizni tahlil qiladi va `height ?? 100` ni `(height !== undefined && height !== null) ? height : 100` ga qayta yozadi.

```js
// transpailer ishga tushirishdan oldin
height = height ?? 100;

// transpailer ishga tushirgandan keyin
height = height !== undefined && height !== null ? height : 100;
```

Endi qayta yozilgan kod eski JavaScript dvigatellari uchun mos keladi.

Odatda, dasturchi transpailer ni o'z kompyuterida ishga tushiradi va keyin transpaile qilingan kodni serverga joylashtiradi.

Nomlar haqida gapiradigan bo'lsak, [Babel](https://babeljs.io) eng mashhur transpailerlardan biridir.

[Webpack](https://webpack.js.org/) kabi zamonaviy loyiha qurilish tizimlari har bir kod o'zgarishida transpailer ni avtomatik ravishda ishga tushirish vositasini taqdim etadi, shuning uchun uni rivojlanish jarayoniga integratsiya qilish juda oson.

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

JavaScript juda dinamik tildir. Skriptlar har qanday funktsiyani, hatto o'rnatilganlarni ham qo'shishi/o'zgartirishi mumkin.

Qiziqarli polyfill kutubxonalaridan biri [core-js](https://github.com/zloirock/core-js) bo'lib, u keng xususiyatlar spektrini qo'llab-quvvatlaydi va faqat kerakli xususiyatlarni qo'shishga imkon beradi.

## Xulosa

Ushbu bobda biz sizni zamonaviy va hatto "eng yangi" til xususiyatlarini o'rganishga undashni xohlaymiz, hatto ular hali JavaScript dvigatellari tomonidan yaxshi qo'llab-quvvatlanmasa ham.

Faqat transpailer (zamonaviy sintaksis yoki operatorlardan foydalansangiz) va polyfilllardan (etishmayotgan funktsiyalarni qo'shish uchun) foydalanishni unutmang. Ular kodning ishlashini ta'minlaydi.

Masalan, keyinroq JavaScript bilan tanishganingizdan keyin, [babel-loader](https://github.com/babel/babel-loader) plagini bilan [webpack](https://webpack.js.org/) asosida kod qurilish tizimini o'rnatishingiz mumkin.

Turli xususiyatlarni qo'llab-quvvatlashning hozirgi holatini ko'rsatadigan yaxshi resurslar:

- <https://compat-table.github.io/compat-table/es6/> - sof JavaScript uchun.
- <https://caniuse.com/> - brauzer bilan bog'liq funktsiyalar uchun.

P.S. Google Chrome odatda til xususiyatlari bilan eng yangilangan, agar o'quv qo'llanmasining demo ishlamasa, uni sinab ko'ring. Ko'pchilik o'quv qo'llanmasi demolari har qanday zamonaviy brauzer bilan ishlaydi.
