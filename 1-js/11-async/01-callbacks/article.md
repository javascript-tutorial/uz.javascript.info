

# Tanishtirish: qayta chaqirish

<<<<<<< HEAD
JavaScript-dagi ko'plab harakatlar *asinxron*.

Masalan, `loadScript(src)` funktsiyasini ko'rib chiqing:
=======
```warn header="We use browser methods in examples here"
To demonstrate the use of callbacks, promises and other abstract concepts, we'll be using some browser methods: specifically, loading scripts and performing simple document manipulations.

If you're not familiar with these methods, and their usage in the examples is confusing, you may want to read a few chapters from the [next part](/document) of the tutorial.

Although, we'll try to make things clear anyway. There won't be anything really complex browser-wise.
```

Many functions are provided by JavaScript host environments that allow you to schedule *asynchronous* actions. In other words, actions that we initiate now, but they finish later.

For instance, one such function is the `setTimeout` function.

There are other real-world examples of asynchronous actions, e.g. loading scripts and modules (we'll cover them in later chapters).

Take a look at the function `loadScript(src)`, that loads a script with the given `src`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

<<<<<<< HEAD
<<<<<<< HEAD
Funktsiyaning maqsadi yangi skriptni yuklashdir. Hujjatga `<script src ="… ">` qo'shilganda, brauzer uni yuklaydi va bajaradi.

Biz buni quyidagicha ishlatishimiz mumkin:

```js
// skriptni yuklaydi va bajaradi
loadScript('/my/script.js');
```

Funktsiya "asinxron" deb nomlanadi, chunki harakat (skriptni yuklash) hozir emas, keyinroq tugaydi.

Chaqiruv skriptni yuklashni boshlaydi, so'ngra ijro davom etadi. Skript yuklanayotganda, quyidagi kod bajarilishini tugatishi mumkin va agar yuklash vaqt talab qilsa, boshqa skriptlar ham ishlashi mumkin.

```js
loadScript('/my/script.js');
// loadScript ostidagi kod skriptni yuklash tugashini kutmaydi
// ...
```

Endi yangi skript yuklanganda undan foydalanishni xohlaymiz deylik. Ehtimol, u yangi funktsiyalarni e'lon qiladi, shuning uchun ularni boshqarishni xohlaymiz.
=======
It appends to the document the new, dynamically created, tag `<script src="…">` with given `src`. The browser automatically starts loading it and executes when complete.
=======
It inserts into the document a new, dynamically created, tag `<script src="…">` with the given `src`. The browser automatically starts loading it and executes when complete.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

We can use this function like this:

```js
// load and execute the script at the given path
loadScript('/my/script.js');
```

The script is executed "asynchronously", as it starts loading now, but runs later, when the function has already finished.

If there's any code below `loadScript(…)`, it doesn't wait until the script loading finishes.

```js
loadScript('/my/script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
```

Let's say we need to use the new script as soon as it loads. It declares new functions, and we want to run them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ammo biz buni `loadScript(...)` chaqirig'idan so'ng darhol qilsak, bu ishlamaydi:

```js
loadScript('/my/script.js'); // skriptda "function newFunction() {…}" bor

*!*
newFunction(); // bunday funktsiya yo'q!
*/!*
```

<<<<<<< HEAD
Tabiiyki, brauzer skriptni yuklashga ulgurmagan bo'lishi mumkin. Shunday qilib, yangi funktsiyani darhol chaqirish muvaffaqiyatsiz tugadi. Hozirda `loadScript` funktsiyasi yukni tugatilishini kuzatish usulini ta'minlamaydi. Skript yuklanadi va oxir-oqibat ishlaydi, barchasi shu. Ammo biz bu qachon yuz berishini bilishni, ushbu buyruq faylidagi yangi funktsiyalar va o'zgaruvchamlardan foydalanishni xohlaymiz.
=======
Naturally, the browser probably didn't have time to load the script. As of now, the `loadScript` function doesn't provide a way to track the load completion. The script loads and eventually runs, that's all. But we'd like to know when it happens, to use new functions and variables from that script.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Skript yuklanganda bajarilishi kerak bo'lgan `loadScript` ga ikkinchi argument sifatida `callback` funktsiyasini qo'shamiz:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Endi biz skriptdan yangi funktsiyalarni chaqirmoqchi bo'lsak, uni qayta chaqiruvda yozishimiz kerak:

```js
loadScript('/my/script.js', function() {
  // skript yuklanganidan keyin qayta chaqiruv ishlaydi
  newFunction(); // hozir u ishlaydi
  ...
});
```

Mana shu g'oya: ikkinchi argument - bu harakat tugagandan so'ng ishlaydigan (odatda noma'lum) funktsiya.

Haqiqiy skript bilan ishlaydigan misol:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
<<<<<<< HEAD
  alert(`Zo'r, endi ${script.src} yuklangan`);
  alert( _ ); // yuklangan skriptda e'lon qilingan funktsiya
=======
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
});
*/!*
```

Bu "qayta chaqiruvga asoslangan" asinxron dasturlash uslubi deb ataladi. Biror narsani asinxron ravishda bajaradigan funktsiya `callback` argumentini berishi kerak, bu yerda biz uni tugatgandan so'ng bajaramiz.

<<<<<<< HEAD
Bu yerda biz buni `loadScript` da qildik, ammo, albatta, bu umumiy yondashuv.
=======
Here we did it in `loadScript`, but of course it's a general approach.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Qayta chaqiruvda qayta chaqiruv

Qanday qilib biz ikkita skriptni ketma-ket yuklashimiz mumkin: birinchisi, so'ngra ikkinchisi?

Tabiiy yechim qayta chaqiruvning ichiga ikkinchi `loadScript` chaqiruvini qo'yishdir:

```js
loadScript('/my/script.js', function(script) {

  alert(`Zo'r, ${script.src} yuklangan, endi yana bittasini yuklaylik`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Zo'r, ikkinchi skript yuklandi`);
  });
*/!*

});
```

Tashqi `loadScript` tugagandan so'ng, qayta chaqiruv ichki qismini boshlaydi.

Agar biz yana bitta skriptni xohlasakchi...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...barcha skriptlar yuklangandan keyin davom eting
    });
*/!*

  });

});
```

