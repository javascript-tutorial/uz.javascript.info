# So'z chegarasi: \b

So'z chegarasi `pattern:\b` - bu `pattern:^` va `pattern:$` kabi test.

Regexp dvigateli (regexplarni qidirishni amalga oshiruvchi dastur moduli) `pattern:\b`ga duch kelganda, u satrdagi pozitsiya so'z chegarasi ekanligini tekshiradi.

So'z chegarasi sifatida uchta turli pozitsiya mavjud:

- Satr boshida, agar birinchi satr belgisi so'z belgisi `pattern:\w` bo'lsa.
- Satrdagi ikki belgi o'rtasida, biri so'z belgisi `pattern:\w`, ikkinchisi esa yo'q.
- Satr oxirida, agar oxirgi satr belgisi so'z belgisi `pattern:\w` bo'lsa.

Masalan, `pattern:\bJava\b` regexp `subject:Salom, Java!` da topiladi, bu yerda `subject:Java` mustaqil so'z, lekin `subject:Salom, JavaScript!` da emas.

```js run
alert( "Salom, Java!".match(/\bJava\b/) ); // Java
alert( "Salom, JavaScript!".match(/\bJava\b/) ); // null
```

`subject:Salom, Java!` satrida quyidagi pozitsiyalar `pattern:\b`ga mos keladi:

![](hello-java-boundaries.svg)

Shunday qilib, u `pattern:\bSalom\b` naqshiga mos keladi, chunki:

1. Satr boshida birinchi test `pattern:\b`ga mos keladi.
2. Keyin `pattern:Salom` so'ziga mos keladi.
3. Keyin `pattern:\b` testi yana mos keladi, chunki biz `subject:o` va vergul o'rtasidamiz.

Shunday qilib, `pattern:\bSalom\b` naqshi mos keladi, lekin `pattern:\bSalo\b` emas (chunki `o` dan keyin so'z chegarasi yo'q) va `Java!\b` ham emas (chunki undov belgisi so'z belgisi `pattern:\w` emas, shuning uchun undan keyin so'z chegarasi yo'q).

```js run
alert( "Salom, Java!".match(/\bSalom\b/) ); // Salom
alert( "Salom, Java!".match(/\bJava\b/) );  // Java
alert( "Salom, Java!".match(/\bHell\b/) );  // null (moslik yo'q)
alert( "Salom, Java!".match(/\bJava!\b/) ); // null (moslik yo'q)
```

Biz `pattern:\b`ni nafaqat so'zlar bilan, balki raqamlar bilan ham ishlatishimiz mumkin.

Masalan, `pattern:\b\d\d\b` naqshi mustaqil 2 xonali raqamlarni qidiradi. Boshqacha qilib aytganda, u `pattern:\w`dan farqli belgilar bilan o'ralgan 2 xonali raqamlarni qidiradi, masalan bo'shliqlar yoki tinish belgilari (yoki matn boshi/oxiri).

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="So'z chegarasi `pattern:\b` lotin bo'lmagan alifbolar uchun ishlamaydi"
So'z chegarasi testi `pattern:\b` pozitsiyaning bir tomonida `pattern:\w` bo'lishi va boshqa tomonida "not `pattern:\w`" bo'lishi kerakligini tekshiradi.

Lekin `pattern:\w` lotin harfi `a-z` (yoki raqam yoki pastki chiziq) degani, shuning uchun test boshqa belgilar uchun ishlamaydi, masalan kirill harflari yoki ierogliflar.
```