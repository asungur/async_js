/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const controller = new AbortController();
const signal = controller.signal;
const request = new Request('https://eloux.com/todos/1', {signal});

fetch(request)
  .then(response => {
    return response.json();
  }).then(response => {
    console.log(response);
  });
  
setTimeout(() => controller.abort(), 2000);