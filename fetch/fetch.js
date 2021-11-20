const fetch = require('node-fetch');
const api = `https://api.chucknorris.io/jokes/random`;

// Step 1: What is fetch?
fetch(api).then((response) => {
  if (response.status !== 200) {
    console.log('Request unsuccessful: ' + response.status);
  }
  response.json().then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log('Response content parsing error: ' + err);
  })
}).then((err) => {
  console.log('Fetch error: ' + err);
});
