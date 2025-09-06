# MAC-manzilni tekshiring

Tarmoq interfeysining [Mac-manzili](https://en.wikipedia.org/wiki/MAC_address) ikkita nuqta bilan ajratilgan 6 ta ikki xonali olti burchakli raqamlardan iborat.

Masalan: `subject:'01:32:54:67:89:AB'`.

Satr MAC-manzil ekanligini tekshiradigan regexp yozing.

Foydalanish:

```js
let regexp = /your regexp/;

alert(regexp.test("01:32:54:67:89:AB")); // true

alert(regexp.test("0132546789AB")); // false (ikki nuqta yo'q)

alert(regexp.test("01:32:54:67:89")); // false (5 ta raqam, 6 ta kerak)

alert(regexp.test("01:32:54:67:89:ZZ")); // false (ZZ oxirida)
```
