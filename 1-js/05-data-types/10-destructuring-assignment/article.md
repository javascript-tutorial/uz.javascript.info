# Destrukturalashtirish

JavaScript-dagi ikkita eng ko'p ishlatiladigan ma'lumotlar tuzilmasi `Object` va `Array`.

<<<<<<< HEAD
Obyektlar ko'plab ma'lumotlarni bitta obyektga to'plashimizga imkon beradi va massivlar ro'yxatlangan to'plamlarni saqlashga imkon beradi. Shunday qilib, biz obyekt yoki massiv yaratib, uni bitta shaxs sifatida boshqarishimiz yoki uni funktsiya chaqiruviga o'tkazishimiz mumkin.

*Destrukturalashtirish* - bu maxsus sintaksis, bu massivlarni yoki moslamalarni bir dasta o'zgaruvchanga "ochish" imkonini beradi, chunki ba'zida ular qulayroq bo'ladi. Destruktirizatsiya, shuningdek, juda ko'p parametrlarga, standart qiymatlarga ega bo'lgan murakkab funktsiyalar bilan juda yaxshi ishlaydi va tez orada biz ularni qanday ishlashini ko'rib chiqamiz.

## Massivni destrukturalashtirish

Qanday qilib massivning o'zgaruvchanga destrukturalashtirishga misol:

```js
// bizda ism va familiya ko'rsatilgan massiv mavjud
let arr = ["Ilya", "Kantor"]
=======
- Objects allow us to create a single entity that stores data items by key.
- Arrays allow us to gather data items into an ordered list.

However, when we pass these to a function, we may not need all of it. The function might only require certain elements or properties.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient.

Destructuring also works well with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.

## Array destructuring

Here's an example of how an array is destructured into variables:

```js
// we have an array with a name and surname
let arr = ["John", "Smith"]
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

*!*
// destrukturalashtirish
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Endi biz massiv a'zolari o'rniga o'zgaruvchanlar bilan ishlashimiz mumkin.

Bu `split` yoki massivni qaytaradigan boshqa usullari bilan birlashganda juda yaxshi ko'rinadi:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

<<<<<<< HEAD
````smart header="\"destrukturalashtirish\" degani \ "halokat \" degani emas."
U "destrukturalashtirish" deb nomlanadi, chunki u elementlarni o'zgaruvchanga nusxalash orqali "buzadi". Ammo massivning o'zi o'zgartirilmaydi.

Bu shunchaki yozishning qisqa usuli:
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples to understand it better.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. However, the array itself is not modified.

It's just a shorter way to write:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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

<<<<<<< HEAD
Yuqoridagi kodda massivning ikkinchi elementi o'tkazib yuboriladi, uchinchisiga `title` beriladi va massivning qolgan qismi ham o'tkazib yuboriladi.
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items are also skipped (as there are no variables for them).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
````

````smart header="O'ng tomondagi har qanday ketma-ket saraluvchanlar bilan ishlaydi"

...Darhaqiqat, biz uni faqatgina massivlar bilan emas, balki har qanday ketma-ket saraluvchanlar bilan ishlatishimiz mumkin:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
That works, because internally a destructuring assignment works by iterating over the right value. It's a kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


<<<<<<< HEAD
````smart header="Chap tarafdagi har qanday narsaga tayinlang"
=======
````smart header="Assign to anything on the left-side"
We can use any "assignables" on the left side.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Biz chap tomonda har qanday "tayinlanadigan" narsalardan foydalanishimiz mumkin.

Masalan, obyekt xususiyati:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

<<<<<<< HEAD
````smart header=".entries() bilan tsiklash"

Oldingi bobda biz [Object.entries(obj)](mdn:js/Object/entries) usulini ko'rdik.

Obyektning kalitlari va qiymatlari ustida tsiklash uchun biz uni destrukturalashtiramiz:
=======
````smart header="Looping with .entries()"
In the previous chapter, we saw the [Object.entries(obj)](mdn:js/Object/entries) method.

We can use it with destructuring to loop over the keys-and-values of an object:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
let user = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
// kalitlari va qiymatlari ustida tsiklash
=======
// loop over the keys-and-values
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````
### Qolganlar '...'

Agar biz nafaqat birinchi qiymatlarni olishni, balki quyidagilarni ham yig'ishni istasak -- uchta `"..."` nuqta yordamida "qolganini" oladigan yana bitta parametrni qo'shishimiz mumkin:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Further items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
<<<<<<< HEAD
// "qolganlar" turi massiv ekanligini unutmang.
=======
// rest is an array of items, starting from the 3rd one
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
`Rest` qiymati - bu qolgan qator elementlari massivi. Biz "rest" o'rniga boshqa har qanday o'zgaruvchan nomdan foydalanishimiz mumkin, shunchaki uning oldida uchta nuqta borligiga va destrukturalashtirishning oxirgi o'rinda turganiga ishonch hosil qiling.
=======
The value of `rest` is the array of the remaining array elements.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### Sukut bo'yicha tayinlangan qiymatlar

