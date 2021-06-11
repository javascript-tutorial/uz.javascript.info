Iltimos, yechimning nozik, ammo muhim tafsilotlariga e'tibor bering. Biz `value` ni `prompt` dan so'ng darhol raqamga aylantirmaymiz, chunki `value = +value` dan keyin biz bo'sh satrni (to'xtash belgisi) noldan (amaldagi raqam) ajrata olmaymiz. Buni biz keyinroq qilamiz.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Iltimos, raqamni kiriting", 0);

    // bekor qilishimiz kerakmi?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

