# Ibtidoiylardagi usullar

JavaScript bizga ibtidoiylar (matnlar, raqamlar va boshqalar) bilan xuddi obyektlar kabi ishlashga imkon beradi.

Ular, shuningdek, chaqirish qilish usullarini taqdim etadilar. Biz ularni yaqinda o'rganib chiqamiz, lekin avval uning qanday ishlashini bilib olamiz, chunki, albatta, ibtidoiylar obyekt emas (va bu yerda biz buni yanada aniqroq qilamiz).

Keling, ibtidoiylar va obyektlar o'rtasidagi asosiy farqlarni ko'rib chiqaylik.

Ibtidoiylar

- Ibtidoiy turdagi qiymatdir.
- 6 ta ibtidoiy tur mavjud: `string`, `number`, `boolean`, `symbol`, `null` va `undefined`.

Obyektlar

- Bir nechta qiymatlarni xususiyat sifatida saqlashga qodir.
- `{}` bilan yaratilishi mumkin, masalan: `{name:" John ", age: 30}`. JavaScript-da boshqa turdagi obyektlar mavjud; funktsiyalar, masalan, obyektlardir.

Obyektlarning eng yaxshi tomonlaridan biri shundaki, biz funktsiyani uning xususiyatlaridan biri sifatida saqlashimiz mumkin.

```js run
let john = {
  name: "John",
  sayHi: function () {
    alert("Salom do'stim!");
  },
};

john.sayHi(); // Salom do'stim!
```

Shunday qilib, biz `sayHi` usuli bilan `john` obyektini yaratdik.

Ko'pgina tilning ichida o'rnatilgan obyektlar allaqachon mavjud, masalan, sanalar, xatolar, HTML elementlar va boshqalar bilan ishlaydi, ular turli xil xususiyatlarga va usullarga ega.

Biroq, bu imkoniyatlarning salbiy tomoni bor!

Obyektlar ibtidoiylarga qaraganda "og'irroq". Ular ichki texnikani qo'llab-quvvatlash uchun qo'shimcha manbalarni talab qiladi. Ammo xususiyatlar va usullar dasturlashda juda foydali bo'lganligi sababli, JavaScript interpretatori qo'shimcha yukni kamaytirish uchun ularni optimallashtirishga harakat qiladi.

## Obyekt sifatida ibtidoiy

JavaScript-ni yaratuvchisi duch kelgan paradoks:

- Matn yoki raqam kabi ibtidoiylar bilan ishlashni istagan juda ko'p narsa bor. Agar ular bilan usullar orqali ishlashimiz mumkin bo'lsa, bu ajoyib bo'lar edi.
- Ibtidoiylar imkon qadar tez va yengil bo'lishi kerak.

Yechim biroz noqulay ko'rinadi, ammo bu yerda:

1. Ibtidoiylar hali ham ibtidoiy. Istalgandak, bitta qiymat.
2. Til matnlar, raqamlar, mantiqiy turdagi qiymatlar va belgilarning usullari va xususiyatlariga kirishga imkon beradi.
3. Bu sodir bo'lganda, qo'shimcha funktsiyalarni ta'minlaydigan maxsus "o'ralish-obyekti" yaratiladi va keyin yo'q qilinadi.

"O'ralish-obyekti" har bir ibtidoiy tur uchun har xil va ular quyidagicha nomlanadi: `String`, `Number`, `Boolean` va `Symbol`. Shunday qilib, ular turli xil usullar to'plamini taqdim etadilar.

Masalan, [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) usuli mavjud , bu tepa registr matni qaytaradi.

Bu shunday ishlaydi:

```js run
let str = "Salom";

alert(str.toUpperCase()); // SALOM
```

Oddiy, to'g'rimi? Mana aslida nima `str.toUpperCase()` da sodir bo'ladi:

1. `str` matni bu ibtidoiy. Shunday qilib, uning xususiyatiga kirish vaqtida matn qiymatini biladigan va `toUpperCase()` kabi foydali usullarga ega bo'lgan maxsus obyekt yaratiladi..
2. Ushbu usul ishlaydi va yangi matni qaytaradi (`alert` tomonidan qaytarilgan).
3. `str` ibtidoiy yolg'iz qoldirib, maxsus obyekt yo'q qilinadi.

Shunday qilib, ibtidoiylar usullarni ta'minlashi mumkin, ammo ular hali ham yengil bo'lib qolmoqda.

JavaScript interpretatori ushbu jarayonni yuqori darajada optimallashtiradi. Hatto qo'shimcha obyektni yaratishni umuman o'tkazib yuborishi mumkin. Ammo u hali ham spetsifikatsiyaga rioya qilishi va obyektni yaratganday tutishi kerak.

Raqamning o'ziga xos usullari mavjud, masalan, [toFixed (n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) raqamni berilgan aniqlikka yaxlitlaydi

```js run
let n = 1.23456;

alert(n.toFixed(2)); // 1.23
```

<Info:number> va <info:string> boblarida ko'proq usullarni ko'rib chiqamiz.

````warn header="`String/Number/Boolean`konstruktorlari faqat ichki foydalanish uchun mo'ljallangan"
Java kabi ba'zi tillar`new Number(1)`yoki`new Boolean(false)` kabi sintaksis yordamida ibtidoiylar uchun "o'ralish-obyektini" yaratishga imkon beradi.

JavaScript-da, bu tarixiy sabablarga ko'ra mumkin, ammo juda **tavsiya etilmaydi**. Bir nechta joylarda ishlar chalkashib ketadi.

Masalan:

```js run
alert(typeof 0); // "number"

alert(typeof new Number(0)); // "object"!
```

Va bundan keyin `zero` obyekt bo'lganligi sababli ogohlantirish paydo bo'ladi:

```js run
let zero = new Number(0);

if (zero) {
  // zero bu true, chunki u obyekt
  alert("nol - bu to'g'rimi?!?");
}
```

Boshqa tomondan, xuddi shu `String/Number/Boolean` funktsiyalaridan `new` dan foydalanish umuman foydali narsadir. Ular qiymatni tegishli turga o'zgartiradilar: matnga, raqamga yoki mantiqiy qiymatga(ibtidoiy).

Misol uchun, quyidagi butunlay joizdir:

```js
let num = Number("123"); // matni raqamga aylantirish
```

`````


````warn header="null/undefined usullarga ega emas"
`null` va `undefined` ning maxsus ibtidoylari istisnolardir. Ularda tegishli "o'ralish-obyektlari" yo'q va ular hech qanday usulga ega emas. Bir ma'noda, ular "eng ibtidoiy".

Bunday qiymat xususiyatiga kirishga urinish xatoga yo'l qo'yadi:

```js run
alert(null.test); // xato
`````

## Xulosa

- `null` va `undefined` dan tashqari ibtidoiylar ko'plab foydali usullarni taqdim etadi. Kelgusi boblarda ularni o'rganamiz.
- Rasmiy ravishda, bu usullar vaqtinchalik obyektlar bilan ishlaydi, lekin JavaScript interpretatori bu jarayonni juda yaxshi optimallashtiradi, shuning uchun ularning chaqiruvi juda ko'p resurslarni talab qilmaydi.
