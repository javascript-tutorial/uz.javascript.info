importance: 4

---

# Nima uchun 6.35.toFixed(1) == 6.3?

`Math.round` va `toFixed` hujjatlari bo'yicha ikkala raqam ham eng yaqin raqamga qadar: `0..4` pastga, `5..9` esa yuqoriga ko'tariladi.

Masalan:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Quyidagi o'xshash misolda nima uchun `6.35` `6.4` ga emas, `6.3` ga yaxlitlangan?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

`6.35` ni qanday qilib to'g'ri yo'l bilan yaxlitlash kerak?

