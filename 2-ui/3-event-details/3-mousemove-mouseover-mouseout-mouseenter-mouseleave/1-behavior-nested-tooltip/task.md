importance: 5

---

# Yaxshilangan asboblar maslahati harakati

`data-tooltip` atributiga ega boʻlgan element ustidan maslahat koʻrsatuvchi JavaScript yozing. Ushbu atributning qiymati asboblar maslahati matniga aylanishi kerak.

Bu <info:task/behavior-tooltip> topshirig'iga o'xshaydi, lekin bu erda izohli elementlarni joylashtirish mumkin. Eng chuqur joylashtirilgan asboblar maslahati ko'rsatilgan.

Bir vaqtning o'zida faqat bitta maslahat ko'rsatilishi mumkin.

Masalan; misol uchun:

```html
<div data-tooltip="Here – is the house interior" id="house">
  <div data-tooltip="Here – is the roof" id="roof"></div>
  ...
  <a
    href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs"
    data-tooltip="Read on…"
    >Hover over me</a
  >
</div>
```

Ifreymdagi natija:

[iframe src="solution" height=300 border=1]
