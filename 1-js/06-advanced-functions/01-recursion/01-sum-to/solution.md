Tsikl yordamidagi yechim:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

Rekursiyadan foydalangan holdagi yechim:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

Formuladan foydalangan holdagi yechim: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Tabiiyki, formulalar eng tezkor yechimdir. Har qanday `n` raqami uchun atigi 3 ta operatsiyadan foydalaniladi. Matematika yordam beradi!

Tsikl varianti tezligi bo'yicha ikkinchi o'rinda turadi. Rekursiv va tsikl variantida biz bir xil sonlarni qo'shamiz. Ammo rekursiya ichki o'rnatilgan qo'ng'iroqlarni va ijro stekini boshqarishni o'z ichiga oladi. Bu shuningdek resurslarni talab qiladi, shuning uchun bu sekinroq.

P.P.S. Standart "quyruq chaqiruvini" optimallashtirishni tavsiflaydi: agar rekursiv chaqiruv funktsiyadagi eng so'nggi (yuqoridagi `sumTo` kabi) bo'lsa, tashqi funktsiya bajarilishini davom ettirishga hojat qolmaydi va biz uning bajarilish konteksti eslashimiz shart emas. Bunday holda `sumTo(100000)` hisoblash mumkin. Ammo agar sizning JavaScript-ni interpretaori qo'llab-quvvatlamasa, unda xato bo'ladi: maksimal to'plam hajmi oshib ketdi, chunki odatda to'plamning umumiy hajmida cheklov mavjud.
