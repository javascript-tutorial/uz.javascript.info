# Sichqoncha hodisalari

Ushbu bobda sichqoncha hodisalari va ularning xossalari haqida batafsil ma'lumot beramiz.

Diqqat qiling: bunday hodisalar nafaqat "sichqoncha qurilmalaridan", balki telefon va planshetlar kabi boshqa qurilmalardan ham kelishi mumkin, ularda moslashuvchanlik uchun taqlid qilinadi.

## Sichqoncha hodisalari turlari

Biz bu hodisalarning ba'zilarini allaqachon ko'rganmiz:

`mousedown/mouseup`
: Element ustida sichqoncha tugmasi bosilganda/qo'yib yuborilganda.

`mouseover/mouseout`
: Sichqoncha ko'rsatkichi elementga kelganda/chiqib ketganda.

`mousemove`
: Element ustidagi har bir sichqoncha harakati ushbu hodisani ishga tushiradi.

`click`
: Chap sichqoncha tugmasi ishlatilganda bir xil element ustida `mousedown` va keyin `mouseup` dan keyin ishga tushadi.

`dblclick`
: Qisqa vaqt ichida bir xil elementda ikki marta bosishdan keyin ishga tushadi. Hozirgi kunda kamdan-kam qo'llaniladi.

`contextmenu`
: O'ng sichqoncha tugmasi bosilganda ishga tushadi. Kontekst menyusini ochishning boshqa usullari ham bor, masalan maxsus klaviatura tugmasidan foydalanish, bu holda ham ishga tushadi, shuning uchun bu aynan sichqoncha hodisasi emas.

...Boshqa bir nechta hodisalar ham bor, ularni keyinroq ko'rib chiqamiz.

## Hodisalar tartibi

Yuqoridagi ro'yxatdan ko'rib turganimizdek, foydalanuvchi harakati bir nechta hodisalarni ishga tushirishi mumkin.

Masalan, chap tugmani bosish avval tugma bosilganda `mousedown`, keyin qo'yib yuborilganda `mouseup` va `click` ni ishga tushiradi.

Bitta harakat bir nechta hodisalarni boshlagan hollarda, ularning tartibi belgilangan. Ya'ni, ishlov beruvchilar `mousedown` -> `mouseup` -> `click` tartibida chaqiriladi.

```online
Quyidagi tugmani bosing va hodisalarni ko'rasiz. Ikki marta bosishni ham sinab ko'ring.

Quyidagi test stendida barcha sichqoncha hodisalari qayd qilinadi va agar ular orasida 1 soniyadan ko'proq kechikish bo'lsa, ular gorizontal chiziq bilan ajratiladi.

Shuningdek, sichqoncha tugmasini aniqlashga imkon beruvchi `button` xossasini ko'rishimiz mumkin, u quyida tushuntiriladi.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Menga o'ng yoki chap sichqoncha tugmasi bilan bosing" type="button"> <input onclick="logClear('test')" value="Tozalash" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Sichqoncha tugmasi

Bosishga bog'liq hodisalar doim aynan qaysi sichqoncha tugmasini olish imkonini beruvchi `button` xossasiga ega.

Biz odatda uni `click` va `contextmenu` hodisalari uchun ishlatmaymiz, chunki birinchisi faqat chap bosishda, ikkinchisi esa faqat o'ng bosishda sodir bo'ladi.

Boshqa tomondan, `mousedown` va `mouseup` ishlov beruvchilari `event.button` ga muhtoj bo'lishi mumkin, chunki bu hodisalar har qanday tugmada ishga tushadi, shuning uchun `button` "o'ng-mousedown" va "chap-mousedown" o'rtasida farq qilish imkonini beradi.

`event.button` ning mumkin bo'lgan qiymatlari:

| Tugma holati | `event.button` |
|--------------|----------------|
| Chap tugma (asosiy) | 0 |
| O'rta tugma (yordamchi) | 1 |
| O'ng tugma (ikkinchi darajali) | 2 |
| X1 tugma (orqaga) | 3 |
| X2 tugma (oldinga) | 4 |

Ko'pgina sichqoncha qurilmalarida faqat chap va o'ng tugmalar bor, shuning uchun mumkin bo'lgan qiymatlar `0` yoki `2`. Sensorli qurilmalar ham ularga teginishda shunga o'xshash hodisalarni hosil qiladi.

Shuningdek, hozirda bosilgan barcha tugmalarni butun son sifatida saqlagan `event.buttons` xossasi mavjud, har bir tugma uchun bitta bit. Amalda bu xossasi juda kamdan-kam ishlatiladi, agar kerak bo'lsa [MDN](mdn:/api/MouseEvent/buttons) da tafsilotlarni topishingiz mumkin.

```warn header="Eskirgan `event.which`"
Eski kod tugmani olishning eski nostandart usuli bo'lgan `event.which` xossasidan foydalanishi mumkin, mumkin bo'lgan qiymatlari:

