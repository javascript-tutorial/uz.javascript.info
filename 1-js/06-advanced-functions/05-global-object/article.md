
# Global obyekt

Global obyekt dasturning istalgan joyida mavjud bo'lgan o'zgaruvchanlar va funktsiyalarni taqdim etadi. Odatiy bo'lib, ular til yoki ishlash muhitiga o'rnatilganlardir.

Brauzerda u "window" deb nomlangan, Node.js uchun "global", boshqa muhitlar uchun u boshqa nomga ega bo'lishi mumkin.

Masalan, biz `alert` ni `window` usuli sifatida chaqira olamiz:

```js run
alert("Salom");

// bilan bir xil
window.alert("Salom");
```

Biz `Array` kabi boshqa o'rnatilgan funktsiyalarga `window.Array` deb murojaat qilishimiz va unda o'z xususiyatlarimizni yaratishimiz mumkin.

## Brauzer: "window" obyekti

Tarixiy sabablarga ko'ra brauzer ichidagi `window` obyekti biroz chalkash.

1. U global obyekt rolini o'ynashdan tashqari, "brauzer oynasi" funksiyasini taqdim etadi.

    Brauzer oynasiga xos xususiyatlar va usullarga kirish uchun `window` dan foydalanishimiz mumkin:

    ```js run
    alert(window.innerHeight); // brauzer oynasining balandligini ko'rsatadi

    window.open('http://google.com'); // yangi brauzer oynasini ochadi
    ```

2. Yuqori darajadagi `var` o'zgaruvchanlari va funktsiyalar deklaratsiyalari avtomatik ravishda `window` ning xususiyatlariga aylanadi.

    Masalan:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x window xususiyatiga aylanadi)

    window.x = 0;

    alert(x); // 0, o'zgaruvchan modifikatsiya qilingan
    ```

    Iltimos, e'tibor bering, bu zamonaviyroq `let/const` deklaratsiyalari bilan bo'lmaydi:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" window xususiyatini yaratmaydi)
    ```

3. Shuningdek, barcha skriptlar bir xil global muhitga ega, shuning uchun bitta `<script>` da e'lon qilingan o'zgaruvchanlar boshqasida ham ko'rinadi:

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>

    <script>
      alert(a); // 1
      alert(b); // 2
    </script>
    ```

4. Va ahamiyatsiz narsa, ammo baribir: global miqyosda `this` ning qiymati `window` dir.

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Nima uchun bunday qilingan? Til yaratilishida bir nechta jihatlarni bitta `window` obyektiga birlashtirish g'oyasi "narsalarni soddalashtirish" edi. Ammo o'shandan beri ko'p narsalar o'zgardi. Kichkina skriptlar to'g'ri arxitekturani talab qiladigan katta dasturlarga aylandi.

Turli xil skriptlar (ehtimol turli manbalardan) bir-birining o'zgaruvchanlarini ko'rishlari yaxshi emasmi?

Yo'q, unday emas, chunki bu nomlash nizolariga olib kelishi mumkin: bir xil o'zgaruvchan nom turli xil maqsadlarda ikkita skriptda ishlatilishi mumkin, shuning uchun ular bir-biriga zid keladi.

Hozirgi vaqtda ko'p maqsadli `window` tilda dizayndagi xato deb hisoblanadi.

Yaxshiyamki, "JavaScript modullari" deb nomlangan yechim mavjud.

Agar biz `type="module"` atributini `<script>` yorlig'iga o'rnatgan bo'lsak, unda bunday skript o'zining `window` ga aralashmaydigan, o'zining yuqori darajadagi ko'lami (leksik muhiti) bo'lgan alohida "modul" hisoblanadi.

- Modulda `var x` `window` ning xususiyatiga aylanmaydi:

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Bir-birining o'zgaruvchanlanlarini ko'rmaydigan ikkita modul:

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // Error: undeclared variable
    </script>
    ```

- Va oxirgi kichik narsa, moduldagi `this` ning yuqori darajadagi qiymati `undefined` (nima uchun u baribir `window` bo'lishi kerak?):

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**`<script type="module">` dan foydalanib, tilning dizayndagi nuqsonlarini yuqori darajadagi muhitni `window` dan ajratish yo'li bilan tuzatadi.**

Keyinchalik modullarning ko'proq xususiyatlarini [](info:modules) bo'limida ko'rib chiqamiz.

## Global obyektdan to'g'ri foydalanish

1. Odatda global o'zgaruvchanlardan foydalanish tavsiya etilmaydi. Iloji boricha kamroq global o'zgaruvchanlar bo'lishi kerak, ammo agar biz global ko'rinadigan narsani yaratishimiz kerak bo'lsa, uni `window` (yoki Node.js da `global`) ga qo'yishimiz mumkin.

    Bu yerda biz boshqa foydalanuvchi skriptlaridan foydalanish uchun mavjud foydalanuvchi haqidagi ma'lumotlarni global obyektga joylashtiramiz:

    ```js run
    // uni "window" ga aniq belgilang
    window.currentUser = {
      name: "John",
      age: 30
    };

    // keyin, boshqa joyda, boshqa skriptda
    alert(window.currentUser.name); // John
    ```

2. Zamonaviy til xususiyatlarini qo'llab-quvvatlashi uchun global obyektni sinab ko'rishimiz mumkin.

    Masalan, o'rnatilgan `Promise` obyekti mavjudligini tekshirib ko'ring (u eski brauzerlarda mavjud emas):
    ```js run
    if (!window.Promise) {
      alert("Sizning brauzeringiz haqiqatan ham eski!");
    }
    ```

3. Biz "polifillarni" yaratishimiz mumkin: atrof-muhit tomonidan qo'llab-quvvatlanmaydigan funktsiyalarni qo'shing (masalan, eski brauzer), ammo zamonaviy standartda mavjud.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // zamonaviy til xususiyatini maxsus amalga oshirish
    }
    ```

...Va, albatta, agar biz brauzerda bo'lsak, brauzer oynasi xususiyatlariga (global obyekt sifatida emas) kirish uchun `window` dan foydalanish juda yaxshi.
