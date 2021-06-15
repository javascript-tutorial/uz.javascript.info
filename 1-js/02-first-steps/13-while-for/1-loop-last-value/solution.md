Javob: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Har bir tsiklning takrorlanishida `i` `1` ga kamayadi. `While(i)` tekshiruvi, `i = 0` bo'lganda tsiklni to'xtatadi.

Demak, tsiklning qadamlari quyidagi ketma-ketlikni hosil qiladi:

```js
let i = 3;

alert(i--); // 3 ni ko'rsatadi, i ni 2 ga kamaytiradi

alert(i--) // 2 ni ko'rsatadi, i ni 1 ga kamaytiradi

alert(i--) // 1 ni ko'rsatadi, i ni 0 ga kamaytiradi

// tugadi, while(i) tekshuruvi esa tsiklni to'xtatadi
```
