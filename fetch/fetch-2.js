import fetch from 'node-fetch';
const api = `https://api.chucknorris.io/jokes/random`;

fetch(api).then((response) => {
	console.log(response.constructor);   // => ƒ Response() { [native code] } OR [class Response extends Body]
});
