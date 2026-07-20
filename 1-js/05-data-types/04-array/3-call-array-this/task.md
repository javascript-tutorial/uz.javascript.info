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
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
});

arr[2](); // ?
```
