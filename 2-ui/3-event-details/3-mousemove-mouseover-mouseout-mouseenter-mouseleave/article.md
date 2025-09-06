# Sichqoncha harakati: mouseover/out, mouseenter/leave

Sichqoncha elementlar orasida harakatlanayotganda sodir bo'ladigan hodisalar haqida batafsil to'xtalib o'taylik.

## Hodisalar mouseover/mouseout, relatedTarget

`mouseover` hodisasi sichqoncha ko'rsatkichi element ustiga kelganda sodir bo'ladi, `mouseout` esa uni tark etganda.

![](mouseover-mouseout.svg)

Bu hodisalar maxsus, chunki ularda `relatedTarget` xossasi mavjud. Bu xossa `target` ni to'ldiradi. Sichqoncha bitta elementdan ikkinchisiga o'tganda, ulardan biri `target` bo'ladi, ikkinchisi esa - `relatedTarget`.

`mouseover` uchun:

- `event.target` -- sichqoncha ustiga kelgan element.
- `event.relatedTarget` -- sichqoncha kelgan element (`relatedTarget` -> `target`).

`mouseout` uchun aksincha:

- `event.target` -- sichqoncha tark etgan element.
- `event.relatedTarget` -- ko'rsatkich ostidagi yangi element, sichqoncha o'tgan joy (`target` -> `relatedTarget`).

```online
Quyidagi misolda har bir yuz va uning xususiyatlari alohida elementlardir. Sichqonchani harakatlantirsangiz, matn maydonida sichqoncha hodisalarini ko'rishingiz mumkin.

Har bir hodisa `target` va `relatedTarget` haqida ma'lumotga ega:

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` `null` bo'lishi mumkin"
`relatedTarget` xossasi `null` bo'lishi mumkin.

Bu normal va shunchaki sichqoncha boshqa elementdan emas, balki oynadan tashqaridan kelganini anglatadi. Yoki u oynani tark etganini.

Kodimizda `event.relatedTarget` dan foydalanganda bu imkoniyatni yodda tutishimiz kerak. Agar biz `event.relatedTarget.tagName` ga murojaat qilsak, xato yuz beradi.
```

## Elementlarni o'tkazib yuborish

`mousemove` hodisasi sichqoncha harakatlanayotganda ishga tushadi. Lekin bu har bir piksel hodisaga olib kelishini anglatmaydi.

Brauzer vaqti-vaqti bilan sichqoncha pozitsiyasini tekshiradi. Va agar o'zgarishlarni sezsa, hodisalarni ishga tushiradi.

Bu shuni anglatadiki, agar tashrif buyuruvchi sichqonchani juda tez harakatlantirsa, ba'zi DOM-elementlar o'tkazib yuborilishi mumkin:

![](mouseover-mouseout-over-elems.svg)

Agar sichqoncha yuqorida chizilgandek `#FROM` dan `#TO` elementlariga juda tez harakat qilsa, oraliq `<div>` elementlari (yoki ularning ba'zilari) o'tkazib yuborilishi mumkin. `mouseout` hodisasi `#FROM` da ishga tushishi va keyin darhol `#TO` da `mouseover` bo'lishi mumkin.

Bu unumdorlik uchun yaxshi, chunki ko'plab oraliq elementlar bo'lishi mumkin. Biz har biriga kirish va chiqishni qayta ishlamoqchi emasmiz.

Boshqa tomondan, sichqoncha ko'rsatkichi yo'l bo'ylab barcha elementlarni "tashrif buyurmasligini" yodda tutishimiz kerak. U "sakrashi" mumkin.

Xususan, ko'rsatkich oynadan tashqaridan sahifaning o'rtasiga to'g'ri sakrashi mumkin. Bunday holda `relatedTarget` `null` bo'ladi, chunki u "hech qayerdan" kelgan:

![](mouseover-mouseout-from-outside.svg)

