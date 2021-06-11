
# "new Function" sintaksisi

Funktsiyani yaratishning yana bir usuli mavjud. U kamdan kam qo'llaniladi, ammo ba'zida boshqa alternativa yo'q.

## Sintaksis

Funktsiyani yaratish uchun sintaksis:

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

Boshqacha qilib aytganda, funktsiya parametrlari (yoki aniqrog'i, ularning nomlari) birinchi bo'lib, tanasi esa oxirgi bo'ladi. Barcha argumentlar matnlardir.

Misolga qarab tushunish osonroq. Ikkita argumentli funktsiya:

```js run
let sum = new Function('a', 'b', 'return a + b'); 

alert( sum(1, 2) ); // 3
```

Agar argumentlar bo'lmasa, funktsiya tanasida faqat bitta argument mavjud:

```js run
let sayHi = new Function('alert("Salom")');

sayHi(); // Salom
```

Biz ko'rgan boshqa usullardan asosiy farqi shundaki, funktsiya to'liq ma'noda matndan yaratilgan bo'lib, u ishga tushirish vaqtida uzatiladi.

Oldingi barcha deklaratsiyalar bizdan, dasturchilardan, funktsiya kodini skriptga yozishni talab qildi.

Ammo `new Function` har qanday matnni funktsiyaga aylantirishga imkon beradi. Masalan, biz serverdan yangi funktsiyani qabul qilib, keyin uni bajarishimiz mumkin:

```js
let str = ... kodni serverdan dinamik ravishda qabul qilish ...

let func = new Function(str);
func();
```

U juda aniq holatlarda, masalan, serverdan kod olganda yoki shablondan funktsiyani dinamik ravishda kompilyatsiya qilishda ishlatiladi. Bunga ehtiyoj odatda dasturlashning rivojlangan bosqichlarida paydo bo'ladi.

## Yopish

Odatda funktsiya `[[Environment]]` maxsus xususiyatida qayerda tug'ilganligini eslaydi. U yaratilgan joydan leksik muhitga murojaat qiladi.

Ammo funktsiya `new Function` yordamida yaratilganda, uning `[[Environment]]` hozirgi leksik muhitga emas, aksincha global muhitga murojaat qiladi.

```js run

function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

Uni odatdagi xatti-harakatlar bilan taqqoslang:

```js run 
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, getFunc leksik muhitidan
```

`new Function` ning bu o'ziga xos xususiyati g'alati ko'rinadi, ammo amalda juda foydali.

Tasavvur qiling, biz matndan funktsiyani yaratishimiz kerak. Ushbu funktsiya kodi skriptni yozish paytida ma'lum emas (shuning uchun biz oddiy funktsiyalardan foydalanmaymiz), lekin bajarish jarayonida ma'lum bo'ladi. Biz uni serverdan yoki boshqa manbadan olishimiz mumkin.

Bizning yangi funktsiyamiz asosiy skript bilan o'zaro aloqada bo'lishi kerak.

Ehtimol, biz uni tashqi mahalliy o'zgaruvchanlarga kirishini xohlaymiz?

Muammo shundaki, JavaScript-ni ishlab chiqarishga nashr etishdan oldin, u *minifier* -- maxsus dastur yordamida siqiladi, bu qo'shimcha sharhlarni, bo'sh joylarni olib tashlash orqali kodni qisqartiradi va -- eng muhimi, mahalliy o'zgaruvchanlarning nomlarini qisqaroqlariga o'zgartiradi.

Masalan, agar funktsiya `userName` ga ega bo'lsa, minifier uni `let a` (yoki boshqa bir harf bo'lsa) o'rnini egallaydi va hamma joyda bajaradi. Odatda bu xavfsiz narsa, chunki o'zgaruvchan mahalliy, funktsiyadan tashqarida unga kirish mumkin emas. Va funktsiya ichida minifier har bir eslatmani almashtiradi. Minifikatorlar aqlli, ular kodlar tuzilishini tahlil qiladi, shuning uchun ular hech narsani buzmaydi. Ular shunchaki topib-almashtiradigan soqov emas.

Ammo, agar `new Function` tashqi o'zgaruvchanlarga kira oladigan bo'lsa, u holda `userName` ni topib bo'lmaydi, chunki bu kod minifikatsiya qilinganidan *keyin* matn sifatida uzatiladi.

**Hatto tashqi leksik muhitga `new Function` da kira olsak ham minifikatorlar bilan muammolarga duch kelamiz.**

`new Function` ning "o'ziga xos xususiyati" bizni xatolardan xalos qiladi.

Va u kodni yanada yaxshi amalga oshiradi. Agar biz `new Function` tomonidan yaratilgan funktsiyaga biron bir narsani uzatishimiz kerak bo'lsa, uni aniq argument sifatida yetkazishimiz kerak.

Bizning "sum" funktsiyamiz buni to'g'ri bajaradi:

```js run 
*!*
let sum = new Function('a', 'b', 'return a + b');
*/!*

let a = 1, b = 2;

*!*
// tashqi qiymatlar argument sifatida beriladi
alert( sum(a, b) ); // 3
*/!*
```

## Xulosa

Sintaksis:

```js
let func = new Function(arg1, arg2, ..., body);
```

Tarixiy sabablarga ko'ra argumentlarni vergul bilan ajratilgan ro'yxat sifatida ham berish mumkin.

Ushbu uch narsa bir xil ma'noni anglatadi:

```js 
new Function('a', 'b', 'return a + b'); // asosiy sintaksis
new Function('a,b', 'return a + b'); // vergul bilan ajratilgan
new Function('a , b', 'return a + b'); // bo'shliqlar va vergul bilan ajratilgan
```

`new Function` bilan yaratilgan funktsiyalar tashqi leksik muhitga emas, balki global leksik muhitga ishora qiluvchi `[[Environment]]` ga ega. Demak, ular tashqi o'zgaruvchanlardan foydalana olmaydilar. Ammo bu aslida yaxshi, chunki bu bizni xatolardan xalos qiladi. Parametrlarni aniq o'tkazish arxitektura jihatdan ancha yaxshi usuldir va minifikatorlar bilan hech qanday muammo tug'dirmaydi.
