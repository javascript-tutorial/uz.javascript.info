# Qo'shtirnoq ichidagi satrlarni topish

Qo'sh qo'shtirnoq ichidagi satrlarni topish uchun regexp yarating `subject:"..."`.

Satrlar JavaScript satrlari kabi escaping ni qo'llab-quvvatlashi kerak. Masalan, qo'shtirnoqlar `subject:\"` sifatida qo'shilishi mumkin, yangi qator `subject:\n` sifatida va slash o'zi `subject:\\` sifatida.

```js
let str = 'Xuddi "shu yerda" kabi.';
```

E'tibor bering, xususan, escaped qo'shtirnoq `subject:\"` satrni tugatmaydi.

Shuning uchun biz bir qo'shtirnoqdan ikkinchisigacha yo'lda escaped qo'shtirnoqlarni e'tiborsiz qoldirib qidirishimiz kerak.

Bu vazifaning muhim qismi, aks holda u oddiy bo'lar edi.

Mos keladigan satrlar misollari:

```js
.. *!*"meni sinab ko'r"*/!* ..
.. *!*"\"Salom\" degin!"*/!* ... (ichida escaped qo'shtirnoqlar)
.. *!*"\\"*/!* ..  (ichida qo'sh slash)
.. *!*"\\ \""*/!* ..  (ichida qo'sh slash va escaped qo'shtirnoq)
```

JavaScript da biz slashlarni satrga to'g'ri o'tkazish uchun ularni ikki marta yozishimiz kerak:

```js run
let str = ' .. "meni sinab ko'r" .. "\"Salom\" degin!" .. "\\\\ \\"" .. ';

// xotiradagi satr
alert(str); //  .. "meni sinab ko'r" .. "\"Salom\" degin!" .. "\\ \"" ..
```
