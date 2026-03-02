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

<<<<<<< HEAD
Ular [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) sinfiga tegishli va nusxalangan/joylashtirilgan ma'lumotlarga kirish imkonini beradi.
=======
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Harakatni bekor qilish uchun `event.preventDefault()` dan ham foydalanishimiz mumkin, shunda hech narsa nusxalanmaydi/joylanmaydi.

<<<<<<< HEAD
Masalan, quyidagi kod barcha bunday hodisalarning oldini oladi va biz nima kesishga/nusxalashga/joylashtirshga harakat qilayotganimizni ko'rsatadi:
=======
For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

<<<<<<< HEAD
Diqqat qiling, nafaqat matn, balki hamma narsani nusxalash/joylashtirish mumkin. Masalan, biz OS fayl menejerida faylni nusxalashimiz va uni joylashtirshimiz mumkin.

Buning sababi `clipboardData` odatda drag'n'drop va nusxalash/joylashtirish uchun ishlatiladigan `DataTransfer` interfeysini amalga oshiradi. Bu hozir bizning qamrov doiramizdan biroz tashqarida, lekin siz uning metodlarini [spetsifikatsiyada](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface) topishingiz mumkin.

```warn header="ClipboardAPI: foydalanuvchi xavfsizligi cheklovlari"
Clipboard "global" OS darajasidagi narsa. Shuning uchun ko'pgina brauzerlar xavfsizlik uchun clipboard ga o'qish/yozish kirishiga faqat ma'lum foydalanuvchi harakatlari doirasida ruxsat beradi, masalan `onclick` hodisa ishlov beruvchilarida.

Shuningdek, Firefox bundan mustasno barcha brauzerlarda `dispatchEvent` bilan "maxsus" clipboard hodisalarini yaratish taqiqlangan.
```
=======
Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "synthetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Xulosa

Ma'lumot o'zgarishi hodisalari:

| Hodisa | Tavsif | Xususiyatlar |
|---------|----------|-------------|
<<<<<<< HEAD
| `change`| Qiymat o'zgartirildi. | Matn inputlari uchun fokus yo'qotilganda ishga tushadi. |
| `input` | Matn inputlari uchun har o'zgarishda. | `change` dan farqli o'laroq darhol ishga tushadi. |
| `cut/copy/paste` | Kesish/nusxalash/joylashtirish harakatlari. | Harakatning oldini olish mumkin. `event.clipboardData` xossasi clipboard ga o'qish/yozish kirishini beradi. |
=======
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
