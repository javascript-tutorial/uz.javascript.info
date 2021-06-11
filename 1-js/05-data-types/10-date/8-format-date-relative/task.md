importance: 4

---

# Nisbiy sanani formatlash

`formatDate(sana)` funktsiyasini yozing, u `sana` ni quyidagicha formatlashi kerak:

- Agar `sana` 1 soniyadan kam vaqt o'tgan bo'lsa, `"hozir"`.
- Aks holda, agar `sana` 1 daqiqadan kam vaqt o'tgan bo'lsa, unda `"n soniya oldin"`.
- Aks holda, agar bir soatdan kam bo'lsa, unda `"m min oldin"`.
- Aks holda, `"DD.MM.YY HH:mm"` formatidagi to'liq sana. Ya'ni: `"kun.oy.yil soat:daqiqa"`, barchasi 2 xonali formatda, masalan, `31.12.16 10:00`.

Misol uchun:

```js
alert( formatDate(new Date(new Date - 1)) ); // "hozir"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 soniya oldin"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 daqiqa oldin"

// 31.12.2016, 20:00 kabi kechagi sana
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
