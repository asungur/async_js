import fetch from 'node-fetch';
const api = `https://api.chucknorris.io/jokes/random`;

// Step 1: What is fetch?
fetch(api).then((response) => {
  if (!response.ok) {
    console.log('Request unsuccessful: ' + response.status);
    return;
  }
  response.json().then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log('Response content parsing error: ' + err);
  })
}).catch((err) => {
  console.log(err); // FetchError: request to XXXXXX failed, reason:XXXXXXX
});
