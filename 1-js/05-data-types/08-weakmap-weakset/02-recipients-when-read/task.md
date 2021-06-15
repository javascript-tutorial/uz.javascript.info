importance: 5

---

# O'qilgan sanalarni saqlang

[Oldingi topshiriq](info:task/recipients-read) kabi bir xabarlar massivi mavjud. Vaziyat shunga o'xshash.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Endi savol tug'iladi: "xabar qachon o'qilgan?" ma'lumotni saqlash uchun qaysi ma'lumotlar tuzilishini taklif qilasiz.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/task.md
Oldingi vazifada biz "ha/yo'q" faktini saqlashimiz kerak edi. Endi biz sanani saqlashimiz kerak va agar xabar yo'qolsa, yana ma'lumot yo'qoladi.
=======
In the previous task we only needed to store the "yes/no" fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we'll cover later.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/task.md
