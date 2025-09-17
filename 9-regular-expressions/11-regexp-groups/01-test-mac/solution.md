Ikki xonali olti burchakli raqam `pattern:[0-9a-f]{2}` (`pattern:i` bayroqchasi o`rnatilgan bo`lsa).

Bizga bu raqam `NN` kerak, keyin esa 5 marta takrorlangan `:NN` (ko`proq raqamlar);

Regexp: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Keling, o'yin barcha matnni qamrab olishi kerakligini ko'rsatamiz: boshidan boshlanadi va oxirida tugaydi. Bu naqshni `pattern:^...$` ga o'rash orqali amalga oshiriladi.

Nihoyat:

```js run
let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert(regexp.test("01:32:54:67:89:AB")); // true

alert(regexp.test("0132546789AB")); // false (ikki nuqta yo'q)

alert(regexp.test("01:32:54:67:89")); // false (5 ta raqam, 6 ta kerak)

alert(regexp.test("01:32:54:67:89:ZZ")); // false (ZZ oxirida)
```
