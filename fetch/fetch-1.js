const fetch = require('node-fetch');
const api = `https://api.chucknorris.io/jokes/random`;

fetch(api).then((response) => {
  return response.json();
}).then(data => {
  console.log(data.value);
});
