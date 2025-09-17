muhimlik: 5

---

# "Switch" ni "if" ga qayta yozing

Kodni quyidagi `switch` ga mos keladigan `if..else` yordamida yozing:

```js
switch (browser) {
  case 'Edge':
    alert( "Sizda Edge bor!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Yaxshi biz ushbu brauzerlarni ham qo'llab-quvvatlaymiz' );
    break;

  default:
    alert( "Ushbu sahifa yaxshi ko'rinadi deb umid qilamiz!" );
}
```
