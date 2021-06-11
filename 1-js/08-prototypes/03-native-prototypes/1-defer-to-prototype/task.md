importance: 5

---

# Funktsiyalarga "f.defer(ms)" usulini qo'shing

Barcha funktsiyalar prototipiga `ms` milisoniyadan keyin ishlaydigan `defer(ms)` usulini qo'shing.

Siz qilganingizdan so'ng, bunday kod ishlashi kerak:

```js
function f() {
  alert("Salom!");
}

f.defer(1000); // 1 soniyadan keyin "Salom!" ko'rsatadi
```