- `event.which == 1` – chap tugma,
- `event.which == 2` – o'rta tugma,
- `event.which == 3` – o'ng tugma.

Hozirgi vaqtda `event.which` eskirgan, uni ishlatmasligimiz kerak.
```

## Modifikatorlar: shift, alt, ctrl va meta

Barcha sichqoncha hodisalari bosilgan modifikator tugmalar haqida ma'lumotni o'z ichiga oladi.

Hodisa xossalari:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (yoki Mac uchun `key:Opt`)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: Mac uchun `key:Cmd`

Hodisa paytida mos tugma bosilgan bo'lsa, ular `true` bo'ladi.

Masalan, quyidagi tugma faqat `key:Alt+Shift`+bosishda ishlaydi:

```html autorun height=60
<button id="button">Alt+Shift+Menga bosing!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Yaxshi!');
    }
  };
</script>
```

```warn header="Diqqat: Mac da odatda `Ctrl` o'rniga `Cmd` ishlatiladi"
Windows va Linux da `key:Alt`, `key:Shift` va `key:Ctrl` modifikator tugmalari mavjud. Mac da yana bitta bor: `key:Cmd`, u `metaKey` xossasiga mos keladi.

Ko'pgina ilovalarda Windows/Linux `key:Ctrl` dan foydalanganda, Mac da `key:Cmd` ishlatiladi.

Ya'ni: Windows foydalanuvchisi `key:Ctrl+Enter` yoki `key:Ctrl+A` bosganda, Mac foydalanuvchisi `key:Cmd+Enter` yoki `key:Cmd+A` bosadi va hokazo.

Shuning uchun agar biz `key:Ctrl`+bosish kabi kombinatsiyalarni qo'llab-quvvatlashni istasak, Mac uchun `key:Cmd`+bosishdan foydalanish mantiqiy. Bu Mac foydalanuvchilari uchun qulayroq.

Hatto Mac foydalanuvchilarini `key:Ctrl`+bosishga majbur qilishni istasak ham -- bu qiyin. Muammo shundaki: `key:Ctrl` bilan chap bosish MacOS da *o'ng bosish* sifatida talqin qilinadi va Windows/Linux kabi `click` emas, balki `contextmenu` hodisasini hosil qiladi.

Shuning uchun barcha operatsion tizim foydalanuvchilari o'zlarini qulay his qilishlari uchun `ctrlKey` bilan birga `metaKey` ni ham tekshirishimiz kerak.

JS-kod uchun bu `if (event.ctrlKey || event.metaKey)` ni tekshirish kerakligini anglatadi.
```

```warn header="Mobil qurilmalar ham bor"
Klaviatura kombinatsiyalari ish jarayoniga qo'shimcha sifatida yaxshi. Shuning uchun agar tashrif buyuruvchi klaviaturadan foydalansa -- ular ishlaydi.

