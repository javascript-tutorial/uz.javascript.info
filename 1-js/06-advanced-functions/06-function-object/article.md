
# Funktsiya obyekti, NFE

Bizga ma'lumki, JavaScript-dagi funktsiyalar qiymatlardir.

JavaScript-dagi har qanday qiymat turga ega. Funktsiya qaysi turga kiradi?

JavaScript-da funktsiyalar obyektlardir.

Funktsiyalarni tasavvur qilishning yaxshi usuli - bu chaqiriladigan "harakat obyektlari". Biz ularni nafaqat chaqira olamiz, balki ularni obyektlar sifatida ko'rib chiqishimiz mumkin: xususiyatlarni qo'shish/olib tashlash, ma'lumotnoma orqali o'tish va hk.


## "name" xususiyati

Funktsiya obyektlari bir nechta ishlatilishi mumkin bo'lgan xususiyatlarni o'z ichiga oladi.

Masalan, funktsiya nomiga "name" xususiyati sifatida kirish mumkin:

```js run
function sayHi() {
  alert("Salom");
}

alert(sayHi.name); // sayHi
```

Qizig'i shundaki, nom berish mantiqi juda aqlli. Shuningdek, tayinlashda ishlatiladigan funktsiyalarga to'g'ri nom beriladi:

```js run
let sayHi = function() {
  alert("Salom");
}

alert(sayHi.name); // sayHi (ishlaydi!)
```

Agar tayinlash oldingan berilgan qiymat orqali bajarilgan bo'lsa, u ham ishlaydi:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (ishlaydi!)
}

f();
```

Spetsifikatsiyada ushbu xususiyat "kontekstual ism" deb nomlanadi. Agar funktsiya uni ta'minlamasa, topshiriqda u kontekstdan aniqlanadi.

Obyekt usullari ham nomlarga ega:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Bunda hech sehr yo'q. To'g'ri ismni aniqlashning imkoni bo'lmagan holatlar ham mavjud. Bunday holda, ism xususiyati bo'sh, masalan:

```js
// massiv ichida yaratilgan funktsiya
let arr = [function() {}];

alert( arr[0].name ); // <bo'sh matn>
// interpretatorda to'g'ri nomni o'rnatish imkoniyati yo'q, shuning uchun bo'sh
```

Amalda esa aksariyat funktsiyalarning nomi bor.

## "length" xususiyati

Funktsiya parametrlari sonini qaytaradigan yana bir "length" xususiyati mavjud, masalan:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Bu erda dam qoldiq parametrlari hisoblanmaganligini ko'rishimiz mumkin.

`length` xususiyati ba'zan boshqa funktsiyalarda ishlaydigan funktsiyalarni introspektsiya qilish uchun ishlatiladi.

Masalan, quyida joylashgan kodda `ask` funktsiyasi so'raladigan savolni va chaqiruv qilish uchun tasodifiy sonlarni qabul qiladi.

Agar foydalanuvchi o'z javobini taqdim qilsa, funktsiya ishlovchilarni chaqiradi. Ikki xil ishlov beruvchidan o'tishimiz mumkin:

- Nol-argumentli funktsiya, bu faqat foydalanuvchi ijobiy javob berganida chaqiriladi.
- Ikkala holatda ham chaqiriladigan va javobni qaytaradigan argumentlarga ega funktsiya.

Ushbu g'oya shundaki, bizda ijobiy holatlar uchun argumentlarsiz ishlov beruvchi sintaksis mavjud (eng tez-tez uchraydigan variant), lekin universal ishlovchilarni ham taqdim etishga qodir.

`handlers` ni to'g'ri chaqirish uchun biz `length` xususiyatini ko'rib chiqamiz:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// ijobiy javob uchun ikkala ishlovchilar ham chaqiriladi
// salbiy javob uchun faqat ikkinchisi
ask("Savol?", () => alert('Siz ha dedingiz'), result => alert(result));
```

Bu [polimorfizm](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) deb nomlangan alohida holat -- argumentlarni turiga qarab turlicha muomala qilish, yoki bizda `length` ga qarab. Ushbu g'oya JavaScript-ni kutubxonalarida ishlatilishi mumkin.

