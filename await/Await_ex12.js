/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const CDNs = [
  'https://cdnjs.cloudflare.com/ajax/libs/d3/6.7.0/d3.min.js',
  'https://ajax.googleapis.com/ajax/libs/d3js/6.7.0/d3.min.js'
];

const d3 = await Promise.any(CDNs);