import fetch from 'node-fetch';
const api = `https://api.chucknorris.io/jokes/random`;

fetch(api).then((response) => {
	console.log(response.constructor);   // => [class Response]
});
