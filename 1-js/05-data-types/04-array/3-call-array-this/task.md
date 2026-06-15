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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
});

arr[2](); // ?
```
