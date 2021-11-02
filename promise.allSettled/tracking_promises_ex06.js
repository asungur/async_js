/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const promises = [
  Promise.resolve(1), 
  Promise.resolve(2)
];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result)));

// logs:
// => { status: "fulfilled", value: 1 }
// => { status: "fulfilled", value: 2 }

Promise.all(promises).
  then((results) => results.forEach((result) => console.log(result)));

// logs:
// => 1
// => 2
