# To'liq tegni toping

`<style...>` tegini topish uchun regexp yozing. U toʻliq tegga mos kelishi kerak: unda `<style>` atributlari boʻlmasligi yoki ularning bir nechtasi `<style type="..." id="...">` boʻlishi mumkin.

...Lekin regexp `<styler>` bilan mos kelmasligi kerak!

Masala:

```js
let regexp = /sizning regexp/g;

alert('<style> <styler> <style test="...">'.match(regexp)); // <style>, <style test="...">
```
