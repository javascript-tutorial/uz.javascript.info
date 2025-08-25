# array[-1] ga murojaat

Ba'zi dasturlash tillarida biz massiv elementlariga oxiridan boshlab manfiy indekslar yordamida kirishimiz mumkin.

Bu kabi:

```js
let array = [1, 2, 3];

array[-1]; // 3, oxirgi element
array[-2]; // 2, oxiridan bir qadam oldingi
array[-3]; // 1, oxiridan ikki qadam oldingi
```

Boshqacha qilib aytganda, `array[-N]` `array[array.uzunligi - N]` bilan bir xil.

Ushbu xatti-harakatni amalga oshirish uchun proksi-server yarating.

Bu shunday ishlashi kerak:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* sizning kodingiz */
});

alert(array[-1]); // 3
alert(array[-2]); // 2

// Massivning boshqa funksiyalari "xuddi shunday" saqlanishi kerak
```
