# Tur o'zgartirish misollari

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

<<<<<<< HEAD
## Tushuntirishlar

1. String bilan qo'shish `"" + 1` `1` ni stringga o'zgartiradi: `"" + 1 = "1"`, va keyin bizda `"1" + 0` bo'ladi, xuddi shu qoida qo'llaniladi.

2. Ayirish `-` (ko'pgina matematik amallar kabi) faqat raqamlar bilan ishlaydi, u bo'sh string `""` ni `0` ga o'zgartiradi.

3. String bilan qo'shish `5` raqamini stringga qo'shadi.

4. Ayirish har doim raqamlarga o'zgartiradi, shuning uchun u `"  -9  "` ni `-9` raqamiga aylantiradi (atrofidagi bo'shliqlarni e'tiborsiz qoldiradi).

5. `null` raqamli o'zgartirishdan keyin `0` ga aylanadi.

6. `undefined` raqamli o'zgartirishdan keyin `NaN` ga aylanadi.

7. String raqamga o'zgartirilganda string boshi va oxiridagi bo'shliq belgilari olib tashlanadi. Bu yerda butun string `\t`, `\n` va ularning orasidagi "oddiy" bo'shliq kabi bo'shliq belgilaridan iborat. Shuning uchun, bo'sh stringga o'xshab, u `0` ga aylanadi.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
