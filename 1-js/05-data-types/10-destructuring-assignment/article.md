# Destrukturalashtirish

JavaScript-dagi ikkita eng ko'p ishlatiladigan ma'lumotlar tuzilmasi `Object` va `Array`.

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Obyektlar ko'plab ma'lumotlarni bitta obyektga to'plashimizga imkon beradi va massivlar ro'yxatlangan to'plamlarni saqlashga imkon beradi. Shunday qilib, biz obyekt yoki massiv yaratib, uni bitta shaxs sifatida boshqarishimiz yoki uni funktsiya chaqiruviga o'tkazishimiz mumkin.

*Destrukturalashtirish* - bu maxsus sintaksis, bu massivlarni yoki moslamalarni bir dasta o'zgaruvchanga "ochish" imkonini beradi, chunki ba'zida ular qulayroq bo'ladi. Destruktirizatsiya, shuningdek, juda ko'p parametrlarga, standart qiymatlarga ega bo'lgan murakkab funktsiyalar bilan juda yaxshi ishlaydi va tez orada biz ularni qanday ishlashini ko'rib chiqamiz.
=======
- Objects allow us to create a single entity that stores data items by key. 
=======
- Objects allow us to create a single entity that stores data items by key.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
- Arrays allow us to gather data items into an ordered list.

However, when we pass these to a function, we may not need all of it. The function might only require certain elements or properties.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient.

<<<<<<< HEAD
Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
Destructuring also works well with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Massivni destrukturalashtirish

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Qanday qilib massivning o'zgaruvchanga destrukturalashtirishga misol:

```js
// bizda ism va familiya ko'rsatilgan massiv mavjud
let arr = ["Ilya", "Kantor"]

*!*
// destrukturalashtirish
=======
Here's an example of how an array is destructured into variables:

```js
// we have an array with a name and surname
let arr = ["John", "Smith"]

*!*
// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
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
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
````smart header="\"destrukturalashtirish\" degani \ "halokat \" degani emas."
U "destrukturalashtirish" deb nomlanadi, chunki u elementlarni o'zgaruvchanga nusxalash orqali "buzadi". Ammo massivning o'zi o'zgartirilmaydi.
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples, to better understand it.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. But the array itself is not modified.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples to understand it better.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. However, the array itself is not modified.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Yuqoridagi kodda massivning ikkinchi elementi o'tkazib yuboriladi, uchinchisiga `title` beriladi va massivning qolgan qismi ham o'tkazib yuboriladi.
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items is also skipped (as there are no variables for them).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items are also skipped (as there are no variables for them).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
````

````smart header="O'ng tomondagi har qanday ketma-ket saraluvchanlar bilan ishlaydi"

...Darhaqiqat, biz uni faqatgina massivlar bilan emas, balki har qanday ketma-ket saraluvchanlar bilan ishlatishimiz mumkin:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
That works, because internally a destructuring assignment works by iterating over the right value. It's a kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
````smart header="Chap tarafdagi har qanday narsaga tayinlang"

Biz chap tomonda har qanday "tayinlanadigan" narsalardan foydalanishimiz mumkin.
=======
````smart header="Assign to anything at the left-side"
<<<<<<< HEAD
We can use any "assignables" at the left side.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
We can use any "assignables" on the left side.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Masalan, obyekt xususiyati:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
````smart header=".entries() bilan tsiklash"

Oldingi bobda biz [Object.entries(obj)](mdn:js/Object/entries) usulini ko'rdik.
=======
````smart header="Looping with .entries()"
<<<<<<< HEAD
In the previous chapter we saw the [Object.entries(obj)](mdn:js/Object/entries) method.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

Obyektning kalitlari va qiymatlari ustida tsiklash uchun biz uni destrukturalashtiramiz:
=======
In the previous chapter, we saw the [Object.entries(obj)](mdn:js/Object/entries) method.

We can use it with destructuring to loop over the keys-and-values of an object:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let user = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
// kalitlari va qiymatlari ustida tsiklash
=======
// loop over the keys-and-values
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
...Va map obyekti uchun ham xuddi shunday:
=======
The similar code for a `Map` is simpler, as it's iterable:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

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
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
### Qolganlar '...'

Agar biz nafaqat birinchi qiymatlarni olishni, balki quyidagilarni ham yig'ishni istasak -- uchta `"..."` nuqta yordamida "qolganini" oladigan yana bitta parametrni qo'shishimiz mumkin:
=======

````smart header="Swap variables trick"
There's a well-known trick for swapping values of two variables using a destructuring assignment:

