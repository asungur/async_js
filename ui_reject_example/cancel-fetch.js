// import fetch from 'node-fetch';
const controller = new AbortController();
const signal = controller.signal;
const api = `https://api.chucknorris.io/jokes/random`;
const call_button = document.querySelector('#caller');
const stop_button = document.querySelector('#stopper');
const displayer = document.querySelector('#displayer');

const fetchFact = () => {
  fetch(api).then(response => {
    response.json().then(data => {
      displayer.innerText = data.value;
    }, {signal}).catch(err => {
      displayer.innerText = 'Response content parsin error' + err;
    });
  }, {signal}).catch(err => {
    displayer.innerText = err;
  });
}

const getFact = () => {
  displayer.innerText = 'Fetching...';

  Promise.resolve().then(setTimeout(() => {
    fetchFact();
  }, 5000), {signal});
}

call_button.addEventListener('click', getFact);

stop_button.addEventListener('click', () => {
  controller.abort();
  displayer.innerText = "The request has been cancelled";
});
