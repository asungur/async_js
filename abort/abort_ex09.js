/***
 * Excerpted from "Modern Asynchronous JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/fkajs for more book information.
***/
const loadBtn = document.querySelector('.loadBtn');
const abortBtn = document.querySelector('.abortBtn');
const gallery = document.querySelector('.gallery');
const result = document.querySelector('.result');

const controller = new AbortController();

const urls = [
  `https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Por_do_Sol_em
_Baixa_Grande.jpg/320px-Por_do_Sol_em_Baixa_Grande.jpg`,
  `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Zebrasoma_fla
vescens_Luc_Viatour.jpg/320px-Zebrasoma_flavescens_Luc_Viatour.jpg`,
  `https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Domestic_goat
_kid_in_capeweed.jpg/320px-Domestic_goat_kid_in_capeweed.jpg`
];

abortBtn.addEventListener('click', () => controller.abort());

loadBtn.addEventListener('click', async () => {
  loadBtn.disabled = true;
  abortBtn.disabled = false;
  
  result.textContent = 'Loading...';
  
  const tasks = urls.map(url => fetch(url, {signal: controller.signal}));  

  try {
    const response = await Promise.all(tasks);
    response.forEach(async (r) => {
      const img = document.createElement('img');
      const blob = await r.blob();
      img.src = URL.createObjectURL(blob);
      gallery.appendChild(img);
    });
    result.textContent = '';
  } catch (err) {
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