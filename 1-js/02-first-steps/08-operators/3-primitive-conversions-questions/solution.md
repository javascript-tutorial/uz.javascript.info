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

## Tushuntirishlar

1. String bilan qo'shish `"" + 1` `1` ni stringga o'zgartiradi: `"" + 1 = "1"`, va keyin bizda `"1" + 0` bo'ladi, xuddi shu qoida qo'llaniladi.

2. Ayirish `-` (ko'pgina matematik amallar kabi) faqat raqamlar bilan ishlaydi, u bo'sh string `""` ni `0` ga o'zgartiradi.

3. String bilan qo'shish `5` raqamini stringga qo'shadi.

4. Ayirish har doim raqamlarga o'zgartiradi, shuning uchun u `"  -9  "` ni `-9` raqamiga aylantiradi (atrofidagi bo'shliqlarni e'tiborsiz qoldiradi).

5. `null` raqamli o'zgartirishdan keyin `0` ga aylanadi.

6. `undefined` raqamli o'zgartirishdan keyin `NaN` ga aylanadi.

7. String raqamga o'zgartirilganda string boshi va oxiridagi bo'shliq belgilari olib tashlanadi. Bu yerda butun string `\t`, `\n` va ularning orasidagi "oddiy" bo'shliq kabi bo'shliq belgilaridan iborat. Shuning uchun, bo'sh stringga o'xshab, u `0` ga aylanadi.