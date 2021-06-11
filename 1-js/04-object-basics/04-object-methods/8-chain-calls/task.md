importance: 2

---

# Zanjirlash

Yuqoriga va pastga tushishga imkon beradigan `ladder` obyekti mavjud:

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

Endi, biz ketma-ket bir nechta chaqiruvlarni amalga oshirishimiz kerak bo'lsa, buni quyidagicha qilishimiz mumkin:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Chaqiruvlarni zanjirlash uchun `up`, `down` va `showStep` kodlarini o'zgartiring:

```js
ladder.up().up().down().showStep(); // 1
```

Bunday yondashuv JavaScript kutubxonalarida keng qo'llaniladi.
