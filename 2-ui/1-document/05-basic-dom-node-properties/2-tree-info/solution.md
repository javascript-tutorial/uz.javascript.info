# `<li>` Ustida Tsikl Yasash

`<li>` elementlari ustida tsikl yasaymiz:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

Tsikl ichida har bir `li` ning ichidagi matnni olishimiz kerak.

Matnni `li` ning birinchi bolasi tugunidan, ya'ni matn tugunidan o'qishimiz mumkin:

```js
for (let li of document.querySelectorAll("li")) {
  let title = li.firstChild.data;

  // title - bu <li> ichidagi boshqa tugunlardan oldingi matn
}
```

Keyin avlodlar sonini `li.getElementsByTagName('li').length` orqali olishimiz mumkin.
