function camelize(str) {
  return str
    .split("-") // 'my-long-word' ni ['my', 'long', 'word'] massivga bo'ladi
    .map(
      // birinchisidan tashqari barcha massiv elementlarining birinchi harfini katta qiladi
      // ['my', 'long', 'word'] ni ['my', 'Long', 'Word'] ga aylantiradi
      (word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(""); // ['my', 'Long', 'Word'] ni 'myLongWord' ga birlashtiradi
}
