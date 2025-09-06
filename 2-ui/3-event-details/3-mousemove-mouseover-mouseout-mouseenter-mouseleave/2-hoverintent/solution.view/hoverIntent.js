"use strict";

class HoverIntent {
  constructor({
    sensitivity = 0.1, // tezlik 0,1px/ms dan kam boʻlsa, bu “element ustiga oʻtish” degan maʼnoni anglatadi.
    interval = 100, // sichqoncha tezligini 100 ms uchun bir marta o'lchang
    elem,
    over,
    out,
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // "this" hodisa ishlov beruvchilarida ob'ekt ekanligiga ishonch hosil qiling.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // va vaqtni o'lchash funktsiyasida (setInterval dan chaqiriladi)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);
  }

  onMouseOver(event) {
    if (this.isOverElement) {
      // agar biz elementdan oshib ketgan bo'lsak, hodisaga e'tibor bermang
      // biz allaqachon tezlikni o'lchayapmiz
      return;
    }

    this.isOverElement = true;

    // Har bir sichqoncha harakatidan keyin biz masofani tekshiramiz
    // oldingi va joriy sichqoncha koordinatalari o'rtasida
    // agar sezgirlikdan past bo'lsa, tezlik sekin

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener("mousemove", this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // element qoldirilsa
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener("mousemove", this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // agar element ustida to'xtash bo'lsa
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {
    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // kursor harakatlanmadi
      speed = 0;
    } else {
      speed =
        Math.sqrt(
          Math.pow(this.prevX - this.lastX, 2) +
            Math.pow(this.prevY - this.lastY, 2)
        ) /
        (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem, event);
    } else {
      // tez suring, oldingi kabi yangi koordinatalarni eslab qoling
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener("mousemove", this.onMouseMove);
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
  }
}
