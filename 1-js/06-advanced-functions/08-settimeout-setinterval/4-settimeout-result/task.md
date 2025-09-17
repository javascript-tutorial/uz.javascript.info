muhimlik: 5

---

# setTimeout nimani namoyish etadi?

Quyidagi kodda `setTimeout` chaqiruvi rejalashtirilgan, keyin 100 ms dan ko'proq vaqtni talab qiladigan og'ir hisoblash amalga oshiriladi.

Rejalashtirilgan funktsiya qachon ishlaydi?

1. Tsikldan keyin.
2. Tsikldan oldin.
3. Tsiklning boshida.

`alert` nimani ko'rsatmoqda?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// ushbu funktsiyani bajarish vaqti> 100ms deb taxmin qiling
for (let j = 0; j < 100000000; j++) {
  i++;
}
```
