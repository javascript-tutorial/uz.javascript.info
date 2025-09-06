"use strict";

describe("hoverIntent", function () {
  // Sichqoncha hodisasini simulyatsiya qiluvchi yordamchi funksiya
  function mouse(eventType, x, y, options) {
    let eventOptions = Object.assign(
      {
        bubbles: true,
        clientX: x,
        clientY: y,
        pageX: x,
        pageY: y,
        target: elem,
      },
      options || {}
    );

    elem.dispatchEvent(new MouseEvent(eventType, eventOptions));
  }

  let isOver; // Tooltip ko'rsatilganligini kuzatish
  let hoverIntent; // HoverIntent obyekti

  before(function () {
    // Vaqtni nazorat qilish uchun fake timer ishlatish
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    // Testdan keyin timerlarni tiklash
    this.clock.restore();
  });

  beforeEach(function () {
    // Har bir test oldidan boshlang'ich holatni o'rnatish
    isOver = false;

    hoverIntent = new HoverIntent({
      elem: elem,
      over: function () {
        isOver = true; // Tooltip ko'rsatilganda
      },
      out: function () {
        isOver = false; // Tooltip yashirilganda
      },
    });
  });

  afterEach(function () {
    // Har bir testdan keyin tozalash
    if (hoverIntent) {
      hoverIntent.destroy();
    }
  });

  it("mouseover -> ko'rsatkich endigina kelganda, tooltip yo'q", function () {
    mouse("mouseover", 10, 10);
    assert.isFalse(isOver);
  });

  it("mouseover -> kechikishdan keyin tooltip paydo bo'ladi", function () {
    mouse("mouseover", 10, 10);
    this.clock.tick(100); // 100ms kechikish
    assert.isTrue(isOver);
  });

  it("mouseover -> keyin tez mouseout tooltip ko'rsatmaydi", function () {
    mouse("mouseover", 10, 10);
    setTimeout(
      () => mouse("mouseout", 300, 300, { relatedTarget: document.body }),
      30
    );
    this.clock.tick(100);
    assert.isFalse(isOver);
  });

  it("mouseover -> sekin harakat -> tooltip", function () {
    mouse("mouseover", 10, 10);
    // Sekin harakat - kichik masofada ko'p vaqt
    for (let i = 10; i < 200; i += 10) {
      setTimeout(() => mouse("mousemove", i / 5, 10), i);
    }
    this.clock.tick(200);
    assert.isTrue(isOver); // Sekin harakat tooltip ni ko'rsatadi
  });

  it("mouseover -> tez harakat -> tooltip yo'q", function () {
    mouse("mouseover", 10, 10);
    // Tez harakat - katta masofa kam vaqtda
    for (let i = 10; i < 200; i += 10) {
      setTimeout(() => mouse("mousemove", i, 10), i);
    }
    this.clock.tick(200);
    assert.isFalse(isOver); // Tez harakat tooltip ni ko'rsatmaydi
  });
});
