importance: 2

---

# Zanjirlash

<<<<<<< HEAD
Yuqoriga va pastga tushishga imkon beradigan `ladder` obyekti mavjud:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // joriy qadamni ko'rsatadi
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Endi, biz ketma-ket bir nechta chaqiruvlarni amalga oshirishimiz kerak bo'lsa, buni quyidagicha qilishimiz mumkin:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

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
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Bunday yondashuv JavaScript kutubxonalarida keng qo'llaniladi.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
