function concat(arrays) {
  // individual massiv uzunliklarining yig'indisi
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;

  // har bir massiv uchun - natijadan nusxa ko'chiring
  // keyingi massiv avvalgisidan keyin ko'chiriladi
  let length = 0;
  for (let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
