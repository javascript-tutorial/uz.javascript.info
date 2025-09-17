# Formalar: submit hodisasi va metodi

`submit` hodisasi forma yuborilganda ishga tushadi, u odatda formani serverga yuborishdan oldin tekshirish yoki yuborishni bekor qilish va JavaScript da qayta ishlash uchun ishlatiladi.

`form.submit()` metodi JavaScript dan forma yuborishni boshlash imkonini beradi. Biz uni o'zimizning formalarimizni dinamik yaratish va serverga yuborish uchun ishlatishimiz mumkin.

Ularning batafsil ma'lumotlarini ko'raylik.

## Hodisa: submit

Formani yuborishning ikkita asosiy usuli mavjud:

1. Birinchisi -- `<input type="submit">` yoki `<input type="image">` ga bosish.
2. Ikkinchisi -- input maydonida `key:Enter` tugmasini bosish.

Ikkala harakat ham formada `submit` hodisasiga olib keladi. Ishlov beruvchi ma'lumotlarni tekshirishi mumkin va agar xatolar bo'lsa, ularni ko'rsatishi va `event.preventDefault()` ni chaqirishi mumkin, shunda forma serverga yuborilmaydi.

Quyidagi formada:
1. Matn maydoniga boring va `key:Enter` ni bosing.
2. `<input type="submit">` ga bosing.

Ikkala harakat ham `alert` ni ko'rsatadi va `return false` tufayli forma hech qayerga yuborilmaydi:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  Birinchi: Input maydoniga kiriting <input type="text" value="matn"><br>
  Ikkinchi: "Submit" ga bosing: <input type="submit" value="Yuborish">
</form>
```

````smart header="`submit` va `click` orasidagi bog'lanish"
Input maydonida `key:Enter` yordamida forma yuborilganda, `<input type="submit">` da `click` hodisasi ishga tushadi.

Bu juda qiziq, chunki hech qanday bosish bo'lmagan.

Mana demo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Bu yerga fokus qiling va enter bosing">
 <input type="submit" value="Yuborish" *!*onclick="alert('bosish')"*/!*>
</form>
```
````

## Metod: submit

Formani serverga qo'lda yuborish uchun `form.submit()` ni chaqirishimiz mumkin.

Keyin `submit` hodisasi hosil bo'lmaydi. Agar dasturchi `form.submit()` ni chaqirsa, skript allaqachon barcha tegishli qayta ishlashlarni amalga oshirgan deb hisoblanadi.

Ba'zan bu formani qo'lda yaratish va yuborish uchun ishlatiladi:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// formani yuborish uchun u hujjatda bo'lishi kerak
document.body.append(form);

form.submit();
```