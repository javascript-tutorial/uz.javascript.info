importance: 5

---

# Nima uchun ikkita hamster to'la?
 
Bizda ikkita hamster bor: `speedy` va `lazy` umumiy `hamster` obyektidan merosxo'r.

Ulardan birini boqsak, ikkinchisi ham to'yadi. Nima uchun? Buni qanday tuzatish kerak?

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

