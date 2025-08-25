muhimlik: 5

---

# Bir-biriga bog'langan ro'yxatni chiqaring

Aytaylik, bizda bir-biriga bog'langanro'yxat bor (<info:recursion> bobda tasvirlanganidek):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};
```

Ro'yxat elementlarini birma-bir chiqaradigan `printList(list)` funktsiyasini yozing.

Yechimning ikkita variantini tuzing: tsikl yordamida va rekursiyadan foydalaning.

Qanday yaxshi: rekursiya bilan yoki bo'lmasdan?
