Modal oyna butun oynani qoplaydigan yarim shaffof `<div id="cover-div">` yordamida amalga oshirilishi mumkin, masalan:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

`<div>` hamma narsani qamrab olganligi sababli, uning ostidagi sahifani emas, balki barcha kliklarni oladi.

Shuningdek, biz `body.style.overflowY='hidden'` o'rnatish orqali sahifani aylantirishni oldini olishimiz mumkin.

Shakl `<div>` ichida emas, balki uning yonida bo'lishi kerak, chunki biz unda `opacity` bo'lishini istamaymiz.
