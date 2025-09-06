Ochuvchi teg `pattern:\[(b|url|quote)\]`.

Keyin yopuvchi teggacha hamma narsani topish uchun -- yangi qatorni ham o'z ichiga olgan har qanday belgiga mos kelish uchun `pattern:s` bayrog'i bilan `pattern:.*?` naqshidan foydalanamiz va keyin yopuvchi tegga orqaga havola qo'shamiz.

To'liq naqsh: `pattern:\[(b|url|quote)\].*?\[/\1\]`.

Amalda:

```js run
let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;

let str = `
  [b]salom![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert(str.match(regexp)); // [b]salom![/b],[quote][url]http://google.com[/url][/quote]
```

E'tibor bering, `pattern:[` va `pattern:]` ni escape qilishdan tashqari, yopuvchi teg `pattern:[\/\1]` uchun slashni ham escape qilishimiz kerak edi, chunki odatda slash naqshni yopadi.
