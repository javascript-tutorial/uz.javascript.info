importance: 4

---

# Callback bilan rasmlarni yuklash

Odatda rasmlar yaratilganda yuklanadi. Shuning uchun biz sahifaga `<img>` qo'shganimizda, foydalanuvchi rasmni darhol ko'rmaydi. Brauzer avval uni yuklashi kerak.

Rasmni darhol ko'rsatish uchun biz uni "oldindan" yaratishimiz mumkin:

```js
let img = document.createElement("img");
img.src = "my.jpg";
```

Brauzer rasmni yuklashni boshlaydi va uni keshda eslab qoladi. Keyinchalik, xuddi shu rasm hujjatda paydo bo'lganda (qanday bo'lishidan qat'iy nazar), u darhol ko'rsatiladi.

**`sources` massividan barcha rasmlarni yuklaydigan va tayyor bo'lganda `callback` ni ishga tushiradigan `preloadImages(sources, callback)` funksiyasini yarating.**

Masalan, bu rasmlar yuklangandan keyin `alert` ni ko'rsatadi:

```js
function loaded() {
  alert("Rasmlar yuklandi");
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

Xatolik yuz berganda ham, funksiya rasmni "yuklangan" deb hisoblashi kerak.

Boshqacha qilib aytganda, `callback` barcha rasmlar yuklanganida yoki xatolik yuz berganida bajariladi.

Funksiya, masalan, ko'plab aylantiriladigan rasmlar bilan galereyani ko'rsatishni rejalashtirganimizda va barcha rasmlarning yuklanganligiga ishonch hosil qilmoqchi bo'lganimizda foydalidir.

Manba hujjatida test rasmlarga havolalar va ular yuklanganligini tekshirish kodini topishingiz mumkin. U `300` ni chiqarishi kerak.
