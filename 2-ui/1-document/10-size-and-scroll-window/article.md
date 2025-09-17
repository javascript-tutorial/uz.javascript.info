# Oyna o'lchamlari va skrolling

Brauzer oynasining kengligi va balandligini qanday topamiz? Hujjatning to'liq kengligi va balandligini, shu jumladan skroll qilingan qismni ham qanday olamiz? JavaScript yordamida sahifani qanday skroll qilamiz?

Bunday ma'lumotlar uchun biz `<html>` tegiga mos keladigan `document.documentElement` ildiz hujjat elementidan foydalanishimiz mumkin. Ammo qo'shimcha usullar va xususiyatlarni ham hisobga olish kerak.

## Oyna kengligi/balandligi

Oyna kengligi va balandligini olish uchun `document.documentElement` ning `clientWidth/clientHeight` dan foydalanishimiz mumkin:

![](document-client-width-height.svg)

```online
Masalan, bu tugma sizning oyngizning balandligini ko'rsatadi:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="`window.innerWidth/innerHeight` emas"
Brauzerlar `window.innerWidth/innerHeight` kabi xususiyatlarni ham qo'llab-quvvatlaydi. Ular bizga kerak bo'lgan narsaga o'xshaydi, nega ulardan foydalanmaymiz?

Agar skrollbar mavjud bo'lsa va u biron bir joy egallasa, `clientWidth/clientHeight` unisiz (uni ayirib) kenglik/balandlikni taqdim etadi. Boshqacha qilib aytganda, ular kontent uchun mavjud bo'lgan hujjatning ko'rinadigan qismining kenglik/balandligini qaytaradi.

`window.innerWidth/innerHeight` skrollbarni ham o'z ichiga oladi.

Agar skrollbar mavjud bo'lsa va u biron bir joy egallasa, u holda bu ikki satr turli qiymatlarni ko'rsatadi:
```js run
alert( window.innerWidth ); // to'liq oyna kengligi
alert( document.documentElement.clientWidth ); // oyna kengligi minus skrollbar
```

Ko'p hollarda bizga skrollbarlar ichida (agar mavjud bo'lsa) biror narsani chizish yoki joylashtirish uchun *mavjud* oyna kengligi kerak, shuning uchun `documentElement.clientHeight/clientWidth` dan foydalanishimiz kerak.
````

```warn header="`DOCTYPE` muhim"
E'tibor bering: HTML da `<!DOCTYPE HTML>` bo'lmasa, yuqori darajadagi geometriya xususiyatlari biroz boshqacha ishlashi mumkin. G'alati narsalar mumkin.

Zamonaviy HTML da biz har doim `DOCTYPE` yozishimiz kerak.
```

## Hujjat kengligi/balandligi

Nazariy jihatdan, ildiz hujjat elementi `document.documentElement` bo'lib, u barcha kontentni o'z ichiga olganligi sababli, biz hujjatning to'liq o'lchamini `document.documentElement.scrollWidth/scrollHeight` sifatida o'lchashimiz mumkin.

Ammo bu elementda, butun sahifa uchun, bu xususiyatlar mo'ljallangandek ishlamaydi. Chrome/Safari/Opera da, agar skroll bo'lmasa, `documentElement.scrollHeight` hatto `documentElement.clientHeight` dan ham kam bo'lishi mumkin! G'alati, to'g'rimi?

To'liq hujjat balandligini ishonchli olish uchun biz bu xususiyatlarning maksimumini olishimiz kerak:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('To\'liq hujjat balandligi, skroll qilingan qism bilan: ' + scrollHeight);
```

Nima uchun bunday? Yaxshisi so'ramang. Bu nomuvofiqliklar qadimiy zamonlardan keladi, "aqlli" mantiq emas.

## Joriy skrollni olish [#page-scroll]

DOM elementlari o'zlarining joriy skroll holatini `scrollLeft/scrollTop` xususiyatlarida saqlaydi.

Hujjat skrolli uchun `document.documentElement.scrollLeft/scrollTop` ko'pchilik brauzerlarda ishlaydi, Safari kabi eski WebKit-ga asoslangan brauzerlardan tashqari (xato [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), bu yerda `document.documentElement` o'rniga `document.body` dan foydalanishimiz kerak.

Yaxshiyamki, biz bu xususiyatlarni umuman eslab qolishimiz shart emas, chunki skroll maxsus xususiyatlarda mavjud: `window.pageXOffset/pageYOffset`:

```js run
alert('Yuqoridan joriy skroll: ' + window.pageYOffset);
alert('Chapdan joriy skroll: ' + window.pageXOffset);
```

Bu xususiyatlar faqat o'qish uchun.

```smart header="`window` xususiyatlari `scrollX` va `scrollY` sifatida ham mavjud"
Tarixiy sabablarga ko'ra, ikkala xususiyat ham mavjud, lekin ular bir xil:
- `window.pageXOffset` - `window.scrollX` ning taxallusi.
- `window.pageYOffset` - `window.scrollY` ning taxallusi.
```

