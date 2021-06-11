# Destrukturalashtirish

JavaScript-dagi ikkita eng ko'p ishlatiladigan ma'lumotlar tuzilmasi `Object` va `Array`.

Obyektlar ko'plab ma'lumotlarni bitta obyektga to'plashimizga imkon beradi va massivlar ro'yxatlangan to'plamlarni saqlashga imkon beradi. Shunday qilib, biz obyekt yoki massiv yaratib, uni bitta shaxs sifatida boshqarishimiz yoki uni funktsiya chaqiruviga o'tkazishimiz mumkin.

*Destrukturalashtirish* - bu maxsus sintaksis, bu massivlarni yoki moslamalarni bir dasta o'zgaruvchanga "ochish" imkonini beradi, chunki ba'zida ular qulayroq bo'ladi. Destruktirizatsiya, shuningdek, juda ko'p parametrlarga, standart qiymatlarga ega bo'lgan murakkab funktsiyalar bilan juda yaxshi ishlaydi va tez orada biz ularni qanday ishlashini ko'rib chiqamiz.

## Massivni destrukturalashtirish

Qanday qilib massivning o'zgaruvchanga destrukturalashtirishga misol:

```js
// bizda ism va familiya ko'rsatilgan massiv mavjud
let arr = ["Ilya", "Kantor"]

*!*
// destrukturalashtirish
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

Endi biz massiv a'zolari o'rniga o'zgaruvchanlar bilan ishlashimiz mumkin.

Bu `split` yoki massivni qaytaradigan boshqa usullari bilan birlashganda juda yaxshi ko'rinadi:

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"destrukturalashtirish\" degani \ "halokat \" degani emas."
U "destrukturalashtirish" deb nomlanadi, chunki u elementlarni o'zgaruvchanga nusxalash orqali "buzadi". Ammo massivning o'zi o'zgartirilmaydi.

Bu shunchaki yozishning qisqa usuli:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Vergul yordamida elementlarga e'tibor bermang"
Massivning keraksiz elementlari qo'shimcha vergul orqali ham tashlanishi mumkin:

```js run
*!*
// ikkinchi element kerak emas
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

Yuqoridagi kodda massivning ikkinchi elementi o'tkazib yuboriladi, uchinchisiga `title` beriladi va massivning qolgan qismi ham o'tkazib yuboriladi.
````

````smart header="O'ng tomondagi har qanday ketma-ket saraluvchanlar bilan ishlaydi"

...Darhaqiqat, biz uni faqatgina massivlar bilan emas, balki har qanday ketma-ket saraluvchanlar bilan ishlatishimiz mumkin:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="Chap tarafdagi har qanday narsaga tayinlang"

Biz chap tomonda har qanday "tayinlanadigan" narsalardan foydalanishimiz mumkin.

Masalan, obyekt xususiyati:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header=".entries() bilan tsiklash"

Oldingi bobda biz [Object.entries(obj)](mdn:js/Object/entries) usulini ko'rdik.

Obyektning kalitlari va qiymatlari ustida tsiklash uchun biz uni destrukturalashtiramiz:

