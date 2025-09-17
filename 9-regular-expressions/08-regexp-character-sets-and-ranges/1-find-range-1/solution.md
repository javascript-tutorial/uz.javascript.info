Javoblar: **no, yes**.

- `subject:Java` skriptida u hech narsaga mos kelmaydi, chunki `pattern:[^script]` "berilganlardan tashqari har qanday belgi" degan ma'noni anglatadi. Shunday qilib, regexp `"Java"` dan keyin bitta shunday belgini qidiradi, lekin satr oxiri bor, undan keyin hech qanday belgi yo'q.

  ```js run
  alert("Java".match(/Java[^script]/)); // null
  ```

- Ha, chunki `pattern:[^script]` qismi `"S"` belgisiga mos keladi. Bu "pattern:script" dan biri emas. Regexp katta-kichik harflarga sezgir bo'lgani uchun (`"pattern:i"` bayrog'i yo'q), u `"S"` ni `"s"` dan boshqa belgi sifatida ko'radi.

  ```js run
  alert("JavaScript".match(/Java[^script]/)); // "JavaS"
  ```
