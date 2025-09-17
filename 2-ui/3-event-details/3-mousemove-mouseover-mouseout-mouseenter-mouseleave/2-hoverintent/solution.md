Algoritm oddiy ko'rinadi:

1. Elementga `onmouseover/out` ishlov beruvchilarini o'rnating. Bu yerda `onmouseenter/leave` dan ham foydalanish mumkin, lekin ular kamroq universal, agar delegatsiyani joriy qilsak ishlamaydi.
2. Sichqoncha kursori elementga kirganda, `mousemove` da tezlikni o'lchashni boshlang.
3. Agar tezlik sekin bo'lsa, `over` ni ishga tushiring.
4. Elementdan chiqayotganda va `over` bajarilgan bo'lsa, `out` ni ishga tushiring.

Lekin tezlikni qanday o'lchash kerak?

Birinchi g'oya quyidagicha bo'lishi mumkin: har `100ms` da funksiyani ishga tushirish va oldingi va yangi koordinatalar orasidagi masofani o'lchash. Agar u kichik bo'lsa, tezlik kichik.

Afsuski, JavaScript da "joriy sichqoncha koordinatalarini" olishning imkoni yo'q. `getCurrentMouseCoordinates()` kabi funksiya yo'q.

Koordinatalarni olishning yagona yo'li - `mousemove` kabi sichqoncha hodisalarini tinglash va koordinatalarni hodisa obyektidan olish.

Shuning uchun koordinatalarni kuzatish va eslab qolish uchun `mousemove` ga ishlov beruvchi o'rnatamiz. Keyin ularni har `100ms` da bir marta solishtiramiz.

P.S. Diqqat qiling: yechim testlari tooltip to'g'ri ishlayotganini ko'rish uchun `dispatchEvent` dan foydalanadi.
