const fetch = require('node-fetch');
const api = `https://api.chucknorris.io/jokes/random`;

fetch(api).then((response) => {
  // console.log(response.constructor.name);
  return response.json();
}).then(data => {
  console.log(data);
});

// Logs:
// {
//   categories: [],
//   created_at: '2020-01-05 13:42:24.142371',
//   icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
//   id: 'u8TVSFMxQ5GeqhBjweVvGQ',
//   updated_at: '2020-01-05 13:42:24.142371',
//   url: 'https://api.chucknorris.io/jokes/u8TVSFMxQ5GeqhBjweVvGQ',
//   value: "Chuck Norris has already won the Tour De France whilst sitting on a tortoise's back with no legs. In 2015."
// }
