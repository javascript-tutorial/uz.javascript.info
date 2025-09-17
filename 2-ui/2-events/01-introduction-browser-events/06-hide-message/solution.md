Tugmani qo'shish uchun biz `position:absolute` (va panelni `position:relative` qilish) yoki `float:right` dan foydalanishimiz mumkin. `float:right` tugmasi hech qachon matnni bir-biriga yopishtirmasligi afzalligi bor, lekin `position:absolute` ko'proq erkinlik beradi. Demak, tanlov sizniki.

Keyin har bir panel uchun kod shunday bo'lishi mumkin:

```js
pane.insertAdjacentHTML(
  "afterbegin",
  '<button class="remove-button">[x]</button>'
);
```

Keyin `<button>` `pane.firstChild` bo'ladi, shuning uchun biz unga ishlov beruvchini quyidagicha qo'shishimiz mumkin:

```js
pane.firstChild.onclick = () => pane.remove();
```
