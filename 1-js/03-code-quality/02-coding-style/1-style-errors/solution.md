Siz quyidagilarga e'tibor qaratishingiz mumkin:

```js no-beautify
<<<<<<< HEAD
function pow(x, n) {
  // <- argumentlar o'rtasida bo'sh joy yo'q
  // <- jingalak qavs alohida satrda
  let result = 1; // <- = dan oldin yoki keyin bo'sh joy yo'q
  for (let i = 0; i < n; i++) {
    result *= x;
  } // <- bo'sh joy yo'q
  // {...} ning tarkibi yangi satrda bo'lishi kerak
  return result;
}

let x = prompt("x?", ""),
  n = prompt("n?", ""); // <-- texnik jihatdan mumkin,
// lekin uni 2 satrga yaxshiroq bo'lib qo'ying, shuningdek bo'sh joy yo'q;
if (n < 0) {
  // <- ichida bo'sh joy yo'q (n <0) va uning ustida qo'shimcha satr bo'lishi kerak
  // <- jingalak qavs alohida satrda
  // quyida - o'qish qobiliyatini yaxshilash uchun uzun satrlarni bir nechta satrga bo'lish mumkin
  alert(
    `${n} darajasi  qo'llab-quvvatlanmaydi, iltimos, noldan katta sonni kiriting`
  );
} // <- uni "} else {" singari bitta qatorga yozishi mumkin
else {
  alert(pow(x, n)); // bo'sh joy yo'q ;
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- could write it on a single line like "} else {"
{
  alert(pow(x,n))  // no spaces and missing ;
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
}
```

Tuzatilgan variant:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`${n} darajasi  qo'llab-quvvatlanmaydi,
  iltimos, noldan katta sonni kiriting`);
} else {
  alert(pow(x, n));
}
```
