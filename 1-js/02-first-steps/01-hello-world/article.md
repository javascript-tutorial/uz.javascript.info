# Hello, world!("Salom Dunyo!")

<<<<<<< HEAD
O'quv qo'llanmaning ushbu qismi asosiy JavaScript haqida, tilning o'zi haqida. Keyinchalik, siz Node.js va undan foydalanadigan boshqa platformalar haqida ma'lumotga ega bo'lasiz.
=======
This part of the tutorial is about core JavaScript, the language itself.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bizning skriptlarimizning ishga tushirish uchun bizga ish muhiti kerak, bu kitob onlayn bo'lganligi uchun brauzer yaxshi tanlovdir. Brauzerga xos buyruqlar miqdorini (masalan, alert("ogohlantirish")) minimal darajada taqdim qilamiz, shunda siz boshqa muhitda (masalan, Node.js) diqqat qilishni rejalashtirmoqchi bo'lsangiz, ularga vaqt sarflamaysiz. Biz o'quv qo'llanmasining [keyingi qismida](/ui) brauzerda JavaScript-ga e'tibor qaratamiz.

Shunday qilib, avval veb-sahifaga skriptni qanday biriktirishimizni ko'rib chiqamiz. Server-tomon (masalan, Node.js) uchun siz `"node my.js"` buyrug'i bilan bajarishingiz mumkin.


## HTML "script" tegi

<<<<<<< HEAD
JavaScript dasturlari HTML hujjatning istalgan qismiga `<script>` tegi yordamida kiritilishi mumkin.
=======
JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Atribut `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Eski HTML standarti, HTML4, skriptlar "type"("tur") ga ega bo'lishni talab qilar edi. Odatda bu `type="text/javascript"` edi. Bu endi talab qilinmaydi. Shuningdek, zamonaviy HTML standarti, HTML5, ushbu atributning ma'nosini butunlay o'zgartirdi. Endi u JavaScript modullari uchun ishlatilishi mumkin. Ammo bu ilg'or mavzu; modullar haqida darslikning boshqa qismida gaplashamiz.
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic, we'll talk about modules in another part of the tutorial.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
    Ushbu hiyla zamonaviy JavaScript-da ishlatilmaydi. Ushbu sharhlar JavaScript kodini `<script>` tegini qanday ishlashini bilmagan eski brauzerlardan yashirgan. So'nggi 15 yil ichida chiqarilgan brauzerlarda bunday muammo bo'lmaganligi sababli, bunday sharh sizga eski kodni aniqlashda yordam beradi.
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


## Tashqi skriptlar

Agar bizda JavaScript kodlari ko'p bo'lsa, uni alohida faylga qo'yishimiz mumkin.

Skript fayllari HTML-ga `src` atributi bilan biriktirilgan:

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
<<<<<<< HEAD
Bu erda, `/path/to/script.js` - bu skript fayliga (sayt ildizidan) mutlaq yo'l.

Joriy sahifadan nisbiy yo'lni ham taqdim etishingiz mumkin. Masalan, `src="script.js"` joriy papkada `"script.js"` faylini bildiradi.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"`, just like `src="./script.js"`, would mean a file `"script.js"` in the current folder.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Biz to'liq URL manzilini ham berishimiz mumkin. Masalan:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
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