```online
Buni quyidagi test stendida "jonli" tekshirishingiz mumkin.

Uning HTML ikkita ichki elementga ega: `<div id="child">` `<div id="parent">` ichida. Agar sichqonchani ular ustida tez harakatlantisangiz, ehtimol faqat bola div hodisalarni ishga tushiradi, yoki ehtimol ota-onasi, yoki ehtimol umuman hodisalar bo'lmaydi.

Shuningdek, ko'rsatkichni bola `div` ga olib boring, so'ngra ota-onasi orqali tezda pastga chiqaring. Agar harakat etarlicha tez bo'lsa, ota-ona elementi e'tiborga olinmaydi. Sichqoncha ota-ona elementini sezmasdan kesib o'tadi.

[codetabs height=360 src="mouseoverout-fast"]
```

```smart header="Agar `mouseover` ishga tushsa, `mouseout` bo'lishi kerak"
Tez sichqoncha harakatlarida oraliq elementlar e'tiborga olinmasligi mumkin, lekin bir narsani aniq bilamiz: agar ko'rsatkich elementga "rasmiy" ravishda kirsa (`mouseover` hodisasi hosil bo'lsa), uni tark etganda har doim `mouseout` ni olamiz.
```

## Bola uchun ketayotganda mouseout

`mouseout` ning muhim xususiyati -- u ko'rsatkich elementdan uning avlodiga o'tganda, masalan bu HTML da `#parent` dan `#child` ga o'tganda ishga tushadi:

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

Agar biz `#parent` da bo'lsak va keyin ko'rsatkichni `#child` ga chuqurroq olib borsak, `#parent` da `mouseout` ni olamiz!

![](mouseover-to-child.svg)

Bu g'alati tuyulishi mumkin, lekin osonlikcha tushuntiriladi.

**Brauzer mantiqiga ko'ra, sichqoncha kursori istalgan vaqtda faqat *bitta* element ustida bo'lishi mumkin -- eng ichki va z-index bo'yicha eng yuqori.**

Shuning uchun agar u boshqa elementga (hatto avlodga) o'tsa, oldingi birini tark etadi.

Hodisalarni qayta ishlashning yana bir muhim tafsilotiga e'tibor bering.

Avloddagi `mouseover` hodisasi yuqoriga bubble qiladi. Shuning uchun agar `#parent` da `mouseover` ishlov beruvchi bo'lsa, u ishga tushadi:

![](mouseover-bubble-nested.svg)

```online
Buni quyidagi misolda juda yaxshi ko'rishingiz mumkin: `<div id="child">` `<div id="parent">` ichida. `#parent` elementida hodisa tafsilotlarini chiqaruvchi `mouseover/out` ishlov beruvchilari bor.

Agar sichqonchani `#parent` dan `#child` ga olib borsangiz, `#parent` da ikkita hodisani ko'rasiz:
1. `mouseout [target: parent]` (ota-onani tark etdi), keyin
2. `mouseover [target: child]` (bolaga keldi, bubble qildi).

[codetabs height=360 src="mouseoverout-child"]
```

Ko'rsatilgandek, ko'rsatkich `#parent` elementidan `#child` ga o'tganda, ota-ona elementida ikkita ishlov beruvchi ishga tushadi: `mouseout` va `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: parent element */
};
parent.onmouseover = function(event) {
  /* event.target: child element (bubbled) */
};
```

**Agar biz ishlov beruvchilar ichida `event.target` ni tekshirmasak, sichqoncha ko'rsatkichi `#parent` elementini tark etgandek va keyin darhol uning ustiga qaytgandek tuyulishi mumkin.**

Lekin bunday emas! Ko'rsatkich hali ham ota-ona ustida, u shunchaki bola elementiga chuqurroq o'tgan.

Agar ota-ona elementni tark etganda ba'zi harakatlar bo'lsa, masalan `parent.onmouseout` da animatsiya ishlasa, biz odatda ko'rsatkich shunchaki `#parent` ga chuqurroq kirganda buni xohlamaymiz.

