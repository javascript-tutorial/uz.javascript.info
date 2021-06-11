Ha, haqiqatan ham g'alati ko'rinadi.

Ammo `instanceof` funktsiyaga ahamiyat bermaydi, aksincha uning `prototype`, prototip zanjiriga mos kelishi muhim.

Va bu yerda `a.__proto__ == B.prototype`, shuning uchun `instanceof` `true` ni qaytaradi.

Shunday qilib, `instanceof` mantig'iga ko'ra, `prototype` aslida konstruktor funktsiyasini emas, balki turini belgilaydi.
