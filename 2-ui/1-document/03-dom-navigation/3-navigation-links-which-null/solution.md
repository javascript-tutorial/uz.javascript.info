1. Ha, rost. `elem.lastChild` elementi har doim oxirgi element bo‘lib, unda `nextSibling` yo‘q.
2.Yo'q, noto'g'ri, chunki `elem.children[0]` *elementlar orasidagi birinchi bola*. Ammo undan oldin element bo'lmagan tugunlar mavjud bo'lishi mumkin. Shunday qilib, `previousSibling` matnli tugun bo'lishi mumkin.

Iltimos, diqqat qiling: ikkala holatda ham, agar bolalar bo'lmasa, xato bo'ladi.

Agar bolalar boʻlmasa, `elem.lastChild”` `null` hisoblanadi, shuning uchun biz `elem.lastChild.nextSibling` ga kira olmaymiz. `elem.children` to'plami esa bo'sh (bo'sh `[]` massivi kabi).
