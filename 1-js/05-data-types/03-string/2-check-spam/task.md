muhimlik: 5

---

# Spam borligini tekshiring

Agar “str” tarkibida “viagra” yoki “XXX” bo‘lsa, “true” qaytaradigan “checkSpam(str)” funksiyasini yozing, aks holda “false”.

Funktsiya katta-kichik harflarga sezgir bo'lmasligi kerak:

```js
checkSpam("buy ViAgRA now") == true;
checkSpam("free xxxxx") == true;
checkSpam("innocent rabbit") == false;
```
