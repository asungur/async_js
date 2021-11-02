/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}

console.log(isIterable({a: 10, b: 20}));  // ⇒ false 
console.log(isIterable(123));             // ⇒ false 

console.log(isIterable("abc"));           // ⇒ true
console.log(isIterable([10, 20, 30]));    // ⇒ true