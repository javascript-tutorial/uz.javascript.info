Biz `#` dan keyin 6 o'n oltilik belgini izlashimiz kerak.

O‘n oltilik belgini `pattern:[0-9a-fA-F]` deb ta’riflash mumkin. Yoki `pattern:i` bayrog'idan foydalansak, shunchaki `pattern:[0-9a-f]`.

Keyin `pattern:{6}` kvantifikatori yordamida ulardan 6 tasini izlashimiz mumkin.

Natijada, bizda regexp mavjud: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2";

alert(str.match(regexp)); // #121212,#AA00ef
```

Muammo shundaki, u rangni uzunroq ketma-ketlikda topadi:

```js run
alert("#12345678".match(/#[a-f0-9]{6}/gi)); // #123456
```

Buni tuzatish uchun oxiriga `pattern:\b` qo'shishimiz mumkin:

```js run
// rang
alert("#123456".match(/#[a-f0-9]{6}\b/gi)); // #123456

// rang emas
alert("#12345678".match(/#[a-f0-9]{6}\b/gi)); // null
```
