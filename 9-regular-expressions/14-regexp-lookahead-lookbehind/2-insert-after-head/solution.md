`<body>` teg'idan keyin qo'shish uchun avval uni topishimiz kerak. Buning uchun `pattern:<body.*?>` muntazam ifoda naqshidan foydalanishimiz mumkin.

Ushbu vazifada biz `<body>` teg'ini o'zgartirishimiz shart emas. Faqat undan keyin matn qo'shishimiz kerak.

Buni qanday qilishimiz mumkin:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Salom</h1>');

alert(str); // ...<body style="..."><h1>Salom</h1>...
```

Almashtirish satrida `$&` moslikning o'zini anglatadi, ya'ni `pattern:<body.*?>` ga mos keladigan manba matn qismi. U o'zi va `<h1>Salom</h1>` bilan almashtiriladi.

Muqobil variant orqaga qarashdan foydalanishdir:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Salom</h1>`);

alert(str); // ...<body style="..."><h1>Salom</h1>...
```

Ko'rib turganimizdek, bu regexpda faqat orqaga qarash qismi bor.

U quyidagicha ishlaydi:
- Matndagi har bir pozitsiyada.
- U `pattern:<body.*?>` bilan boshlanganini tekshiradi.
- Agar shunday bo'lsa, bizda moslik bor.

`pattern:<body.*?>` tegi qaytarilmaydi. Ushbu regexp natijasi tom ma'noda bo'sh satrdir, lekin u faqat `pattern:<body.*?>` bilan boshlangan pozitsiyalarda mos keladi.

Shunday qilib, u `pattern:<body.*?>` bilan boshlangan "bo'sh qator"ni `<h1>Salom</h1>` bilan almashtiradi. Bu `<body>` dan keyin qo'shishdir.

P.S. `pattern:s` va `pattern:i` kabi regexp bayroqlari ham foydali bo'lishi mumkin: `pattern:/<body.*?>/si`. `pattern:s` bayrog'i nuqta `pattern:.` ni yangi qator belgisiga mos kelishini ta'minlaydi va `pattern:i` bayrog'i `pattern:<body>` ni `match:<BODY>` ga ham katta-kichik harflarni farqlamasdan mos kelishini ta'minlaydi.