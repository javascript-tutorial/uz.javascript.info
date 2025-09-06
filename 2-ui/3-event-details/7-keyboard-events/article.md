# Klaviatura: keydown va keyup

Klaviaturaga o'tishdan oldin, zamonaviy qurilmalarda "biror narsani kiritish" uchun boshqa usullar ham mavjudligini yodda tuting. Masalan, odamlar ovozni tanish texnologiyasidan foydalanadilar (ayniqsa mobil qurilmalarda) yoki sichqoncha bilan nusxa olish/joylashtirish.

Shuning uchun agar biz `<input>` maydoniga har qanday kirishni kuzatmoqchi bo'lsak, klaviatura hodisalari yetarli emas. `<input>` maydonining o'zgarishlarini har qanday usul bilan kuzatish uchun `input` nomli boshqa hodisa mavjud. Va bu bunday vazifa uchun yaxshiroq tanlov bo'lishi mumkin. Buni keyinroq <info:events-change-input> bobida ko'rib chiqamiz.

Klaviatura hodisalari klaviatura harakatlarini (virtual klaviatura ham hisobga olinadi) qayta ishlashni xohlasak ishlatilishi kerak. Masalan, o'q tugmalari `key:Up` va `key:Down` yoki tezkor tugmalar (tugmalar kombinatsiyalari) ga javob berish uchun.

## Test stendi [#keyboard-test-stand]

```offline
Klaviatura hodisalarini yaxshiroq tushunish uchun [test stendi](sandbox:keyboard-dump) dan foydalanishingiz mumkin.
```

```online
Klaviatura hodisalarini yaxshiroq tushunish uchun quyidagi test stendidan foydalanishingiz mumkin.

Matn maydonida turli tugma kombinatsiyalarini sinab ko'ring.

[codetabs src="keyboard-dump" height=480]
```

## Keydown va keyup

Tugma bosilganda `keydown` hodisasi sodir bo'ladi, keyin uni qo'yib yuborilganda `keyup`.

### event.code va event.key

Hodisa obyektining `key` xossasi belgilarni olish imkonini beradi, `code` xossasi esa "jismoniy tugma kodi"ni olish imkonini beradi.

Masalan, bir xil `key:Z` tugmasi `key:Shift` bilan yoki usiz bosilishi mumkin. Bu bizga ikkita turli belgi beradi: kichik `z` va katta `Z`.

`event.key` aynan belgi bo'lib, u har xil bo'ladi. Lekin `event.code` bir xil:

| Tugma        | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z` (kichik harf)         |`KeyZ`        |
| `key:Shift+Z`|`Z` (katta harf)          |`KeyZ`        |

Agar foydalanuvchi turli tillarda ishlasa, boshqa tilga o'tish `"Z"` o'rniga butunlay boshqa belgi hosil qiladi. Bu `event.key` ning qiymati bo'ladi, `event.code` esa doim bir xil: `"KeyZ"`.

```smart header="\"KeyZ\" va boshqa tugma kodlari"
Har bir tugma klaviaturadagi joylashuviga qarab kodga ega. Tugma kodlari [UI Events code spetsifikatsiyasi](https://www.w3.org/TR/uievents-code/) da tasvirlangan.

Masalan:
- Harf tugmalari `"Key<harf>"` kodlariga ega: `"KeyA"`, `"KeyB"` va h.k.
- Raqam tugmalari kodlarga ega: `"Digit<raqam>"`: `"Digit0"`, `"Digit1"` va h.k.
- Maxsus tugmalar o'z nomlari bilan kodlanadi: `"Enter"`, `"Backspace"`, `"Tab"` va h.k.

Bir nechta keng tarqalgan klaviatura joylashuvlari mavjud va spetsifikatsiya har biri uchun tugma kodlarini beradi.

Ko'proq kodlar uchun [spetsifikatsiyaning alfanumerik bo'limi](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section)ni o'qing yoki yuqoridagi [test stendi](#keyboard-test-stand)da tugmani bosing.
```

```warn header="Katta-kichik harf muhim: `\"KeyZ\"`, `\"keyZ\"` emas"
Aniq ko'rinadi, lekin odamlar hali ham xatolarga yo'l qo'yadilar.

Iltimos, xatolardan saqlaning: `KeyZ`, `keyZ` emas. `event.code=="keyZ"` kabi tekshiruv ishlamaydi: `"Key"`ning birinchi harfi katta bo'lishi kerak.
```

Agar tugma hech qanday belgi bermasa-chi? Masalan, `key:Shift` yoki `key:F1` yoki boshqalar. Bunday tugmalar uchun `event.key` taxminan `event.code` bilan bir xil:

| Tugma        | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` yoki `ShiftLeft`        |

