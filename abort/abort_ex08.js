/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
// create a reference to each HTML element
const loadBtn = document.querySelector('.loadBtn');
const abortBtn = document.querySelector('.abortBtn');
const image = document.querySelector('.image');
const result = document.querySelector('.result');

const controller = new AbortController();

// abort the request
abortBtn.addEventListener('click', () => controller.abort());

// load the image
loadBtn.addEventListener('click', async () => {  
  loadBtn.disabled = true;
  abortBtn.disabled = false;
  
  result.textContent = 'Loading...';

  try {
    const response = await fetch(`https://upload.wikimedia.org/wikipedia/com
mons/a/a3/Kayakistas_en_Glaciar_Grey.jpg`, {signal: controller.signal});
    const blob = await response.blob();  
    image.src = URL.createObjectURL(blob);  
    
    // remove the "Loading.." text
    result.textContent = '';
  } 
  catch (err) {
    if (err.name === 'AbortError') {
      result.textContent = 'Request successfully canceled';
    } else {
      result.textContent = 'An error occured!'
      console.error(err);
    }
  }

  loadBtn.disabled = false;
  abortBtn.disabled = true;
});