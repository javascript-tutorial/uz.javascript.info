muhimlik: 5

---

# Kengaytiriladigan kalkulyatorni yarating

"Kengaytiriladigan" kalkulyator obyektlarini yaratadigan `Calculator` konstruktor funktsiyasini yarating.

Vazifa ikki qismdan iborat.

1. Birinchidan, "NUMBER operatori NUMBER" (bo'shliq bilan ajratilgan) formatida `"1 + 2"` kabi matni qabul qiladigan va natijani qaytaradigan `calculate(str)` usulini qo'llang. Plyus `+` va minus `-` ni tushunishi kerak.

   Foydalanish misoli:

   ```js
   let calc = new Calculator();

   alert(calc.calculate("3 + 7")); // 10
   ```

2. Keyin kalkulyatorga yangi operatsiyani o'rgatadigan `addMethod(name, func)` usulini qo'shing. Buning uchun `name` operatori va uni amalga oshiradigan ikkita argumentli funktsiya `func(a, b)` kerak bo'ladi.

   Masalan, ko'paytma `*`, bo'linma `/` va darajani `**` qo'shamiz:

   ```js
   let powerCalc = new Calculator();
   powerCalc.addMethod("*", (a, b) => a * b);
   powerCalc.addMethod("/", (a, b) => a / b);
   powerCalc.addMethod("**", (a, b) => a ** b);

   let result = powerCalc.calculate("2 ** 3");
   alert(result); // 8
   ```

- Ushbu topshiriqda qavs yoki murakkab ifodalar yo'q.
- Raqamlar va operator to'liq bitta bo'sh joy bilan chegaralangan.
- Agar uni qo'shmoqchi bo'lsangiz, ishlov berishda xato bo'lishi mumkin.
