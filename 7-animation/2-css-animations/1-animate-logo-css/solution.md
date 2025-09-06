CSS ham `width` va `height` ni jonlantirish uchun:

```css
/* original sinf */

#flyjet {
  transition: all 3s;
}

/* JS .growing ni qo'shadi */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Esda tutingki, `transitionend` ikki marta ishga tushadi -- har bir xususiyat uchun bir marta. Shunday qilib, agar biz qo'shimcha tekshiruv o'tkazmasak, xabar 2 marta paydo bo'ladi.