## Skrolling: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
JavaScript bilan sahifani skroll qilish uchun uning DOM to'liq qurilgan bo'lishi kerak.

Masalan, agar biz `<head>` dagi skript bilan sahifani skroll qilishga harakat qilsak, u ishlamaydi.
```

Oddiy elementlarni `scrollTop/scrollLeft` ni o'zgartirish orqali skroll qilish mumkin.

Sahifa uchun ham xuddi shunday qilishimiz mumkin `document.documentElement.scrollTop/scrollLeft` dan foydalanib (Safari dan tashqari, u yerda `document.body.scrollTop/Left` dan foydalanish kerak).

Muqobil ravishda, oddiyroq, universal yechim mavjud: maxsus usullar [window.scrollBy(x,y)](mdn:api/Window/scrollBy) va [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- `scrollBy(x,y)` usuli sahifani *joriy holatiga nisbatan* skroll qiladi. Masalan, `scrollBy(0,10)` sahifani `10px` pastga skroll qiladi.

    ```online
    Quyidagi tugma buni namoyish etadi:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- `scrollTo(pageX,pageY)` usuli sahifani *mutlaq koordinatalarga* skroll qiladi, shunda ko'rinadigan qismning chap yuqori burchagi hujjatning chap yuqori burchagiga nisbatan `(pageX, pageY)` koordinatalariga ega bo'ladi. Bu `scrollLeft/scrollTop` ni o'rnatishga o'xshaydi.

    Eng boshiga skroll qilish uchun `scrollTo(0,0)` dan foydalanishimiz mumkin.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Bu usullar barcha brauzerlar uchun bir xil ishlaydi.

## scrollIntoView

To'liqlik uchun yana bir usulni ko'rib chiqaylik: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

`elem.scrollIntoView(top)` ga chaqiruv `elem` ni ko'rinadigan qilish uchun sahifani skroll qiladi. Unda bitta argument bor:

- Agar `top=true` (bu standart), sahifa `elem` ni oynaning yuqorisida paydo qilish uchun skroll qilinadi. Elementning yuqori chegarasi oyna yuqorisi bilan tekislanadi.
- Agar `top=false`, sahifa `elem` ni pastda paydo qilish uchun skroll qilinadi. Elementning pastki chegarasi oyna pastki qismi bilan tekislanadi.

```online
Quyidagi tugma sahifani skroll qilib, o'zini oyna yuqorisiga joylashtiradi:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

Va bu tugma sahifani skroll qilib, o'zini pastga joylashtiradi:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Skrollni taqiqlash

Ba'zan hujjatni "skroll qilib bo'lmaydigan" qilishimiz kerak. Masalan, sahifani zudlik bilan e'tibor talab qiladigan katta xabar bilan qoplashimiz kerak bo'lganda va tashrif buyuruvchining hujjat bilan emas, balki o'sha xabar bilan muloqot qilishini xohlaganimizda.

Hujjatni skroll qilib bo'lmaydigan qilish uchun `document.body.style.overflow = "hidden"` o'rnatish kifoya. Sahifa joriy skroll holatida "muzlab" qoladi.

```online
Sinab ko'ring:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

Birinchi tugma skrollni muzlatadi, ikkinchisi esa uni bo'shatadi.
```

Xuddi shunday texnikani nafaqat `document.body` uchun, balki boshqa elementlar uchun ham ishlatishimiz mumkin.

Usulning kamchiligi shundaki, skrollbar yo'qoladi. Agar u biron bir joy egallagan bo'lsa, o'sha joy endi bo'sh bo'ladi va kontent uni to'ldirish uchun "sakraydi".

Bu biroz g'alati ko'rinadi, lekin agar biz muzlatishdan oldin va keyin `clientWidth` ni solishtirsak, hal qilish mumkin. Agar u oshgan bo'lsa (skrollbar yo'qolgan), kontent kengligi bir xil qolishi uchun skrollbar o'rniga `document.body` ga `padding` qo'shing.

## Xulosa

Geometriya:

- Hujjatning ko'rinadigan qismining kengligi/balandligi (kontent maydoni kengligi/balandligi): `document.documentElement.clientWidth/clientHeight`
- Butun hujjatning kengligi/balandligi, skroll qilingan qism bilan:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Skrolling:

- Joriy skrollni o'qish: `window.pageYOffset/pageXOffset`.
- Joriy skrollni o'zgartirish:

    - `window.scrollTo(pageX,pageY)` -- mutlaq koordinatalar,
    - `window.scrollBy(x,y)` -- joriy joyga nisbatan skroll,
    - `elem.scrollIntoView(top)` -- `elem` ni ko'rinadigan qilish uchun skroll (oynaning yuqori/pastki qismi bilan tekislash).

export default ({ children }) => <div>{children}</div>;