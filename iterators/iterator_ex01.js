/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const arr = [10, 20, 30];

for (const value of arr) {
  console.log(value);
}

// logs:
// ⇒ 10
// ⇒ 20
// ⇒ 30

for (const value of arr[Symbol.iterator]()) {
  console.log(value);
}

// logs:
// ⇒ 10
// ⇒ 20
// ⇒ 30
