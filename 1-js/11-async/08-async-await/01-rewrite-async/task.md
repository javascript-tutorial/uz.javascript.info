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

loadJson("no-such-user.json").catch(alert); // Error: 404
```
