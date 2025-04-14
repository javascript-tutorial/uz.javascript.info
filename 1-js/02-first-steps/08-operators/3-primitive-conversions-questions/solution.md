
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
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/1-primitive-conversions-questions/solution.md
1. Satr bilan qo'shish operatsiyasi `"" + 1 `, ` 1 ` ni satrga aylantiradi: `"" + 1 = "1"`, keyin esa bizda `" 1 " + 0` dayam, shu qoida qo'llaniladi.
2. Ayiruv `-` (ko'pchilik matematik amallar kabi) faqat sonlar bilan ishlaydi, u bo'sh satrni `""` `0` ga aylantiradi.
3. Satr bilan qo'shish satrga `5` sonini ilova qiladi.
4. Ayirish operatori natijani har doim raqamga aylantiradi, shuning uchun u `" -9 "` raqamini `-9` aylantiradi (atrofdagi bo'shliqlarni hisobga olmasdan).
5. `null` raqamli konvertatsiyadan so'ng `0` ga aylanadi.
6. Raqamli konvertatsiyadan so'ng `undefined` `NaN` ga aylanadi.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
<<<<<<< HEAD
7. Space characters, are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/3-primitive-conversions-questions/solution.md
=======
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
