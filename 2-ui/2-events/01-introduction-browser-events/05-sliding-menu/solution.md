# HTML/CSS
Avval HTML/CSS yarataylik.

Menyu sahifada mustaqil grafik komponent bo'lgani uchun uni bitta DOM elementiga joylashtirish yaxshiroq.

Menyu elementlari ro'yxati `ul/li` ro'yxat sifatida joylashtirilishi mumkin.

Mana misol tuzilma:

```html
<div class="menu">
  <span class="title">Shirinliklar (menga bosing)!</span>
  <ul>
    <li>Tort</li>
    <li>Donut</li>
    <li>Asal</li>
  </ul>
</div>
```

Biz sarlavha uchun `<span>` dan foydalanamiz, chunki `<div>` da yashirin `display:block` bor va u gorizontal kenglikning 100% ini egallaydi.

Mana shunday:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Shirinliklar (menga bosing)!</div>
```

Shuning uchun agar biz unga `onclick` o'rnatsak, u matn o'ng tomonidagi bosilishlarni ushlaydi.

`<span>` yashirin `display: inline` ga ega bo'lgani uchun, u barcha matnni sig'dirish uchun aynan yetarli joy egallaydi:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Shirinliklar (menga bosing)!</span>
```

# Menyuni almashtirish

Menyuni almashtirish o'qni o'zgartirishi va menyu ro'yxatini ko'rsatishi/yashirishi kerak.

Bu barcha o'zgarishlar CSS tomonidan mukammal tarzda boshqariladi. JavaScript da biz `.open` sinfini qo'shish/olib tashlash orqali menyuni joriy holatini belgilashimiz kerak.

Busiz menyu yopiq bo'ladi:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...Va `.open` bilan o'q o'zgaradi va ro'yxat ko'rinadi:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```

## To'liq ishlayotgan misol

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .menu {
      cursor: pointer;
      font-family: Arial, sans-serif;
    }
    
    .menu ul {
      margin: 0;
      list-style: none;
      padding-left: 20px;
      display: none;
    }
    
    .menu .title::before {
      content: '▶ ';
      font-size: 80%;
      color: green;
    }
    
    .menu.open .title::before {
      content: '▼ ';
    }
    
    .menu.open ul {
      display: block;
    }
    
    .menu li {
      padding: 2px 0;
    }
  </style>
</head>
<body>
  <div class="menu" id="menu">
    <span class="title">Shirinliklar (menga bosing)!</span>
    <ul>
      <li>Tort</li>
      <li>Donut</li>
      <li>Asal</li>
    </ul>
  </div>

  <script>
    document.getElementById('menu').addEventListener('click', function() {
      this.classList.toggle('open');
    });
  </script>
</body>
</html>
```

## Asosiy tushunchalar:

1. **HTML tuzilma**: `<div>` konteyner, `<span>` sarlavha, `<ul>/<li>` ro'yxat elementlari
2. **CSS holatlar**: `.open` sinfi menyu holatini boshqaradi
3. **JavaScript interaktivlik**: `classList.toggle()` orqali sinfni qo'shish/olib tashlash
4. **Vizual ko'rsatkichlar**: O'qlar (▶ yopiq, ▼ ochiq) menyuni holati haqida ma'lumot beradi

Bu yondashuv CSS animatsiyalari va turli xil stil effektlari bilan kengaytirilishi mumkin.