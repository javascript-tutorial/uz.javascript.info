`switch` funktsiyasiga to'liq mos kelish uchun `if` qat'iy taqqoslashni `'==='` ishlatishi kerak.

Berilgan satrlar uchun oddiy `'=='` ham ishlaydi.

```js no-beautify
if(browser == 'Edge') {
  alert("Sizda Edge bor!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Yaxshi biz ushbu brauzerlarni ham qo'llab-quvvatlaymiz' );
} else {
  alert( "Ushbu sahifa yaxshi ko'rinadi deb umid qilamiz!" );
}
```

Iltimos, e'tibor bering: `browser == 'Chrome' || browser == 'Firefox' …` yaxshi o'qilish uchun bir nechta satrlarga bo'lingan.

Ammo `switch` konstruktsiyasi tozaroq va tavsiflovchiroq.
