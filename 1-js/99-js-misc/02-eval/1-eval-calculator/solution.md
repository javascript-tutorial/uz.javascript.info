Matematik ifodani hisoblash uchun `eval` dan foydalanamiz:

```js demo run
let expr = prompt("Arifmetik amal kiriting?", "2*3+2");

alert(eval(expr));
```

Foydalanuvchi istalgan matn yoki kodni kiritishi mumkin.

Ishlarni xavfsiz qilish va uni faqat arifmetika bilan cheklash uchun biz `ifoda`ni [normal ifoda](maʼlumot:regular-expressions) yordamida tekshirishimiz mumkin, shunda unda faqat raqamlar va operatorlar boʻlishi mumkin.
