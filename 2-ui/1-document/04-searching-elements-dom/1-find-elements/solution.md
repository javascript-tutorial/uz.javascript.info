Buni qilishning ko'plab usullari mavjud.

Ulardan ba'zilari:

```js
// 1. `id="age-table"` bilan jadval.
let table = document.getElementById('age-table')

// 2. Ushbu jadval ichidagi barcha label elementlari
table.getElementsByTagName('label')
// yoki
document.querySelectorAll('#age-table label')

// 3. Ushbu jadvaldagi birinchi td ("Age" so'zi bilan)
table.rows[0].cells[0]
// yoki
table.getElementsByTagName('td')[0]
// yoki
table.querySelector('td')

// 4. "search" nomi bilan forma
// hujjatda name="search" bilan faqat bitta element bor deb faraz qilib
let form = document.getElementsByName('search')[0]
// yoki, aniq forma uchun
document.querySelector('form[name="search"]')

// 5. Ushbu formadagi birinchi input.
form.getElementsByTagName('input')[0]
// yoki
form.querySelector('input')

// 6. Ushbu formadagi oxirgi input
let inputs = form.querySelectorAll('input') // barcha inputlarni topish
inputs[inputs.length-1] // oxirgisini olish
```