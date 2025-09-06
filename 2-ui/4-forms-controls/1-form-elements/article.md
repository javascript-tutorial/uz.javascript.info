# Forma xossalari va metodlari

`<input>` kabi formalar va boshqaruv elementlari ko'plab maxsus xossalar va hodisalarga ega.

Ularni o'rgansak, formalar bilan ishlash ancha qulayroq bo'ladi.

## Navigatsiya: forma va elementlar

Hujjat formalari maxsus `document.forms` kolleksiyasining a'zolaridir.

Bu *"nomlangan kolleksiya"* deb ataladi: u ham nomlangan, ham tartibli. Formani olish uchun hujjatdagi nom yoki raqamdan foydalanishimiz mumkin.

```js no-beautify
document.forms.my; // name="my" ga ega forma
document.forms[0]; // hujjatdagi birinchi forma
```

Formaga ega bo'lganimizda, har qanday element `form.elements` nomlangan kolleksiyasida mavjud.

Masalan:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // formani olish
  let form = document.forms.my; // <form name="my"> elementi

  // elementni olish
  let elem = form.elements.one; // <input name="one"> elementi

  alert(elem.value); // 1
</script>
```

Bir xil nomga ega bir nechta elementlar bo'lishi mumkin. Bu radio tugmalar va checkbox lar uchun odatiy holdir.

Bunday holda, `form.elements[name]` *kolleksiya* hisoblanadi. Masalan:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

Bu navigatsiya xossalari teg tuzilishiga bog'liq emas. Barcha boshqaruv elementlari, formada qanchalik chuqur joylashgan bo'lishidan qat'i nazar, `form.elements` da mavjud.

````smart header="Fieldsetlar \"subformalari\" sifatida"
Forma ichida bir yoki bir nechta `<fieldset>` elementiga ega bo'lishi mumkin. Ularda ham ular ichidagi forma boshqaruvlarini ro'yxatga oluvchi `elements` xossasi mavjud.

Masalan:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>ma'lumot</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // biz input ni ham formadan, ham fieldset dan nom bo'yicha olishimiz mumkin
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Qisqaroq yozuv: `form.name`"
Qisqaroq yozuv mavjud: biz elementga `form[index/name]` sifatida kirishimiz mumkin.

Boshqacha qilib aytganda, `form.elements.login` o'rniga `form.login` yozishimiz mumkin.

Bu ham ishlaydi, lekin kichik muammo bor: agar biz elementga kirsak va keyin uning `name` ini o'zgartirsak, u hali ham eski nom ostida mavjud bo'ladi (yangi nom ostida ham).

Buni misolda osongina ko'rish mumkin:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, bir xil <input>

  form.login.name = "username"; // input nomini o'zgartirish

  // form.elements nomni yangiladi:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // forma ikkala nomga ham ruxsat beradi: yangi va eski
  alert(form.username == form.login); // true
*/!*
</script>
```

Bu odatda muammo emas, chunki biz forma elementlarining nomlarini kamdan-kam o'zgartiramiz.
````

## Teskari havola: element.form

Har qanday element uchun forma `element.form` sifatida mavjud. Demak, forma barcha elementlarga havola qiladi va elementlar formaga havola qiladi.

Mana rasm:

![](form-navigation.svg)

Masalan:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // forma -> element
  let login = form.login;

  // element -> forma
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Forma elementlari

Forma boshqaruvlari haqida gaplashaylik.

### input va textarea

Biz ularning qiymatiga `input.value` (string) yoki checkbox lar uchun `input.checked` (boolean) sifatida kirishimiz mumkin.

Mana bunday:

```js
input.value = "Yangi qiymat";
textarea.value = "Yangi matn";

input.checked = true; // checkbox yoki radio tugma uchun
```

```warn header="`textarea.innerHTML` emas, `textarea.value` dan foydalaning"
Diqqat qiling, `<textarea>...</textarea>` o'z qiymatini ichki HTML sifatida saqlasa ham, unga kirish uchun hech qachon `textarea.innerHTML` dan foydalanmasligimiz kerak.

U faqat dastlab sahifada bo'lgan HTML ni saqlaydi, joriy qiymatni emas.
```

### select va option

`<select>` elementi 3 ta muhim xossaga ega:

1. `select.options` -- `<option>` kichik elementlarining kolleksiyasi,
2. `select.value` -- hozirda tanlangan `<option>` ning *qiymati*,
3. `select.selectedIndex` -- hozirda tanlangan `<option>` ning *raqami*.

Ular `<select>` uchun qiymat o'rnatishning uchta turli usulini beradi:

1. Tegishli `<option>` elementini toping (masalan, `select.options` orasida) va uning `option.selected` ni `true` ga o'rnating.
2. Agar yangi qiymatni bilsak: `select.value` ni yangi qiymatga o'rnating.
3. Agar yangi option raqamini bilsak: `select.selectedIndex` ni o'sha raqamga o'rnating.

Mana uchala usulning misoli:

```html run
<select id="select">
  <option value="apple">Olma</option>
  <option value="pear">Nok</option>
  <option value="banana">Banan</option>
</select>

<script>
  // uchala qator ham bir xil ishni qiladi
  select.options[2].selected = true; 
  select.selectedIndex = 2;
  select.value = 'banana';
  // diqqat: optionlar noldan boshlanadi, shuning uchun 2-indeks 3-option ni anglatadi.
</script>
```

Ko'pgina boshqa boshqaruvlardan farqli o'laroq, `<select>` agar `multiple` atributiga ega bo'lsa, bir vaqtda bir nechta optionni tanlash imkonini beradi. Garchi bu atribut kamdan-kam ishlatiladi.

Ko'plab tanlangan qiymatlar uchun qiymatlarni o'rnatishning birinchi usulidan foydalaning: `<option>` kichik elementlaridan `selected` xossasini qo'shing/olib tashlang.

Mana multi-select dan tanlangan qiymatlarni qanday olish misoli:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Klassik</option>
</select>

<script>
  // multi-select dan barcha tanlangan qiymatlarni olish
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

`<select>` elementining to'liq spetsifikatsiyasi <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> spetsifikatsiyasida mavjud.

### new Option

[Spetsifikatsiya](https://html.spec.whatwg.org/multipage/forms.html#the-option-element)da `<option>` elementini yaratish uchun yaxshi qisqa sintaksis mavjud:

```js
option = new Option(text, value, defaultSelected, selected);
```

Bu sintaksis ixtiyoriy. Biz `document.createElement('option')` dan foydalanishimiz va atributlarni qo'lda o'rnatishimiz mumkin. Shunga qaramay, u qisqaroq bo'lishi mumkin, shuning uchun mana parametrlar:

- `text` -- option ichidagi matn,
- `value` -- option qiymati,
- `defaultSelected` -- agar `true` bo'lsa, `selected` HTML-atributi yaratiladi,
- `selected` -- agar `true` bo'lsa, option tanlangan.

`defaultSelected` va `selected` orasidagi farq shundaki, `defaultSelected` HTML-atributni o'rnatadi (uni `option.getAttribute('selected')` dan foydalanib olishimiz mumkin), `selected` esa option tanlanganligini yoki tanlanmaganligini belgilaydi.

Amalda, odatda ikkala qiymatni ham `true` yoki `false` ga o'rnatish kerak. (Yoki, shunchaki ularni o'tkazib yuborish; ikkalasi ham standart ravishda `false`.)

Masalan, mana yangi "tanlanmagan" option:

```js
let option = new Option("Matn", "qiymat");
// <option value="qiymat">Matn</option> yaratadi
```

Xuddi shu option, lekin tanlangan:

```js
let option = new Option("Matn", "qiymat", true, true);
```

Option elementlari xossalarga ega:

`option.selected`
: Option tanlanganmi.

`option.index`
: O'z `<select>` idagi boshqalar orasida optionning raqami.

`option.text`
: Optionning matn mazmuni (tashrif buyuruvchi tomonidan ko'riladi).

## Havolalar

- Spetsifikatsiya: <https://html.spec.whatwg.org/multipage/forms.html>.

## Xulosa

Forma navigatsiyasi:

`document.forms`
: Forma `document.forms[name/index]` sifatida mavjud.

`form.elements`  
: Forma elementlari `form.elements[name/index]` sifatida mavjud yoki shunchaki `form[name/index]` dan foydalanish mumkin. `elements` xossasi `<fieldset>` uchun ham ishlaydi.

`element.form`
: Elementlar o'z formasiga `form` xossasida havola qiladi.

Qiymat `input.value`, `textarea.value`, `select.value` va h.k. sifatida mavjud. (Checkbox va radio tugmalar uchun qiymat tanlanganligini aniqlash uchun `input.checked` dan foydalaning.)

`<select>` uchun qiymatni `select.selectedIndex` indeksi orqali yoki `select.options` optionlar kolleksiyasi orqali ham olish mumkin.

Bular formalar bilan ishlashni boshlash uchun asoslar. Darslikda keyinroq ko'plab misollarni uchratamiz.

Keyingi bobda biz har qanday elementda sodir bo'lishi mumkin bo'lgan, lekin asosan formalarda qayta ishlanadigan `focus` va `blur` hodisalarini ko'rib chiqamiz.