```js run
let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.
````

### The rest '...'

Usually, if the array is longer than the list at the left, the "extra" items are omitted.

For example, here only two items are taken, and the rest is just ignored:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

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
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
// "qolganlar" turi massiv ekanligini unutmang.
=======
// rest is array of items, starting from the 3rd one
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
// rest is an array of items, starting from the 3rd one
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
`Rest` qiymati - bu qolgan qator elementlari massivi. Biz "rest" o'rniga boshqa har qanday o'zgaruvchan nomdan foydalanishimiz mumkin, shunchaki uning oldida uchta nuqta borligiga va destrukturalashtirishning oxirgi o'rinda turganiga ishonch hosil qiling.
=======
The value of `rest` is the array of the remaining array elements. 
=======
The value of `rest` is the array of the remaining array elements.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

### Sukut bo'yicha tayinlangan qiymatlar

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Agar massiv qiymatlar kamroq bo'lsa, tayinlashga nisbatan, xato bo'lmaydi. Yo'q qiymatlar `undefined` hisoblanadi:
=======
If the array is shorter than the list of variables at the left, there'll be no errors. Absent values are considered undefined:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
If the array is shorter than the list of variables on the left, there will be no errors. Absent values are considered undefined:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Masalan, biz bu yerda ikkita sukut bo'yicha tayinlangan qiymat uchun `prompt` funktsiyasidan foydalanamiz. Ammo u faqat tayinlanmagan uchun ishlaydi:
=======
For instance, here we use the `prompt` function for two defaults:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

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
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
O'ng tomonda mavjud bo'lgan obyektimiz bor, biz uni o'zgaruvchanlarga bo'lishni xohlaymiz. Chap tomonda tegishli xususiyatlar uchun "shablon" mavjud. Oddiy holatda, bu o'zgaruvchanlar nomlari ro'yxati `{...}`.
=======
We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
We should have an existing object on the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Tegishli o'zgaruvchilarga `options.title`,` options.width` va `options.height` xususiyatlari tayinlaniladi. Tartib muhim emas. Bu ham ishlaydi:

```js
// let{...} da xususiyatlar tartibini o'zgartirdi
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables. 
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

The order does not matter. This works too:

```js
// changed the order in let {...}
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Chap tarafdagi shablon yanada murakkab bo'lishi mumkin va xususiyatlar va o'zgaruvchanlar o'rtasidagi yozishmalarni aniqlaydi.

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Agar o'zgaruvchanga xususiyatni boshqa nom bilan belgilashni xohlasak, masalan, `options.width` `w` deb nomlangan o'zgaruvchanga o'tish uchun, biz uni ikki nuqta yordamida o'rnatishimiz kerak:
=======
If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Quyidagi kod kenglikni so'raydi, lekin nomni emas.
=======
In the code below `prompt` asks for `width`, but not for `title`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
alert(width);  // (prompt natijasi)
=======
alert(width);  // (whatever the result of prompt is)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
### Obyektning qolgan qismi «…» operatori
=======
If we have a complex object with many properties, we can extract only what we need:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// only extract title as a variable
let { title } = options;

alert(title); // Menu
```

### The rest pattern "..."
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

Obyekt biz o'zgaruvchilarga qaraganda ko'proq xususiyatlarga ega bo'lsa-chi? Bir oz olib, keyin "qolganini" biron joyga tayinlashimiz mumkinmi?

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Bu yerda obyektning qolgan qismi operatoridan (uchta nuqta) foydalanish spetsifikatsiyasi deyarli standartga mos keladi, ammo ko'pchilik brauzerlar uni hozircha qo'llab-quvvatlamaydilar.
=======
We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md


````smart header="`let` ga e'tibor bering"
Yuqoridagi misollarda o'zgaruvchanlar tayinlanishdan oldin e'lon qilindi: `let {…} = {…}`. Albatta, biz ham mavjud o'zgaruvchanlardan foydalanishimiz mumkin. Ammo bir hiyla bor.
=======
````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
JavaScript ga bu kod bloki emasligini ko'rsatish uchun biz barcha biriktirishni qavs ichiga o'ralashimiz mumkin `(...)`:
=======
So here JavaScript assumes that we have a code block, that's why there's an error. We want destructuring instead.

To show JavaScript that it's not a code block, we can wrap the expression in parentheses `(...)`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

