# HTML teglarni topish

Barcha (ochish va yopish) HTML teglarini ularning atributlari bilan topish uchun muntazam ifoda yarating.

Foydalanish misoli:

```js run
let regexp = /sizning regexpiyingiz/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert(str.match(regexp)); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Bu erda biz teg atributlarida `<` va `>` (qo'shtirnoq ichida ham) bo'lmasligi mumkin, deb taxmin qilamiz, bu esa ishlarni biroz soddalashtiradi.
