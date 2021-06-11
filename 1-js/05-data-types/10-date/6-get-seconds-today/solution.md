Soniya sonini olish uchun biz hozirgi kun va soat 00:00:00 dan foydalanib sana hosil qilamiz, so'ngra uni "hozir" dan mavhumlashtiramiz.

Farq kunning boshidan boshlab millisekundalar sonidir, biz soniyalarni olish uchun 1000 ga bo'lishimiz kerak:

```js run
function getSecondsToday() {
  let now = new Date();

  // joriy kun/oy/yil yordamida obyekt yaratish
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // millisekundlardagi farq
  return Math.round(diff / 1000); // soniyalarni yaratish
}

alert( getSecondsToday() );
```

Muqobil echim soat/daqiqa/soniyani olish va ularni soniyalarga aylantirishdir:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
