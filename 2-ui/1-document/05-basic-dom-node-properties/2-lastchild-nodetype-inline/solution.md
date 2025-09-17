# DOM Script Bajarilish Vaqti

Bu yerda bir noziklik bor.

`<script>` bajarilish vaqtida oxirgi DOM tugun aynan `<script>` hisoblanadi, chunki brauzer hali sahifaning qolgan qismini qayta ishlamagan.

Shuning uchun natija `1` (element tugun).

```html
<html>
  <body>
    <script>
      alert(document.body.lastChild.nodeType);
    </script>
  </body>
</html>
```