Buni oldini olish uchun ishlov beruvchida `relatedTarget` ni tekshirishimiz va agar sichqoncha hali ham element ichida bo'lsa, bunday hodisani e'tiborsiz qoldirishimiz mumkin.

Shu kabi muammolarga ega bo'lmagan boshqa hodisalardan foydalanishimiz mumkin: `mouseenter` va `mouseleave`, bularni endi ko'rib chiqamiz.

## Hodisalar mouseenter va mouseleave

`mouseenter/mouseleave` hodisalari `mouseover/mouseout` ga o'xshash. Ular sichqoncha ko'rsatkichi elementga kirganda/chiqayotganda ishga tushadi.

Lekin ikkita muhim farq bor:

1. Element ichidagi, avlodlarga/dan o'tishlar hisobga olinmaydi.
2. `mouseenter/mouseleave` hodisalari bubble qilmaydi.

Bu hodisalar juda oddiy.

Ko'rsatkich elementga kirganda -- `mouseenter` ishga tushadi. Ko'rsatkichning element yoki uning avlodlari ichidagi aniq joylashuvi muhim emas.

Ko'rsatkich elementni tark etganda -- `mouseleave` ishga tushadi.

```online
Bu misol yuqoridagiga o'xshash, lekin endi yuqori elementda `mouseover/mouseout` o'rniga `mouseenter/mouseleave` bor.

Ko'rib turganimizdek, hosil bo'lgan yagona hodisalar ko'rsatkichni yuqori elementga kirish va chiqish bilan bog'liq. Ko'rsatkich bolaga o'tganda va orqaga qaytganda hech narsa bo'lmaydi. Avlodlar orasidagi o'tishlar e'tiborga olinmaydi

[codetabs height=340 src="mouseleave"]
```

## Hodisa delegatsiyasi

`mouseenter/leave` hodisalari juda oddiy va ishlatish oson. Lekin ular bubble qilmaydi. Shuning uchun biz ular bilan hodisa delegatsiyasidan foydalana olmaymiz.

Tasavvur qiling, biz jadval katakchalarida sichqoncha kirish/chiqishini qayta ishlamoqchimiz. Va yuzlab katak bor.

Tabiiy yechim -- `<table>` ga ishlov beruvchi o'rnatish va hodisalarni u yerda qayta ishlash bo'ladi. Lekin `mouseenter/leave` bubble qilmaydi. Shuning uchun agar bunday hodisa `<td>` da sodir bo'lsa, faqat o'sha `<td>` dagi ishlov beruvchi uni ushlashi mumkin.

`<table>` dagi `mouseenter/leave` uchun ishlov beruvchilar faqat ko'rsatkich butun jadvalga kirganda/chiqayotganda ishga tushadi. Uning ichidagi o'tishlar haqida hech qanday ma'lumot olish mumkin emas.

Shuning uchun `mouseover/mouseout` dan foydalanamiz.

Sichqoncha ostidagi elementni ajratib ko'rsatuvchi oddiy ishlov beruvchilar bilan boshlaylik:

```js
// sichqoncha ostidagi elementni ajratib ko'rsataylik
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
Mana ular amalda. Sichqoncha ushbu jadvalning elementlari bo'ylab harakatlanayotganda, joriy biri ajratiladi:

[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

Bizning holatda biz jadval katakchalarida `<td>` o'tishlarni qayta ishlamoqchimiz: katakka kirish va uni tark etish. Boshqa o'tishlar, masalan katak ichida yoki hech qanday katakdan tashqarida, bizni qiziqtirmaydi. Keling, ularni filtrlaylik.

Mana nima qilishimiz mumkin:

- Hozirgi ajratilgan `<td>` ni o'zgaruvchida eslab qolish, uni `currentElem` deb ataymiz.
- `mouseover` da -- agar biz hali ham joriy `<td>` ichida bo'lsak, hodisani e'tiborsiz qoldirish.
- `mouseout` da -- agar joriy `<td>` ni tark etmagan bo'lsak, e'tiborsiz qoldirish.

Mana barcha mumkin bo'lgan holatlarni hisobga olgan kod misoli:

```js
// Hozir ajratilgan element
let currentElem = null;

