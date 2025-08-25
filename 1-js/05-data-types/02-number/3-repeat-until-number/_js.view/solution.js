function readNumber() {
  let num;

  do {
    num = prompt("Iltimos, raqam kiriting!", 0);
  } while (!isFinite(num));

  if (num === null || num === "") return null;

  return +num;
}
