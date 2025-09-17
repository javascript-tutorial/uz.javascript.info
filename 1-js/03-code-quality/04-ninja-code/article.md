# Ninja kodi

```quote author="Konfutsiy"
O'ylamasdan o'rganish mehnatni yo'qotadi; o'rganmasdan o'ylash xavfli.
```

O'tmishdagi dasturchi ninjalar ushbu hiyla-nayranglardan foydalanib, kod saqlovchilarning ongini charxlashdi.

Ishga qabul qilish uchun dastruchi gurusi test topshiriqlarida ulardan foydalanishni diqqat bilan izlaydi.

Boshlang'ich dasturchilar ba'zan ularni dasturchi ninjalardan ham yaxshiroq foydalanadilar.

Ularni diqqat bilan o'qing va kimligingizni bilib oling -- ninja, boshlang'ich dasturchi yoki kod gurusi?

```warn header="Ironiya aniqlandi"
Ko'pchilik ninja yo'llaridan yurishga harakat qiladi. Muvaffaqiyatli bo'lganlar oz.
```

## Qisqalik aqlning ruhidir

Kodni iloji boricha qisqa qiling. O'zingizni qanchalik aqlli ekanligingizni ko'rsating.

Nozik til xususiyatlari sizga yo'l bo'lsin.

Masalan; misol uchun, uchlik operatorga, bir ko'z tashlang `'?'`:

```js
// taniqli javascript kutubxonasidan olingan
i = i ? (i < 0 ? Math.max(0, len + i) : i) : 0;
```

Ajoyib, to'g'rimi? Agar siz shunday yozsangiz, ushbu satrga duch kelgan va `i` ning qiymati nima ekanligini tushunishga harakat qilgan dastruchi quvnoq vaqt o'tkazishini aytadi. Keyin javob izlab huzuringizga keladi.

Qisqasi har doim yaxshiroq ekanligini ularga ayting. Ularni ninja yo'llariga boshlang.

## Bir harfli o'zgaruvchanlar

```quote author="Laozi (Tao Te Ching)"
Kim biladi - gapirmaydi. Kim aytadi - bilmaydi.
```

Tezroq kodlashning yana bir usuli - hamma joyda bitta harfli o'zgaruvchan nomlardan foydalanish. `a`, `b` yoki `c` kabi.

Qisqa o'zgaruvchi kodda o'rmondagi haqiqiy ninja singari yo'qoladi. Hech kim uni muharrirning "qidiruvi" yordamida topa olmaydi. Va hatto kimdir buni tushungan taqdirda ham, u `a` yoki `b` ismlari nimani anglatishini "hal qila olmaydi".

...Ammo istisno mavjud. Haqiqiy ninja hech qachon `i` ni hisoblagich sifatida `for` tsiklda foydalanmaydi. Har qanday joyda, lekin bu yerda emas. Atrofga nazar sol, yana ko'plab ekzotik harflar bor. Masalan, `x` yoki `y`.

