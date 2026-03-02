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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
});

arr[2](); // ?
```
