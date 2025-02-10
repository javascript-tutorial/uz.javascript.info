# Rekursiyadan foydalanish

Rekursiv mantiq bu erda biroz hiyla-nayrang.

Avvaliga ro'yxatning qolgan qismini chiqarishimiz kerak, *keyin*  joriyini chiqarishimiz kerak:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Tsikldan foydalanish

<<<<<<< HEAD
To'g'ridan-to'g'ri chiqishdan ko'ra tsikl varianti biroz murakkabroq.
=======
The loop variant is also a little bit more complicated than the direct output.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Bizning `ro'yxatimizdan` oxirgi qiymatni olishning imkoni yo'q. Shuningdek, biz "orqaga qaytishimiz" mumkin emas.

<<<<<<< HEAD
Shunday qilib, biz avval elementlarni to'g'ridan-to'g'ri tartibda ko'rib chiqish va ularni massivda eslab qolish, keyin esa eslab qolgan elementlarni teskari tartibda chiqarish:
=======
So what we can do is to first go through the items in the direct order and remember them in an array, and then output what we remembered in the reverse order:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Iltimos, esda tutingki, rekursiv yechim aslida aynan bir xil narsani bajaradi: u ro'yxatni kuzatib boradi, ichki chaqiruvlar zanjiridagi elementlarni eslaydi (ijro kontekst stekida) va keyin ularni chiqaradi.
