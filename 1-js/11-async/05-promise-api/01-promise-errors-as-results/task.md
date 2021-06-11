# Xatolarga bardoshli Promise.all

Parallel ravishda bir nechta URL manzillarini olishni istaymiz.

Buning uchun kod:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

Promise.all(urls.map(url => fetch(url)))
  // har bir javob uchun uning holati ko'rsatilgan
  .then(responses => { // (*)
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }
  });
```

Muammo shundaki, agar biron bir so'rov bajarilmasa, `Promise.all` xato bilan rad etadi va biz boshqa barcha so'rovlarning natijalarini yo'qotamiz.

Bu yaxshi emas.

Kodni `(*)` satridagi `responses` massivi muvaffaqiyatli olish uchun javob obyektlarini va muvaffaqiyatsiz bo'lganlar uchun xato obyektlarini o'z ichiga olishi uchun o'zgartiring.

Masalan, agar URL manzillaridan biri yomon bo'lsa, u quyidagicha bo'lishi kerak:

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'http://no-such-url'
];

Promise.all(...) // URL-larni olish uchun sizning kodingiz...
  // ...va natijada olingan a'zolar massivi sifatida fetch xatolarini o'tkazing...
  .then(responses => {  
    // 3 urls => 3 massiv a'zolari
    alert(responses[0].status); // 200
    alert(responses[1].status); // 200
    alert(responses[2]); // TypeError: olinmadi (matn farq qilishi mumkin)
  });
```

P.S. Ushbu vazifada to'liq javobni `response.text()` yoki `response.json()` yordamida yuklashingiz shart emas. Fetch xatolarni to'g'ri yo'lda boshqaring.
