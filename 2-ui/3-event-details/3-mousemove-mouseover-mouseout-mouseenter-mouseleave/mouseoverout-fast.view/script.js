let parent = document.getElementById("parent");
parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;

function handler(event) {
  let type = event.type;
<<<<<<< HEAD
  while (type < 11) type += " ";
=======
  while (type.length < 11) type += ' ';
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

  log(type + " target=" + event.target.id);
  return false;
}

function clearText() {
  text.value = "";
  lastMessage = "";
}

let lastMessageTime = 0;
let lastMessage = "";
let repeatCounter = 1;

function log(message) {
  if (lastMessageTime == 0) lastMessageTime = new Date();

  let time = new Date();

  if (time - lastMessageTime > 500) {
    message = "------------------------------\n" + message;
  }

  if (message === lastMessage) {
    repeatCounter++;
    if (repeatCounter == 2) {
      text.value = text.value.trim() + " x 2\n";
    } else {
      text.value =
        text.value.slice(0, text.value.lastIndexOf("x") + 1) +
        repeatCounter +
        "\n";
    }
  } else {
    repeatCounter = 1;
    text.value += message + "\n";
  }

  text.scrollTop = text.scrollHeight;

  lastMessageTime = time;
  lastMessage = message;
}