Ekzotik hisoblagich sifatida ekzotik o'zgaruvchan ayniqsa ajoyib bo'ladi (agar iloji bo'lsa, uni uzoqroq qiling), agar tsikl tanasi 1-2 sahifani tashkil etsa. Agar kimdir tsiklning ichiga chuqur qarasa, u tezda `x` nomli o'zgaruvchanning tsikl hisoblagichi ekanligini aniqlay olmaydi.

## Qisqartmalardan foydalaning

Agar jamoa qoidalari bitta harfli va noaniq nomlardan foydalanishni taqiqlasa -- ularni qisqartiring, qisqartirishlardan foydalaning.

Shunday:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...va h.k

Bunday nomlarni chindan ham yaxshi sezgi egasi anglay oladi. Hamma narsani qisqartirishga harakat qiling. Faqatgina munosib odam sizning kodingizni ishlab chiqishni qo'llab-quvvatlashi kerak.

## Ismni tanlashda mavhum bo'ling.

```quote author="Laozi (Tao Te Ching)"
Buyuk kvadrat burchaksiz<br>
Eng yaxshi vaza butun hayot shakllantiriladdi,<br>
Baland musiqani eshitish mumkin emas,<br>
Buyuk tasvirning shakli yo'q.
```

Ism tanlashda eng mavhum so'zdan foydalanishga harakat qiling. `obj`, `data`, `value`, `itrem`, `elem` va boshqalar.

- **O'zgaruvchan uchun ideal nom bu `data`.** Uni iloji boricha hamma joyda ishlating. Darhaqiqat, har bir o'zgaruvchanlarda _ma'lumotlar_ saqlanadi, to'g'rimi?

  ...Agar `data` allaqachon olingan bo'lsa, nima qilish kerak? `value` ni sinab ko'ring, u ham universaldir. Axir o'zgaruvchan oxir oqibat _qiymat_ oladi.

- **O'zgaruvchani turiga qarab nomlang: `str`, `num`...**

  Ularni sinab ko'ring. Yosh tashabbuskor hayron bo'lishi mumkin -- bunday nomlar ninja uchun haqiqatan ham foydalimi? Albatta!

  Albatta, o'zgaruvchanning nomi hali ham nimanidirni anglatadi. Bu o'zgaruvchanning ichida nima borligini aytadi: matn, raqam yoki boshqa narsa. Tashqaridan kelgan kishi kodni tushunishga harakat qilganda, aslida umuman ma'lumot yo'qligini ko'rib hayron bo'ladi! Va oxir-oqibat sizning yaxshi o'ylangan kodingizni o'zgartira olmaydi.

  Koddagi nosozliklarni tuzatuvchi orqali qiymat turini topish oson. Ammo o'zgaruvchanning ma'nosi nima? U qaysi matni/raqamni saqlaydi?

  Kod ustida uzoq meditatsiya qilmasdan, bu kodni chuna ololmaysiz!

- **...Ammo endi bunday nomlar qolmasa nima bo'ladi?** Raqam qo'shing: `data1, item2, elem5`...

## Diqqatlik testi

Sizning kodingizni faqat chindan ham diqqatli dasturchi tushunishi kerak. Ammo buni qanday tekshirish kerak?

**Ulardan biri - `date` va `data` kabi o'xshash o'zgaruvchanlar nomlaridan foydalaning.**

Imkoningiz bor joyda ularni aralashtiring.

Bunday kodni tez o'qish imkonsiz bo'lib qoladi. Xato bo'lsa ... Ummm ... Biz uzoq vaqtga tiqilib qoldik, choy tayyorlasayam bo'ladi.

## Aqlli sinonimlar

```quote author="Konfutsiy"
Eng qiyin narsa - qorong'i xonada qora mushukni topishdir, ayniqsa agar u yerda mushuk bo'lmasa.
```

_Bir xil_ narsalarga _o'xshash_ nomlardan foydalanish hayotni yanada qiziqarli qiladi va jamoatchilikka ijodingizni namoyish etadi.

Masalan, funktsiya prefikslarini ko'rib chiqing. Agar funktsiya ekranda xabarni ko'rsatsa - uni `displayMessage` kabi `display...` bilan boshlang. Va agar boshqa funktsiya ekranda foydalanuvchi nomi kabi yana bir narsani ko'rsatsa, uni `show...` bilan boshlang (`showName` kabi).

Bunday funktsiyalar o'rtasida juda katta farq borligini tasavvur qiling, ammo farq yo'q bo'lsa.

Jamoadagi boshqa ninjalar bilan shartnoma tuzing: agar Elbek o'z kodida `display...` bilan funktsiyalarni "ko'rsatishni" boshlasa, unda Oybek `render...` va Aziza -- `paint...` ni ishlatishi mumkin. Kod qanchalik qiziqarli va xilma-xil bo'lganiga e'tibor bering.

...Va endi xet-trik!

Muhim farqlarga ega ikkita funktsiya uchun -- bir xil prefiksdan foydalaning!

Masalan, `printPage(page)` funktsiyasi printerdan foydalanadi. Va `printText(text)` funktsiyasi matnni ekranga chiqaradi. Noma'lum o'quvchi shu kabi nomlangan `printMessage` funktsiyasi haqida o'ylab ko'rsin: "Bu xabarni qayerga chiqaradi? Printerda yoki ekranda?". Buni chindan ham porlashi uchun `printMessage(message)` uni yangi oynada chiqarishi kerak!

## Nomlarni qayta ishlatish

```quote author="Laozi (Tao Te Ching)"
Butun , qismlarga bo'linganda<br>
nomlar kerak.<br>
Nomlar allaqachon yetarli.<br>
Qachon to'xtashni bilish kerak.
```

Yangi o'zgaruvchanni faqat o'ta zarurat bo'lganda qo'shing.

Buning o'rniga mavjud nomlarni qayta ishlating. Ularga faqat yangi qiymatlarni yozing.

Funksiyada faqat parametr sifatida berilgan o'zgaruvchanlardan foydalanishga harakat qiling.

Bu o'zgaruvchanda _hozir_ nima borligini aniqlashni qiyinlashtirishi mumkin. Va bu qayerdan kelib chiqqanligi. Intuitivligi zaif odam kodni satrma-bosqich tahlil qilishi va har bir kod bo'limi orqali o'zgarishlarni kuzatishi kerak boladi.

**Yondashuvning ilg'or varianti - bu qiymatni tsikl yoki funktsiya o'rtasida yashirin ravishda (!) almashtirish.**

Masalan:

```js
function ninjaFunction(elem) {
  // elem bilan ishlaydigan 20 ta kod satri

  elem = clone(elem);

  // yana 20 ta qator, endi elem kloni bilan ishlaydi!
}
```

Funktsiyaning ikkinchi yarmida `elem` bilan ishlashni istagan boshqa dasturchi hayron qoladi ... Faqat koddagi nosozliklarni tuzatish paytida, kodni o'rganib chiqib, ular klon bilan ishlashayotganini bilib olishadi!

Ushbu texnikani muntazam ravishda kodda ko'rdik. Tajribali ninjaga qarshi ham samarali.

## O'yin-kulgi uchun pastki chiziqlar

O'zgaruvchan nomlardan oldin `_` va `__` pastki chiziqlarini qo'ying. `_name` yoki `__value` kabi. Agar faqat siz ularning ma'nosini bilsangiz juda yaxshi bo'lar edi. Yoki yaxshiroq, ularni faqat o'yin-kulgi uchun qo'shing, umuman ma'lum ma'noga ega bo'lmasdan. Yoki turli joylarda turli xil ma'nolar sifatida qo'shing.

Siz bitta o'q bilan ikkita quyonni o'ldirasiz. Birinchidan, kod uzunroq va qiyin o'qiladigan bo'lib qoladi, ikkinchidan, boshqa dasturchi pastki chiziqlar nimani anglatishini aniqlash uchun uzoq vaqt sarf qilishi mumkin.

Aqlli ninja pastki chiziqlarni kodning bir joyiga qo'yadi va boshqa joylarda qo'shishdan qochadi. Bu kodni yanada nozik qiladi va kelajakdagi xatolar ehtimolini oshiradi.

## Sevgingizni ko'rsating

Hamma sizning subyektlaringiz qanchalik ajoyibligini ko'rsin! `superElement`, `megaFrame` va `niceItem` kabi nomlar o'quvchini ravshanlashtiradi.

Darhaqiqat, bir tomondan, bir narsa yozilgan: `super...`, `mega...`, `nice...`. Ammo boshqa tomondan - bu tafsilotlarni keltirib chiqarmaydi. O'quvchi yashirin ma'no izlashga qaror qilishi va bir-ikki soat davomida mulohaza yuritishi mumkin.

## Tashqi o'zgaruvchanlarni bir-biriga bog'lab qo'ying

```quote author="Guan Yin Zi"
Nurda bo'lganingizda, zulmatda hech narsa ko'rmaysiz.<br>
Zulmatda bo'lganingizda, hamma narsani nurda ko'rishingiz mumkin.
```

Funktsiya ichidagi va tashqarisidagi o'zgaruvchanlar uchun bir xil nomlardan foydalaning. Oddiy. Hech qanday harakat talab etilmaydi.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...bir nechta satrlar...
  ...
  ... // <-- dasturchi bu yerda foydalanuvchi bilan ishlashni xohlaydi va ...
  ...
}
```

`render` ichiga sakrab tushgan dasturchi, ehtimol tashqi foydalanuvchini soya qilingan ichki `user` mavjudligini sezmaydi.

Keyin ular tashqi o'zgaruvchanni, `authenticateUser()` natijasini hisobga olib, `user` bilan ishlashga harakat qilishadi... Tuzoq paydo bo'ldi! Salom, koddagi nosozliklarni tuzatuvchi...

## Hamma joyda yon ta'sir mavjud!

Hech narsani o'zgartirmaydiganga o'xshash funktsiyalar mavjud. `IsReady()`, `checkPermission()`, `findTags()` ... Ular hisob-kitoblarni amalga oshirishlari, ma'lumotlarni topishlari va ulardan tashqarida hech narsa o'zgartirmasdan qaytarishlari kerak. Boshqacha qilib aytganda, "yon ta'sirlarsiz".

**Haqiqatan ham ajoyib hiyla - bu ularga asosiy vazifadan tashqari, "foydali" harakatlarni qo'shishdir.**

Funktsiya `is..`, `check..` yoki `find...` deb nomlangan bo'lib, ijro etganda biror qiymatni o'zgartirsa, sizning hamkasbingizning dunyo qarashi juda kengayadi!

**Ajablanishning yana bir usuli - nostandart natijani qaytarish.**

O'zingizning asl fikringizni ko'rsating! `checkPermission` chaqiruvi `true/false` emas, balki tekshirish natijalarini murakkab obyektga qaytaring.

`If(checkPermission(..))` yozishga urinayotgan dasturchilar, nima uchun u ishlamayapti, deb hayron bo'lishadi. Ularga ayting: "Hujjatlarni o'qing!". Va ushbu maqolani bering.

## Kuchli funktsiyalar!

```quote author="Laozi (Tao Te Ching)"
Dao hamma joyda va hamma narsada,<br>
ham chapda, ham o'ngda.
```

Funktsiyani uning nomiga yozilgan narsalar bilan cheklamang. Kengroq bo'ling.

Masalan, `validateEmail(email)` funktsiyasi (elektron pochtani to'g'riligini tekshirishdan tashqari) xato xabari ko'rsatishi va elektron pochtani qayta kiritishni so'rashi mumkin.

Qo'shimcha harakatlar funktsiya nomidan aniq bo'lmasligi kerak. Haqiqiy ninja kodlovchi ularni koddan ham ko'rinmas qiladi.

**Bir nechta amallarni birlashtirish sizning kodingizni qayta ishlatishdan himoya qiladi.**

Tasavvur qiling, boshqa dasturchi faqat elektron pochtani tekshirishni istaydi va hech qanday xabar chiqarmashini. Sizning funktsiyangiz `validateEmail(email)` ikkalasini ham qiladigan ularga mos kelmaydi. Shunday qilib, ular bu haqda hech narsa so'rab, sizning meditatsiyangizni buzmaydi.

## Xulosa

Yuqoridagi barcha "maslahatlar" haqiqiy koddan olingan .. Ba'zan tajribali dasturchilar tomonidan yoziladi. Ehtimol sizdan ham tajribali ;)

- Ulardan ba'zilariga amal qiling, shunda kodingiz kutilmagan hodisalarga boy bo'ladi.
- Ularning ko'pchiligiga amal qiling, shunda kodingiz sizniki bo'ladi, hech kim uni o'zgartirishni xohlamaydi.
- Barchasini amal qiling, shunda sizning kodingiz ma'rifatni izlayotgan yosh dasturchilar uchun qimmatli dars bo'ladi.
