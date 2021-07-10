# Naqshlar va bayroqlar

Doimiy ifodalar - bu mag'lubiyatni izlash va almashtirishning kuchli usuli.

JavaScript-da oddiy ifodalar o'rnatilgan `RegExp` klassidagi obyektlar yordamida va satrlar bilan birlashtirilgan.

Iltimos, muntazam ifodalar dasturlash tillarida turlicha bo'lishiga e'tibor bering. Ushbu qo'llanmada biz JavaScript-ni jamlaymiz. Albatta, umumiy jihatlar juda ko'p, ammo ular Perl, Ruby, PHP va boshqalarda bir-biridan farq qiladi.

## Oddiy ifodalar

Oddiy ifoda (shuningdek, "regexp" yoki shunchaki "reg") *naqsh* va ixtiyoriy *bayroqlardan* iborat.

Muntazam ifoda obyektini yaratish uchun ikkita sintaksis mavjud.

Uzoq sintaksis:

```js
regexp = new RegExp("pattern", "flags");
```

...Va `"/"` chiziqlaridan foydalangan holda qisqa:

```js
regexp = /pattern/; // bayroqlar yo'q
regexp = /pattern/gmi; // g, m va i bayroqlari bilan (yaqin orada qoplanadi)
```

Slashes `"/"` biz JavaScript-ga oddiy ifodani yaratayotganimizni aytadi. Ular matnlar uchun qosh-tirnoqlar bilan bir xil rol o'ynaydi.

## Foydalanish

Satr ichidan qidirish uchun [search](mdn:js/String/search) usulidan foydalanishimiz mumkin.

Mana bir misol:

```js run
let str = "I love JavaScript!"; // bu yerda qidiradi

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

`str.search` usuli `pattern:/love/` shablonini qidiradi va satr ichidagi pozitsiyani qaytaradi. Biz taxmin qilganimizdek, `pattern:/love/` bu eng oddiy shablondir. Bu oddiy pastki matn qidiruvi.

Yuqoridagi kod quyidagicha:

```js run
let str = "I love JavaScript!"; // bu yerda qidiradi

let substr = 'love';
alert( str.search(substr) ); // 2
```

Shunday qilib, `pattern:/love/` ni qidirish, `"love"` ni qidirish bilan bir xil.

Ammo bu hozircha. Yaqinda biz ko'proq izlash qobiliyatiga ega bo'lgan yanada murakkab odatiy iboralarni yaratamiz.

```smart header="Colors"
Bu yerdan ranglar sxemasi:

- regexp -- `pattern:red`
- string (where we search) -- `subject:blue`
- result -- `match:green`
```


````smart header="`new RegExp` dan qachon foydalanish kerak?"
Odatda biz `/.../` qisqa sintaksisidan foydalanamiz. Ammo u o'zgaruvchan `${...}` qo'shimchalarini qo'llab-quvvatlamaydi.

Boshqa tomondan, `new RegExp` shablonini dinamik ravishda matndan yaratishga imkon beradi, shuning uchun u yanada moslashuvchan.

Dinamik ravishda ishlab chiqarilgan regexp-ga misol:

```js run
let tag = prompt("Qaysi tegni qidirmoqchisiz?", "h2");
let regexp = new RegExp(`<${tag}>`);

// finds <h2> by default
alert( "<h1> <h2> <h3>".search(regexp));
```
````


## Bayroqlar

Oddiy iboralar qidiruvga ta'sir qiladigan bayroqlarga ega bo'lishi mumkin.

JavaScript-da ulardan faqat 5 tasi mavjud:

`i`
: Ushbu bayroq bilan qidirish katta-registr ahamiyatga ega emas: `A` va `a` o'rtasida farq yo'q (quyidagi misolga qarang).

`g`
: Ushbu bayroq yordamida qidiruv barcha mosliklarni qidiradi, ularsiz - faqat birinchisini (keyingi bobda foydalanilishini ko'rib chiqamiz).

`m`
: Ko'p satrli rejim (<info:regexp-multiline-mode> bobida keltirilgan).

`s`
: "Dotall" rejimi, `.` ga yangi satrlarga mos kelishiga imkon beradi (<info:regexp-character-classes> bobida keltirilgan).

`u`
: Unicode-ni to'liq qo'llab-quvvatlashni yoqadi. Bayroq surrogat juftlarini to'g'ri ishlashiga imkon beradi. Bu haqda <info:regexp-unicode> bo'limida batafsil ma'lumot mavjud.

`y`
: Yopishqoq rejim (<info:regexp-sticky> bobida keltirilgan)

Ushbu bayroqlarning barchasini o'quv qo'llanmasida batafsil ko'rib chiqamiz.

Hozircha eng oddiy bayroq - `i`, mana bu misol:

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/i) ); // 2 (kichik-registrda topilgan)

alert( str.search(/LOVE/) ); // -1 ("i" bayrog'isiz hech narsa topilmadi)
```

Shunday qilib, `i` bayrog'i allaqachon oddiy iboralarni oddiy pastki matnni qidirishdan ko'ra kuchliroq qiladi. Ammo yana ko'p narsalar mavjud. Boshqa bayroqlar va xususiyatlarni keyingi boblarda ko'rib chiqamiz.


## Xulosa

- Oddiy ifoda shablon va ixtiyoriy bayroqlardan iborat: `g`, `i`, `m`, `u`, `s`, `y`.
- Keyinchalik biz o'rganadigan bayroqlar va maxsus belgilarsiz, regexp orqali qidirish pastki matn qidirish bilan bir xil.
- `str.search(regexp)` usuli mos keladigan indeksni qaytaradi yoki mos kelmasa `-1`. Keyingi bobda biz boshqa usullarni ko'rib chiqamiz.