<<<<<<< HEAD
Agar massiv qiymatlar kamroq bo'lsa, tayinlashga nisbatan, xato bo'lmaydi. Yo'q qiymatlar `undefined` hisoblanadi:
=======
```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```

### Default values

If the array is shorter than the list of variables on the left, there will be no errors. Absent values are considered undefined:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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

Please note: the `prompt` will run only for the missing value (`surname`).

## Obyektni destrukturalashtirish

Destrukturalashtirish obyektlar bilan ham ishlaydi.

Asosiy sintaksis:

```js
let {var1, var2} = {var1:…, var2:…}
```

<<<<<<< HEAD
O'ng tomonda mavjud bo'lgan obyektimiz bor, biz uni o'zgaruvchanlarga bo'lishni xohlaymiz. Chap tomonda tegishli xususiyatlar uchun "shablon" mavjud. Oddiy holatda, bu o'zgaruvchanlar nomlari ro'yxati `{...}`.
=======
We should have an existing object on the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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

<<<<<<< HEAD
Tegishli o'zgaruvchilarga `options.title`,` options.width` va `options.height` xususiyatlari tayinlaniladi. Tartib muhim emas. Bu ham ishlaydi:
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables.

The order does not matter. This works too:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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
// title = property named title
// rest = object with the rest of properties
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

<<<<<<< HEAD
Agar obyektda yoki massivda boshqa obyektlar va massivlar bo'lsa, biz chuqurroq qismlarni ajratib olish uchun murakkabroq chap tomon shablonlardan foydalanishimiz mumkin.

Quyidagi kodda `options` `size` xususiyatida yana bir obyekt va `items` xususiyatidagi massiv mavjud. Biriktirishning chap tomonidagi shablon bir xil tuzilishga ega:
=======
If an object or an array contains other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern on the left side of the assignment has the same structure to extract values from them:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
<<<<<<< HEAD
  extra: true    // biz yo'q qilmaydigan qo'shimcha narsa
=======
  extra: true
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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

<<<<<<< HEAD
`extra` dan tashqari barcha `options` obyekti tegishli o'zgaruvchanlarga tayinlangan.

`size` va `items` ning o'zi buzilmaganligini unutmang.
=======
All properties of `options` object except `extra` which is absent in the left part, are assigned to corresponding variables:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

![](destructuring-complex.svg)

Va nihoyat, biz standart qiymatdan `width`, `height`, `item1`, `item2` va `title` ga egamiz.

Bu ko'pincha destrukturalashtirish bilan sodir bo'ladi. Bizda juda ko'p xususiyatlarga ega bo'lgan murakkab ob'ekt mavjud va faqat kerakli narsalarni ajratib olishni xohlaymiz.

Hatto bu erda ham shunday bo'ladi:
```js
// butun hajmini o'zgaruvchanga aylantiring, qolgan qismiga e'tibor bermang
let { size } = options;
```

<<<<<<< HEAD
## Smart funktsiya parametrlari

Funktsiya ko'p parametrlarga ega bo'lishi mumkin bo'lgan vaqtlar mavjud, ularning aksariyati ixtiyoriydir. Bu, ayniqsa, foydalanuvchi interfeyslariga taalluqlidir. Menyu yaratadigan funktsiyani tasavvur qiling. Uning kengligi, balandligi, sarlavhasi, buyumlar ro'yxati va boshqalar bo'lishi mumkin.

Bunday funktsiyani yozishning yomon usuli:
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, an item list and so on.

Here's a bad way to write such a function:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

In real-life, the problem is how to remember the order of arguments. Usually, IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.

Like this?

```js
// undefined where default values are fine
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
  incomingProperty: varName = defaultValue
  ...
})
```

<<<<<<< HEAD
Iltimos, shuni unutmangki, bunday destrukturalashtirish `showMenu()` ning argumentiga ega. Agar biz barcha qiymatlarni sukut bo'yicha tayinlangan bo'lishini xohlasak, unda bo'sh obyektni ko'rsatishimiz kerak:
=======
Then, for an object of parameters, there will be a variable `varName` for the property `incomingProperty`, with `defaultValue` by default.

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
showMenu({}); // ok, all values are default

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
    let {prop : varName = defaultValue, ...rest} = object
    ```

    Bu shuni anglatadiki, `prop` xususiyati `varName` o'zgaruvchaniga o'tishi kerak va agar bunday xususiyat bo'lmasa, u holda `default` qiymati ishlatilishi kerak.

- Massiv sintaksis:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

<<<<<<< HEAD
    Birinchi element `item1` ga o'tadi; ikkinchisi `item2` ga o'tadi, qolganlari esa `rest` massivini yaratadi.
=======
    The first item goes to `item1`; the second goes into `item2`, and all the rest makes the array `rest`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

- Keyinchalik murakkab holatlar uchun chap tomon o'ng tomoni bilan bir xil tuzilishga ega bo'lishi kerak.
