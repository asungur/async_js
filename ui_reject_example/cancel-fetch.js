// import fetch from 'node-fetch';
let controller = new AbortController();
const api = `https://api.chucknorris.io/jokes/random`;
const callButton = document.querySelector('#caller');
const stopButton = document.querySelector('#stopper');
const displayer = document.querySelector('#displayer');

const fetchFact = () => {
  console.log(controller.signal);
  fetch(api, { signal: controller.signal } ).then(response => {
    response.json().then(data => {
      displayer.innerText = data.value;
    }).catch(err => {
      displayer.innerText = 'Response content parsin error' + err;
    });
  }).catch(err => {
    displayer.innerText = err;
  });
}

const getFact = () => {
  displayer.innerText = 'Fetching...';
  setTimeout(() => { fetchFact(); }, 5000);
}

callButton.addEventListener('click', getFact);

stopButton.addEventListener('click', () => {
  controller.abort();
  let controller = new AbortController();
  displayer.innerText = "The request has been cancelled";
});
