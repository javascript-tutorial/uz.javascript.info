# Bezier egri chizig'i

Bezier egri chiziqlari kompyuter grafikasida shakllar chizish, CSS animatsiyalari va boshqa ko'plab joylarda ishlatiladi.

Ular juda oddiy narsa bo'lib, bir marta o'rganib, keyin vektor grafikalari va ilg'or animatsiyalar dunyosida o'zingizni qulay his qilishga arziydi.

## Nazorat nuqtalari

[Bezier egri chizig'i](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) nazorat nuqtalari bilan aniqlanadi.

2, 3, 4 yoki undan ko'p nuqta bo'lishi mumkin.

Masalan, ikki nuqtali egri chiziq:

![](bezier2.svg)

Uch nuqtali egri chiziq:

![](bezier3.svg)

To'rt nuqtali egri chiziq:

![](bezier4.svg)

Agar bu egri chiziqlarni diqqat bilan qararsangiz, darhol sezasiz:

1. **Nuqtalar har doim ham egri chiziqda emas.** Bu mutlaqo normal, keyinroq egri chiziq qanday qurilishini ko'ramiz.
2. **Egri chiziq tartibi nuqtalar sonidan bittaga kam**.
Ikki nuqta uchun bizda chiziqli egri chiziq bor (bu to'g'ri chiziq), uch nuqta uchun -- kvadrat egri chiziq (parabolik), to'rt nuqta uchun -- kub egri chiziq.
3. **Egri chiziq har doim nazorat nuqtalarining [qavariq qobig'i](https://en.wikipedia.org/wiki/Convex_hull) ichida:**

    ![](bezier4-e.svg) ![](bezier3-e.svg)

Oxirgi xususiyat tufayli kompyuter grafikasida kesishish testlarini optimallashtirish mumkin. Agar qavariq qobiqlar kesishmasa, egri chiziqlar ham kesishmaydi. Shuning uchun avval qavariq qobiqlarning kesishishini tekshirish juda tez "kesishish yo'q" natijasini berishi mumkin. Qavariq qobiqlarning kesishishini tekshirish ancha oson, chunki ular to'rtburchaklar, uchburchaklar va hokazo (yuqoridagi rasmga qarang), egri chiziqdan ko'ra ancha oddiy shakllar.

**Chizish uchun Bezier egri chiziqlarining asosiy qiymati -- nuqtalarni siljitish orqali egri chiziq *intuitiv ravishda tushunarli tarzda* o'zgaradi.**

Quyidagi misolda sichqoncha yordamida nazorat nuqtalarini siljitishga harakat qiling:

[iframe src="demo.svg?nocpath=1&p=0,0,0.5,0,0.5,1,1,1" height=370]

**Ko'rib turganingizdek, egri chiziq 1 -> 2 va 3 -> 4 tangensial chiziqlar bo'ylab cho'ziladi.**

Bir oz amaliyotdan keyin kerakli egri chiziqni olish uchun nuqtalarni qayerga qo'yish kerakligi aniq bo'ladi. Va bir nechta egri chiziqni birlashtirib, deyarli hamma narsani olishimiz mumkin.

Mana bir nechta misollar:

![](bezier-car.svg) ![](bezier-letter.svg) ![](bezier-vase.svg)

## De Casteljau algoritmi

Bezier egri chiziqlari uchun matematik formula mavjud, lekin uni biroz keyinroq ko'rib chiqaylik, chunki [De Casteljau algoritmi](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm) matematik ta'rifga bir xil va u qanday qurilishini vizual ko'rsatadi.

Avval 3 nuqtali misolni ko'raylik.

Mana demo va tushuntirish quyida keladi.

Nazorat nuqtalarini (1, 2 va 3) sichqoncha bilan siljitish mumkin. Ishga tushirish uchun "play" tugmasini bosing.

[iframe src="demo.svg?p=0,0,0.5,1,1,0&animate=1" height=370]

**3 nuqtali Bezier egri chizig'ini qurish uchun De Casteljau algoritmi:**

1. Nazorat nuqtalarini chizish. Yuqoridagi demoda ular belgilangan: `1`, `2`, `3`.
2. 1 -> 2 -> 3 nazorat nuqtalari orasida segmentlar qurish. Yuqoridagi demoda ular <span style="color:#825E28">jigarrang</span>.
3. `t` parametri `0`dan `1`gacha harakatlanadi. Yuqoridagi misolda `0.05` qadam ishlatilgan: tsikl `0, 0.05, 0.1, 0.15, ... 0.95, 1` dan o'tadi.

    `t`ning har bir qiymati uchun:

    - Har bir <span style="color:#825E28">jigarrang</span> segmentda biz boshlanishidan `t`ga proporsional masofada joylashgan nuqtani olamiz. Ikkita segment bo'lgani uchun, bizda ikkita nuqta bor.

        Masalan, `t=0` uchun -- ikkala nuqta ham segmentlarning boshida bo'ladi, `t=0.25` uchun -- boshlanishdan segment uzunligining 25%ida, `t=0.5` uchun -- 50% (o'rtada), `t=1` uchun -- segmentlar oxirida.

    - Nuqtalarni birlashtirish. Quyidagi rasmda ulovchi segment <span style="color:#167490">ko'k</span> rangda bo'yalgan.

| `t=0.25` uchun             | `t=0.5` uchun            |
| ------------------------ | ---------------------- |
| ![](bezier3-draw1.svg)   | ![](bezier3-draw2.svg) |

4. Endi <span style="color:#167490">ko'k</span> segmentda `t`ning xuddi shu qiymatiga proporsional masofada nuqta olamiz. Ya'ni, `t=0.25` uchun (chap rasm) bizda segmentning chap choragining oxirida nuqta bor, `t=0.5` uchun (o'ng rasm) -- segmentning o'rtasida. Yuqoridagi rasmlarda bu nuqta <span style="color:red">qizil</span>.

5. `t` `0`dan `1`gacha yugurganda, `t`ning har bir qiymati egri chiziqqa nuqta qo'shadi. Bunday nuqtalar to'plami Bezier egri chizig'ini hosil qiladi. Yuqoridagi rasmlarda u qizil va parabolik.

Bu 3 nuqta uchun jarayon edi. Lekin 4 nuqta uchun ham xuddi shunday.

4 nuqta uchun demo (nuqtalarni sichqoncha bilan siljitish mumkin):

[iframe src="demo.svg?p=0,0,0.5,0,0.5,1,1,1&animate=1" height=370]

4 nuqta uchun algoritm:

- Nazorat nuqtalarini segmentlar bilan birlashtirish: 1 -> 2, 2 -> 3, 3 -> 4. 3 ta <span style="color:#825E28">jigarrang</span> segment bo'ladi.
- `0`dan `1`gacha intervalda har bir `t` uchun:
    - Biz bu segmentlarda boshlanishdan `t`ga proporsional masofada nuqtalarni olamiz. Bu nuqtalar ulanadi, shunda bizda ikkita <span style="color:#0A0">yashil segment</span> bo'ladi.
    - Bu segmentlarda biz `t`ga proporsional nuqtalarni olamiz. Bizda bitta <span style="color:#167490">ko'k segment</span> bo'ladi.
    - Ko'k segmentda biz `t`ga proporsional nuqta olamiz. Yuqoridagi misolda u <span style="color:red">qizil</span>.
- Bu nuqtalar birgalikda egri chiziqni hosil qiladi.

Algoritm rekursiv va har qanday miqdordagi nazorat nuqtalari uchun umumlashtirilishi mumkin.

N ta nazorat nuqtasi berilgan:

1. Biz ularni birlashtirib, dastlab N-1 ta segment olamiz.
2. Keyin `0`dan `1`gacha har bir `t` uchun, biz har bir segmentda `t`ga proporsional masofada nuqta olamiz va ularni birlashtirarmiz. N-2 ta segment bo'ladi.
3. Faqat bitta nuqta qolgunga qadar 2-qadamni takrorlaymiz.

Bu nuqtalar egri chiziqni yaratadi.

```online
**Segmentlarni va egri chiziq qanday qurilishini aniq ko'rish uchun misollarni ishga tushiring va pauza qiling.**
```

`y=1/t` ga o'xshash ko'rinadigan egri chiziq:

[iframe src="demo.svg?p=0,0,0,0.75,0.25,1,1,1&animate=1" height=370]

Zigzag nazorat nuqtalari ham yaxshi ishlaydi:

[iframe src="demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1" height=370]

Halqa yaratish mumkin:

[iframe src="demo.svg?p=0,0,1,0.5,0,1,0.5,0&animate=1" height=370]

Silliq bo'lmagan Bezier egri chizig'i (ha, bu ham mumkin):

[iframe src="demo.svg?p=0,0,1,1,0,1,1,0&animate=1" height=370]

```online
Agar algoritm tavsifida tushunarsiz narsa bo'lsa, iltimos, egri chiziq qanday qurilishini ko'rish uchun yuqoridagi jonli misollarga qarang.
```

Algoritm rekursiv bo'lgani uchun, biz har qanday tartibdagi Bezier egri chiziqlarini qurishimiz mumkin, ya'ni: 5, 6 yoki undan ko'p nazorat nuqtalaridan foydalanib. Lekin amalda ko'p nuqtalar kamroq foydali. Odatda biz 2-3 nuqta olamiz va murakkab chiziqlar uchun bir nechta egri chiziqni birlashtirarmiz. Bu ishlab chiqish va hisoblash uchun sodda.

```smart header="Berilgan nuqtalar *orqali* egri chiziqni qanday chizish mumkin?"
Bezier egri chizig'ini belgilash uchun nazorat nuqtalari ishlatiladi. Ko'rib turganingizdek, ular birinchi va oxirgisidan tashqari egri chiziqda emas.

Ba'zida bizda boshqa vazifa bor: *bir nechta nuqta orqali* egri chiziq chizish, shunda ularning barchasi bitta silliq egri chiziqda bo'lsin. Bu vazifa [interpolatsiya](https://en.wikipedia.org/wiki/Interpolation) deb ataladi va bu yerda uni ko'rib chiqmaymiz.

Bunday egri chiziqlar uchun matematik formulalar mavjud, masalan [Lagrange polinomi](https://en.wikipedia.org/wiki/Lagrange_polynomial). Kompyuter grafikasida ko'plab nuqtalarni bog'laydigan silliq egri chiziqlar qurish uchun ko'pincha [spline interpolatsiyasi](https://en.wikipedia.org/wiki/Spline_interpolation) ishlatiladi.
```

## Matematika

Bezier egri chizig'ini matematik formula yordamida tasvirlash mumkin.

Ko'rib turganimizdek -- uni bilish haqiqatan ham zarur emas, ko'pchilik odamlar sichqoncha bilan nuqtalarni siljitib egri chiziqni chizadilar. Lekin agar siz matematikaga qiziqsangiz -- mana bu.

<code>P<sub>i</sub></code> nazorat nuqtalarining koordinatalari berilgan: birinchi nazorat nuqtasi <code>P<sub>1</sub> = (x<sub>1</sub>, y<sub>1</sub>)</code> koordinatlariga ega, ikkinchisi: <code>P<sub>2</sub> = (x<sub>2</sub>, y<sub>2</sub>)</code>, va hokazo, egri chiziq koordinatalari `[0,1]` segmentidan `t` parametriga bog'liq bo'lgan tenglama bilan tavsiflanadi.

- 2 nuqtali egri chiziq uchun formula:

    <code>P = (1-t)P<sub>1</sub> + tP<sub>2</sub></code>
- 3 nazorat nuqtasi uchun:

    <code>P = (1−t)<sup>2</sup>P<sub>1</sub> + 2(1−t)tP<sub>2</sub> + t<sup>2</sup>P<sub>3</sub></code>
- 4 nazorat nuqtasi uchun:

    <code>P = (1−t)<sup>3</sup>P<sub>1</sub> + 3(1−t)<sup>2</sup>tP<sub>2</sub>  +3(1−t)t<sup>2</sup>P<sub>3</sub> + t<sup>3</sup>P<sub>4</sub></code>

Bular vektor tenglamalari. Boshqacha qilib aytganda, tegishli koordinatalarni olish uchun `P` o'rniga `x` va `y` qo'yishimiz mumkin.

Masalan, 3 nuqtali egri chiziq quyidagicha hisoblangan `(x,y)` nuqtalari bilan hosil bo'ladi:

- <code>x = (1−t)<sup>2</sup>x<sub>1</sub> + 2(1−t)tx<sub>2</sub> + t<sup>2</sup>x<sub>3</sub></code>
- <code>y = (1−t)<sup>2</sup>y<sub>1</sub> + 2(1−t)ty<sub>2</sub> + t<sup>2</sup>y<sub>3</sub></code>

<code>x<sub>1</sub>, y<sub>1</sub>, x<sub>2</sub>, y<sub>2</sub>, x<sub>3</sub>, y<sub>3</sub></code> o'rniga biz 3 nazorat nuqtasining koordinatlarini qo'yishimiz kerak, va keyin `t` `0`dan `1`gacha harakat qilganda, har bir `t` qiymati uchun bizda egri chiziqning `(x,y)` koordinatasi bo'ladi.

Masalan, agar nazorat nuqtalari `(0,0)`, `(0.5, 1)` va `(1, 0)` bo'lsa, tenglamalar quyidagicha bo'ladi:

- <code>x = (1−t)<sup>2</sup> * 0 + 2(1−t)t * 0.5 + t<sup>2</sup> * 1 = (1-t)t + t<sup>2</sup> = t</code>
- <code>y = (1−t)<sup>2</sup> * 0 + 2(1−t)t * 1 + t<sup>2</sup> * 0 = 2(1-t)t = –2t<sup>2</sup> + 2t</code>

Endi `t` `0`dan `1`gacha yugurganda, har bir `t` uchun `(x,y)` qiymatlari to'plami bunday nazorat nuqtalari uchun egri chiziqni hosil qiladi.

## Xulosa

Bezier egri chiziqlari nazorat nuqtalari bilan aniqlanadi.

Biz Bezier egri chiziqlarining ikkita ta'rifini ko'rdik:

1. Chizish jarayonidan foydalanib: De Casteljau algoritmi.
2. Matematik formulalardan foydalanib.

Bezier egri chiziqlarining yaxshi xususiyatlari:

- Biz nazorat nuqtalarini siljitish orqali sichqoncha bilan silliq chiziqlar chizishimiz mumkin.
- Murakkab shakllar bir nechta Bezier egri chiziqlaridan yasalishi mumkin.

Foydalanish:

- Kompyuter grafikasida, modellashtirish, vektor grafik muharrirlari. Shriftlar Bezier egri chiziqlari bilan tavsiflanadi.
- Veb dasturlashda -- Canvas va SVG formatidagi grafikalar uchun. Aytgancha, yuqoridagi "jonli" misollar SVG da yozilgan. Ular aslida parametr sifatida turli nuqtalar berilgan bitta SVG hujjati. Uni alohida oynada ochib manbani ko'rishingiz mumkin: [demo.svg](demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1).
- CSS animatsiyalarida animatsiya yo'li va tezligini tavsiflash uchun.