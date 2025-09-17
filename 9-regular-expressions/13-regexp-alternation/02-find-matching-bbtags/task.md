# BB-teg juftlarini topish

"BB-teg" `[tag]...[/tag]` ko'rinishida bo'ladi, bu yerda `tag` quyidagilardan biri: `b`, `url` yoki `quote`.

Masalan:

```
[b]matn[/b]
[url]http://google.com[/url]
```

BB-teglar ichma-ich joylashtirilishi mumkin. Ammo teg o'zi ichiga o'zini joylashtira olmaydi, masalan:

```
Normal:
[url] [b]http://google.com[/b] [/url]
[quote] [b]matn[/b] [/quote]

Bo'lishi mumkin emas:
[b][b]matn[/b][/b]
```

Teglar qator uzilishlarini o'z ichiga olishi mumkin, bu normal:

```
[quote]
  [b]matn[/b]
[/quote]
```

Barcha BB-teglarni ularning tarkibi bilan topish uchun regexp yarating.

Masalan:

```js
let regexp = /sizning regexpingiz/flags;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

Agar teglar ichma-ich joylashgan bo'lsa, bizga tashqi teg kerak (agar xohlasak, uning tarkibida qidiruvni davom ettirishimiz mumkin):

```js
let regexp = /sizning regexpingiz/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```
