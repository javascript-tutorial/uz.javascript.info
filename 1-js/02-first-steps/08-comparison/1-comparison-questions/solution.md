

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

1. Shubhasiz, `true`.
2. Simvol taqqoslash ishlatiladi, shuning uchun `false`.
3. Yana, simvol taqqoslash ishlatiladi, birinchi simvol `"2"` ikkinchi simvol `"1"` dan katta, shuning uchun `true`.
4. `null` va `undefined` qiymatlari teng.
5. Qat'iy tenglik qat'iydir. Ikkala tomonning har xil turlari `false` ga olib keladi.
6. (4) ga qarang.
7. Har xil turdagi qat'iy tenglik.
