# "switch" ifodasi

`Switch` ifodasi bir nechta `if` tekshiruvlarini almashtirishi mumkin.

Bu qiymatni bir nechta variant bilan taqqoslashning yanada tavsiflovchi usulini beradi.

## Sintaksis

`Switch` bir yoki bir nechta `case` bloklariga ega va ixtiyoriy sukut bo'yicha.

Bu shunday ko'rinishga ega:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- `x` qiymati birinchi `case` dan qat'iy tenglik tekshiriladi (ya'ni `value1`) keyin ikkinchisiga (`value2`) va boshqalar.
- Agar tenglik topilsa, `switch` mos keladigan `case` dan boshlab, eng yaqin `break` ga qadar (yoki `switch` tugaguniga qadar) kodni bajarishni boshlaydi.
- Agar biron bir holat mos kelmasa, u holda `default` kodi bajariladi (agar mavjud bo'lsa).

## Misol

`Switch` misoli (bajarilgan kod ajratilgan):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Juda kichik' );
    break;
*!*
  case 4:
    alert( 'Aynan!' );
    break;
*/!*
  case 5:
<<<<<<< HEAD:1-js/02-first-steps/13-switch/article.md
    alert( 'Juda katta' );
=======
    alert( 'Too big' );
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/14-switch/article.md
    break;
  default:
    alert( "Men bunday qiymatlarni bilmayman" );
}
```

Bu erda `switch` `3` bo'lgan birinchi `case` variantidan `a` ni taqqoslashni boshlaydi. Taqqoslash muvaffaqiyatsiz tugadi.

Keyin `4`. Bu to'g'ri, shuning uchun ijro `case 4` dan eng yaqin `break` ga qadar boshlanadi.

**Agar `break` bo'lmasa, ijro keyingi `case` ga hech qanday tekshiruvsiz davom etadi.**

`break` siz misol:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Juda kichik' );
*!*
  case 4:
    alert( 'Aynan!' );
  case 5:
    alert( 'Juda katta' );
  default:
    alert( "Men bunday qiymatlarni bilmayman" );
*/!*
}
```

Yuqoridagi misolda biz uchta `alert` ning ketma-ket bajarilishini ko'ramiz:

```js
alert( 'Aynan!' );
alert( 'Juda katta' );
alert( "Men bunday qiymatlarni bilmayman" );
```

````smart header="Har qanday ifoda `switch/case` argumenti bo'lishi mumkin"
Ikkala `switch` va `case` o'zboshimchalik bilan ifodalashga imkon beradi.

Masalan:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("bu ishlaydi, chunki +a bu 1, aynan b + 1 ga teng");
    break;
*/!*

  default:
    alert("bu ishlamaydi");
}
```
Bu yerda `+a` `1` ni beradi, bu `b` bilan `case` da taqqoslanadi va tegishli kod bajariladi.

````

## "Case" ning guruhlanishi

Bir xil kodga ega bo'lgan `case` ning bir nechta variantlarini guruhlash mumkin.

Masalan, agar biz bir xil kodni `case 3` va `case 5` uchun ishlashini istasak:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert("To'g'ri!");
    break;

*!*
<<<<<<< HEAD:1-js/02-first-steps/13-switch/article.md
  case 3:                    // (*) ikkita case guruhlashtirildi
=======
  case 3: // (*) grouped two cases
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/14-switch/article.md
  case 5:
    alert("Noto'g'ri!");
    alert("Nega siz matematikadan dars olmagansiz?");
    break;
*/!*

  default:
    alert('Natija g'alati. Haqiqatan ham.');
}
```

Endi `3` va `5` holat bir xil xabarni ko'rsatadi.

<<<<<<< HEAD
Holatning "guruhlash" qobiliyati - bu `switch/case` ning `break`siz ishlashining yon ta'siri. Bu erda `3` holatning bajarilishi `(*)` satridan boshlanadi va `5` holatidan o'tadi, chunki `break` yo'q.
=======
The ability to "group" cases is a side effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Turi muhim

Shuni ta'kidlaylikki, tenglikni tekshirish har doim qat'iydir. Qiymatlar mos kelish uchun bir xil turda bo'lishi kerak.

Masalan, quyidagi kodni ko'rib chiqaylik:

```js run
let arg = prompt("Qiymatni kiriting?");
switch (arg) {
  case '0':
  case '1':
    alert( 'Bir yoki nol' );
    break;

  case '2':
    alert( 'Ikki' );
    break;

  case 3:
    alert( 'Hech qachon bajarilmaydi!' );
    break;
  default:
    alert( 'Noma'lum qiymat' );
}
```

1. `0`, `1` uchun birinchi `alert` ishlaydi.
2. `2` uchun ikkinchi `alert` ishlaydi.
3. Ammo `3` uchun `prompt` natijasi `"3"` matnidir, bu `3` raqamiga qat'iy teng emas `===`. Shunday qilib `case 3` da o'lik kod bor! `Default` holat bajariladi.
