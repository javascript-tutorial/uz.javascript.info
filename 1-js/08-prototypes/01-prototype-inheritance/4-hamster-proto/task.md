importance: 5

---

<<<<<<< HEAD
# Nima uchun ikkita hamster to'la?
 
Bizda ikkita hamster bor: `speedy` va `lazy` umumiy `hamster` obyektidan merosxo'r.

Ulardan birini boqsak, ikkinchisi ham to'yadi. Nima uchun? Buni qanday tuzatish kerak?
=======
# Why are both hamsters full?

We have two hamsters: `speedy` and `lazy` inheriting from the general `hamster` object. 

When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Bu ovqat topdi
speedy.eat("olma");
alert( speedy.stomach ); // olma

// Unda ham bor, nega? iltimos tuzating
alert( lazy.stomach ); // olma
```

