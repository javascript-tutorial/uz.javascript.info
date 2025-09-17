"use strict";

// Sinfning qisqacha eskizi
// baribir kerak bo'ladigan narsalar bilan
class HoverIntent {
  constructor({
    sensitivity = 0.1, // 0.1px/ms dan kam tezlik "element ustida turish" degan ma'noni anglatadi
    interval = 100, // sichqoncha tezligini har 100ms da bir marta o'lcha: oldingi va keyingi nuqtalar orasidagi masofani hisoblang
    elem,
    over,
    out,
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // hodisa ishlov beruvchilarida "this" obyekt bo'lishini ta'minlash
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // ishlov beruvchilarni tayinlash
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // shu nuqtadan davom eting
  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }

  destroy() {
    /* funksionallikni "o'chirish", barcha ishlov beruvchilarni olib tashlash uchun kodingiz */
    /* bu testlarning ishlashi uchun kerak */
  }
}
