form.onclick = function (event) {
  event.target.style.backgroundColor = "yellow";

  // xromni sariq rangga bo'yash uchun biroz vaqt kerak
  setTimeout(() => {
    alert("target = " + event.target.tagName + ", this=" + this.tagName);
    event.target.style.backgroundColor = "";
  }, 0);
};
