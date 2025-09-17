Jadvalni qator sifatida yaratamiz: `"<table>...</table>"` va keyin uni `innerHTML` ga tayinlaymiz.

Algoritm:

1. `<th>` va hafta kunlari nomlari bilan jadval sarlavhasini yarating.
2. `d = new Date(yil, oy-1)` sana obyektini yarating. Bu `oy`ning birinchi kuni (JavaScript-da oylar `1` emas, `0` dan boshlanishini hisobga olgan holda).
3. `d.getDay()` oyning birinchi kunigacha bo'lgan dastlabki bir nechta katakchalar bo'sh bo'lishi mumkin. Keling, ularni `<td></td>` bilan to`ldiramiz.
4. `d` da kunni oshiring: `d.setDate(d.getDate()+1)`. Agar `d.getMonth()` hali keyingi oy bo'lmasa, taqvimga yangi katakchani `<td>` qo'shing. Agar bu yakshanba bo'lsa, yangi qatorni <code>"&lt;/tr&gt;&lt;tr&gt;"</code> qo'shing.
5. Agar oy tugagan bo'lsa, lekin jadval qatori hali to'liq bo'lmasa, unga bo'sh `<td>` qo'shing, uni kvadratga aylantiring.
