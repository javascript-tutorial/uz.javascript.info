`<body>` teg'idan keyin qo'shish uchun avval uni topishimiz kerak. Buning uchun `pattern:<body.*?>` muntazam ifoda naqshidan foydalanishimiz mumkin.

<<<<<<< HEAD
Ushbu vazifada biz `<body>` teg'ini o'zgartirishimiz shart emas. Faqat undan keyin matn qo'shishimiz kerak.
=======
In this task, we don't need to modify the `<body>` tag. We only need to add the text after it.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
U quyidagicha ishlaydi:
- Matndagi har bir pozitsiyada.
- U `pattern:<body.*?>` bilan boshlanganini tekshiradi.
- Agar shunday bo'lsa, bizda moslik bor.

`pattern:<body.*?>` tegi qaytarilmaydi. Ushbu regexp natijasi tom ma'noda bo'sh satrdir, lekin u faqat `pattern:<body.*?>` bilan boshlangan pozitsiyalarda mos keladi.

Shunday qilib, u `pattern:<body.*?>` bilan boshlangan "bo'sh qator"ni `<h1>Salom</h1>` bilan almashtiradi. Bu `<body>` dan keyin qo'shishdir.
=======
It works like this:
- At every position in the text.
- Check if it's preceded by `pattern:<body.*?>`.
- If it's so, then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceded by `pattern:<body.*?>`.

So it replaces the "empty line", preceded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

P.S. `pattern:s` va `pattern:i` kabi regexp bayroqlari ham foydali bo'lishi mumkin: `pattern:/<body.*?>/si`. `pattern:s` bayrog'i nuqta `pattern:.` ni yangi qator belgisiga mos kelishini ta'minlaydi va `pattern:i` bayrog'i `pattern:<body>` ni `match:<BODY>` ga ham katta-kichik harflarni farqlamasdan mos kelishini ta'minlaydi.