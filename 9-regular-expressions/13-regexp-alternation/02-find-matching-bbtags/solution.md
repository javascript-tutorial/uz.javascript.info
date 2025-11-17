Ochuvchi teg `pattern:\[(b|url|quote)\]`.

<<<<<<< HEAD
Keyin yopuvchi teggacha hamma narsani topish uchun -- yangi qatorni ham o'z ichiga olgan har qanday belgiga mos kelish uchun `pattern:s` bayrog'i bilan `pattern:.*?` naqshidan foydalanamiz va keyin yopuvchi tegga orqaga havola qo'shamiz.
=======
Opening tag is `pattern:\[(b|url|quote)]`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

To'liq naqsh: `pattern:\[(b|url|quote)\].*?\[/\1\]`.

<<<<<<< HEAD
Amalda:
=======
The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.

In action:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]salom![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert(str.match(regexp)); // [b]salom![/b],[quote][url]http://google.com[/url][/quote]
```

<<<<<<< HEAD
E'tibor bering, `pattern:[` va `pattern:]` ni escape qilishdan tashqari, yopuvchi teg `pattern:[\/\1]` uchun slashni ham escape qilishimiz kerak edi, chunki odatda slash naqshni yopadi.
=======
Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
