# Foydalanuvchilarni GITHUBdan olish

GitHub loginlari qatorini oladigan, foydalanuvchilarni GitHub'dan oladigan va GitHub foydalanuvchilari qatorini qaytaradigan `getUsers(names)` asinxron funksiyasini yarating.

Berilgan `USERNAME` uchun foydalanuvchi ma'lumotlariga ega GitHub url: `https://api.github.com/users/USERNAME`.

Sandboxda sinov namunasi mavjud.

Muhim tafsilotlar:

1. Har bir foydalanuvchi uchun bitta `fetch` soʻrovi boʻlishi kerak.
2. So'rovlar bir-birini kutmasligi kerak. Shunday qilib, ma'lumotlar imkon qadar tezroq keladi.
3. Agar biron-bir so'rov bajarilmasa yoki bunday foydalanuvchi bo'lmasa, funktsiya olingan massivda `null` qiymatini qaytarishi kerak.
