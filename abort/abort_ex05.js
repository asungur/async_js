/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const container = document.querySelector('.container');

function sayHello() {
  container.textContent = 'Hello';
}

function sayBye() {
  container.textContent = 'Bye!';
}

function depress() {
  container.style.backgroundColor = 'aqua';
}

function release() {
  container.style.backgroundColor = 'transparent';
}

container.addEventListener('mouseenter', sayHello);
container.addEventListener('mouseout', sayBye);
container.addEventListener('mousedown', depress);
container.addEventListener('mouseup', release);