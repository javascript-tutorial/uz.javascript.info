Javob: **1 va 3**.

Ikkala buyruq ham `elem`ga `matn`ni «matn sifatida» qo'shishga olib keladi.

Mana bir misol:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = "<b>text</b>";

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
