muhimlik: 3

---

# Izohda belgilang

Bu kod nimani ko'rsatadi?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // Bu qayerda?
</script>
```
