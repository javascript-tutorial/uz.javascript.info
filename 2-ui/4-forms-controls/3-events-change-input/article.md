# Hodisalar: change, input, cut, copy, paste

Ma'lumot yangilanishlari bilan birga keladigan turli hodisalarni ko'rib chiqamiz.

## Hodisa: change

`change` hodisasi element o'zgarishni tugatganda ishga tushadi.

Matn inputlari uchun bu hodisaning fokusni yo'qotganda sodir bo'lishini anglatadi.

Masalan, quyidagi matn maydonida yozayotganimizda -- hodisa bo'lmaydi. Lekin fokusni boshqa joyga, masalan tugmaga bosganimizda -- `change` hodisasi bo'ladi:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Tugma">
```

Boshqa elementlar uchun: `select`, `input type=checkbox/radio` tanlash o'zgarishidan keyin darhol ishga tushadi:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Biror narsani tanlang</option>
  <option value="1">1-variant</option>
  <option value="2">2-variant</option>
  <option value="3">3-variant</option>
</select>
```

## Hodisa: input

`input` hodisasi foydalanuvchi tomonidan qiymat o'zgartirilgandan keyin har safar ishga tushadi.

Klaviatura hodisalaridan farqli o'laroq, u har qanday qiymat o'zgarishida, hatto klaviatura harakatlarini o'z ichiga olmaganlarida ham ishga tushadi: sichqoncha bilan joylashtirish yoki matnni aytish uchun nutqni tanish texnologiyasidan foydalanish.

Masalan:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Agar biz `<input>` ning har bir o'zgarishini qayta ishlamoqchi bo'lsak, bu hodisa eng yaxshi tanlovdir.

Boshqa tomondan, `input` hodisasi klaviatura kiritish va qiymat o'zgarishini o'z ichiga olmaydigan boshqa harakatlarda, masalan inputda bo'lganida o'q tugmalarini `key:⇦` `key:⇨` bosganda ishga tushmaydi.

```smart header="`oninput` da hech narsaning oldini ololmaymiz"
`input` hodisasi qiymat o'zgartirilgandan keyin sodir bo'ladi.

Shuning uchun biz u yerda `event.preventDefault()` dan foydalana olmaymiz -- bu juda kech, hech qanday ta'sir bo'lmaydi.
```

## Hodisalar: cut, copy, paste

Bu hodisalar qiymatni kesish/nusxalash/joylashtirish paytida sodir bo'ladi.

Ular [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) sinfiga tegishli va nusxalangan/joylashtirilgan ma'lumotlarga kirish imkonini beradi.

Harakatni bekor qilish uchun `event.preventDefault()` dan ham foydalanishimiz mumkin, shunda hech narsa nusxalanmaydi/joylanmaydi.

Masalan, quyidagi kod barcha bunday hodisalarning oldini oladi va biz nima kesishga/nusxalashga/joylashtirshga harakat qilayotganimizni ko'rsatadi:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Diqqat qiling, nafaqat matn, balki hamma narsani nusxalash/joylashtirish mumkin. Masalan, biz OS fayl menejerida faylni nusxalashimiz va uni joylashtirshimiz mumkin.

Buning sababi `clipboardData` odatda drag'n'drop va nusxalash/joylashtirish uchun ishlatiladigan `DataTransfer` interfeysini amalga oshiradi. Bu hozir bizning qamrov doiramizdan biroz tashqarida, lekin siz uning metodlarini [spetsifikatsiyada](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface) topishingiz mumkin.

```warn header="ClipboardAPI: foydalanuvchi xavfsizligi cheklovlari"
Clipboard "global" OS darajasidagi narsa. Shuning uchun ko'pgina brauzerlar xavfsizlik uchun clipboard ga o'qish/yozish kirishiga faqat ma'lum foydalanuvchi harakatlari doirasida ruxsat beradi, masalan `onclick` hodisa ishlov beruvchilarida.

Shuningdek, Firefox bundan mustasno barcha brauzerlarda `dispatchEvent` bilan "maxsus" clipboard hodisalarini yaratish taqiqlangan.
```

## Xulosa

Ma'lumot o'zgarishi hodisalari:

| Hodisa | Tavsif | Xususiyatlar |
|---------|----------|-------------|
| `change`| Qiymat o'zgartirildi. | Matn inputlari uchun fokus yo'qotilganda ishga tushadi. |
| `input` | Matn inputlari uchun har o'zgarishda. | `change` dan farqli o'laroq darhol ishga tushadi. |
| `cut/copy/paste` | Kesish/nusxalash/joylashtirish harakatlari. | Harakatning oldini olish mumkin. `event.clipboardData` xossasi clipboard ga o'qish/yozish kirishini beradi. |