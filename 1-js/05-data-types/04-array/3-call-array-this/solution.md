`arr[2]()` chaqiruvi  sintaktik ravishda eski `obj[method]()`, bizda `obj` – `arr` rolida va `2`– `method`  rolida.

Shunday qilib, biz obyekt usuli sifatida `arr[2]` funktsiyasini chaqiramiz. Tabiiyki, u `arr` obyektiga murojaat qilib `this` ni oladi va massivni chiqaradi:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

Massivda 3 ta qiymat mavjud: dastlab unda ikkita qiymat mavjud edi, funktsiya qiymati qo'shildi.