```js run
let title, width, height;

// endi yaxshi
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Ichki destrukturalashtirish

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Agar obyektda yoki massivda boshqa obyektlar va massivlar bo'lsa, biz chuqurroq qismlarni ajratib olish uchun murakkabroq chap tomon shablonlardan foydalanishimiz mumkin.

Quyidagi kodda `options` `size` xususiyatida yana bir obyekt va `items` xususiyatidagi massiv mavjud. Biriktirishning chap tomonidagi shablon bir xil tuzilishga ega:
=======
If an object or an array contain other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern at the left side of the assignment has the same structure to extract values from them:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
If an object or an array contains other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern on the left side of the assignment has the same structure to extract values from them:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
  extra: true    // biz yo'q qilmaydigan qo'shimcha narsa
};

// aniqlik uchun bir nechta chiziqlar bo'yicha destrukturalashtirish
=======
  extra: true   
=======
  extra: true
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
};

// destructuring assignment split in multiple lines for clarity
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
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
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
`extra` dan tashqari barcha `options` obyekti tegishli o'zgaruvchanlarga tayinlangan.

`size` va `items` ning o'zi buzilmaganligini unutmang.
=======
All properties of `options` object except `extra` that is absent in the left part, are assigned to corresponding variables:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
=======
All properties of `options` object except `extra` which is absent in the left part, are assigned to corresponding variables:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

![](destructuring-complex.svg)

Va nihoyat, biz standart qiymatdan `width`, `height`, `item1`, `item2` va `title` ga egamiz.

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Bu ko'pincha destrukturalashtirish bilan sodir bo'ladi. Bizda juda ko'p xususiyatlarga ega bo'lgan murakkab ob'ekt mavjud va faqat kerakli narsalarni ajratib olishni xohlaymiz.

Hatto bu erda ham shunday bo'ladi:
```js
// butun hajmini o'zgaruvchanga aylantiring, qolgan qismiga e'tibor bermang
let { size } = options;
```
=======
Note that there are no variables for `size` and `items`, as we take their content instead.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

## Smart funktsiya parametrlari

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Funktsiya ko'p parametrlarga ega bo'lishi mumkin bo'lgan vaqtlar mavjud, ularning aksariyati ixtiyoriydir. Bu, ayniqsa, foydalanuvchi interfeyslariga taalluqlidir. Menyu yaratadigan funktsiyani tasavvur qiling. Uning kengligi, balandligi, sarlavhasi, buyumlar ro'yxati va boshqalar bo'lishi mumkin.
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

Bunday funktsiyani yozishning yomon usuli:
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, an item list and so on.

Here's a bad way to write such a function:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Sintaksis destrukturalashtirish bilan bir xil:
=======
The full syntax is the same as for a destructuring assignment:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

<<<<<<< HEAD
<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Iltimos, shuni unutmangki, bunday destrukturalashtirish `showMenu()` ning argumentiga ega. Agar biz barcha qiymatlarni sukut bo'yicha tayinlangan bo'lishini xohlasak, unda bo'sh obyektni ko'rsatishimiz kerak:
=======
Then, for an object of parameters, there will be a variable `varName` for property `incomingProperty`, with `defaultValue` by default.
=======
Then, for an object of parameters, there will be a variable `varName` for the property `incomingProperty`, with `defaultValue` by default.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

```js
showMenu({}); // ok, all values are default

showMenu(); // bu xato 
```

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
Buni butun tuzatish uchun standart qiymatni `{}` qilib belgilashimiz mumkin:


```js run
// ravshanlik uchun biroz soddalashtirilgan parametrlar
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
=======
We can fix this by making `{}` the default value for the whole object of parameters:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Yuqoridagi kodda barcha argumentlar obyekti sukut bo'yicha `{}` dir, shuning uchun har doim destrukturalashtirish kerak bo'lgan narsa bor.

## Xulosa

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
- Destrukturalashtirish obyektni yoki massivni ko'plab o'zgaruvchanlarga zudlik bilan xaritalashga imkon beradi.
- Obyekt sintaksis:
=======
- Destructuring assignment allows for instantly mapping an object or array onto many variables.
- The full object syntax:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    Bu shuni anglatadiki, `prop` xususiyati `varName` o'zgaruvchaniga o'tishi kerak va agar bunday xususiyat bo'lmasa, u holda `default` qiymati ishlatilishi kerak.

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
- Massiv sintaksis:
=======
    Object properties that have no mapping are copied to the `rest` object.

- The full array syntax:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

<<<<<<< HEAD
    Birinchi element `item1` ga o'tadi; ikkinchisi `item2` ga o'tadi, qolganlari esa `rest` massivini yaratadi.
=======
    The first item goes to `item1`; the second goes into `item2`, and all the rest makes the array `rest`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/article.md
- Keyinchalik murakkab holatlar uchun chap tomon o'ng tomoni bilan bir xil tuzilishga ega bo'lishi kerak.
=======
- It's possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/article.md
