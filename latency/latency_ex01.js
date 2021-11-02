/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const promiseA = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, 'A');
});

const promiseB = new Promise((resolve) => {
  setTimeout(resolve, 2000, 'B');
});

Promise.race([
  promiseA,
  promiseB
]).then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);  // => A
});

Promise.any([
  promiseA,
  promiseB
]).then((response) => {
   console.log(response);  // => B
}).catch((error) => {
  console.error(error);
});