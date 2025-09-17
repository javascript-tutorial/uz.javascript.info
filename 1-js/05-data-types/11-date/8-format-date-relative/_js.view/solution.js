function formatDate(date) {
  let diff = new Date() - date; // millisekundlardagi farq

  if (diff < 1000) {
    // less than 1 second
    return "right now";
  }

  let sec = Math.floor(diff / 1000); // farqni sekundlarga o'tkazish

  if (sec < 60) {
    return sec + " sec. ago";
  }

  let min = Math.floor(diff / 60000); // farqni minutlarga o'tkazish
  if (min < 60) {
    return min + " min. ago";
  }

  // vaqtni formatlash
  // bir xonali kun/oy/soat/daqiqaga bosh nollarni qo'shing
  let d = date;
  d = [
    "0" + d.getDate(),
    "0" + (d.getMonth() + 1),
    "" + d.getFullYear(),
    "0" + d.getHours(),
    "0" + d.getMinutes(),
  ].map((component) => component.slice(-2)); // Har bir komponentning oxirgi 2 raqamini oling

  // komponentlarni sanaga qo'shing
  return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
}
