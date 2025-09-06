// <td> hozir sichqoncha ostida (agar mavjud bo'lsa)
let currentElem = null;

table.onmouseover = function (event) {
  // yangi elementni kiritishdan oldin sichqoncha har doim oldingi elementni tark etadi
  // agar currentElem o'rnatilgan bo'lsa, biz oldingi <td> dan chiqmadik,
  // bu uning ichida sichqonchani bosish, hodisani e'tiborsiz qoldiring
  if (currentElem) return;

  let target = event.target.closest("td");

  // biz <td> ga ko'chdik - e'tibor bermang
  if (!target) return;

  // <td> ga ko'chirildi, lekin jadvalimizdan tashqarida (jadvallar o'rnatilgan bo'lsa mumkin)
  // e'tibor bermang
  if (!table.contains(target)) return;

  // urrraaa! biz yangi <td> ga kirdik
  currentElem = target;
  onEnter(currentElem);
};

table.onmouseout = function (event) {
  // agar biz hozir biron bir <td> dan tashqarida bo'lsak, hodisaga e'tibor bermang
  // bu jadval ichidagi harakat, lekin <td> dan tashqarida,
  // masalan. <tr> dan boshqa <tr> ga
  if (!currentElem) return;

  // biz elementni qoldiramiz – qayerga? Balki vorisigadir?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // ota-ona zanjiriga o'ting va biz hali ham currentElem ichida ekanligimizni tekshiring
    // keyin bu ichki o'tish - unga e'tibor bermang
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // biz <td> ni tark etdik.
  onLeave(currentElem);
  currentElem = null;
};

// elementni kiritish/chiqish bilan bog'liq har qanday funktsiyalar
function onEnter(elem) {
  elem.style.background = "pink";

  // buni matn maydonida ko'rsating
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = "";

  // buni matn maydonida ko'rsating
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
