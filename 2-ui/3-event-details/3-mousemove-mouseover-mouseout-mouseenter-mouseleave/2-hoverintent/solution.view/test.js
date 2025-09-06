"use strict";

describe("hoverIntent", function () {
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

  let isOver;
  let hoverIntent;

  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  beforeEach(function () {
    isOver = false;

    hoverIntent = new HoverIntent({
      elem: elem,
      over: function () {
        isOver = true;
      },
      out: function () {
        isOver = false;
      },
    });
  });

  afterEach(function () {
    if (hoverIntent) {
      hoverIntent.destroy();
    }
  });

  it("mouseover -> ko'rsatkich endigina kelganda, tooltip yo'q", function () {
    mouse("mouseover", 10, 10);
    assert.isFalse(isOver);
  });

  it("mouseover -> kechikishdan keyin, tooltip paydo bo'ladi", function () {
    mouse("mouseover", 10, 10);
    this.clock.tick(100);
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
    for (let i = 10; i < 200; i += 10) {
      setTimeout(() => mouse("mousemove", i / 5, 10), i);
    }
    this.clock.tick(200);
    assert.isTrue(isOver);
  });

  it("mouseover -> tez harakat -> tooltip yo'q", function () {
    mouse("mouseover", 10, 10);
    for (let i = 10; i < 200; i += 10) {
      setTimeout(() => mouse("mousemove", i, 10), i);
    }
    this.clock.tick(200);
    assert.isFalse(isOver);
  });
});
