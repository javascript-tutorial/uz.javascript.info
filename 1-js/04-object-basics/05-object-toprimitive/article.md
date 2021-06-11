
# Obyektlarni ibtidoiylarga aylantirish

Obyektlar `obj1 + obj2` qo'shilganda, `obj1 - obj2` ayirilganda yoki `alert(obj)` yordamida ekranga chiqarilganda nima bo'ladi?

Obyektlarda konvertatsiya qiladigan maxsus usullar mavjud.

<info:type-convertions> bobida biz ibtidoiylarning raqamli, matn va mantiqiy konvertatsiya qilish qoidalarini ko'rdik. Ammo biz obyektlar uchun bo'sh joy qoldirdik. Endi usullar va belgilar to'g'risida bilganimizdan so'ng, bo'shlikni to'ldirish vaqti keldi.

Obyektlar uchun mantiqiy konvertatsiya mavjud emas, chunki barcha obyektlar mantiqiy kontekstda `true`. Shunday qilib, faqat matn va raqamli konvertatsiyalar mavjud.

Raqamli konvertatsiya obyektlarni ayirganda yoki matematik funktsiyalarni qo'llaganimizda sodir bo'ladi. Masalan, `Date` obtektlari (<info:date> bobida ko'rib chiqilishi kerak) ayirilishi mumkin va `date1 - date2` natijasi ikki sana o'rtasidagi vaqt farqidir.

Matn konvertatsiyasiga kelsak, bu odatda `alert(obj)` kabi obyektni chiqarganimizda va shunga o'xshash kontekstda sodir bo'ladi.

## ToPrimitive

Obyekt ibtidoiy zarur bo'lgan kontekstda, masalan, `alert` yoki matematik operatsiyalarda ishlatilsa, u `ToPrimitive` algoritmi ([spetsifikatsiya](https://tc39.github.io/ecma262/#sec-toprimitive) yordamida ibtidoiy qiymatga aylantiriladi).

Bu algoritm bizga maxsus obyekt usuli yordamida konvertatsiyani sozlash imkonini beradi.

Spetsifikatsiyada tavsiflangan uchta turdagi o'zgartirishlar ("uchta hintlar") mavjud:

`"string"`
: Amaliyot matni kutganda, obyektni matnga aylantirish uchun, masalan, `alert`:

    ```js
    // chiqish
    alert(obj);

    // obyektni xususiyat kaliti sifatida ishlatish
    anotherObj[obj] = 123;
    ```

`"number"`
: Amaliyot matematikaga o'xshash raqamni konvertatsiya qilish uchun raqamni kutganda:

    ```js
    // aniq konvertatsiya
    let num = Number(obj);

    // matematika (unar plyusdan tashqari)
    let n = +obj; // unar plyus
    let delta = date1 - date2;

    // kamroq/katta taqqoslash
    let greater = user1 > user2;
    ```

`"default"`
: Kamdan kam hollarda operator qanday turni kutishini "aniq bilmasa" paydo bo'ladi.

    Masalan, unar plyus `+` ikkala matnlar (ularni birlashtiradi) va raqamlar (ularni qo'shadi) bilan ishlashi mumkin, shuning uchun ham matnlar, ham raqamlar bilan ishlaydi. Yoki obyektni `==` yordamida matn, raqam yoki belgi bilan taqqoslaganda.

    ```js
    // binar plus
    let total = car1 + car2;

    // obj == matn/raqam/belgi
    if (user == 1) { ... };
    ```

    Katta / kichik operator `<>` ikkala satr va raqamlar bilan ham ishlashi mumkin. Shunga qaramay, u "default" emas, balki "number" ishoradan foydalanadi. Bu tarixiy sabablarga ko'ra.

    Amalda, bitta holatdan tashqari barcha tilning ichida o'rnatilgan obyektlar (`Date` obyekti, biz keyinroq organib olamiz) `"default"` konvertatsiyasini `"number"` bilan bir xil tarzda amalga oshiradi. Va ehtimol biz ham shunday qilishimiz kerak.

Iltimos, diqqat qiling -- faqat uchta ishora mavjud. Bu juda oddiy. Hech qanday "mantiqiy" ishora yo'q (barcha obyektlar mantiqiy turdagi qiymatda `true`) yoki boshqa narsalar. Agar biz `"default"` va `"number"` ga bir xil munosabatda bo'lsak, aksariyat ichki o'rnatilganlar singari, faqat ikkita konvertatsiya mavjud.

**Konvertatsiyani amalga oshirish uchun JavaScript uchta obyekt usulini topishga va ularni chaqirishga harakat qiladi:**

1. Agar usul mavjud bo'lsa, `obj[Symbol.toPrimitive](hint)` ni chaqiring,
2. Aks holda, agar ishora `"string"` bo'lsa
    - mavjud bo'lsa ham, `obj.toString()` va `obj.valueOf()` ni sinab ko'ring.
3. Aks holda, agar ishora `"number"` yoki `"default"` bo'lsa
    - mavjud bo'lsa ham, `obj.toString()` va `obj.valueOf()` ni sinab ko'ring.

## Symbol.toPrimitive

Birinchi usuldan boshlaylik. Konvertatsiya usulini quyidagicha nomlash uchun ishlatilishi kerak bo'lgan `Symbol.toPrimitive` belgisi mavjud:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // ibtidoiy qiymatni qaytaring
  // hint = "string", "number", "default" dan biri
}
```

Masalan, `user` obyekti buni amalga oshiradi:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// konvertatsiya demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

Koddan ko'rinib turibdiki, `user` konvertatsiyaga qarab o'z-o'zini tavsiflovchi matnga yoki pul miqdoriga aylanadi. `user[Symbol.toPrimitive]` yagona usuli barcha konvertatsiyaga ishlaydi.


## toString/valueOf

`toString` va `valueOf` usullari qadimgi davrlardan kelib chiqqan. Ular belgilar emas (belgilar ilgari mavjud bo'lmagan), aksincha "muntazam" matn nomli usullar. Ular konvertatsiyani amalga oshirishning muqobil "eski uslubi" ni taqdim etadi.

Agar `Symbol.toPrimitive` bo'lmasa, JavaScript ularni topishga harakat qiladi va quyidagi tartibda sinab ko'radi:

- `toString -> valueOf` "string" ishora uchun.
- `valueOf -> toString` aks holda.

Masalan, bu erda `user` yuqoridagi kabi `toString` va `valueOf` kombinatsiyasidan foydalangan holda ishlaydi:

```js run
let user = {
  name: "John",
  money: 1000,

  // hint="string" uchun
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint="number" yoki "default" uchun
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Ko'pincha biz barcha ibtidoiy konversiyalarni boshqarish uchun bitta "hamma narsani ushlab turadigan" joyni xohlaymiz. Bunday holda biz faqat `toString` -ni amalga oshirishimiz mumkin:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

`Symbol.toPrimitive` va `valueOf` bo'lmasa, `toString` barcha ibtidoiy konversiyalarni boshqaradi.


## ToPrimitive va ToString/ToNumber

Barcha ibtidoiy konversiya usullari haqida bilish kerak bo'lgan narsa shundaki, ular "ishora qilingan" ibtidoiyni qaytarishligi shart.

`toString()` aniq bir matni qaytarishi yoki `Symbol.toPrimitive` usuli "raqam" ishora uchun aniq raqamni qaytarishi shart emas.

**Faqatgina majburiy narsa: ushbu usullar ibtidoiylarni qaytarishi kerak.**

Konvertatsiyani boshlagan operatsiya ushbu ibtidoiylarni oladi va keyinchalik u bilan ishlashni davom ettiradi, agar kerak bo'lsa, keyingi konvertatsiyalarni qo'llaydi.

Masalan:

- Matematik operatsiyalar (binar plyusdan tashqari) `ToNumber` konvertatsiyasini bajaradi:

    ```js run
    let obj = {
      toString() { // toString boshqa usullar bo'lmasa, barcha o'zgarishlarni ko'rib chiqadi
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive "2" ni qaytaradi, keyin u 2 ga aylanadi
    ```

- Binar plyus ibtidoiylarni tekshiradi -- agar u matn bo'lsa, u holda birikma hosil qiladi, aks holda u `ToNumber` ni bajaradi va raqamlar bilan ishlaydi.

    String misoli:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive matn => birlashtirish qaytarildi)
    ```

    Number misoli:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive mantiqiy turdagi qiymat qaytarildi, matn bo'lmasa => ToNumber)
    ```

```smart header="Tarixiy qaydlar"
Tarixiy sabablarga ko'ra `toString` yoki `valueOf` usullari *ibtidoiylarni* qaytarishi kerak: agar ulardan birortasi obyektni qaytarsa, unda xato bo'lmaydi, ammo bu obyekt e'tiborga olinmaydi (masalan, uslub mavjud bo'lmagandak).

Aksincha, `Symbol.toPrimitive` ibtidoiylarni qaytarishi *shart*, aks holda xato bo'ladi.
```

## Xulosa

Obyektni ibtidoiy konvertatsiya qilish ko'plab o'rnatilgan funktsiyalar va operatorlar tomonidan avtomatik ravishda chaqiriladi, ular qiymat sifatida ibtidoiylarni kutadilar.

Uning 3 turi (ishoralari) mavjud:
- `"string"` (`alert` va boshqa matn konvertatsiyalari uchun)
- `"number"` (matematika uchun)
- `"default"` (ba'zi operatorlar uchun)

Spetsifikatsiyada qaysi operator qaysi maslahatni ishlatishi aniq tasvirlangan. "Nima kutishni bilmaydigan" va `"default"` ishorasidan foydalanadigan operatorlar juda kam. Odatda tilning ichida o'rnatilgan obyektlar uchun `"default"` ishora `"number"` bilan bir xil tarzda ko'rib chiqiladi, shuning uchun amalda oxirgi ikkitasi ko'pincha birlashtiriladi.

Konvertatsiya qilish algoritmi:

1. Agar usul mavjud bo'lsa, `obj[Symbol.toPrimitive](hint)` ni chaqiring,
2. Aks holda, agar ishora `"string"` bo'lsa
    - mavjud bo'lsa ham, `obj.toString()` va `obj.valueOf()` ni sinab ko'ring.
3. Aks holda, agar ishora `"number"` yoki `"default"` bo'lsa
    - mavjud bo'lsa ham, `obj.toString()` va `obj.valueOf()` ni sinab ko'ring.

Amalda, faqat `obj.toString()` ni amalga oshirish juda keng tarqalgan, barcha turdagi transformatsiyalar uchun "universal" usul bo'lib, obyektning "o'qiladigan" ko'rinishini qaytaradigan barcha konvertatsiyalar uchun, koddagi nosozliklarni maqsadida amalga oshirish kifoya.