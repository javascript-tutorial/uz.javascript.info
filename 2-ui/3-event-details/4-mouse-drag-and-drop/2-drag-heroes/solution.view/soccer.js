let isDragging = false;

document.addEventListener("mousedown", function (event) {
  let dragElement = event.target.closest(".draggable");

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function () {
    return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // sudrab boshlashda:
  //   dastlabki siljishni eslang
  //   element pozitsiyasini ko'chiring:sobit va tananing to'g'ridan-to'g'ri bolasi
  function startDrag(element, clientX, clientY) {
    if (isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseup", onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = "fixed";

    moveAt(clientX, clientY);
  }

  // hujjatdagi elementni tuzatish uchun oxirida mutlaq koordinatalarga o'ting
  function finishDrag() {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top =
      parseInt(dragElement.style.top) + window.pageYOffset + "px";
    dragElement.style.position = "absolute";

    document.removeEventListener("mousemove", onMouseMove);
    dragElement.removeEventListener("mouseup", onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // yangi oynaning nisbiy koordinatalari
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // yangi koordinatalar oynaning pastki chetidan pastda ekanligini tekshiring
    let newBottom = newY + dragElement.offsetHeight; // yangi pastki

    // oyna ostidami? sahifani aylantiramiz
    if (newBottom > document.documentElement.clientHeight) {
      // hujjat oxirining oyna-nisbiy koordinatasi
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // hujjatni 10px pastga aylantiring, muammo bor
      // u hujjat oxiridan tashqariga o'tishi mumkin
      // Math.min(oxirigacha qancha qoldi, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // hisob-kitoblar aniq emas, yuqoriga o'tishga olib keladigan yaxlitlash xatolari bo'lishi mumkin
      // bu imkonsiz bo'lishi kerak, buni shu erda tuzating
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // sichqonchaning tez harakatlanishi kursorni hujjat oxiridan tashqariga qo'yish
      // agar shunday bo'lsa -
      // yangi Y ni maksimal darajada cheklash (hujjatning o'ng pastki qismida)
      newY = Math.min(
        newY,
        document.documentElement.clientHeight - dragElement.offsetHeight
      );
    }

    // yangi koordinatalar oynaning yuqori chetidan yuqori ekanligini tekshiring (shunga o'xshash mantiq)
    if (newY < 0) {
      // yuqoriga aylantiring
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // aniqlikdagi xatolarni tekshiring

      window.scrollBy(0, -scrollY);
      // sichqonchaning tez harakatlanishi kursorni hujjat boshlanishidan tashqariga qo'yishi mumkin
      newY = Math.max(newY, 0); // newY 0 dan past bo'lmasligi mumkin
    }

    // yangi X ni oyna chegaralarida cheklash
    // bu erda hech qanday aylantirish yo'q, shuning uchun hamma narsa oddiy
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + "px";
    dragElement.style.top = newY + "px";
  }
});
