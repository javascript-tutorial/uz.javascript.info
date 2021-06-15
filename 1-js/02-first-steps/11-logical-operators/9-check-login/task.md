importance: 3

---

# Kirishni tekshiring

`prompt` bilan kirish uchun kod yozing.

<<<<<<< HEAD
Agar mehmon `"Admin"` matnini kiritsa, u holda parol `prompt` orqali so'raladi, agar bo'sh satr yoki `key:Esc` bolsa -- "Bekor qilindi" ko'rsatiladi, agar boshqa satr bo'lsa -- "Men sizni tanimayman" ko'rsatiladi.
=======
If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or `key:Esc` -- show "Canceled", if it's another string -- then show "I don't know you".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Parol quyidagicha tekshiriladi:

<<<<<<< HEAD
- Agar u "Master" ga teng bo'lsa, unda "Xush kelibsiz!",
- Boshqa satr -- "Noto'g'ri parol" ko'rsatiladi,
- Bo'sh satr yoki bekor qilingan kiritish uchun "Bekor qilingdi" ko'rsatiladi.
=======
- If it equals "TheMaster", then show "Welcome!",
- Another string -- show "Wrong password",
- For an empty string or cancelled input, show "Canceled"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Sxema:

![](ifelse_task.svg)

Iltimos, ichki `if` bloklaridan foydalaning. Kodning umumiy o'qilishini yodda tuting.

Maslahat: so'rovga bo'sh matni kiritish, bo'sh matni `''` qaytaradi. So'rov vaqtida `key:ESC` tugmasi bosish `null` ni qaytaradi.

[demo]
