`new Date` konstruktori mahalliy vaqt zonasidan foydalanadi. Shuning uchun eslab qolish kerak bo'lgan yagona muhim narsa - oylar noldan boshlanadi.

Demak, Fevral oyining raqami 1 ga teng.

Mana sana komponentlari sifatida raqamlar bilan misol:

```js run
//new Date(yil, oy, kun, soat, daqiqa, soniya, millisoniya)
let d1 = new Date(2012, 1, 20, 3, 12);
alert(d1);
```

Shuningdek, biz satrdan sana yaratishimiz mumkin, masalan:

```js run
//new Date(sana_satri)
let d2 = new Date("February 20, 2012 03:12:00");
alert(d2);
```
