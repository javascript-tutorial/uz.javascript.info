# Hello, world!("Salom Dunyo!")

O'quv qo'llanmaning ushbu qismi asosiy JavaScript haqida, tilning o'zi haqida. Keyinchalik, siz Node.js va undan foydalanadigan boshqa platformalar haqida ma'lumotga ega bo'lasiz.

Bizning skriptlarimizning ishga tushirish uchun bizga ish muhiti kerak, bu kitob onlayn bo'lganligi uchun brauzer yaxshi tanlovdir. Brauzerga xos buyruqlar miqdorini (masalan, alert("ogohlantirish")) minimal darajada taqdim qilamiz, shunda siz boshqa muhitda (masalan, Node.js) diqqat qilishni rejalashtirmoqchi bo'lsangiz, ularga vaqt sarflamaysiz. Biz o'quv qo'llanmasining [keyingi qismida](/ui) brauzerda JavaScript-ga e'tibor qaratamiz.

Shunday qilib, avval veb-sahifaga skriptni qanday biriktirishimizni ko'rib chiqamiz. Server-tomon (masalan, Node.js) uchun siz `"node my.js"` buyrug'i bilan bajarishingiz mumkin.


## HTML "script" tegi

JavaScript dasturlari HTML hujjatning istalgan qismiga `<script>` tegi yordamida kiritilishi mumkin.

Masalan:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Skriptdan oldin...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...Skriptdan keyin.</p>

</body>

</html>
```

```online
Yuqoridagi katakchaning o'ng yuqori burchagidagi "Play" tugmasini bosish orqali siz misolni ishga tushirishingiz mumkin.
```

`<script>` tegi JavaScript kodini o'z ichiga oladi va brauzer avtomatik ravishda tegni jarayonlaydi.


## Zamonaviy belgilar

`<script>` tegi bugungi kunda kamdan-kam ishlatiladigan, ammo eski kodda mavjud bo'lgan bir nechta atributlarga ega:

Atribut `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Eski HTML standarti, HTML4, skriptlar "type"("tur") ga ega bo'lishni talab qilar edi. Odatda bu `type="text/javascript"` edi. Bu endi talab qilinmaydi. Shuningdek, zamonaviy HTML standarti, HTML5, ushbu atributning ma'nosini butunlay o'zgartirdi. Endi u JavaScript modullari uchun ishlatilishi mumkin. Ammo bu ilg'or mavzu; modullar haqida darslikning boshqa qismida gaplashamiz.

Atribut `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Ushbu atribut scriptning tilini ko'rsatish uchun mo'ljallangan edi. Ushbu atribut endi mantiqiy emas, chunki JavaScript standart til hisoblanadi. Uni ishlatishga hojat yo'q.

Skriptlardan oldin va keyingi izohlar.
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:
Juda qadimiy kitoblar va qo'llanmalarda siz quyidagi kabi `<script>` teglarining ichida izohlarni topishingiz mumkin:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Ushbu hiyla zamonaviy JavaScript-da ishlatilmaydi. Ushbu sharhlar JavaScript kodini `<script>` tegini qanday ishlashini bilmagan eski brauzerlardan yashirgan. So'nggi 15 yil ichida chiqarilgan brauzerlarda bunday muammo bo'lmaganligi sababli, bunday sharh sizga eski kodni aniqlashda yordam beradi.


## Tashqi skriptlar

Agar bizda JavaScript kodlari ko'p bo'lsa, uni alohida faylga qo'yishimiz mumkin.

Skript fayllari HTML-ga `src` atributi bilan biriktirilgan:

```html
<script src="/path/to/script.js"></script>
```

Bu erda, `/path/to/script.js` - bu skript fayliga (sayt ildizidan) mutlaq yo'l.

Joriy sahifadan nisbiy yo'lni ham taqdim etishingiz mumkin. Masalan, `src="script.js"` joriy papkada `"script.js"` faylini bildiradi.

Biz to'liq URL manzilini ham berishimiz mumkin. Masalan:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Bir qancha skriptlarni biriktirish uchun bir nechta teglardan foydalaning:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Qoida tariqasida HTML-ga faqat eng sodda skriptlar qo'yiladi. Nurakkabllari alohida fayllarda joylashiladi.

Alohida faylning foydasi shundaki, brauzer uni yuklab olib, o'z [keshida](https://en.wikipedia.org/wiki/Web_cache) saqlaydi .

Xuddi shu skriptga murojaat qilgan boshqa sahifalar uni yuklab olish o'rniga keshdan oladi, shuning uchun fayl aslida faqat bir marta yuklab olinadi.

Bu trafikni kamaytiradi va sahifalarni tezlashtiradi. 
```

````warn header="Agar `src` o'rnatilgan bo'lsa, skript tarkibiga e'tibor berilmaydi."
A single `<script>` tag can't have both the `src` attribute and code inside.
Bitta `<script>` tegning ichida `src` atributi va kod bo'lishi mumkin emas.

Bu ishlamaydi:

```html
<script *!*src*/!*="file.js">
  alert(1); // tarkibga e'tibor berilmaydi, chunki src o'rnatilgan
</script>
```

Biz tashqi `<script src="…">` ni yoki odatdagi kod bilan `<script>` ni tanlashimiz kerak.

Yuqoridagi misolni ishlash uchun ikkita skriptga bo'lish mumkin:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Xulosa

- JavaScript kodini sahifaga qo'shish uchun `<script>` tegidan foydalanishimiz mumkin.
- `type` va `language` atributlar talab qilinmaydi.
- Tashqi faylga skript `<script src="path/to/script.js"></script>` "src" atribut yordamida qo'shilishi mumkin .


Brauzer skriptlari va ularning veb-sahifa bilan o'zaro aloqalari haqida ko'proq bilib olish mumkin. Shuni yodda tutingki, o'quv qo'llanmaning ushbu qismi JavaScript tiliga bag'ishlangan, shuning uchun uni brauzerga xos dasturlar bilan chalg'itmasligimiz kerak. Biz brauzerni JavaScript-ni ishga tushirish usuli sifatida ishlatamiz, bu onlayn o'qish uchun juda qulay, ammo ko'pchiligidan bittasi.
