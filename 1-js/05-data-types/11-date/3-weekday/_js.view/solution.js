function getLocalDay(date) {
  let day = date.getDay();

  if (day == 0) {
    // ish kuni 0 (yakshanba) Yevropada 7 ga teng
    day = 7;
  }

  return day;
}
