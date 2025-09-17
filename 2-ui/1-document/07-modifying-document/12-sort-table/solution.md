Yechim qisqa, ammo biroz qiyin ko'rinishi mumkin, shuning uchun men unga keng sharhlar beraman:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) =>
    rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML)
  );

table.tBodies[0].append(...sortedRows); // (3)
```

Bosqichma-bosqich algoritm:

1. `<tbody>` dan barcha `<tr>`-ni oling.
2. Keyin ularni birinchi `<td>` (ism maydoni) mazmuni bo'yicha taqqoslab tartiblang.
3. Endi tugunlarni `.append(...sortedRows)` orqali kerakli tartibda kiriting.

Biz qator elementlarini olib tashlashimiz shart emas, shunchaki "qayta kiritish", ular eski joyni avtomatik ravishda tark etishadi.

P.S. Bizning holatda, jadvalda aniq `<tbody>` mavjud, lekin HTML jadvalida `<tbody>` bo'lmasa ham, DOM tuzilmasi har doim shunday bo'ladi.
