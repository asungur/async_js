const XMLHttpRequest = require('xhr2');
const fetch = require('node-fetch');
const api = `https://api.chucknorris.io/jokes/random`;

// Working with XMLHttpRequest pre fetch:
// Listener function
function listener() {
  let data = JSON.parse(this.responseText);
  console.log(data.value);
}
// // error handler function
function error(err) {
  console.log("Error!: ", err);
}
// // create request object and send
let req = new XMLHttpRequest();
req.onload = listener;
req.onerror = error;
req.open('get', api, true);
req.send();


// Step 1: What is fetch?
// console.log(fetch(api));

fetch(api).then((result) => {
  console.log(result);
  // return result.json();
}).then(response => {
  // console.log(response.value);
});
