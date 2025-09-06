importance: 5

---

# Maydonning oyna koordinatalarini toping

Quyidagi iframe-da yashil "maydon" bilan hujjatni ko'rishingiz mumkin.

O'qlar bilan ko'rsatilgan burchaklarning oyna koordinatalarini topish uchun JavaScript-dan foydalaning.

Qulaylik uchun hujjatda kichik xususiyat mavjud. Istalgan joyga bosish u yerdagi koordinatalarni ko'rsatadi.

[iframe border=1 height=360 src="source" link edit]

Sizning kodingiz oyna koordinatalarini olish uchun DOM dan foydalanishi kerak:

1. Yuqori chap, tashqi burchak (bu oddiy).
2. Pastki o'ng, tashqi burchak (oddiy ham).
3. Yuqori chap, ichki burchak (biroz qattiqroq).
4. Pastki o'ng, ichki burchak (bir necha yo'l bor, birini tanlang).

Siz hisoblagan koordinatalar sichqonchani bosish orqali qaytariladigan koordinatalar bilan bir xil bo'lishi kerak.

P.S. Agar element boshqa o'lcham yoki chegaraga ega bo'lsa, hech qanday sobit qiymatlarga bog'lanmagan bo'lsa, kod ham ishlashi kerak.