Diqqat qiling, `event.code` aynan qaysi tugma bosilganini ko'rsatadi. Masalan, ko'pgina klaviaturalarda ikkita `key:Shift` tugmasi bor: chap va o'ng tomonda. `event.code` bizga aynan qaysi biri bosilganini aytadi, `event.key` esa tugmaning "ma'nosi" uchun javobgar: u nima ("Shift").

Aytaylik, biz tezkor tugmani qayta ishlashni xohlaymiz: `key:Ctrl+Z` (yoki Mac uchun `key:Cmd+Z`). Ko'pgina matn muharrirlari unga "Bekor qilish" amalini bog'laydi. Biz `keydown` ga tinglovchi o'rnatishimiz va qaysi tugma bosilganini tekshirishimiz mumkin.

Bu yerda dilemma bor: bunday tinglovchida biz `event.key` yoki `event.code` qiymatini tekshirishimiz kerakmi?

Bir tomondan, `event.key` qiymati belgi bo'lib, u tilga qarab o'zgaradi. Agar tashrif buyuruvchi OS da bir nechta tilga ega bo'lib, ular o'rtasida almashsa, bir xil tugma turli belgilarni beradi. Shuning uchun `event.code` ni tekshirish mantiqiy, u doim bir xil.

Bunday:

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Bekor qilish!')
  }
});
```

Boshqa tomondan, `event.code` bilan muammo bor. Turli klaviatura joylashuvlari uchun bir xil tugmada turli belgilar bo'lishi mumkin.

Masalan, bu yerda AQSh joylashuvi ("QWERTY") va uning ostida Nemis joylashuvi ("QWERTZ") (Vikipediyadan):

![](us-layout.svg)

![](german-layout.svg)

Bir xil tugma uchun AQSh joylashuvida "Z" bor, Nemis joylashuvida esa "Y" (harflar almashtirilgan).

Tom ma'noda, Nemis joylashuviga ega odamlar `key:Y` ni bosganda `event.code` `KeyZ` ga teng bo'ladi.

Agar biz kodimizdagi `event.code == 'KeyZ'` ni tekshirsak, Nemis joylashuviga ega odamlar uchun bunday test `key:Y` ni bosganda o'tadi.

Bu haqiqatan ham g'alati eshitiladi, lekin shunday. [Spetsifikatsiya](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) bunday xatti-harakatni aniq eslatadi.

Shunday qilib, `event.code` kutilmagan joylashuv uchun noto'g'ri belgiga mos kelishi mumkin. Turli joylashuvlardagi bir xil harflar turli jismoniy tugmalarga mos kelishi mumkin, bu esa turli kodlarga olib keladi. Yaxshiyamki, bu faqat bir nechta kod bilan sodir bo'ladi, masalan `keyA`, `keyQ`, `keyZ` (ko'rganimizdek), va `Shift` kabi maxsus tugmalar bilan sodir bo'lmaydi. Ro'yxatni [spetsifikatsiya](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system)da topishingiz mumkin.

Joylashuvga bog'liq belgilarni ishonchli kuzatish uchun `event.key` yaxshiroq usul bo'lishi mumkin.

Boshqa tomondan, `event.code` har doim bir xil bo'lib, jismoniy tugma joylashuviga bog'langanligining afzalligi bor, hatto tashrif buyuruvchi tillarni o'zgartirsa ham. Shuning uchun unga tayanadigan tezkor tugmalar til almashtirilgan holatda ham yaxshi ishlaydi.

Biz joylashuvga bog'liq tugmalarni qayta ishlamoqchimizmi? U holda `event.key` yo'li.

Yoki tezkor tugma til almashtirilgandan keyin ham ishlashini xohlaymizmi? U holda `event.code` yaxshiroq bo'lishi mumkin.

## Avtomatik takrorlash

Agar tugma etarlicha uzoq vaqt bosilsa, u "avtomatik takrorlash"ni boshlaydi: `keydown` qayta-qayta ishga tushadi, keyin qo'yib yuborilganda nihoyat `keyup` ni olamiz. Shuning uchun ko'plab `keydown` va bitta `keyup` bo'lishi odatiy holdir.

Avtomatik takrorlash tomonidan ishga tushirilgan hodisalar uchun hodisa obyekti `event.repeat` xossasini `true` ga o'rnatilgan.

## Standart harakatlar

Standart harakatlar turli xil, chunki klaviatura tomonidan boshlanishi mumkin bo'lgan ko'plab mumkin bo'lgan narsalar mavjud.

Masalan:

- Belgi ekranda paydo bo'ladi (eng aniq natija).
- Belgi o'chiriladi (`key:Delete` tugmasi).
- Sahifa aylantiriladi (`key:PageDown` tugmasi).
- Brauzer "Sahifani saqlash" dialogini ochadi (`key:Ctrl+S`)
-  ...va hokazo.

`keydown` da standart harakatning oldini olish ularning ko'pchiligini bekor qilishi mumkin, OS ga asoslangan maxsus tugmalar bundan mustasno. Masalan, Windows da `key:Alt+F4` joriy brauzer oynasini yopadi. Va JavaScript da standart harakatning oldini olish orqali buni to'xtatishning yo'li yo'q.

Masalan, quyidagi `<input>` telefon raqamini kutadi, shuning uchun raqamlar, `+`, `()` yoki `-` dan tashqari tugmalarni qabul qilmaydi:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Telefon, iltimos" type="tel">
```

