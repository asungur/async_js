/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
function fetchData() {
  const timeOut = 2000;    // two seconds
  const data = fetch('https://jsonplaceholder.typicode.com/todos/1');
  const failure = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Failed to retrieve data after ${timeOut} milliseconds`));
    }, timeOut);
  });
  return Promise.race([data, failure]);
}

fetchData().then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);
});