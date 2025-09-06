Javob: `1` va `2`.

Birinchi ishlov beruvchi ishga tushadi, chunki u `removeEventListener` tomonidan o'chirilmagan. Ishlovchini olib tashlash uchun biz aniq tayinlangan funktsiyani o'tkazishimiz kerak. Va kodda yangi funktsiya o'tkazildi, u bir xil ko'rinadi, lekin hali ham boshqa funktsiya.

Funktsiya ob'ektini olib tashlash uchun biz unga havolani saqlashimiz kerak, masalan:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

`button.onclick` ishlov beruvchisi mustaqil va `addEventListener`ga qo`shimcha ravishda ishlaydi.
