
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
```

1. Satr bilan qo'shish operatsiyasi `"" + 1 `, ` 1 ` ni satrga aylantiradi: `"" + 1 = "1"`, keyin esa bizda `" 1 " + 0` dayam, shu qoida qo'llaniladi.
2. Ayiruv `-` (ko'pchilik matematik amallar kabi) faqat sonlar bilan ishlaydi, u bo'sh satrni `""` `0` ga aylantiradi.
3. Satr bilan qo'shish satrga `5` sonini ilova qiladi.
4. Ayirish operatori natijani har doim raqamga aylantiradi, shuning uchun u `" -9 "` raqamini `-9` aylantiradi (atrofdagi bo'shliqlarni hisobga olmasdan).
5. `null` raqamli konvertatsiyadan so'ng `0` ga aylanadi.
6. Raqamli konvertatsiyadan so'ng `undefined` `NaN` ga aylanadi.
