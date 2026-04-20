muhimlik: 2

---

# Zanjirlash

<<<<<<< HEAD
Yuqoriga va pastga tushishga imkon beradigan `ladder` obyekti mavjud:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function () {
    // joriy qadamni ko'rsatadi
    alert(this.step);
  },
};
```

<<<<<<< HEAD
Endi, biz ketma-ket bir nechta chaqiruvlarni amalga oshirishimiz kerak bo'lsa, buni quyidagicha qilishimiz mumkin:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Chaqiruvlarni zanjirlash uchun `up`, `down` va `showStep` kodlarini o'zgartiring:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Bunday yondashuv JavaScript kutubxonalarida keng qo'llaniladi.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
