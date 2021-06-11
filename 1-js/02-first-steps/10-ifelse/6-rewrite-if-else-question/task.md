importance: 5

---

# 'If..else' ni '?' ga qayta yozing

`If` ni bir nechta ternariy operator yordamida `'?'` qayta yozing.

Kod oson o'qilish uchun biz kodning bir nechta satrlarga bo'lisni tavsiya etamiz.

```js
let message;

if (login == 'Xodim') {
  message = 'Salom';
} else if (login == 'Direktor') {
  message = 'Assalomu aleykum';
} else if (login == '') {
  message = "Kirish yo'q";
} else {
  message = '';
}
```
