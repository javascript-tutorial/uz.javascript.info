Sinov dasturchi testlarni yozishda uchraydigan vasvasalardan birini namoyish etadi.

Bu yerda mavjud bo'lgan narsa aslida uchta test, ammo uchta assert(tasdiq) bilan bitta funktsiya sifatida yaratilgan.

Ba'zan bu tarzda yozish osonroq bo'ladi, ammo agar xato yuzaga kelsa, unda nima sodir bo'lgani aniq bo'lmaydi.

<<<<<<< HEAD
Agar murakkab ijro oqimida xatolik yuz bersa, biz o'sha paytda ma'lumotlarni aniqlab olishimiz kerak bo'ladi. Aslida *testni koddagi nosozliklarini tuzatishimiz kerak*.
=======
If an error happens in the middle of a complex execution flow, then we'll have to figure out the data at that point. We'll actually have to *debug the test*.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Testni aniq yozilgan kirish va chiqish natijalari bilan bir nechta "it" bloklariga ajratish yaxshiroq bo'lar edi.

Shunga o'xshash:
```js
describe("x ni n darajaga ko'taradi", function() {
  it("5 ning 1 chi darajasi 5 ga teng", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 ning 2 chi darajasi 25 ga teng", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 ning 3 chi darajasi 125 ga teng", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Biz bitta `it` ni `describe` va bir guruh `it` bloklari bilan almashtirdik. Agar biron bir narsa ishlamay qolsa, biz ma'lumotlar qanday ekanligini aniq bilib olamiz.

Shuningdek, biz bitta testni ajratib olishimiz va uni `it` o'rniga `it...only` yozish orqali mustaqil rejimda ishlashimiz mumkin:


```js
describe("x ni n darajaga ko'tariladi", function() {
  it("5 ning 1 chi darajasi 5 ga teng", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha faqat ushbu blokni bajaradi
  it.only("5 ning 2 chi darajasi 25 ga teng", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 ning 2 chi darajasi 125 ga teng", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
