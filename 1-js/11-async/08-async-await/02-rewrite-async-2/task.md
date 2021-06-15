
<<<<<<< HEAD
# Qayta yozing "rethrow" async/await

Quyida <info:promise-chaining> bobidagi "rethrow" misolini topishingiz mumkin. Uni `.then/catch` o'rniga `async/await` yordamida qayta yozing.
=======
# Rewrite "rethrow" with async/await

Below you can find the "rethrow" example. Rewrite it using `async/await` instead of `.then/catch`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Va `demoGithubUser` dagi tsikl foydasiga rekursiyadan xalos bo'ling: `async/await` yordamida bajarish oson bo'ladi.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Github haqiqiy foydalanuvchini ismini qaytarguncha foydalanuvchi ismini so'rang
function demoGithubUser() {
  let name = prompt("Ism kiriting", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`To'liq ism: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Bunday foydalanuvchi yo'q, iltimos qayta kiring.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
