# Axlat yig'ish

JavaScript-da xotirani boshqarish biz uchun avtomatik va ko'rinmas holda amalga oshiriladi. Biz ibtidoiylarni, ob'ektlarni, funktsiyalarni yaratamiz... Barchasi xotirani talab qiladigan narsa.

Biror narsa kerak bo'lmaganda nima bo'ladi? JavaScript interpretatori uni qanday kashf etadi va tozalaydi?

## Erishish imkoniyati

JavaScript-da xotirani boshqarishning asosiy kontseptsiyasi bu uning *erishish imkoniyati*.

Oddiy qilib aytganda, "erishish mumkin" qiymatlar - bu kirish imkoniyati yoki qandaydir tarzda foydalanish mumkin bo'lgan qiymatlar. Ularning xotirada saqlanishi kafolatlangan.

1. Muayyan sabablarga ko'ra o'chirib bo'lmaydigan tabiiy ravishda erishiladigan qiymatlarning asosiy to'plami mavjud.

    Masalan:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
    - Joriy funktsiyalarning ichki o'zgaruvchanlari va parametrlari.
    - Ichki chaqiruvlarning joriy zanjiridagi boshqa funktsiyalarning o'zgaruvchanlari va parametrlari.
    - Global o'zgaruvchanlar.
    - (ba'zi bir ichki narsalar ham bor)
=======
    - The currently executing function, its local variables and parameters.
    - Other functions on the current chain of nested calls, their local variables and parameters.
    - Global variables.
    - (there are some other, internal ones as well)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/03-garbage-collection/article.md

    Ushbu qiymatlar *ildizlar* deb nomlanadi.

2. Agar istalgan ma'lumotga havolalar zanjiri orqali ildizdan erishish mumkin bo'lsa, bu qiymat erishuvchi deb hisoblanadi.

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
    Masalan, agar ichki o'zgaruvchanda ob'ekt mavjud bo'lsa va u boshqa ob'ektga tegishli xususiyatga ega bo'lsa, u ob'ektga erishish mumkin deb hisoblanadi. Va u qilgan havolalar ham erishuvchan. Batafsil misollar quyida.
=======
    For instance, if there's an object in a global variable, and that object has a property referencing another object, *that* object is considered reachable. And those that it references are also reachable. Detailed examples to follow.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/03-garbage-collection/article.md

JavaScript dvigatelida [axlat yig'uvchi](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) deb nomlangan fon jarayoni mavjud. U barcha ob'ektlarni kuzatib boradi va erishib bo'lmaydigan narsalarni olib tashlaydi.

## Oddiy misol

Mana eng oddiy misol:

```js
// foydalanuvchi ob'ektga havolaga ega
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Bu yerda o'q ob'ektga havola ko'rsatadi. `"user"` ning global o'zgaruvchani `{name: "John"}` ob'ektiga ishora qiladi (biz uni John deb ataymiz). John ob'ektining `"name"` xususiyatida primitiv saqlanadi, shuning uchun u ob'ekt ichida chizilgan.

Agar `user` qiymati qayta yozilsa, havola yo'qoladi:

```js
user = null;
```

![](memory-user-john-lost.svg)

Endi Jonga yetib bo'lmaydi. Unga kirishning imkoni yo'q, unga havolalar yo'q. Axlat yig'uvchi ma'lumotlar axlatini va xotirani bo'shatadi.

## Ikkita havolalar

Endi `user` dan `admin` ga havolani ko'chirib olganimizni tasavvur qilaylik:

```js
// user ob'ektga havolaga ega
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Endi biz ham xuddi shunday qilsak:
```js
user = null;
```

<<<<<<< HEAD
...Hozir ob'ektga `admin` global o'zgaruvchani orqali kirish mumkin, shuning uchun u xotirada. Agar biz `admin` ning qayta yozsak, u o'chirilishi mumkin.
=======
...Then the object is still reachable via `admin` global variable, so it must stay in memory. If we overwrite `admin` too, then it can be removed.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

## O'zaro bog'langan ob'ektlar

Endi yanada murakkab misol. Oila:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

`marry` funktsiyasi ikkita ob'ektni birlashtiradi, ularni bir-biriga bog'laydi va ikkalasini ham o'z ichiga olgan yangi ob'ektni qaytaradi.

Qaytaruvchi xotira tuzilishi:

![](family.svg)

Hozirgi vaqtda barcha ob'ektlarga erishish mumkin.

Endi ikkita havolani olib tashlaymiz:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Ushbu ikkita havoladan faqat bittasini o'chirish kifoya emas, chunki barcha ob'ektlarga ulanish imkoniyati mavjud.

Ammo ikkalasini ham o'chirib tashlasak, John-da boshqa hech qanday ma'lumot yo'qligini ko'rishimiz mumkin:

![](family-no-father.svg)

Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.
Chiqish havolalari muhim emas. Faqat kirish havolalari ob'ektni erishuvchan qilishi mumkin. John endi eruvchan emas va xotiradan erishish mumkin bo'lmagan barcha ma'lumotlar bilan olib tashlanadi.

Axlat yig'ilgandan keyin:

![](family-no-father-2.svg)

## Erishish mumkin bo'lmaydigan orol

O'zaro bog'liq ob'ektlarning butun "orollari" erishish bo'lmasligi va xotiradan o'chirilishi mumkin bo'lgan vaziyatlar mavjud.

Manba ob'ekti yuqoridagi bilan bir xil. Keyin:

```js
family = null;
```

Xotiraning rasmi shunday bo'ladi:

![](family-no-family.svg)

Ushbu misol, erishishning imkoniyati tushunchasi qanchalik muhimligini ko'rsatadi.

Jon va Enn hanuzgacha bir-biriga bog'langanligi aniq, ikkalasida ham kirish havolalari mavjud. Ammo bu yetarli emas.

Avvalgi `"family"` ob'ekti ildizdan ajratib qo'yilgan, endi unga havola yo'q, shuning uchun butun orolga ulanish imkonsiz bo'lib qoladi va olib tashlanadi.

## Ichki algoritmlar

Axlat yig'ishning asosiy algoritmi "belgilash algoritmi" ("mark-and-sweep") deb nomlanadi.

Quyidagi "axlat yig'ish" bosqichlari muntazam ravishda amalga oshiriladi:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
- Axlat yig'uvchi ildizni oladi va ularni "belgilaydi" (eslaydi).
- Keyin u tashrif buyuradi va ulardan barcha murojaatlarni "belgilaydi".
- Keyin u belgilangan ob'ektlarga tashrif buyuradi va ularning *havolalarini* belgilaydi. Kelajakda bitta ob'ektga ikki marta bormaslik uchun barcha tashrif buyurgan ob'ektlar eslab qolinadi.
- ...Va shunga o'xshash barcha yo'nalishlarga (ildizlardan erishish mumkin) tashrif buyurilgunga qadar.
- Belgilanganlardan tashqari barcha ob'ektlar o'chiriladi.
=======
- The garbage collector takes roots and "marks" (remembers) them.
- Then it visits and "marks" all references from them.
- Then it visits marked objects and marks *their* references. All visited objects are remembered, so as not to visit the same object twice in the future.
- ...And so on until every reachable (from the roots) references are visited.
- All objects except marked ones are removed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/03-garbage-collection/article.md

Masalan, bizning ob'ektimiz tuzilishi quyidagi ko'rinishga ega bo'lsin:

![](garbage-collection-1.svg)

Biz o'ng tomonga "erishib bo'lmaydigan orol" ni aniq ko'rishimiz mumkin. Keling, axlat yig'uvchilar u bilan qanday kurashayotganini ko'rib chiqaylik.

Birinchi qadam ildizlarni belgilaydi:

![](garbage-collection-2.svg)

<<<<<<< HEAD
Keyin ularning havolalari belgilanadi:

![](garbage-collection-3.svg)

...Va ularning havolalari, iloji bo'lsa:
=======
Then we follow their references and mark referenced objects:

![](garbage-collection-3.svg)

...And continue to follow further references, while possible:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

![](garbage-collection-4.svg)

Endi jarayonda tashrif buyurib bo'lmaydigan ob'ektlar erishish mumkin emas deb hisoblanadi va o'chirib tashlanadi:

![](garbage-collection-5.svg)

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
Bu axlat yig'ish qanday ishlashining kontseptsiyasi.

JavaScript interpretatori uni tezroq ishlashi va bajarilishiga ta'sir qilmasligi uchun ko'plab optimallashtirishlarni qo'llaydi.
=======
We can also imagine the process as spilling a huge bucket of paint from the roots, that flows through all references and marks all reachable objects. The unmarked ones are then removed.

<<<<<<< HEAD
That's the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not affect the execution.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/03-garbage-collection/article.md
=======
That's the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not introduce any delays into the code execution.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Ba'zi optimallashtirishlar:

<<<<<<< HEAD
- **Avlodlar to'plami (Generational collection)** - ob'ektlar ikkita to'plamga bo'linadi: "yangilari" va "eskilari". Ko'p ob'ektlar paydo bo'ladi, o'z ishlarini bajarishadi va tezda o'lishadi, ularni tajovuzkor tarzda tozalash mumkin. Yetarlicha uzoq vaqt omon qolganlar, "eski" bo'lib, kamroq tekshiriladi.
- **Qo'shimcha yig'ish (Incremental collection)** - agar ob'ektlar ko'p bo'lsa va biz birma-bir yurib, butun ob'ektni belgilashga harakat qilsak, bu biroz vaqt talab qilishi va bajarilishdagi kechikishlarni keltirib chiqarishi mumkin. Shunday qilib, interpretator axlat yig'ilishini qismlarga ajratishga harakat qiladi. Keyin qismlar birma-bir, alohida bajariladi. Buning uchun o'zgarishlarni kuzatib borish uchun ular o'rtasida qo'shimcha hisob olib borilishi kerak, ammo bizda aksariyat kechikishlar mavjud, ammo katta emas.
- **Bo'sh vaqtni yig'ish (Idle-time collection)** - ishlashga ta'sirini kamaytirish uchun axlat yig'uvchi faqat protsessor uzilishlari vaqtida ishlashga harakat qiladi.
=======
- **Generational collection** -- objects are split into two sets: "new ones" and "old ones". In typical code, many objects have a short life span: they appear, do their job and die fast, so it makes sense to track new objects and clear the memory from them if that's the case. Those that survive for long enough, become "old" and are examined less often.
- **Incremental collection** -- if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts. And then clear these parts one after another. There are many small garbage collections instead of a total one. That requires some extra bookkeeping between them to track changes, but we get many tiny delays instead of a big one.
- **Idle-time collection** -- the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
Axlat yig'ish algoritmlarini optimallashtirish va turli xil usullar mavjud. Lekin bu yerda ularni qanday ta'riflashni istasam ham, men bundan kechishim kerak, chunki turli JavaScript interpretatorlari turli usullar va sozlamalardan foydalanadilar. Va bundan ham muhimi, interpretatorlarning rivojlanishi bilan hamma narsa o'zgaradi, shuning uchun bu mavzuni oldindan ko'rib chiqish, haqiqiy ehtiyojsiz, ehtimol bunga loyiq emas. Agar, albatta, bu sof qiziqish masalasi bo'lmasa, unda quyidagi ba'zi havolalar siz uchun foydali bo'ladi.
=======
There exist other optimizations and flavours of garbage collection algorithms. As much as I'd like to describe them here, I have to hold off, because different engines implement different tweaks and techniques. And, what's even more important, things change as engines develop, so studying deeper "in advance", without a real need is probably not worth that. Unless, of course, it is a matter of pure interest, then there will be some links for you below.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/03-garbage-collection/article.md

## Xulosa

Bilish kerak bo'lgan asosiy narsalar:

<<<<<<< HEAD
- Axlat yig'ish avtomatik ravishda amalga oshiriladi. Biz uni majbuan oldini ololmaymiz.
- Ob'ektlar erishuvchan bo'lganda xotirada saqlanadi.
- Yo'naltiriladigan havola (ildizdan) erishish bilan bir xil emas: o'zaro bog'langan ob'ektlar to'plami umuman olganda yetib bo'lmaydigan bo'lib qolishi mumkin.
=======
- Garbage collection is performed automatically. We cannot force or prevent it.
- Objects are retained in memory while they are reachable.
- Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole, as we've seen in the example above.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Zamonaviy interpretatorlar axlat yig'ishning zamonaviy algoritmlarini amalga oshirmoqdalar.

Umumiy kitob "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jons va boshqalar) ularning ayrimlarini qamrab oladi.

<<<<<<< HEAD
Agar siz past darajadagi dasturlarni yaxshi bilsangiz, V8 axlatni yig'uvchi haqida batafsil ma'lumot [V8 tur: Axlat yig'ish](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection) maqolasida keltirilgan.

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
Bundan tashqari, [V8 interpretatorning blogida](http://v8project.blogspot.com/) vaqti bilan xotira boshqaruvidagi o'zgarishlar haqida maqolalar chop etiladi. Albatta, axlat yig'ishni o'rganish uchun siz V8 interpretatori ichida qanday ishlashini tushunishingiz kerak. Buni V8-ni ishlab chiqqan muhandislardan biri [Vyacheslav Egorov](http://mrale.ph) blogida o'qishingiz mumkin. Men "V8" haqida gapiryapman, chunki u internetdagi maqolalar bilan eng yaxshi yoritilgan. Boshqa interpretatorda ko'plab yondashuvlar o'xshash, ammo axlat yig'ish ko'p jihatda farq qiladi.
=======
[V8 blog](https://v8.dev/) also publishes articles about changes in memory management from time to time. Naturally, to learn the garbage collection, you'd better prepare by learning about V8 internals in general and read the blog of [Vyacheslav Egorov](http://mrale.ph) who worked as one of V8 engineers. I'm saying: "V8", because it is best covered with articles in the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/03-garbage-collection/article.md

Interpretatorni chuqur bilish, past darajadagi optimallashtirish kerak bo'lganda yaxshi bo'ladi. Buni til bilan tanishganingizdan keyin keyingi qadam sifatida rejalashtirish oqilona bo'ladi.
=======
If you are familiar with low-level programming, more detailed information about V8's garbage collector is in the article [A tour of V8: Garbage Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

The [V8 blog](https://v8.dev/) also publishes articles about changes in memory management from time to time. Naturally, to learn more about garbage collection, you'd better prepare by learning about V8 internals in general and read the blog of [Vyacheslav Egorov](https://mrale.ph) who worked as one of the V8 engineers. I'm saying: "V8", because it is best covered by articles on the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.

In-depth knowledge of engines is good when you need low-level optimizations. It would be wise to plan that as the next step after you're familiar with the language.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
