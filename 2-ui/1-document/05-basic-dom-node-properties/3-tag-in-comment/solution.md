Javob: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert(body.firstChild.data); // BODY
</script>
```

Bosqichma-bosqich nima sodir bo'ladi:

1. `<body>` mazmuni izoh bilan almashtiriladi. Sharh `<!--BODY-->`, chunki `body.tagName == "BODY"`. Esda tutganimizdek, HTML-da `tagName` har doim katta harf bo'ladi.
2. Sharh endi yagona tugun, shuning uchun biz uni `body.firstChild` da olamiz.
3. Sharhning `ma`lumotlar` xususiyati uning mazmunidir (`<!--...-->`ichida):`BODY`.