```js run
let user = {
  name: "John",
  age: 30
};

// kalitlari va qiymatlari ustida tsiklash
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

...Va map obyekti uchun ham xuddi shunday:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user.entries()) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````
### Qolganlar '...'

Agar biz nafaqat birinchi qiymatlarni olishni, balki quyidagilarni ham yig'ishni istasak -- uchta `"..."` nuqta yordamida "qolganini" oladigan yana bitta parametrni qo'shishimiz mumkin:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// "qolganlar" turi massiv ekanligini unutmang.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`Rest` qiymati - bu qolgan qator elementlari massivi. Biz "rest" o'rniga boshqa har qanday o'zgaruvchan nomdan foydalanishimiz mumkin, shunchaki uning oldida uchta nuqta borligiga va destrukturalashtirishning oxirgi o'rinda turganiga ishonch hosil qiling.

### Sukut bo'yicha tayinlangan qiymatlar

Agar massiv qiymatlar kamroq bo'lsa, tayinlashga nisbatan, xato bo'lmaydi. Yo'q qiymatlar `undefined` hisoblanadi:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Agar yetishmayotgan qiymatni "sukut bo'yicha tayinlangan" qiymat bilan almashtirishni xohlasak, uni `=` yordamida ta'minlashimiz mumkin:

```js run
*!*
// sukut bo'yicha tayinlangan qiymatlar
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (massivdan)
alert(surname); // Anonymous (sukut bo'yicha tayinlangan)
```

Sukut bo'yicha tayinlangan qiymatlar murakkab ifodalar yoki hatto funktsiya chaqiruvlari bo'lishi mumkin. Ular faqat qiymat berilmagan taqdirda baholanadi.

Masalan, biz bu yerda ikkita sukut bo'yicha tayinlangan qiymat uchun `prompt` funktsiyasidan foydalanamiz. Ammo u faqat tayinlanmagan uchun ishlaydi:

```js run
// faqat familiyani uchun bajariladi
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (massivdan)
alert(surname); // prompt natijasi
```



## Obyektni destrukturalashtirish

Destrukturalashtirish obyektlar bilan ham ishlaydi.

Asosiy sintaksis:

```js
let {var1, var2} = {var1:…, var2…}
```

O'ng tomonda mavjud bo'lgan obyektimiz bor, biz uni o'zgaruvchanlarga bo'lishni xohlaymiz. Chap tomonda tegishli xususiyatlar uchun "shablon" mavjud. Oddiy holatda, bu o'zgaruvchanlar nomlari ro'yxati `{...}`.

Masalan:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Tegishli o'zgaruvchilarga `options.title`,` options.width` va `options.height` xususiyatlari tayinlaniladi. Tartib muhim emas. Bu ham ishlaydi:

```js
// let{...} da xususiyatlar tartibini o'zgartirdi
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Chap tarafdagi shablon yanada murakkab bo'lishi mumkin va xususiyatlar va o'zgaruvchanlar o'rtasidagi yozishmalarni aniqlaydi.

Agar o'zgaruvchanga xususiyatni boshqa nom bilan belgilashni xohlasak, masalan, `options.width` `w` deb nomlangan o'zgaruvchanga o'tish uchun, biz uni ikki nuqta yordamida o'rnatishimiz kerak:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Ikki nuqta "nima : qaerga borishini" ko'rsatadi. Yuqoridagi misolda, `width` `w` o'zgaruvchanlarda saqlanadi , `height` `h` saqlanadi, va `title` bir xil nom o'zgaruvchanga tayinlangan.

Potentsial yetishmayotgan xususiyatlar uchun biz sukut bo'yicha tayinlangan qiymatlarni `"="` yordamida o'rnatamiz, masalan:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Massivlar yoki funktsiya parametrlari singari, sukut bo'yicha tayinlangan qiymatlar har qanday ifodalar va hatto funktsiya chaqiruvlari bo'lishi mumkin. Agar qiymat berilmagan bo'lsa, ular baholanadi.

Quyidagi kod kenglikni so'raydi, lekin nomni emas.

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (prompt natijasi)
```

Shuningdek, biz ikki nuqtani va tenglikni birlashtira olamiz:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

### Obyektning qolgan qismi «…» operatori

Obyekt biz o'zgaruvchilarga qaraganda ko'proq xususiyatlarga ega bo'lsa-chi? Bir oz olib, keyin "qolganini" biron joyga tayinlashimiz mumkinmi?

Bu yerda obyektning qolgan qismi operatoridan (uchta nuqta) foydalanish spetsifikatsiyasi deyarli standartga mos keladi, ammo ko'pchilik brauzerlar uni hozircha qo'llab-quvvatlamaydilar.

Bunga o'xshaydi:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```



````smart header="`let` ga e'tibor bering"
Yuqoridagi misollarda o'zgaruvchanlar tayinlanishdan oldin e'lon qilindi: `let {…} = {…}`. Albatta, biz ham mavjud o'zgaruvchanlardan foydalanishimiz mumkin. Ammo bir hiyla bor.

Bu ishlamaydi:
```js run
let title, width, height;

// bu satrda xato mavjud
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Muammo shundaki, JavaScript asosiy kod oqimida (boshqa ifoda ichida emas) `{...}` ni kod bloki sifatida ko'rib chiqadi. Bunday kod bloklari quyidagicha xususiyatlarni guruhlash uchun ishlatilishi mumkin:

```js run
{
  // kod bloki
  let message = "Salom";
  // ...
  alert( message );
}
```

JavaScript ga bu kod bloki emasligini ko'rsatish uchun biz barcha biriktirishni qavs ichiga o'ralashimiz mumkin `(...)`:

```js run
let title, width, height;

