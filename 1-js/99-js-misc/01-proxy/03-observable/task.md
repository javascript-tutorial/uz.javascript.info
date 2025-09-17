# Kuzatiluvchilar

Proksi-serverni qaytarish orqali "ob'ektni kuzatilishi mumkin bo'lgan" "makeObservable(target)" funksiyasini yarating.

Bu qanday ishlashi kerak:

```js run
function makeObservable(target) {
  /* sizning kodingiz */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

Boshqacha qilib aytadigan bo'lsak, `makeObservable` tomonidan qaytarilgan ob'ekt xuddi asl ob'ektga o'xshaydi, lekin har qanday xususiyat o'zgarishida "ishlovchi" funksiyasini o'rnatuvchi `observe(handler)` usuliga ega.

Xususiyat o'zgarganda, `handler(kalit, qiymat)` xususiyat nomi va qiymati bilan chaqiriladi.

P.S. Ushbu vazifada, iltimos, faqat xotiraga yozish haqida ehtiyot bo'ling. Boshqa operatsiyalar ham xuddi shunday tarzda amalga oshirilishi mumkin.
