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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
});

arr[2](); // ?
```