Shunday qilib, har bir yangi harakat qayta chaqiruv ichida. Bu ozgina harakatlar uchun yaxshi, ammo ko'pchilik uchun yaxshi emas, shuning uchun boshqa variantlarni tez orada ko'rib chiqamiz.

## Xatolarni boshqarish

Yuqoridagi misollarda biz xatolarni hisobga olmadik. Agar skriptni yuklash muvaffaqiyatsiz tugasachi? Bizning chaqiruvimiz bunga munosabat bildirishi kerak.

Yuklash xatolarini kuzatadigan `loadScript` ning takomillashtirilgan versiyasi:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Skriptni yuklashda xato ${src}`));
*/!*

  document.head.append(script);
}
```

Muvaffaqiyatli yuklash uchun `callback(null, script)` ni chaqiradi va aks holda `callback(error)` ni chaqiradi.

Foydalanish:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // xatolarni boshqarish
  } else {
    // skript muvaffaqiyatli yuklandi
  }
});
```

Yana bir marta, biz `loadScript` uchun ishlatgan retsept aslida juda keng tarqalgan. Bu "birinchi xato qayta chaqiruvini qilish" uslubi deb nomlanadi.

Qoidalar quyidagicha:
1. Agar `callback` ning birinchi argumenti, agar u paydo bo'lsa, xato uchun saqlanadi. Keyin `callback(err)` chaqiriladi.
2. Ikkinchi argument (agar kerak bo'lsa, keyingisiyam) muvaffaqiyatli natija uchun. Keyin `callback(null, result1, result2…)` chaqiriladi.

Shunday qilib, bitta `callback` funktsiyasi xatolarni xabar qilish va natijalarni qaytarish uchun ishlatiladi.

## Halokat piramidasi

Bir qarashda, bu asinxron kodni yozishning ishchi usuli. Va haqiqatan ham shunday. Bir yoki ehtimol ikkita ichki chaqiruvlar uchun yaxshi bo'ladi.

Ammo ketma-ket keladigan bir nechta asinxron harakatlar uchun bizda shunday kod bo'ladi:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...barcha skriptlar yuklangandan keyin davom eting (*)
  */!*
          }
        });

      }
    });
  }
});
```

Yuqoridagi kodda:
1. Biz `1.js` ni yuklaymiz, keyin xato bo'lmasa.
2. Biz `2.js` ni yuklaymiz, keyin xato bo'lmasa.
3. Biz `3.js` ni yuklaymiz, keyin xato bo'lmasa. -- boshqa narsa bajarish `(*)`.

<<<<<<< HEAD
Chaqiruvlar uyasi ko'payib borishi bilan, kod yanada chuqurlashadi va boshqarish tobora qiyinlashib boradi, ayniqsa, agar bizda `...` o'rniga haqiqiy kod bo'lsa, bu ko'proq tsiklarni, shartli bayonotlarni va boshqalarni o'z ichiga olishi mumkin.
=======
As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have real code instead of `...` that may include more loops, conditional statements and so on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buni ba'zida "halokat piramidasi" deb atashadi.

<<<<<<< HEAD
=======
<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
![](callback-hell.svg)

Ichki chaqiruvlarning "piramidasi" har bir asinxron harakat bilan o'ng tomonga o'sib boradi. Tez orada u nazoratdan chiqib ketadi.

Shunday qilib, kodlashning bu usuli juda yaxshi emas.

Muammoni engillashtirish uchun har qanday harakatni mustaqil funktsiyaga aylantirishimiz mumkin, masalan:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...barcha skriptlar yuklangandan keyin davom eting (*)
  }
}
```

Ko'ryapsizmi? Xuddi shu narsani qiladi va endi chuqur uyalar yo'q, chunki biz har bir harakatni alohida yuqori darajadagi funktsiyaga aylantirdik.

U ishlaydi, lekin kod yirtilib ketgan elektron jadvalga o'xshaydi. O'qish qiyin, va ehtimol siz uni o'qiyotganingizda buyumlar orasidan ko'z bilan sakrash kerakligini payqadingiz. Bu noqulay, ayniqsa o'quvchi kodni yaxshi bilmasa va qayerga ko'z bilan sakrashni bilmasa.

<<<<<<< HEAD
Shuningdek, `step*` deb nomlangan funktsiyalar bir martalik ishlatiladi, ular faqat "halokat piramidasi" ni oldini olish uchun yaratilgan. Hech kim ularni harakatlar zanjiridan tashqarida qayta ishlatmoqchi emas. Shunday qilib, bu yerda bir oz nom maydonida tartibsizlik mavjud.
=======
Also, the functions named `step*` are all of single use, they are created only to avoid the "pyramid of doom." No one is going to reuse them outside of the action chain. So there's a bit of namespace cluttering here.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Yaxshiroq yo'lni topish kerak.

Baxtimizga, bunday piramidalardan saqlanishning boshqa usullari mavjud. Keyingi bobda tasvirlangan "va'dalar" dan foydalanish eng yaxshi usullardan biridir.
