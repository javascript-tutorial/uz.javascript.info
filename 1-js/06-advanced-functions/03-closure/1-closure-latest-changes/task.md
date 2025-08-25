muhimlik: 5

---

# Funktsiya oxirgi o'zgarishlarni qabul qiladimi?

SayHi funktsiyasi tashqi o'zgaruvchi nomidan foydalanadi. Funktsiya ishga tushganda, u qaysi qiymatdan foydalanadi?

```js
let name = "Jon";

funksiya sayHi() {
alert("Salom,"+ism);
}

ism = "Pit";

sayHi(); // u nimani ko'rsatadi: "Jon" yoki "Pit"?
```

Bunday holatlar brauzerda ham, server tomonida ham keng tarqalgan. Funksiya yaratilganidan keyinroq, masalan, foydalanuvchi harakati yoki tarmoq soʻrovidan keyin bajarilishi rejalashtirilishi mumkin.

Demak, savol tug'iladi: u so'nggi o'zgarishlarni oladimi?
