# onclick atributi va ishlov beruvchilar

Brauzer `onclick` kabi `on*` atributini o'qiganda, u uning mazmunidan ishlov beruvchi yaratadi.

`onclick="handler()"` uchun funksiya quyidagicha bo'ladi:

```js
function(event) {
  handler() // onclick ning mazmuni
}
```

Endi ko'rishimiz mumkinki, `handler()` tomonidan qaytarilgan qiymat ishlatilmaydi va natijaga ta'sir qilmaydi.

Tuzatish oddiy:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Shuningdek, biz `event.preventDefault()` dan foydalanishimiz mumkin:

```html run
<script>
  *!*
    function handler(event) {
      alert("...");
      event.preventDefault();
    }
  */!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
