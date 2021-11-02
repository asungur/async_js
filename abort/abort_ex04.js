/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const src = 'https://eloux.com/todos/1';
const controller = new AbortController();
const signal = controller.signal;

fetch(src, {signal})
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request successfully cancelled');
    } else {
      console.error('Fetch failed!', error);
    }
  });

controller.abort();

// logs:
// => Request successfully cancelled