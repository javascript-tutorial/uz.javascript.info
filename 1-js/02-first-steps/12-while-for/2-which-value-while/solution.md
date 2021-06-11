Vazifa postfiks / prefiks shakllari taqqoslashda foydalanilganda qanday qilib turli xil natijalarga olib kelishi mumkinligini namoyish etadi.

1. **1 dan 4 gacha**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    Birinchi qiymat `i = 1` dir, chunki `++ i` avval `i` ni oshiradi va keyin yangi qiymatni qaytaradi. Shunday qilib, birinchi taqqoslash `1 < 5` va `alert` `1` ni ko'rsatadi.

    Keyin `2,3,4...` ga amal qiling -- qiymatlar birin-ketin paydo bo'ladi. Taqqoslash har doim ko'paytirilgan qiymatdan foydalanadi, chunki `++` o'zgaruvchandan oldin.

    Va nihoyat, `i = 4` `5` ga oshiriladi, taqqoslash `while(5 < 5)` ishlamay qoladi va tsikl to'xtaydi. Shunday qilib, `5` ko'rsatilmaydi.
2. **1 dan 5 gacha**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    Birinchi qiymat yana `i = 1` dir. `i++` ning postfiks shakli `i` ni oshiradi va keyin *eski* qiymatini qaytaradi, shuning uchun `i++ < 5` taqqoslashida `i = 0` ishlatiladi (`++i < 5` ga zid).

    Ammo `alert` chaqiruvi alohida. Bu o'sish va taqqoslashdan keyin bajariladigan yana bir ifoda. Shunday qilib, u joriy `i = 1` ni oladi.

    Keyin `2,3,4...`

    Keling, `i = 4` da to'xtaylik. `++i` prefiksi uni ko'paytiradi va taqqoslashda `5` dan foydalanadi. Ammo bu erda biz `i++` postfiksi shakliga egamiz. Shunday qilib, u `i` dan `5` gacha ko'tariladi, lekin eski qiymatni qaytaradi. Shuning uchun taqqoslash aslida `while (4 < 5)` -- to'g'ri va boshqaruv `alert` ga o'tadi.

    `i = 5` qiymati oxirgi hisoblanadi, chunki keyingi bosqichda `while(5 < 5)` noto'g'ri.