Lekin agar ularning qurilmasida u bo'lmasa -- modifikator tugmalar ishlatasiz yashash usuli bo'lishi kerak.
```

## Koordinatalar: clientX/Y, pageX/Y

Barcha sichqoncha hodisalari koordinatalarni ikki xilda taqdim etadi:

1. Oynaga nisbatan: `clientX` va `clientY`.
2. Hujjatga nisbatan: `pageX` va `pageY`.

Biz ular orasidagi farqni <info:coordinates> bobida allaqachon ko'rib chiqdik.

Qisqacha qilib aytganda, hujjatga nisbatan koordinatalar `pageX/Y` hujjatning chap-yuqori burchagidan hisoblanadi va sahifa aylantirilganda o'zgarmaydi, `clientX/Y` esa joriy oynaning chap-yuqori burchagidan hisoblanadi. Sahifa aylantirilganda ular o'zgaradi.

Masalan, agar bizda 500x500 o'lchamdagi oyna bo'lsa va sichqoncha chap-yuqori burchakda bo'lsa, sahifa qanday aylantirilishidan qat'i nazar `clientX` va `clientY` `0` bo'ladi.

Va agar sichqoncha markazda bo'lsa, hujjatda qaysi joyda bo'lishidan qat'i nazar `clientX` va `clientY` `250` bo'ladi. Ular `position:fixed` ga o'xshash.

````online
`clientX/clientY` ni ko'rish uchun sichqonchani kiritish maydoni ustida harakat qildiring (misol `iframe` da, shuning uchun koordinatalar o'sha `iframe` ga nisbatan):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Sichqonchani ustimga olib keling">
```
````

## mousedown da tanlovni oldini olish

Ikki marta sichqoncha bosish ba'zi interfeyslarda bezovta qiluvchi yon ta'sirga ega: u matnni tanlaydi.

Masalan, quyidagi matnni ikki marta bosish bizning ishlov beruvchimizdan tashqari uni tanlaydi:

```html autorun height=50
<span ondblclick="alert('dblclick')">Menga ikki marta bosing</span>
```

Agar kimdir chap sichqoncha tugmasini bosib, uni qo'yib yubormasdan sichqonchani siljitsa, bu ham tanlovni yaratadi, ko'pincha istalmagan.

Tanlovni oldini olishning bir necha usuli bor, ularni <info:selection-range> bobida o'qishingiz mumkin.

Bu holatda eng oqilona usul `mousedown` da brauzer harakatining oldini olishdir. Bu ikkala tanlovni ham oldini oladi:

```html autorun height=50
Oldin...
<b ondblclick="alert('Bosish!')" *!*onmousedown="return false"*/!*>
  Menga ikki marta bosing
</b>
...Keyin
```

Endi qalin element ikki marta bosishda tanlanmaydi va unga chap tugmani bosish tanlovni boshlamaydi.

Diqqat qiling: uning ichidagi matn hali ham tanlanadi. Biroq, tanlash matnning o'zida emas, balki undan oldin yoki keyin boshlanishi kerak. Odatda bu foydalanuvchilar uchun yaxshi.

````smart header="Nusxalashning oldini olish"
Agar biz sahifa mazmunini nusxa-qo'yishdan himoya qilish uchun tanlovni o'chirib qo'ymoqchi bo'lsak, boshqa hodisadan foydalanishimiz mumkin: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Nusxalash taqiqlangan!');return false"*/!*>
  Hurmatli foydalanuvchi,
  Sizga nusxalash taqiqlangan.
  Agar siz JS yoki HTML bilsangiz, sahifa manbasidan hamma narsani olishingiz mumkin.
</div>
```
Agar siz `<div>` da matn qismini nusxalashga harakat qilsangiz, bu ishlamaydi, chunki standart harakat `oncopy` ning oldini olindi.

Albatta foydalanuvchi sahifaning HTML-manbasiga kirish huquqiga ega va mazmunni u yerdan olishi mumkin, lekin hammasi buni qanday qilishni bilmaydi.
````

## Xulosa

Sichqoncha hodisalari quyidagi xossalarga ega:

- Tugma: `button`.
- Modifikator tugmalar (bosilgan bo'lsa `true`): `altKey`, `ctrlKey`, `shiftKey` va `metaKey` (Mac).
  - Agar siz `key:Ctrl` ni qayta ishlamoqchi bo'lsangiz, Mac foydalanuvchilarni unutmang, ular odatda `key:Cmd` dan foydalanadilar, shuning uchun `if (e.metaKey || e.ctrlKey)` ni tekshirish yaxshiroq.

- Oynaga nisbatan koordinatalar: `clientX/clientY`.
- Hujjatga nisbatan koordinatalar: `pageX/pageY`.

`mousedown` ning standart brauzer harakati matnni tanlashdir, agar bu interfeys uchun yaxshi bo'lmasa, oldini olish kerak.

Keyingi bobda biz ko'rsatkich harakati va uning ostidagi elementlar o'zgarishlarini qanday kuzatish haqida ko'proq tafsilotlarni ko'ramiz.