muhimlik: 5

---

# Massiv kontekstida chaqirish

Natija qanday? Nima uchun?

```js
let arr = ["a", "b"];

<<<<<<< HEAD
arr.push(function () {
  alert(this);
=======
arr.push(function() {
  alert( this );
>>>>>>> 20208769e528337949e946f526534d61d38bac47
});

arr[2](); // ?
```
