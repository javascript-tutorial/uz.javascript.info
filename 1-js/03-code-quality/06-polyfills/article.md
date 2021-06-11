
# Polifillar

JavaScript tili doimiy ravishda rivojlanib boradi. Tilga oid yangi takliflar muntazam ravishda paydo bo'lib, ular tahlil qilinadi va agar munosib deb topilsa, <https://tc39.github.io/ecma262/> ro'yxatiga qo'shiladi va keyin [spetsifikatsiya](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ga o'tiladi .

JavaScript interpretatorini ortida turgan jamoalar avval nimani amalga oshirish kerakligi to'g'risida qaror qilishadi. Ular loyihadagi takliflarni amalga oshirishga qaror qilishlari va oldindan aytib o'tilgan narsalarni keyinga qoldirishlari mumkin, chunki ular unchalik qiziq emas yoki ularni bajarish qiyinroq bo'lsa.

Shunday qilib, interpretator uchun standartning faqat bir qismini amalga oshirish odatiy holdir.

Til xususiyatlarini qo'llab-quvvatlashning hozirgi holatini ko'rish uchun yaxshi sahifa <https://kangax.github.io/compat-table/es6/> (bu juda katta, biz hali o'rganadigan ko'p narsalarimiz bor).

## Babel

Tilning zamonaviy xususiyatlaridan foydalansak, ba'zi interpretatorlar bunday kodni qo'llab-quvvatlamasligi mumkin. Yuqorida aytib o'tilganidek, hamma xususiyatlar hamma joyda ham amalga oshirilmaydi.

Bu erda Babel yordamga keladi.

[Babel](https://babeljs.io) - bu [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). U zamonaviy JavaScript kodini avvalgi standartga qayta yozadi.

Aslida, Babel-da ikkita qism mavjud:

1. Birinchidan, kodni qayta yozadigan transpiler dasturi. Dasturchi uni o'z kompyuterida ishlatadi. Kodni eski standartga qayta yozadi. Va keyin kod veb-saytga foydalanuvchilar uchun yetkazib beriladi. [Webpack](http://webpack.github.io/) yoki [brunch](http://brunch.io/) kabi zamonaviy loyiha tuzish tizimi har bir kod o'zgarganda avtomatik ravishda transpilerni ishga tushirish vositasini taqdim etadi, biz tomondan hech qanday vaqt yo'qotilmaydi.

2. Ikkinchidan, polifill.

    Transpiler kodni qayta yozadi, shuning uchun sintaksis xususiyatlari qoplanadi. Ammo yangi funktsiyalar uchun ularni amalga oshiradigan maxsus skript yozishimiz kerak. JavaScript - bu juda dinamik tildir, skriptlar nafaqat yangi funktsiyalarni qo'shibgina qolmay, balki ichki funktsiyalarni ham o'zgartirishi mumkin, shunda ular o'zlarini zamonaviy standartlarga muvofiq tutishadi.

    Bo'shliqni "to'ldiradigan" va skriptlar uchun yetishmayotgan dasturlarni qo'shadigan "polifil" atamasi mavjud.

    Ikkita qiziqarli polifillar:
    - [babel polifil](https://babeljs.io/docs/usage/polyfill/) juda ko'p narsani qo'llab-quvvatlaydi, lekin katta.
    - [polyfill.io](http://polyfill.io) xizmati, bizga kerak bo'lgan xususiyatlarga qarab, talabga binoan polifillalarni yuklash/qurish imkonini beradi.

Shunday qilib, biz zamonaviy funktsiyalarni qo'llab-quvvatlash uchun transpiletorni o'rnatishimiz va eski interpretatorlar uchun polifillni qo'shishimiz kerak.

Agar biz zamonaviy interpretatorga yo'naltirilgan va hamma joyda qo'llab-quvvatlanadigan funktsiyalardan tashqari funktsiyalardan foydalanmasak, unda Babel-dan foydalanishimiz shart emas.

## O'quv qo'llanmasidagi misollar


````online
Ko'pgina misollar joyida ishlaydi, masalan:

```js run
alert('Ishlash uchun yuqori o'ng burchakdagi "Play" tugmasini bosing);
```

Zamonaviy JS dan foydalanadigan misollar faqat sizning brauzeringiz uni qo'llab-quvvatlasa ishlaydi.
````

```offline
Oflayn versiyasini o'qiyotgan bo'sangiz, misollarni ishlatish mumkin emas. Ammo ular odatda ishlaydi :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) barcha misollar uchun yaxshi, ammo boshqa zamonaviy brauzerlar ham yaxshi.

E'tibor bering, ishlab chiqarishda biz Babel-da kodni eskirgan brauzerlarga mos ravishda tarjima qilishimiz mumkin, shuning uchun bunday cheklov bo'lmaydi, kod hamma joyda ishlaydi.
