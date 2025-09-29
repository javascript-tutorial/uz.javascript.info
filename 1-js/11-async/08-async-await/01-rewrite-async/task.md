# Async/await yordamida qayta yozing

<info:promise-chaining> bobidagi misollardan birini `.then/catch` o'rniga `async/await` yordamida qayta yozing:

```js run
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

<<<<<<< HEAD
loadJson("no-such-user.json").catch(alert); // Error: 404
=======
loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