table.onmouseover = function(event) {
  // mouseover ishga tushganda va biz allaqachon biror elementni ajratgan bo'lsak,
  // unda avvalgi ajratishni bekor qilishdan oldin yangi hodisani e'tiborsiz qoldiramiz
  if (currentElem) return;

  let target = event.target.closest('td');
  
  // Biz td ga o'tmadik - e'tiborsiz qoldirish
  if (!target) return;
  
  // Biz ichki jadvalga o'tdik (mumkin), uni e'tiborsiz qoldirish
  if (!table.contains(target)) return;

  // Hurray! Biz yangi td ga kirdik
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // Agar biz hozirda hech qanday elementda bo'lmasak, e'tiborsiz qoldirish
  if (!currentElem) return;

  // Biz elementni tark etayotgiz - qayerga? Ehtimol avlodga?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // Yo'q! Biz currentElem ning ichiga o'tdik - bu ichki o'tish, e'tiborsiz qoldirish
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // Biz haqiqatdan ham elementni tark etdik
  onLeave(currentElem);
  currentElem = null;
};

// har qanday elementga kirish/chiqish funksiyalari
function onEnter(elem) {
  elem.style.background = 'pink';

  // textarea da buni ko'rsatish
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = text.scrollHeight;
}

function onLeave(elem) {
  elem.style.background = '';

  // textarea da buni ko'rsatish  
  text.value += `leave <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = text.scrollHeight;
}
```

Yana bir bor, muhim xususiyatlar:
1. U jadval ichidagi har qanday `<td>` ga kirish/chiqishni qayta ishlash uchun hodisa delegatsiyasidan foydalanadi. Shuning uchun u bubble qilmaydigan va shuning uchun delegatsiyaga ruxsat bermaydigan `mouseenter/leave` o'rniga `mouseover/out` ga tayangan.
2. `<td>` avlodlari orasida harakatlanish kabi qo'shimcha hodisalar filtrlangan, shuning uchun `onEnter/Leave` faqat ko'rsatkich `<td>` ni butunlay tark etganda yoki kirganda ishlaydi.

```online
Mana barcha tafsilotlar bilan to'liq misol:

[codetabs height=460 src="mouseenter-mouseleave-delegation-2"]

Kursorni jadval katakchalariga va ichiga kirish va chiqishda harakatlantiring. Tez yoki sekin -- farqi yo'q. Oldingi misoldan farqli o'laroq, faqat `<td>` butunlay ajratiladi.
```

## Xulosa

Biz `mouseover`, `mouseout`, `mousemove`, `mouseenter` va `mouseleave` hodisalarini ko'rib chiqdik.

Quyidagi narsalarni qayd etish yaxshi:

- Tez sichqoncha harakati oraliq elementlarni o'tkazib yuborishi mumkin.
- `mouseover/out` va `mouseenter/leave` hodisalari qo'shimcha xossaga ega: `relatedTarget`. Bu biz kelayotgan/borayotgan element, `target` ga qo'shimcha.

`mouseover/out` hodisalari ota-ona elementdan bola elementga o'tganimizda ham ishga tushadi. Brauzer sichqoncha bir vaqtda faqat bitta element ustida bo'lishi mumkin deb hisoblaydi -- eng chuqur biri.

`mouseenter/leave` hodisalari bu jihatdan boshqacha: ular faqat sichqoncha elementga butunlay kirganda va chiqayotganda ishga tushadi. Shuningdek, ular bubble qilmaydi.