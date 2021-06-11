importance: 5

---

# Bo'shliqni tekshiring

Ob'ektning xusisiyatlari bo'lmasa, `true`, aks holda `false` ni qaytaradigan `isEmpty(obj)` funktsiyasini yozing.

Bunday ishlashi kerak:

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "turmoq";

alert( isEmpty(schedule) ); // false
```

