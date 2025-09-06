Birinchidan, biz barcha tashqi havolalarni topishimiz kerak.

Buning ikkita yo'l bor.

Birinchisi, `document.querySelectorAll('a')` yordamida barcha havolalarni topish va keyin bizga kerak bo'lgan narsalarni filtrlash:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // attributsiz

  if (!href.includes('://')) continue; // protokolsiz

  if (href.startsWith('http://internal.com')) continue; // ichki

  link.style.color = 'orange';
}
```

Esda tuting: biz `link.getAttribute('href')` dan foydalanamiz. `link.href` emas, chunki bizga HTML qiymati kerak.

Yana bir oddiy usul CSS selektoriga chek qo'shishdir:

```js
// href da :// bo'lgan barcha havolalarni qidiring
// lekin href http://internal.com bilan boshlanmaydi
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach((link) => (link.style.color = "orange"));
```
