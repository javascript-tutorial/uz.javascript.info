Masalan, ko'p usullar mavjud:


`<div>` DOM tuguni:

```js
document.body.firstElementChild
// yoki
document.body.children[0]
// yoki (birinchi tugun bo'sh joy, shuning uchun biz 2-ni olamiz)
document.body.childNodes[1]
```

`<ul>` DOM tuguni:

```js
document.body.lastElementChild
// yoki
document.body.children[1]
```

Ikkinchi `<li>` (Pit bilan):

```js
// <ul> ni oling va keyin uning oxirgi elementi bolasini oling
document.body.lastElementChild.lastElementChild
```
