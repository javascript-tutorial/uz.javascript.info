function isEmpty(obj) {
  for (let key in obj) {
    // agar tsikl boshlangan bo'lsa, unda xususiyat mavjud
    return false;
  }
  return true;
}
