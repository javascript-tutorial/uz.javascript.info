```js run demo
let userName = prompt("Kim bu yerda?", "");

if (userName === "Admin") {
  let pass = prompt("Parol?", "");

  if (pass == "Master") {
    alert("Xush kelibsiz!");
  } else if (pass == "" || pass == null) {
    alert("Bekor qilindi.");
  } else {
    alert("Noto'g'ri parol");
  }
} else if (userName == "" || userName == null) {
  alert("Bekor qilindi");
} else {
  alert("Men sizni tanimayman");
}
```

`If` bloklar ichidagi vertikal chiziqlarga e'tibor bering. Ular texnik jihatdan talab qilinmaydi, lekin ular kodning o'qilishini yanada oson qiladilar.
