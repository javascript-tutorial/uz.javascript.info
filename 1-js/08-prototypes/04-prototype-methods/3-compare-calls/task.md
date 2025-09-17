muhimlik: 5

---

# Chaqiruvlar o'rtasidagi farq

Keling, yangi `rabbit` obyekti yarataylik:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function () {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

Ushbu chaqiruvlar xuddi shu narsani qiladimi yoki yo'qmi?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
