/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
let result;
const api = `http://api.openweathermap.org/data/2.5/weather?
q=Tokyo,Japan&APPID=1b1b3e9e909416e5bbe365a0a8505fbb`;
// use your own app id in production

export default (async () => {
  const response = await fetch(api);
  result = await response.json();
})();

export {result};