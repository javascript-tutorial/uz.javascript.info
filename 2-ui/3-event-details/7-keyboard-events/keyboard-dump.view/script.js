kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

let lastTime = Date.now();

function handle(e) {
  if (form.elements[e.type + "Ignore"].checked) return;

<<<<<<< HEAD
  let text =
    e.type +
    " key=" +
    e.key +
    " code=" +
    e.code +
    (e.shiftKey ? " shiftKey" : "") +
    (e.ctrlKey ? " ctrlKey" : "") +
    (e.altKey ? " altKey" : "") +
    (e.metaKey ? " metaKey" : "") +
    (e.repeat ? " (repeat)" : "") +
=======
  area.scrollTop = 1e6;

  let text = e.type +
    ' key=' + e.key +
    ' code=' + e.code +
    (e.shiftKey ? ' shiftKey' : '') +
    (e.ctrlKey ? ' ctrlKey' : '') +
    (e.altKey ? ' altKey' : '') +
    (e.metaKey ? ' metaKey' : '') +
    (e.repeat ? ' (repeat)' : '') +
>>>>>>> 20208769e528337949e946f526534d61d38bac47
    "\n";

  if (area.value && Date.now() - lastTime > 250) {
    area.value += new Array(81).join("-") + "\n";
  }
  lastTime = Date.now();

  area.value += text;

  if (form.elements[e.type + "Stop"].checked) {
    e.preventDefault();
  }
}
