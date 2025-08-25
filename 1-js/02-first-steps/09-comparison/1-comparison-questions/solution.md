

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Ba'zi sabablar:

1. Shubhasiz, rost.
2. Lug'atni taqqoslash, shuning uchun noto'g'ri. `"a"` `"p"` dan kichikroq.
3. Yana lug'atni solishtirish, birinchi belgi `"2"` birinchi belgidan katta `"1"`.
4. “Nul” va “aniqlanmagan” qiymatlar faqat bir-biriga teng.
5. Qat’iy tenglik – qat’iy. Ikkala tomonning turli xil turlari yolg'onga olib keladi.
6. `(4)`ga o`xshab, `null` faqat `aniqlanmagan`ga teng.
7. Har xil turdagi qat'iy tenglik.
