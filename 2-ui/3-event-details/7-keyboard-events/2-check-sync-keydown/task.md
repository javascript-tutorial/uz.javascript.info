muhimlik: 5

---

# Kengaytirilgan tezkor tugmalar

`code1`, `code2`, ..., `code_n` kodlari bilan tugmalarni bir vaqtda bosish bilan `func` ishlaydigan `runOnKeys(func, code1, code2, ... code_n)` funksiyasini yarating.

Misol uchun, quyidagi kodda `"Q"` va `"W"` birga bosilganda `alert` ko'rsatiladi (har qanday tilda, CapsLock bilan yoki bo'lmasdan)

```js no-beautify
runOnKeys(() => alert("Salom!"), "KeyQ", "KeyW");
```

[demo src="solution"]