// endi yaxshi
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```

````

## Ichki destrukturalashtirish

Agar obyektda yoki massivda boshqa obyektlar va massivlar bo'lsa, biz chuqurroq qismlarni ajratib olish uchun murakkabroq chap tomon shablonlardan foydalanishimiz mumkin.

Quyidagi kodda `options` `size` xususiyatida yana bir obyekt va `items` xususiyatidagi massiv mavjud. Biriktirishning chap tomonidagi shablon bir xil tuzilishga ega:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    // biz yo'q qilmaydigan qo'shimcha narsa
};

// aniqlik uchun bir nechta chiziqlar bo'yicha destrukturalashtirish
let {
  size: { // hajmini bu yerga qo'ying
    width,
    height
  },
  items: [item1, item2], // itemslarni bu yerda tayinlang
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

`extra` dan tashqari barcha `options` obyekti tegishli o'zgaruvchanlarga tayinlangan.

`size` va `items` ning o'zi buzilmaganligini unutmang.

![](destructuring-complex.svg)

Va nihoyat, biz standart qiymatdan `width`, `height`, `item1`, `item2` va `title` ga egamiz.

Bu ko'pincha destrukturalashtirish bilan sodir bo'ladi. Bizda juda ko'p xususiyatlarga ega bo'lgan murakkab ob'ekt mavjud va faqat kerakli narsalarni ajratib olishni xohlaymiz.

Hatto bu erda ham shunday bo'ladi:
```js
// butun hajmini o'zgaruvchanga aylantiring, qolgan qismiga e'tibor bermang
let { size } = options;
```

## Smart funktsiya parametrlari

Funktsiya ko'p parametrlarga ega bo'lishi mumkin bo'lgan vaqtlar mavjud, ularning aksariyati ixtiyoriydir. Bu, ayniqsa, foydalanuvchi interfeyslariga taalluqlidir. Menyu yaratadigan funktsiyani tasavvur qiling. Uning kengligi, balandligi, sarlavhasi, buyumlar ro'yxati va boshqalar bo'lishi mumkin.

Bunday funktsiyani yozishning yomon usuli:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

In real-life, the problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.

Like this?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Bu xunuk. Va ko'proq parametrlar bilan shug'ullanganimizda o'qilmaydi.

Destrukturalashtirish yordamga keladi!

Biz parametrlarni obyekt sifatida o'tkaza olamiz va funktsiya ularni darhol o'zgaruvchanga aylantiradi:

```js run
// biz obyektni funktsiyaga o'tkazamiz
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...va darhol uni o'zgaruvchanlarga kengaytiradi
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – argumentdan olingan
  // width, height – sukut bo'yicha tayinlangan
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Ichki obyektlar va ikki nuqta xaritalari yordamida biz yanada murakkab destrukturalashtirishdan foydalanishimiz mumkin:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // buyumlar birinchi element 1-item, ikkinchidan 2-itemga o'tadi
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Sintaksis destrukturalashtirish bilan bir xil:
```js
function({
  incomingProperty: parameterName = defaultValue
  ...
})
```

Iltimos, shuni unutmangki, bunday destrukturalashtirish `showMenu()` ning argumentiga ega. Agar biz barcha qiymatlarni sukut bo'yicha tayinlangan bo'lishini xohlasak, unda bo'sh obyektni ko'rsatishimiz kerak:

```js
showMenu({});


showMenu(); // bu xato 
```

Buni butun tuzatish uchun standart qiymatni `{}` qilib belgilashimiz mumkin:


```js run
// ravshanlik uchun biroz soddalashtirilgan parametrlar
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Yuqoridagi kodda barcha argumentlar obyekti sukut bo'yicha `{}` dir, shuning uchun har doim destrukturalashtirish kerak bo'lgan narsa bor.

## Xulosa

- Destrukturalashtirish obyektni yoki massivni ko'plab o'zgaruvchanlarga zudlik bilan xaritalashga imkon beradi.
- Obyekt sintaksis:
    ```js
    let {prop : varName = default, ...} = object
    ```

    Bu shuni anglatadiki, `prop` xususiyati `varName` o'zgaruvchaniga o'tishi kerak va agar bunday xususiyat bo'lmasa, u holda `default` qiymati ishlatilishi kerak.

- Massiv sintaksis:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    Birinchi element `item1` ga o'tadi; ikkinchisi `item2` ga o'tadi, qolganlari esa `rest` massivini yaratadi.

- Keyinchalik murakkab holatlar uchun chap tomon o'ng tomoni bilan bir xil tuzilishga ega bo'lishi kerak.
