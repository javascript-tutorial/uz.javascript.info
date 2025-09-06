Farqlar:

1. `clientWidth` sonli, `getComputedStyle(elem).width` esa oxirida `px` bo`lgan qatorni qaytaradi.
2. `getComputedStyle` inline element uchun `auto` kabi raqamli bo`lmagan kenglikni qaytarishi mumkin.
3. `clientWidth` elementning ichki kontent maydoni va qo'shimchalar, CSS kengligi (standart `box-sizing` bilan) esa _to'ldirgichsiz_ ichki kontent maydonidir.
4. Agar aylantirish paneli mavjud bo'lsa va brauzer uning uchun bo'sh joy ajratsa, ba'zi brauzerlar ushbu bo'sh joyni CSS kengligidan ajratadi (chunki u endi kontent uchun mavjud emas), ba'zilari esa yo'q. `clientWidth` xususiyati har doim bir xil bo'ladi: agar zaxiralangan bo'lsa, aylantirish paneli o'lchami olib tashlanadi.
