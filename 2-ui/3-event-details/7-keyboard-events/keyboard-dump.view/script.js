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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
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
