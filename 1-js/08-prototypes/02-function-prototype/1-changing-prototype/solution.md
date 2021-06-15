
Javoblar:

1. `true`. 

    `Rabbit.prototype` ga topshirish yangi obyektlar uchun `[[Prototype]]` ni o'rnatadi, ammo bu mavjudlariga ta'sir qilmaydi.

2. `false`. 

<<<<<<< HEAD
    Obyektlar havola orqali tayinlanadi. `Rabbit.prototype` obyekti takrorlanmagan, u hali ham bitta obyektga `Rabbit.prototype` va `rabbit` ning `[[Prototype]]` tomonidan havola qilinadi.
=======
    Objects are assigned by reference. The object from `Rabbit.prototype` is not duplicated, it's still a single object referenced both by `Rabbit.prototype` and by the `[[Prototype]]` of `rabbit`. 
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Shunday qilib, uning mazmunini bitta havola orqali o'zgartirganda, ikkinchisi orqali ko'rinadi.

3. `true`.

    Barcha `o'chirish` operatsiyalari to'g'ridan-to'g'ri obyektga qo'llaniladi. Bu yerda `rabbit.eats` faylini `rabbit` dan olib tashlashga harakat qiladi, lekin unda yo'q. Shunday qilib, operatsiya hech qanday ta'sir qilmaydi.

4. `undefined`.

    Prototipdan `eats` xususiyati o'chirildi, endi u mavjud emas.
