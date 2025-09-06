# Orbital balandlikdan

Ushbu bo'lim "web komponentlar" uchun zamonaviy standartlar to'plamini tasvirlaydi.

Hozircha bu standartlar ishlab chiqilmoqda. Ba'zi xususiyatlar yaxshi qo'llab-quvvatlanadi va zamonaviy HTML/DOM standartiga integratsiya qilingan, boshqalari esa hali loyiha bosqichida. Misollarni har qanday brauzerda sinab ko'rishingiz mumkin, Google Chrome bu xususiyatlar bilan eng yangi hisoblanadi. Ehtimol, buning sababi Google xodimlari ko'plab tegishli spetsifikatsiyalar ortida turishidir.

## Ular orasida nima umumiy...

Butun komponent g'oyasi yangi emas. U ko'plab framework'larda va boshqa joylarda ishlatiladi.

Amalga oshirish tafsilotlariga o'tishdan oldin, insoniyatning ushbu buyuk yutuqiga qarang:

![](satellite.jpg)

Bu Xalqaro Kosmik Stansiya (ISS).

Va bu uning ichida qanday yasalganini ko'rsatadi (taxminan):

![](satellite-expanded.jpg)

Xalqaro Kosmik Stansiya:
- Ko'plab komponentlardan iborat.
- Har bir komponent, o'z navbatida, ichida ko'plab kichikroq tafsilotlarga ega.
- Komponentlar juda murakkab, ko'pgina veb-saytlardan ancha murakkab.
- Komponentlar xalqaro miqyosda, turli mamlakatlardan, turli tilarda gaplashadigan jamoalar tomonidan ishlab chiqilgan.

...Va bu narsa uchadi, odamlarni kosmosda tirik saqlaydi!

Bunday murakkab qurilmalar qanday yaratiladi?

Bizning ishlab chiqishimizni bir xil darajada ishonchli va kengaytiriladigan qilish uchun qaysi prinsiplarni qarz olishimiz mumkin? Yoki hech bo'lmaganda unga yaqin.

## Komponent arxitekturasi

Murakkab dasturiy ta'minotni ishlab chiqish uchun taniqli qoida: murakkab dasturiy ta'minot yasama.

Agar biror narsa murakkab bo'lib qolsa -- uni oddiyroq qismlarga bo'ling va eng aniq usulda ulang.

**Yaxshi arxitektor - murakkabni oddiy qila oladigan kimsadir.**

Biz foydalanuvchi interfeysini vizual komponentlarga bo'lishimiz mumkin: ularning har biri sahifada o'z o'rniga ega, yaxshi tasvirlangan vazifani "bajarishi" mumkin va boshqalardan alohida.

Keling, veb-saytga qaraylik, masalan Twitter.

U tabiiy ravishda komponentlarga bo'linadi:

![](web-components-twitter.svg)

1. Yuqori navigatsiya.
2. Foydalanuvchi ma'lumotlari.
3. Kuzatish takliflari.
4. Yuborish formasi.
5. (shuningdek, 6, 7) -- xabarlar.

Komponentlar pastki komponentlarga ega bo'lishi mumkin, masalan xabarlar yuqori darajadagi "xabarlar ro'yxati" komponentining qismlari bo'lishi mumkin. Bosiladigan foydalanuvchi rasmi o'zi komponent bo'lishi mumkin va hokazo.

Qanday qilib nima komponent ekanligini hal qilamiz? Bu intuitsiya, tajriba va sog'lom fikrdan keladi. Odatda bu alohida vizual obyekt bo'lib, biz uni nima qilishi va sahifa bilan qanday o'zaro ta'sir qilishi nuqtai nazaridan tasvirlay olamiz. Yuqoridagi holatda sahifada bloklar bor, ularning har biri o'z rolini o'ynaydi, bu komponentlarni yaratish mantiqiy.

Komponent quyidagilarga ega:
- O'zining JavaScript klassi.
- DOM tuzilmasi, faqat o'z klassi tomonidan boshqariladi, tashqi kod unga kirmaydi ("inkapsulyatsiya" printsipi).
- CSS uslublari, komponentga qo'llaniladi.
- API: hodisalar, klass metodlari va boshqalar, boshqa komponentlar bilan o'zaro ta'sir qilish uchun.

Yana bir bor, butun "komponent" narsasi maxsus emas.

Ularni qurish uchun ko'plab framework'lar va ishlab chiqish metodologiyalari mavjud, har biri o'zining qo'ng'iroqlari va hushtak-hushtak bilan. Odatda "komponent hissi"ni ta'minlash uchun maxsus CSS klasslari va konventsiyalardan foydalaniladi -- CSS ko'lami va DOM inkapsulyatsiyasi.

"Web komponentlar" buning uchun o'rnatilgan brauzer imkoniyatlarini taqdim etadi, shuning uchun endi ularni taqlid qilishimiz shart emas.

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- maxsus HTML elementlarini aniqlash uchun.
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) -- komponent uchun ichki DOM yaratish uchun, boshqalardan yashirilgan.
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) -- faqat komponentning Shadow DOM ichida qo'llaniladigan uslublarni e'lon qilish uchun.
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) va boshqa kichik narsalar maxsus komponentlarni ishlab chiqishga yaxshiroq moslashish uchun.

Keyingi bobda biz "Custom Elements"ning tafsilotlariga kiramiz -- web komponentlarning asosiy va yaxshi qo'llab-quvvatlanadigan xususiyati, o'z-o'zidan yaxshi.