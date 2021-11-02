/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
function fetchWithTimeout(url, settings, timeout) {
  // If the timeout argument doesn't exists
  if (timeout === undefined) {
    return fetch(url, settings); 
  }
  
  // if timeout isn't an integer, throw an error
  if (!Number.isInteger(timeout)) {
    throw new TypeError('The third argument is not an integer')   
  }
  
  const controller = new AbortController(); 
  setTimeout(() => controller.abort(), timeout);
  settings.signal = controller.signal;
  return fetch(url, settings);
}