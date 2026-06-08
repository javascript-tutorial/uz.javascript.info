# Qo'shtirnoq ichidagi satrlarni topish

Qo'sh qo'shtirnoq ichidagi satrlarni topish uchun regexp yarating `subject:"..."`.

<<<<<<< HEAD
Satrlar JavaScript satrlari kabi escaping ni qo'llab-quvvatlashi kerak. Masalan, qo'shtirnoqlar `subject:\"` sifatida qo'shilishi mumkin, yangi qator `subject:\n` sifatida va slash o'zi `subject:\\` sifatida.
=======
The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
let str = 'Xuddi "shu yerda" kabi.';
```

E'tibor bering, xususan, escaped qo'shtirnoq `subject:\"` satrni tugatmaydi.

Shuning uchun biz bir qo'shtirnoqdan ikkinchisigacha yo'lda escaped qo'shtirnoqlarni e'tiborsiz qoldirib qidirishimiz kerak.

Bu vazifaning muhim qismi, aks holda u oddiy bo'lar edi.

Mos keladigan satrlar misollari:

```js
<<<<<<< HEAD
.. *!*"meni sinab ko'r"*/!* ..
.. *!*"\"Salom\" degin!"*/!* ... (ichida escaped qo'shtirnoqlar)
.. *!*"\\"*/!* ..  (ichida qo'sh slash)
.. *!*"\\ \""*/!* ..  (ichida qo'sh slash va escaped qo'shtirnoq)
```

JavaScript da biz slashlarni satrga to'g'ri o'tkazish uchun ularni ikki marta yozishimiz kerak:
=======
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
let str = ' .. "meni sinab ko'r" .. "\"Salom\" degin!" .. "\\\\ \\"" .. ';

// xotiradagi satr
alert(str); //  .. "meni sinab ko'r" .. "\"Salom\" degin!" .. "\\ \"" ..
```
