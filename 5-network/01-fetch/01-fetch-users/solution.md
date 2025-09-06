Bizga kerak foydalanuvchilarni olishimiz uchun: `fetch('https://api.github.com/users/USERNAME')`.

Agar javob `200` holatiga ega bo'lsa, JS obyektini o'qish uchun `.json()` ga qo'ng'iroq qiling.

Aks holda, agar `fetch` bajarilmasa yoki javob 200 bo'lmagan maqomga ega bo'lsa, hosil bo'lgan massivda shunchaki `null`ni qaytaramiz.

Kod quyidagicha:

```js demo
async function getUsers(names) {
  let jobs = [];

  for (let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      (successResponse) => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      (failResponse) => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Iltimos, diqqat qiling: `.then`ni chaqirish to'g'ridan-to'g'ri `fetch` ga biriktiriladi, shuning uchun biz javob olganimizda, u boshqa chaqiruvlarni kutmasdan, darhol `.json()` ni o'qiy boshlaydi.

Agar biz natijalarda `await Promise.all(names.map(name => fetch(...)))` dan foydalansak va `.json()` ga qo`ng`iroq qilsak, u barcha chaqiruvlar javob berishini kutadi. Har bir “olish” ga toʻgʻridan-toʻgʻri `.json()` qoʻshish orqali biz individual yuklashlar bir-birini kutmasdan maʼlumotlarni JSON sifatida oʻqiy boshlashini taʼminlaymiz.

Bu past darajadagi Promise API qanchalik foydali bo'lishining misoli, hatto biz asosan `async/await` dan foydalansak ham.
