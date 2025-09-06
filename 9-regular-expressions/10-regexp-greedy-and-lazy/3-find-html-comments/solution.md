Sharhning boshini `match:<!--`, keyin esa `match:-->` oxirigacha hamma narsani topishimiz kerak.

Qabul qilinadigan variant `pattern:<!--.*?-->` - dangasa kvantifikator nuqtani `match:-->` oldidan to'xtatadi. Shuningdek, nuqta yangi qatorlarni o'z ichiga olishi uchun `pattern:s` bayroqchasini qo'shishimiz kerak.

Aks holda ko'p qatorli sharhlar topilmaydi:

```js run
let regexp = /<!--.*?-->/gs;

let str = `... <!-- Mening - izohim
 test --> ..  <!----> ..
`;

alert(str.match(regexp)); // '<!-- Mening -- izohim \n test -->', '<!---->'
```
