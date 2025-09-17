# Prompt va string o'zgartirish

Buning sababi `prompt` foydalanuvchi kiritgan ma'lumotni string sifatida qaytaradi.

Demak, o'zgaruvchilar mos ravishda `"1"` va `"2"` qiymatlariga ega.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

Biz qilishimiz kerak bo'lgan narsa `+` dan oldin stringlarni raqamlarga o'zgartirishdir. Masalan, `Number()` dan foydalanish yoki ularning oldiga `+` qo'yish.

## Yechimlar

### 1. `prompt` dan oldin:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

### 2. `alert` ichida:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

Oxirgi kodda ham unary ham binary `+` ishlatilmoqda. Kulgili ko'rinadi, shunday emasmi?