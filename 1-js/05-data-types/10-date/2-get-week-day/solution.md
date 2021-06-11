`date.getDay()` usuli yakshanba kunidan boshlab ish kunining sonini qaytaradi.

Keling, ish kunining massivini tuzamiz, shunda biz kunning nomini raqamiga ko'ra olishimiz mumkin:

```js run demo
function getWeekDay(date) {
  let days = ['DU', 'SE', 'CH', 'PA', 'JU', 'SH', 'YA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // JU
```