Diqqat qiling, `key:Backspace`, `key:Left`, `key:Right`, `key:Ctrl+V` kabi maxsus tugmalar kirishda ishlamaydi. Bu qat'iy filtr `checkPhoneKey` ning yon ta'siri.

Uni biroz yumshatamiz:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Telefon, iltimos" type="tel">
```

Endi o'qlar va o'chirish yaxshi ishlaydi.

...Lekin biz hali ham sichqonchani ishlatib va o'ng bosish + Joylashtirish orqali har qanday narsani kiritishimiz mumkin. Shuning uchun filtr 100% ishonchli emas. Biz uni shunday qoldirishimiz mumkin, chunki ko'p hollarda ishlaydi. Yoki muqobil yondashuv `input` hodisasini kuzatish bo'ladi -- u har qanday o'zgarishdan keyin ishga tushadi. U yerda biz yangi qiymatni tekshirishimiz va noto'g'ri bo'lganda uni ajratib ko'rsatish/o'zgartirishimiz mumkin.

## Meros

O'tmishda `keypress` hodisasi va shuningdek hodisa obyektining `keyCode`, `charCode`, `which` xossalari mavjud edi.

Ular bilan ishlashda juda ko'p brauzer nomosliklari bo'lgan, spetsifikatsiya ishlab chiquvchilari ularning barchasini eskirgan deb e'lon qilish va yangi, zamonaviy hodisalar (ushbu bobda yuqorida tasvirlangan) yaratishdan boshqa yo'li yo'q edi. Eski kod hali ham ishlaydi, chunki brauzerlar ularni qo'llab-quvvatlashda davom etadilar, lekin ularni ishlatishning hojati yo'q.

## Mobil klaviaturalar

Virtual/mobil klaviaturalardan foydalanganda, rasmiy ravishda IME (Input-Method Editor) deb nomlanadi, W3C standarti KeyboardEvent ning [`e.keyCode` `229` bo'lishi](https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode) va [`e.key` `"Unidentified"` bo'lishi](https://www.w3.org/TR/uievents-key/#key-attr-values) kerakligini bildiradi.

Bu klaviaturalarning ba'zilari hali ham o'qlar yoki backspace kabi ma'lum tugmalarni bosganda `e.key`, `e.code`, `e.keyCode` uchun to'g'ri qiymatlarni ishlatishi mumkin bo'lsa-da, kafolat yo'q, shuning uchun klaviatura mantiqingiz mobil qurilmalarda har doim ham ishlamasligi mumkin.

## Xulosa

Tugmani bosish har doim klaviatura hodisasini hosil qiladi, xoh u belgi tugmalari bo'lsin yoki `key:Shift` yoki `key:Ctrl` kabi maxsus tugmalar. Yagona istisno ba'zan noutbuk klaviaturasida mavjud bo'lgan `key:Fn` tugmasi. Uning uchun klaviatura hodisasi yo'q, chunki u ko'pincha OS dan pastroq darajada amalga oshiriladi.

Klaviatura hodisalari:

- `keydown` -- tugmani bosganda (tugma uzoq vaqt bosilsa avtomatik takrorlanadi),
- `keyup` -- tugmani qo'yib yuborishda.

Asosiy klaviatura hodisa xossalari:

- `code` -- "tugma kodi" (`"KeyA"`, `"ArrowLeft"` va h.k.), klaviaturadagi tugmaning jismoniy joylashuviga xos.
- `key` -- belgi (`"A"`, `"a"` va h.k.), belgi bo'lmagan tugmalar uchun, masalan `key:Esc`, odatda `code` bilan bir xil qiymatga ega.

O'tmishda klaviatura hodisalari ba'zan forma maydonlaridagi foydalanuvchi kirishini kuzatish uchun ishlatilgan. Bu ishonchli emas, chunki kirish turli manbalardan kelishi mumkin. Bizda har qanday kirishni qayta ishlash uchun `input` va `change` hodisalari mavjud (keyinroq <info:events-change-input> bobida ko'rib chiqiladi). Ular nusxa olish-joylashtirish yoki nutqni tanish kabi har qanday kirish turidan keyin ishga tushadi.

Haqiqatan ham klaviaturani xohlasak klaviatura hodisalarini ishlatishimiz kerak. Masalan, tezkor tugmalar yoki maxsus tugmalarga javob berish uchun.