
Bu yerda hech qanday fokuslar yo'q. `demoGithubUser` ichida `.catch` ni `try...catch` bilan almashtiring va kerak bo'lganda `async/await` ni qo'shing:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Github haqiqiy foydalanuvchini qaytarguncha foydalanuvchi nomini so'rang
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Ism kiriting", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // xato yo'q, tsiklni tark etish
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // alert-dan keyin tsikl davom etadi
        alert("Bunday foydalanuvchi yo'q, iltimos qayta kiring.");
      } else {
        // noma'lum xato, qaytarmoq
        throw err;
      }
    }      
  }


  alert(`To'liq ism: ${user.name}.`);
  return user;
}

demoGithubUser();
```
