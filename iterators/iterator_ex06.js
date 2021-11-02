/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const srcArr = [
  'https://eloux.com/async_js/examples/1.json',
  'https://eloux.com/async_js/examples/2.json',
  'https://eloux.com/async_js/examples/3.json',
];

srcArr[Symbol.asyncIterator] = function() {
  let i = 0;
  return {
    async next() {
      if (i === srcArr.length) {
        return {
          done: true
        };
      }
      const url = srcArr[i++];
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Unable to retrieve URL: ' + url);
      }
      return {
        value: await response.json(),
        done: false
      };
    }
  };
};

(async function() {
  for await (const url of srcArr) {
    console.log(url.firstName);
  }
})();

// logs:
// ⇒ John
// ⇒ Peter
// ⇒ Anna