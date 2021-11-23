import XMLHttpRequest from 'xhr2'
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
