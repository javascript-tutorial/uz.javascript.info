muhimlik: 3

---

# Nima uchun "return false" ishlamaydi?

Nima uchun quyidagi kodda `return false` umuman ishlamaydi?

```html autorun run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">brauzer w3.org saytiga o'tadi</a>
```

Brauzer bosish orqali URL manzilini kuzatib boradi, lekin biz buni xohlamaymiz.

Qanday tuzatish kerak?
