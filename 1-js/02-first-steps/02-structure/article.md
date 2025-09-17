# Kod tuzilishi

Birinchi navbatda biz kodning asosiy qurilish bloklarini o'rganamiz.

## Bayonotlar

Bayonotlar - bu amallarni bajaradigan sintaksis konstruktsiyalar va buyruqlardir.

Biz allaqachon `alert('Salom, dunyo!')` bayonotini ko'rdik, u "Salom, dunyo!" xabarini ko'rsatadi.

Kodimizda istalgancha ko'p bayonotlarga ega bo'lishimiz mumkin. Bayonotlar nuqta-vergul bilan ajratilishi mumkin.

Masalan, bu yerda biz "Salom dunyo"ni ikkita alert ga bo'lamiz:

```js run no-beautify
alert('Salom'); alert('Dunyo');
```

Odatda, bayonotlar alohida satrlarda yoziladi, bu kodni o'qishni osonlashtiradi:

```js run no-beautify
alert('Salom');
alert('Dunyo');
```

## Nuqta-vergullar [#semicolon]

Satr tanaffusi mavjud bo'lgan holatlarda nuqta-vergulni tashlab qoldirish mumkin.

Bu ham ishlaydi:

```js run no-beautify
alert('Salom')
alert('Dunyo')
```