## Maxsus xususiyatlar

Biz o'zimizga xos xususiyatlarni ham qo'shishimiz mumkin.

Bu erda biz chaqiruvlarning umumiy sonini kuzatib borish uchun `counter` xususiyatini qo'shamiz:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // keling, necha marta bajarilganini hisoblaymiz
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // boshlang'ich qiymati

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // 2 marta chaqirildi
```

```warn header="Xususiyat o'zgaruvchan emas"
`sayHi.counter = 0` kabi funktsiyaga tayinlangan xususiyat ichida `counter` mahalliy o'zgaruvchanni *aniqlamaydi*. Boshqacha qilib aytganda, xususiyat `counter` va `let counter` - bu o'zaro bog'liq bo'lmagan ikkita narsa.

Biz funktsiyani obyekt sifatida ko'rib chiqishimiz, unda xususiyatlarni saqlashimiz mumkin, ammo bu uning bajarilishiga ta'sir qilmaydi. O'zgaruvchanlar hech qachon funktsiya xususiyatlaridan foydalanmaydi va aksincha. Bu shunchaki parallel olamlar.
```

Funktsiya xususiyatlari ba'zida yopilishni o'zgartirishi mumkin. Masalan, funktsiya xususiyatidan foydalanish uchun hisoblagich funktsiyasi misolini <info:closure> bobidan qayta yozishimiz mumkin:

```js run
function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

Endi `counter` tashqi leksik muhitida emas, balki to'g'ridan-to'g'ri funktsiyalarda saqlanadi.

Yopishni ishlatishdan ko'ra yaxshiroqmi yoki yomonmi?

Asosiy farq shundaki, agar `count` qiymati tashqi o'zgaruvchanda yashasa, tashqi kod unga kira olmaydi. Faqatgina ichki funktsiyalar uni o'zgartirishi mumkin. Agar u funktsiyaga bog'liq bo'lsa, unda bunday narsa bo'lishi mumkin:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Shunday qilib, amalga oshirishni tanlash bizning maqsadlarimizga bog'liq.

## Named Function Expression

Named Function Expression, yoki NFE, nomi bo'lgan Funktsiya ifodalari uchun atama.

Masalan, oddiy funktsiya ifodasini olaylik:

```js
let sayHi = function(who) {
  alert(`Salom, ${who}`);
};
```

Va unga ism qo'shaylik:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Salom, ${who}`);
};
```

Bu yerda biror narsaga erishdikmi? Ushbu qo'shimcha `"func"` nomining maqsadi nima?

Birinchidan, bizda hali ham funktsiya ifodasi borligini ta'kidlaymiz. `function` dan keyin `"func"` ismining qo'shilishi uni funktsiya deklaratsiyasiga aylantirmadi, chunki u hali ham tayinlash ifodasining bir qismi sifatida yaratilgan.

Bunday nomni qo'shish hech narsani buzmadi.

Funktsiya hanuzgacha `sayHi()` sifatida mavjud:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Salom, ${who}`);
};

sayHi("John"); // Salom, John
```

`func` nomi haqida ikkita alohida narsa mavjud:

1. Bu funktsiya o'ziga havola qilishiga imkon beradi.
2. Bu funksiya tashqaridan ko'rinmaydi.

Masalan, quyida joylashgan `sayHi` funktsiyasi yana o'zini `"Mehmon"` bilan chaqiradi, agar chaqirmasa, `who` taqdim etiladi:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Salom, ${who}`);
  } else {
*!*
    func("Mehmon"); // o'zini qayta chaqirish uchun func-dan foydalaning
*/!*
  }
};

sayHi(); // Salom, Guest

