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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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
