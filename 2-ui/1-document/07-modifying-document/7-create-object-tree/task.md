muhimlik: 5

---

# Ob'ektdan daraxt yarating

O'rnatilgan ob'ektdan o'rnatilgan `ul/li` ro'yxatini yaratuvchi `createTree` funksiyasini yozing.

Masalan; misol uchun:

```js
let data = {
  Baliq: {
    gulmoh: {},
    salmon: {},
  },

  Daraxt: {
    Katta: {
      sekvoya: {},
      eman: {},
    },
    Gullaydigan: {
      "olma daraxti": {},
      magnolia: {},
    },
  },
};
```

Sintaksis:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // quti ichida daraxtni yaratadi
*/!*
```

Natija (daraxt) quyidagicha ko'rinishi kerak:

[iframe border=1 src="build-tree-dom"]

Ushbu vazifani hal qilishning ikkita usulidan birini tanlang:

1. Daraxt uchun HTML yarating va keyin `container.innerHTML` ga tayinlang.
2. Daraxt tugunlarini yarating va DOM usullari bilan qo'shing.

Agar ikkalasini ham qila olsangiz ajoyib bo'lardi.

P.S. Daraxtda barglar uchun bo'sh `<ul></ul>` kabi "qo'shimcha" elementlar bo'lmasligi kerak.
