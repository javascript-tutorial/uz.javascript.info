Naqsh boshlanishi aniq: `pattern:<style`.

Lekin biz shunchaki `pattern:<style.*?>` yoza olmaymiz, chunki `match:<styler>` unga mos keladi.

Bizga `match:<style`dan keyin bo'sh joy, so'ngra ixtiyoriy ravishda boshqa narsa yoki `match:>` tugashi kerak.

Regexp tilida: `pattern:<style(>|\s.*?>)`.

Amalda:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert('<style> <styler> <style test="...">'.match(regexp)); // <style>, <style test="...">
```
