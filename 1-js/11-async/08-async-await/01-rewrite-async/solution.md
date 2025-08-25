Izohlar kod ostida:

```js run
async function loadJson(url) {
  // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson("no-such-user.json").catch(alert); // Error: 404 (4)
```

Izohlar:

1. `loadUrl` funktsiyasi `async` bo'ladi.
2. Hammasi `.then` ichi `await` bilan almashtiriladi.
3. Buni kutish o'rniga `response.json()` ni qaytarishimiz mumkin, masalan:

   ```js
   if (response.status == 200) {
     return response.json(); // (3)
   }
   ```

   Shunda tashqi kod ushbu va'dani hal qilishini kutishi kerak edi. Bizning holatda bu muhim emas.

4. `loadJson` dan chiqarilgan xato `.catch` tomonidan hal qilinadi. Biz u yerda `await loadJson(…)` dan foydalana olmaymiz, chunki biz `async` funktsiyasida emasmiz.