Bu yerda JavaScript satr tanaffusini "yashirin" nuqta-vergul sifatida talqin qiladi. Bu [avtomatik nuqta-vergul qo'yish](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) deb ataladi.

**Ko'p hollarda yangi satr nuqta-vergulni bildiradi. Ammo "ko'p hollarda" degani "har doim" degani emas!**

Yangi satr nuqta-vergulni bildirmaydigan holatlar mavjud. Masalan:

```js run no-beautify
alert(3 +
1
+ 2);
```

Kod `6` ni chiqaradi, chunki JavaScript bu yerda nuqta-vergul qo'ymaydi. Agar satr plyus `"+"` bilan tugasa, u "to'liq bo'lmagan ifoda" ekanligini intuitiv ravishda tushunish mumkin, shuning uchun bu yerda nuqta-vergul noto'g'ri bo'ladi. Va bu holda, bu mo'ljallangandek ishlaydi.

**Ammo JavaScript haqiqatan ham kerak bo'lgan joyda nuqta-vergulni "taxmin qila olmaydigan" vaziyatlar mavjud.**

Bunday hollarda yuzaga keladigan xatolarni topish va tuzatish juda qiyin.

````smart header="Xato misoli"
Agar siz bunday xatoning aniq misolini ko'rishni istasangiz, ushbu kodni tekshiring:

```js run
alert("Salom");

[1, 2].forEach(alert);
```

Hozircha `[]` qavslar va `forEach` ning ma'nosini o'ylashga hojat yo'q. Biz ularni keyinroq o'rganamiz. Hozircha faqat kodni ishga tushirish natijasini eslab qoling: u `Salom`, keyin `1`, keyin `2` ni ko'rsatadi.

Endi `alert` dan keyingi nuqta-vergulni olib tashlaylik:

```js run no-beautify
alert("Salom")

[1, 2].forEach(alert);
```

Yuqoridagi koddan farq faqat bitta belgida: birinchi satr oxiridagi nuqta-vergul yo'qoldi.

Agar biz ushbu kodni ishga tushirsak, faqat birinchi `Salom` ko'rsatiladi (va xato bor, uni ko'rish uchun konsolni ochishingiz kerak bo'lishi mumkin). Endi raqamlar yo'q.

Buning sababi shundaki, JavaScript kvadrat qavslar `[...]` oldida nuqta-vergulni taxmin qilmaydi. Shunday qilib, oxirgi misoldagi kod bitta bayonot sifatida qabul qilinadi.

Mana dvigatel uni qanday ko'radi:

```js run no-beautify
alert("Salom")[1, 2].forEach(alert);
```

G'alati ko'rinadi, to'g'rimi? Bu holda bunday birlashtirish noto'g'ri. Kod to'g'ri ishlashi uchun `alert` dan keyin nuqta-vergul qo'yishimiz kerak.

Bu boshqa vaziyatlarda ham sodir bo'lishi mumkin.
````

Biz yangi satrlar bilan ajratilgan bo'lsa ham, bayonotlar orasiga nuqta-vergul qo'yishni tavsiya qilamiz. Bu qoida jamiyat tomonidan keng qabul qilingan. Yana bir bor ta'kidlaymiz -- nuqta-vergullarni ko'p vaqt tashlab qoldirish *mumkin*. Ammo ularni ishlatish xavfsizroq -- ayniqsa yangi boshlovchilar uchun.

## Izohlar [#code-comments]

Vaqt o'tishi bilan dasturlar tobora murakkablashib boradi. Kod nima qilishi va nima uchun qilishini tavsiflovchi *izohlar* qo'shish zarur bo'ladi.

Izohlarni skriptning istalgan joyiga qo'yish mumkin. Ular uning bajarilishiga ta'sir qilmaydi, chunki dvigatel ularni shunchaki e'tiborsiz qoldiradi.

**Bir satrli izohlar ikki marta oldinga yo'nalgan chiziq belgilari `//` bilan boshlanadi.**

Satrning qolgan qismi izoh hisoblanadi. U butun satrni egallashi yoki bayonotdan keyin kelishi mumkin.

Masalan:
```js run
// Bu izoh o'z satrini egallaydi
alert('Salom');

alert('Dunyo'); // Bu izoh bayonotdan keyin keladi
```

**Ko'p satrli izohlar oldinga yo'nalgan chiziq va yulduzcha <code>/&#42;</code> bilan boshlanadi va yulduzcha va oldinga yo'nalgan chiziq <code>&#42;/</code> bilan tugaydi.**

Masalan:

```js run
/* Ikki xabar bilan misol.
Bu ko'p satrli izoh.
*/
alert('Salom');
alert('Dunyo');
```

Izohlar mazmuni e'tiborga olinmaydi, shuning uchun agar biz <code>/&#42; ... &#42;/</code> ichiga kod qo'ysak, u bajarilmaydi.

Ba'zida kodning bir qismini vaqtincha o'chirib qo'yish foydali bo'lishi mumkin:

```js run
/* Kodni izohga aylantirish
alert('Salom');
*/
alert('Dunyo');
```

```smart header="Tez tugmalardan foydalaning!"
Ko'pgina muharrirlarda kod satrini `key:Ctrl+/` tez tugmasi bilan bir satrli izohga aylantirish mumkin va `key:Ctrl+Shift+/` kabi tugma -- ko'p satrli izohlar uchun (kod qismini tanlang va tez tugmani bosing). Mac uchun `key:Ctrl` o'rniga `key:Cmd` va `key:Shift` o'rniga `key:Option` dan foydalanib ko'ring.
```

````warn header="Ichki izohlar qo'llab-quvvatlanmaydi!"
Boshqa `/*...*/` ichida `/*...*/` bo'lishi mumkin emas.

Bunday kod xato bilan to'xtaydi:

```js run no-beautify
/*
  /* ichki izoh ?!? */
*/
alert( 'Dunyo' );
```
````

Iltimos, kodingizga izoh qo'yishdan tortinmang.

Izohlar kodning umumiy hajmini oshiradi, ammo bu umuman muammo emas. Kodni ishlab chiqarish serveriga nashr etishdan oldin kichiklashtiruvchi ko'plab vositalar mavjud. Ular izohlarni olib tashlaydi, shuning uchun ular ishlaydigan skriptlarda ko'rinmaydi. Shuning uchun izohlar ishlab chiqarishga umuman salbiy ta'sir qilmaydi.

Keyinchalik o'quv qo'llanmada yaxshiroq izohlar qanday yozish haqida ham tushuntiruvchi <info:code-quality> bobi bo'ladi.