// Ammo bu ishlamaydi:
func(); // Error, func is not defined (funktsiya tashqaridan ko'rinmaydi)
```

Nima uchun `func` dan foydalandik? Ehtimol, ichki chaqiruv uchun `sayHi` dan foydalanamiz?


Darhaqiqat, aksariyat hollarda biz:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Salom, ${who}`);
  } else {
*!*
    sayHi("Mehmon");
*/!*
  }
};
```

Ushbu kod bilan bog'liq muammo shundaki, `sayHi` qiymati o'zgarishi mumkin. Funktsiya boshqa o'zgaruvchanga o'tishi mumkin va kod xatolarga yo'l qo'yishni boshlaydi:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Mehmon"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

Buning sababi shundaki, funktsiya `sayHi` ni tashqi leksik muhitdan oladi. Mahalliy `sayHi` yo'q, shuning uchun tashqi o'zgaruvchandan foydalaniladi. Chaqiruv paytida tashqi `sayHi` `null`.

Funktsiya ifodasiga kiritishimiz mumkin bo'lgan ixtiyoriy nom aynan shu turdagi muammolarni hal qilish uchun mo'ljallangan.

Kodimizni tuzatish uchun undan foydalanamiz:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Salom, ${who}`);
  } else {
*!*
    func("Mehmon"); // Endi barchasi yaxshi
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Salom, Mehmon (ichki chaqiruv ishlamoqda)
```

Endi u ishlaydi, chunki `"func"` nomi funktsional-lokal hisoblanadi. U tashqaridan olinmaydi (va u yerda ko'rinmaydi). Spetsifikatsiya har doim mavjud funktsiyaga murojaat qilishiga kafolat beradi.

Tashqi kod hali ham `sayHi` yoki `welcome` o'zgaruvchanga ega. Va `func` - bu "ichki funktsiya nomi", funktsiya o'zini o'zi ichkaridan chaqira oladi.

```smart header="Funktsiya deklaratsiyasi uchun bunday narsa yo'q"
Bu yerda tasvirlangan "ichki ism" xususiyati faqat funktsiya ifodalari uchun mavjud, funktsiya deklaratsiyalari uchun emas. Funktsiya deklaratsiyalari uchun yana bitta "ichki" ism qo'shish uchun sintaksis imkoniyati mavjud emas.

Ba'zan, bizga ishonchli ichki nom kerak bo'lganda, funktsiya deklaratsiyasini nomlangan funktsiya ifodasi shakliga qayta yozish uchun sabab bo'ladi.
```

## Xulosa

Funktsiyalar obyektlardir.

Bu yerda biz ularning xususiyatlarini ko'rib chiqdik:

- `name` -- funktsiya nomi. Nafaqat funktsiya ta'rifida berilganida, balki tayinlashlar va obyekt xususiyatlari uchun ham mavjud.
- `length` -- funktsiya ta'rifidagi argumentlar soni. Qoldiq parametrlari hisoblanmaydi.

Agar funktsiya funktsiya ifodasi deb e'lon qilingan bo'lsa (asosiy kod oqimida emas) va u nomni olib yuradigan bo'lsa, u holda Named Function Expression deyiladi. Ism ichida rekursiv chaqiruvlar yoki shunga o'xshash ma'lumotlarga murojaat qilish uchun ishlatilishi mumkin.

Shuningdek, funktsiyalar qo'shimcha xususiyatlarga ega bo'lishi mumkin. Ko'pgina taniqli JavaScript kutubxonalari ushbu xususiyatdan juda yaxshi foydalanadi.

Ular "asosiy" funktsiyani yaratadilar va unga boshqa ko'plab "yordamchi" funktsiyalarni biriktiradilar. Masalan, [jquery](https://jquery.com) kutubxonasi `$` nomli funktsiyani yaratadi. [Lodash](https://lodash.com) kutubxonasi `_` funktsiyasini yaratadi. Va keyin ularga `_.clone`, `_.keyBy` va boshqa xususiyatlarni qo'shib qo'yadilar (ular haqida ko'proq ma'lumotga ega bo'lishni xohlagan vaqtingizda [docs](https://lodash.com/docs) ga qarang). Aslida, ular buni global makonning ifloslanishini kamaytirish uchun qilishadi, shuning uchun bitta kutubxona faqat bitta global o'zgaruvchanni beradi. Bu nizolarni nomlash imkoniyatini kamaytiradi.
 
Shunday qilib, funktsiya nafaqat o'z-o'zidan biror narsa qila oladi, balki uning xususiyatlari orqali foydali funksiyalarni ham ta'minlaydi. 