# Tsiklga asoslangan yechim

Yechim tsiklga asoslangan varianti:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Iltimos, biz ro'yxat bo'ylab yurish uchun vaqtinchalik `tmp` o'zgaruvchanidan foydalanamiz. Texnik jihatdan biz buning o'rniga `list` funktsiya parametridan foydalanishimiz mumkin edi:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Ammo bu aqlsiz bo'ladi. Kelajakda biz funktsiyani kengaytirishimiz, ro'yxat bilan yana bir narsa qilishimiz kerak bo'lishi mumkin. Agar biz `list` ni o'zgartirsak, unda biz bunday qobiliyatni yo'qotamiz.

Yaxshi o'zgaruvchanlar nomlari haqida gapiradigan bo'lsak, `list` bu yerda ro'yxatning o'zi. Buning birinchi elementi. Va u shunday qolishi kerak. Bu aniq va ishonchli.

Boshqa tomondan, `tmp` ning roli faqatgina `for` tsiklidagi `i` singari ro'yxat o'tishidir.

# Rekursiv yechim

`printList(list)` ning rekursiv varianti oddiy mantiqqa amal qiladi: ro'yxatni chiqarish uchun `list` joriy elementini chiqarishimiz kerak, keyin `list.next` uchun ham shunday qilamiz:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // joriy elementni chiqarish

  if (list.next) {
    printList(list.next); // ro'yxatning qolgan qismida ham xuddi shunday qiling
  }

}

printList(list);
```

Endi qaysi biri yaxshi?

Texnik jihatdan, tsikl samaraliroq. Ushbu ikkita variant bir xil, ammo tsikl funktsiya chaqiruvlari uchun resurslarni sarflamaydi.

Boshqa tomondan, rekursiv variant qisqaroq va ba'zida tushunish osonroq.
