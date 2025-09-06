muhimlik: 5

---

# Element yaqinidagi eslatmani ko'rsatish

Anchor elementi yaqinidagi `pozitsiyaga` qarab `elem` joylashtiradigan `positionAt(anchor, position, element)` funksiyasini yarating.

`Pozitsiya` 3 ta qiymatdan biriga ega bo'lgan satr bo'lishi kerak:
- `"top"` - pozitsiyada `elem` `anchor` tepasiga joylashadi
- `"right"` - pozitsiyada `elem` `anchor`ning o'ng tomonida joylashadi 
- `"bottom"` - pozitsiyada `elem` `anchor` ostida joylashadi

U topshiriqning manba kodida taqdim etilgan `showNote(anchor, position, html)` funksiyasi ichida qoʻllaniladi, u berilgan `html` bilan `eslatma` elementini yaratadi va uni `anchor` yonidagi berilgan `pozitsiya`da koʻrsatadi.

Eslatmalar demosi:

[iframe src="solution" height="350" border="1" link]
