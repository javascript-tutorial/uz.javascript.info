// Xabarlarni yuborish, oddiy POST
function PublishForm(form, url) {
  function sendMessage(message) {
    fetch(url, {
      method: "POST",
      body: message,
    });
  }

  form.onsubmit = function () {
    let message = form.message.value;
    if (message) {
      form.message.value = "";
      sendMessage(message);
    }
    return false;
  };
}

// Uzoq so'rovga ega xabarlarni qabul qilish
function SubscribePane(elem, url) {
  function showMessage(message) {
    let messageElem = document.createElement("div");
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // Ulanish vaqti tugaydi
      // ulanish juda uzoq vaqt davomida kutilayotganda sodir bo'ladi
      // qayta ulanamiz
      await subscribe();
    } else if (response.status != 200) {
      // Xatoni ko'rsatish
      showMessage(response.statusText);
      // Bir soniyada qayta ulanamiz
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // xabarni qabul qilamiz
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();
}
