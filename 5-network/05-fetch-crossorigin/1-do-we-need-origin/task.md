muhimlik: 5

---

# Nima uchun bizga Origin kerak?

Siz bilganingizdek, odatda tarmoq so'rovini boshlagan sahifaning URL manzilini o'z ichiga olgan `Referer` HTTP sarlavhasi mavjud.

Masalan, `http://javascript.info/some/url` dan `http://google.com` ni olishda sarlavhalar quyidagicha ko`rinadi:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Ko'rib turganingizdek, `Referer` ham, `Origin` ham mavjud.

Savollar:

1. Agar `Referer` ko'proq ma`lumotga ega bo'lsa, nima uchun `Origin` kerak?
2. `Referer` yoki `Origin` yo'qligi mumkinmi yoki bu noto'g'ri?
