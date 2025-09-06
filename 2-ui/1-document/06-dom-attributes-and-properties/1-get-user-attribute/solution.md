```html run height=100
<!DOCTYPE html>
<html>
  <body>
    <div data-widget-name="menu">Janr tanlang</div>

    <script>
      // elementni olish
      let elem = document.querySelector("[data-widget-name]");

      // qiymatni o'qish
      alert(elem.dataset.widgetName);
      // yoki
      alert(elem.getAttribute("data-widget-name"));
    </script>
  </body>
</html>
```
