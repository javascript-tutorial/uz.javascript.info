# Xatolarga bardoshli fetch JSON bilan

Oldingi vazifa yechimini yaxshilang <info:task/task-response-as-results>. Endi biz `fetch` ni faqat chaqirmastan, balki berilgan URL-lardan JSON moslamalarini yuklashimiz kerak.

Buni amalga oshirish uchun misol kodi:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// fetch so'rovlarni qilish
Promise.all(urls.map(url => fetch(url)))
  // har bir javobni response.json() ga map qilish
  .then(responses => Promise.all(
    responses.map(r => r.json())
  ))
  // har bir foydalanuvchining ismini ko'rsatish
  .then(users => {  // (*)
    for(let user of users) {
      alert(user.name);
    }
  });
```

Muammo shundaki, agar biron bir so'rov bajarilmasa, `Promise.all` xato bilan rad etadi va biz boshqa barcha so'rovlarning natijalarini yo'qotamiz. Shunday qilib, yuqoridagi kod xuddi oldingi topshiriqdagi kabi xatolarga chidamli emas.

`(*)` satridagi massiv muvaffaqiyatli so'rovlar uchun tahlil qilingan JSON va xatolar uchun xato bo'lishi uchun kodni o'zgartiring.

Iltimos, xato `fetch` da (agar tarmoq so'rovi bajarilmasa) va `response.json()` da (javob noto'g'ri bo'lsa JSON) sodir bo'lishi mumkinligini unutmang. Ikkala holatda ham xato natijalar obyekti a'zosi bo'lishi kerak.

Sandboxda bu ikkala holat mavjud.
