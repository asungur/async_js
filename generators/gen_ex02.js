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

srcArr[Symbol.asyncIterator] = async function*() {  
  let i = 0;
  for (const url of this) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Unable to retrieve URL: ' + response.status);
    }
    yield response.json();
  }
};

const iterator = srcArr[Symbol.asyncIterator]();

iterator.next().then(result => {
  console.log(result.value.firstName);  // ⇒ John
});

iterator.next().then(result => {
  console.log(result.value.firstName);  // ⇒ Peter
});

iterator.next().then(result => {
  console.log(result.value.firstName);  // ⇒ Anna
});