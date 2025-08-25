# Hello, world! ("Salom, Dunyo!")

O'quv qo'llanmaning ushbu qismi asosiy JavaScript haqida, ya'ni tilning o'zi haqida. Keyinchalik, siz Node.js va undan foydalanadigan boshqa platformalar haqida ma'lumot olasiz.

Skriptlarimizni ishga tushirish uchun bizga ish muhiti kerak. Bu kitob onlayn bo'lganligi sababli, brauzer yaxshi tanlov hisoblanadi. Brauzerga xos buyruqlar miqdorini (masalan, `alert("ogohlantirish")`) minimal darajada keltiramiz, shunda agar siz boshqa muhitda (masalan, Node.js) ishlashni rejalashtirmoqchi bo'lsangiz, ularga vaqt sarflamaysiz. Biz o'quv qo'llanmasining [keyingi qismida](/ui) brauzerda JavaScript-ga e'tibor qaratamiz.

Shunday qilib, avval veb-sahifaga skriptni qanday biriktirish mumkinligini ko'rib chiqamiz. Server tomoni (masalan, Node.js) uchun siz `"node my.js"` buyrug'i bilan uni bajarishingiz mumkin.

## "script" HTML tegi

JavaScript dasturlarini HTML hujjatning istalgan qismiga `<script>` tegi yordamida kiritish mumkin.

Masalan:

```html run height=100
<!DOCTYPE html>
<html>
  <body>
    <p>Skriptdan oldin...</p>

    *!*
    <script>
      alert("Hello, world!");
    </script>
    */!*

    <p>...Skriptdan keyin.</p>
  </body>
</html>
```

```online
Yuqoridagi misolning o'ng yuqori burchagidagi "Play" tugmasini bosish orqali siz uni ishga tushirishingiz mumkin.
```

`<script>` tegi JavaScript kodini o'z ichiga oladi va brauzer tegni uchraganida uni avtomatik ravishda qayta ishlaydi.

## Zamonaviy belgilar

`<script>` tegi bugungi kunda kamdan-kam ishlatiladigan, ammo eski kodlarda mavjud bo'lgan bir nechta atributlarga ega:

**type atributi**: <code>&lt;script <u>type</u>=...&gt;</code>
: Eski HTML standarti (HTML4) skriptlarning "type" (tur)ga ega bo'lishini talab qilgan edi. Odatda bu `type="text/javascript"` bo'lgan. Endi bu talab qilinmaydi. Shuningdek, zamonaviy HTML standarti (HTML5) ushbu atributning ma'nosini butunlay o'zgartirdi. Endi u JavaScript modullari uchun ishlatilishi mumkin. Ammo bu ilg'or mavzu; modullar haqida o'quv qo'llanmasining boshqa qismida gaplashamiz.

**language atributi**: <code>&lt;script <u>language</u>=...&gt;</code>
: Ushbu atribut skriptning tilini ko'rsatish uchun mo'ljallangan edi. Ushbu atribut endi ma'noga ega emas, chunki JavaScript standart til hisoblanadi. Uni ishlatishga hojat yo'q.

**Skriptlardan oldin va keyingi izohlar**:
: Juda qadimiy kitoblar va qo'llanmalarda siz quyidagi kabi `<script>` teglarining ichida izohlarni topishingiz mumkin:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Ushbu hiyla zamonaviy JavaScript-da ishlatilmaydi. Ushbu izohlar JavaScript kodini `<script>` tegini qanday ishlashini bilmagan eski brauzerlardan yashirgan. So'nggi 15 yil ichida chiqarilgan brauzerlarda bunday muammo yo'qligi sababli, bunday izoh sizga faqat eski kodni aniqlashda yordam beradi.

## Tashqi skriptlar

Agar bizda JavaScript kodi ko'p bo'lsa, uni alohida faylga joylashtirish mumkin.

Skript fayllari HTML-ga `src` atributi bilan biriktiriladi:

```html
<script src="/path/to/script.js"></script>
```

Bu yerda `/path/to/script.js` - skript fayliga (sayt ildizidan) mutlaq yo'l.

Joriy sahifadan nisbiy yo'lni ham ko'rsatish mumkin. Masalan, `src="script.js"` joriy papkada joylashgan `"script.js"` faylini bildiradi.

To'liq URL manzilini ham berish mumkin. Masalan:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

Bir nechta skriptlarni biriktirish uchun bir nechta tegdan foydalaning:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Qoida tariqasida, HTML-ga faqat eng sodda skriptlar joylashtiriladi. Murakkablari alohida fayllarda saqlanadi.

Alohida faylning foydasi shundaki, brauzer uni yuklab olib, o'zining [keshida](https://en.wikipedia.org/wiki/Web_cache) saqlaydi.

Xuddi shu skriptga murojaat qilgan boshqa sahifalar uni qayta yuklab olish o'rniga keshdan oladi, shuning uchun fayl aslida faqat bir marta yuklab olinadi.

Bu trafikni kamaytiradi va sahifalarni tezlashtiradi.
```

````warn header="Agar `src` o'rnatilgan bo'lsa, skript mazmuniga e'tibor berilmaydi."
Bitta `<script>` tegida ham `src` atributi, ham ichki kod bo'lishi mumkin emas.

Bu ishlamaydi:

```html
<script *!*src*/!*="file.js">
  alert(1); // mazmuniga e'tibor berilmaydi, chunki src o'rnatilgan
</script>
```

Biz tashqi `<script src="…">` yoki ichki kod bilan `<script>` dan birini tanlashimiz kerak.

Yuqoridagi misolni ishlashi uchun ikkita skriptga bo'lish mumkin:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Xulosa

- Sahifaga JavaScript kodi qo'shish uchun `<script>` tegidan foydalanishimiz mumkin.
- `type` va `language` atributlari talab qilinmaydi.
- Tashqi fayldan skript `<script src="path/to/script.js"></script>` ko'rinishida qo'shilishi mumkin.

Brauzer skriptlari va ularning veb-sahifa bilan o'zaro aloqalari haqida ko'proq ma'lumot olish mumkin. Shuni yodda tutingki, o'quv qo'llanmasining ushbu qismi JavaScript tiliga bag'ishlangan, shuning uchun uni brauzerga xos dasturlar bilan aralashtirib yubormasligimiz kerak. Biz brauzerni JavaScript-ni ishga tushirish usuli sifatida ishlatamiz, bu onlayn o'qish uchun juda qulay, lekin ko'plab usullardan faqat bittasi.