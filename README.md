# Modern Asynchronous JavaScript

- **Overview**
    - **Chapter 1:** shows you how to define or customize the iteration behavior of
    JavaScript objects using custom iterators.
    - **Chapter 2** is where you learn to use a generator function as a short-cut to
    create iterators. Generators are useful when you don’t need to manipulate
    the state-maintaining behavior of an interator.
    - **Chapter 3:** introduces the Promise.allSettled() method and compares it to its older
    sibling Promise.all(). You’ll use Promise.allSettled() to execute multiple async tasks
    simultaneously and process the outcome even if some of them fail.
    - **Chapter 4:** gives you tips to protect your app against server downtime while
    improving its performance with Promise.any() from ES2021.
    - **Chapter 5:** explains how to use the Promise.race() method to set a time limit for
    async tasks to avoid entering a state of prolonged or endless waiting.
    - **Chapter 6:** is all about the AbortController API. You’ll learn to use this API to
    cancel pending async requests when the user clicks a cancel button.
    - **Chapter 7:** covers top-level await and how to make use of it to initialize
    resources, define dependency paths dynamically, and load dependencies with
    a fallback implementation.
- **Introduction**
    
    ## Overview
    
    **Promise** defines a block of code to be executed once an operation is finished(similar to callbacks and events).
    
    It does this in a bit more defined way.
    Sync vs async operations

    **Remember asynchronous execution and multithreading are different.**
    
    Although JS is not single-threaded, most web browsers run on single thread.
    
    ## Events
    
    JS was created for creating interactive webpages that can react to user actions. This required events to be created.
    
    Events brought a lot of benefits to engineering world, however it lack flexibility.
    
    ## Callback Functions
    
    Most basic example is `setTimeOut()` it takes a callback function and executes it after a certain amount of time.
    
    Most common example is AJAX. It takes a callback and executes is as soon as it receives a response from the server.
    
    Async execution and callbacks can be confusing to parse in code. It is good practice to avoid nesting too many callbacks to avoid this kind of **callback hell.**
    
    **Promises** allow us to manage/chain multiple async tasks dynamically. This does not mean callbacks are not useful. **Promises** only bring additional functionality.
    
    ## Promises
    
    ```jsx
    const promise = fetch('https://eloux.com/async_js/examples/1.json');
    promise.then((result) => {
    // process
    }, (error) => {
      console.log(error);
    });
    ```
    
    - `fetch()` method returns a `Promise` object. (uses an AJAX request to retrieve data)
    - To react to result we use `then()` method. This takes two functions as parameters.
    - The first function will be executed if the promise is succeeded and the fulfilment value is passed to the this function as an argument
    - The second function will be executed if the promise fails with the rejection reason passed to this as an argument.
    
    ## Settled Promises
    
    These are very useful to test how promises will work
    
    ```jsx
    const promise = Promise.resolve(10);
    promise.then((data) => {
    	// data will be 10
    });
    
    const promise = Promise.reject('Error!');
    promise.then(null, (error) => {
    	console.error(error); // => Error!
    });
    
    promise.catch((error) => {
    	console.error(error); // Error!   // WE CAN ALSO USE catch to error handling
    });
    ```
    
    ## Catch
    
    Catch works better if you need to chain methods or if you are relying on the return value of `then` block
    
    ```jsx
    const promise = Promise.resolve(10);
    promise.then((result) => { throw new Error();
    }).catch((error) => {. // if you use `error => callback, it wont catch the error return by then block
    console.error('An error occurred in the fulfillment handler');
    });
    ```
    
    ## Concurrent Promises
    
    - `Promise.race()` – lets you know as soon as one of the given promises either fulfills or rejects
    - `Promise.allSettled()` – lets you know when all of the given promises either fulfill or reject
    - `Promise.all()` – lets you know as soon as one of the given promises rejects or when all of them fulfill
    - `Promise.any()` – lets you know as soon as one of the given promises fulfills or when none of them fulfills
    
- **Chapter 1: Creating Custom Asynchronous Iterators**
    - **Async functions**
    - `for await...of` loops
    - `async` and `await`
    
    <aside>
    💡 `Set` and `Map` are two new data structures that are introduced in ES2015.
    `Set` is similar to array but only has unique values. You can not access individual elements.
    `Map` is similar to object. Good for caches, storing etc. (Similar to Ruby Hash)
    `Iterable` is an object that allows looping with  `for...of` iterators.
    For an object to be iterable, it needs to have `Symbol.iterator` property
    
    </aside>
    
    ```jsx
    const collection = {
    	a: 10,
      b: 20,
      c: 30,
    	[Symbol.iterator]() {
    		let i = 0;
    		const values = Object.keys(this);
    		return {
    			next: () => {
    				return {
    					value: this[values[i++]],
    	        done: i > values.length
            }
    			}
    		};
    	}
    };
    const iterator = collection[Symbol.iterator]();
    // Ex.1
    console.log(iterator.next()); // ⇒ {value: 10, done: false}
    console.log(iterator.next()); // ⇒ {value: 20, done: false}
    console.log(iterator.next()); // ⇒ {value: 30, done: false}
    console.log(iterator.next()); // ⇒ {value: undefined, done: true}
    
    // Ex.2
    for (const value of collection) {
    	console.log(value);
    }
    // logs: // ⇒ 10 // ⇒ 20 // ⇒ 30
    ```
    
    Here we used the `next()` method to iterate over the values. We could instead use `for...of`
    
    When we use `for...of` it automatically calls `next` function for each iterator.

    Symbol.iterator with for...of

    When we use `[Symbol.iterator]()` on native objects like arrays it will return the result of the `values()` method.
    
    `values()` → default iterator for sets and arrays
    
    `entries()` → default iterator for maps
    
    `keys()` , `values()` , `entries()` are other iterators.
    
    ## Asynchronous Iterator
    
    Async iterators works similar to sync ones. The main difference is the async iterators return `Promise` instead of a plain object.
    
    ```jsx
    const collection = {
      a: 10,
      b: 20,
      c: 30,
      [Symbol.asyncIterator]() {
        const keys = Object.keys(this);
        let i = 0;
        return {
          next: () => {
            return new Promise((resolve, reject) => {   
              setTimeout(() => {
                resolve({
                  value: this[keys[i++]],
                  done: i > keys.length
                });
              }, 1000);
            });
          }
        };
      }
    };
    
    const iterator = collection[Symbol.asyncIterator]();
    
    iterator.next().then(result => {
      console.log(result);  // ⇒ {value: 10, done: false}
    });
    
    iterator.next().then(result => {
      console.log(result);  // ⇒ {value: 20, done: false} 
    });
    
    iterator.next().then(result => {
      console.log(result);  // ⇒ {value: 30, done: false} 
    });
    
    iterator.next().then(result => {
      console.log(result);  // ⇒ {value: undefined, done: true} 
    });
    ```
    
    Fetch a url using `async/await` syntax instead of Promise:
    
    ```jsx
    const srcArr = [
      'https://eloux.com/async_js/examples/1.json',
      'https://eloux.com/async_js/examples/2.json',
      'https://eloux.com/async_js/examples/3.json',
    ];
    
    srcArr[Symbol.asyncIterator] = function() { 
      let i = 0;
      return {
        async next() {
          if (i === srcArr.length) { 
            return {
              done: true
            };
          }
          const url = srcArr[i++];
          const response = await fetch(url);
          if (!response.ok) {  
            throw new Error('Unable to retrieve URL: ' + url);
          }
          return {
            value: await response.json(),
            done: false
          };
        }
      };
    };
    
    const iterator = srcArr[Symbol.asyncIterator]();
    
    iterator.next().then(result => {
      console.log(result.value.firstName);  // ⇒ John
    });
    ```
    
    ## `for...await...of`
    
    The `for...of` loop does not work with async iterables. It simply returns `undefined`.
    
    We can iterate through the previous example by using this:
    
    ```jsx
    (async function() {
      for await (const url of srcArr) {
        console.log(url.firstName);
      }
    })();
    ```
    
    This allows us to write async code like sync code. Each step will wait until the promise is fulfilled and will log the `url.firstName`
    
    We can slightly improve this by adding `try/catch`:
    
    ```jsx
    (async function() {
      try {
        for await (const value of collection) {}
      } catch (error) {
        console.error('Caught: ' + error.message);
      }
    })();
    ```
    
    ## Detecting Iterables
    
    It is relatively straightforward. We just need to check for `[Symbol.asyncIterator]` and/or `[Symbol.iterator]`
    
    ```jsx
    return typeof object[Symbol.iterator] === "function";
    typeof object[Symbol.asyncIterator] === "function";
    ```
    
- **Chapter 2: Enhancing Custom Iterators With Generators**
    
    Its hard to develop custom iterators???
    
    Generator functions is a short-cut to create iterators.
    
    Every generator is an iterator. Not every iterator is a generator.

    - Generator function is called.
    - It does not execute the body. It returns an iterator called **generator object.**
    - We execute the function body by calling `next()`. In between next method calls, the generator is paused.
    - `yield` pauses the generator and sets the value to be returned.
    
    The `function*` with asterisk is the generator function.
    
    ```jsx
    const collection = {
      a: 10,
      b: 20,
      c: 30,
      [Symbol.iterator]: function*() {  
        for (let key in this) {
          yield this[key];
        }
      }
    };
    
    const iterator = collection[Symbol.iterator]();
      
    console.log(iterator.next());  // ⇒ {value: 10, done: false}
    console.log(iterator.next());  // ⇒ {value: 20, done: false}
    console.log(iterator.next());  // ⇒ {value: 30, done: false}
    console.log(iterator.next());  // ⇒ {value: undefined, done: true}
    ```
    
    ## Async Generator
    
    This version requires us to call `next().then()` on the iterator.
    
    ```jsx
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
    ```
    
    The important part here is to understand that the `yield` returns the result of the functions caller.
    
    ## Iterating over paginated data
    
    Example where we retrieve commits of a repo in JSON format using GitHub API. The API will provide a pagination link headers for the remaining commits.
    
    ```jsx
    async function* generator(repo) {
    
      // create an infinite loop
      for (;;) {
    
        // fetch the repo
        const response = await fetch(repo);
    
        // parse the body text as JSON
        const data = await response.json();
    
        // yield the info of each commit
        for (let commit of data) {
          yield commit;
        }
    
        // extract the URL of the next page from the headers
        const link = response.headers.get('Link');  
        repo = /<(.*?)>; rel="next"/.exec(link)?. [1];
        
        // if there's no "next page", break the loop.
        if (repo === undefined) {
          break;  
        }
      }
    }
    
    async function getCommits(repo) {
    
      // set a counter
      let i = 0;
    
      for await (const commit of generator(repo)) {
    
        // process the commit
        console.log(commit);
    
        // break at 90 commits
        if (++i === 90) {  
          break;
        }
      }
    }
    
    getCommits('https://api.github.com/repos/tc39/proposal-temporal/commits');
    ```
    
- **Chapter 3: Fetching Multiple Resources**
    
    If we are fetching multiple async requests and some of them could potentially fail and some of them might not, we can not use `Promise.all()` since it will reject even only one request fails.
    
    Instead we can use `Promise.allSettled()` . This allows us to check states of different promises separately.
    
    ## Executing multiple Promises
    
    Conventional way of iteration and returning multiple promises:
    
    ```jsx
    const postIds = ['1', '2', '3', '4'];
    
    postIds.forEach(async id => {
      const post = await getPost(id);
    
      // process the post
    });
    ```
    
    This will not proceed the iteration until it gets a response from `getPost()`. We can fix this by returning multiple Promises and use `Promise.all()` :
    
    ```jsx
    const promises = postIds.map(async (id) => {
      return await getPost(id);
    });
    
    const arr = Promise.all(promises);
    ```
    
    This will reject even if only one promise rejects. This is changed with ES2020. They introduced `Promise.allSettled()`.
    
    This method resolves when all of the given Promise collection either resolves or gets rejected.

    Promise.allSettled() logic

    ```jsx
    const promises = [
      fetch('https://picsum.photos/200', {mode: "no-cors"}), 
      fetch('https://does-not-exist', {mode: "no-cors"}),
      fetch('https://picsum.photos/100/200', {mode: "no-cors"})
    ];
    
    Promise.allSettled(promises).
      then((results) => results.forEach((result) => console.log(result)));
    
    // logs:
    // => { status: "fulfilled", value: Response }
    // => { status: "rejected", reason: TypeError }
    // => { status: "fulfilled", value: Response }
    
    // if we use Promise.all:
    // => Uncaught (in promise) TypeError: Failed to fetch
    ```
    
    On the above example, if we use `Promise.all()` instead of `Promise.allSettled()` we will get an error straight after the second `fetch`.
    
    It achieves this by using an extra property that `Promise.all()` does not. `status : 'fulfilled' OR 'rejected'`
    
    We can build our own logger that does not fail when one Promise fails:
    
    ```jsx
    const promises = [
      fetch('https://picsum.photos/200', {mode: "no-cors"}),
      fetch('https://does-not-exist', {mode: "no-cors"}),
      fetch('https://picsum.photos/100/200', {mode: "no-cors"})
    ].map(p => p.catch(e => e)); 
    
    Promise.all(promises).
      then((results) => results.forEach((result) => console.log(result)));
    ```
    
    ## Summary
    
    `Promise.all()` and `Promise.allSettled()` are useful when you need to retrieve results of different async requests and process them altogether. You can process them separately, if unless you need otherwise(anti-pattern).
    
- **Chapter 4: Improving Reliability and Performance**
    
    # Using `Promise.any()` Method
    
    Promise.any() returns a pending promise that resolves asynchronously as soon as one of the promises in the given iterable fulfills.
    
    ```jsx
    const promises = [
      Promise.reject(new Error('failure #1')),
      Promise.reject(new Error('failure #2')),
      Promise.resolve('YES!')
    ];
    
    Promise.any(promises).
      then((result) => console.log(result));
    
    // logs:
    // => YES!
    ```
    
    This logs `YES!` because the promises in the array already uses `resolve`
    
    If all Promises reject we get an `AggregateError`
    
    ```jsx
    const promises = [
      Promise.reject(new Error('failure #1')),
      Promise.reject(new Error('failure #2')),
      Promise.reject(new Error('failure #3'))
    ];
    
    Promise.any(promises).then(
      (result) => {console.log(result)},
      (error) => {console.error(error)}.        // errors.error
    );
    
    // logs:
    // => AggregateError: No Promise in Promise.any was resolved
    ```
    
    The error that `Promise.any()` returns if a wrapper around the individual rejection reasons. You can log the individual rejections reasons by modifying the `error` with `errors.error`
    
    `Promise.any()` also rejects if you pass in an empty iterable:
    
    ```jsx
    Promise.any([]).then(
      (result) => {console.log(result)},
      (error) => {console.log(error)}
    );
    // logs:
    // => AggregateError: No Promise in Promise.any was resolved
    ```
    
    # Real world examples
    
    ### Avoiding the single point of failure
    
    ```jsx
    const apis = [
      'https://eloux.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/1'
    ];
    
    async function fetchData(api) {
      const response = await fetch(api);
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error('Request failed'));
      }
    }
    
    function getData() {
      return Promise.any([
        fetchData(apis[0]),
        fetchData(apis[1])
      ]);
    }
    
    getData().then((response) => console.log(response.title));
    ```
    
    ### Modifying the wrapper error message
    
    ```jsx
    // ... Same as the previous
    function getData() {
      return Promise.any([
        fetchData(apis[0]),
        fetchData(apis[1])
      ]).catch(() => {
        return Promise.reject(
          new Error('Unable to access the API')
        );
      });
    }
    
    getData().then(
      (response) => console.log(response.title),
      (error) => console.error(error)
    );
    ```
    
    ### Improving the performance of your app
    
    Remember `Promise.any()` returns as soon as one Promise if resolved. So you can use it to race two Promises, whichever is resolved first will cause `Promise.any()` to return. If you are fetching the same data from two APIs, it will return as soon as the fastest one is resolves.
    
- **Chapter 5: Setting a Time Limit for Async Tasks**
    
    We can use `Promise.race()` to race multiple async tasks to return the first one that is resolved. We can also set a time limit and a Promise that is rejected after the allocated time.
    
    # `Promise.race()` vs `Promise.any()`
    
    When it comes to fulfilled promises, `race()` and `any()` works exactly the same. The difference is in rejection.
    
    `Promise.race()` settles(rejects) as soon as one of the given promises rejects where as, the `Promise.any()` rejects if all of the given promises reject.
    
    Comparison:
    
    ```jsx
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(reject, 1000, 'A');
    });
    
    const promiseB = new Promise((resolve) => {
      setTimeout(resolve, 2000, 'B');
    });
    
    Promise.race([
      promiseA,
      promiseB
    ]).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);  // => A
    });
    
    Promise.any([
      promiseA,
      promiseB
    ]).then((response) => {
       console.log(response);  // => B
    }).catch((error) => {
      console.error(error);
    });
    ```
    
    Another difference between `race()` and `any()` is that if you pass in an empty iterable to `race()` it will wait in pending state because no promise will resolve or reject.
    
    # Real world examples
    
    ### Enforcing a time limit for async tasks
    
    The features of `Promise.race()` allows us to reject after a set amount of time. To do this, you need to race your initial async task with the failure task that rejects after a set amount of time:
    
    ```jsx
    function fetchData() {
      const timeOut = 2000;    // two seconds
      const data = fetch('https://jsonplaceholder.typicode.com/todos/1');
      const failure = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error(`Failed to retrieve data after ${timeOut} milliseconds`));
        }, timeOut);
      });
      return Promise.race([data, failure]);
    }
    
    fetchData().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
    ```
    
    We can improve this to load from cached data after 2 seconds if the fetch fails:
    
    ```jsx
    function loadFromCache() {
      const data = {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      };
      return new Promise((resolve) => {
        resolve(data);
      })
    }
    
    function fetchData() {
      const timeOut = 2000;    // two seconds
      const cache = loadFromCache().then((data) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(data);
          }, timeOut);
        });
      });
      const freshData = fetch('https://jsonplaceholder.typicode.com/todos/1');
      return Promise.race([freshData, cache]);
    }
    
    fetchData().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
    ```
    
- **Chapter 6: Cancelling Pending Async Requests**

    Modern apps rely on communication with external APIs that we can not often control. Sometimes we want to cancel a pending async request based on some logic. This can be time-based or a reaction-based situation(like a user cancelling an operation in the UI).

    We use `AbortController` API's generic interface to cancel a fetch request. This API has the `AbortController` Interface which contains `abort()` method.

    We create a cancellable `fetch()` request by passing in a `signal` property of `AbortController`.

    <aside>
    ❗ Modern browsers and Node version > `15.0.0` supports this

    </aside>

    ### Cancelling async tasks after a period of time

    Alternative to `Promise.fetch()` solution, this is a preference. No correct or wrong. Cancelling a pending async request using when a DOM event is fired is much easier to code with `AbortController`

    `Promise.race()` is easier to code when you want to concurrently fetch data from an external source and use a cached/local data as the back up.

    ```jsx
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://eloux.com/todos/1', {signal})
      .then(response => {
        return response.json();
      }).then(response => {
        console.log(response);
      });

    setTimeout(() => controller.abort(), 2000);
    ```

    - Call `AbortController` and retrieve the signal object
    - Pass the signal object to `fetch()` method to allow communicating with the async `fetch()` method.
    - `abort()` is the only method that `controller` has and it will cause promise object that is returned by `fetch()` to reject with an exception.
    - If there is a `catch()` in the `fetch()` method call, this will be used.

    We can use an event listener and check `aborted` property of the `signal`

    ```jsx
    signal.addEventListener('abort', () => {
    	console.log(signal.aborted);
    });
    // logs: => true
    ```

    We can create our own fetcher function that returns after a timeout to be used frequently:

    ```jsx
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
    ```

    ### Handling an aborted request

    When we `abort()` a request, we receive a `DOMException` error, which is not ideal if the operation is cancelled intentionally.

    We can change this by adding calling `catch()` :

    ```jsx
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
    ```

    ### Removing multiple event listeners

    In a normal scenario, we add event listeners via `addEventListener()` and to remove an event listener, we need to individually cancel these via `removeEventListener()` method.

    We must use the same arguments for adding and removing event listeners:

    ```jsx
    container.addEventListener('mouseenter', funcHello);
    container.removeEventListener('mouseenter', funcHello);
    ```

    With `AbortController` we can deregister multiple event listeners at the same time.

    We achieve this by passing in signal property to `addEventListener()`:

    ```jsx
    const container = document.querySelector('.container');
    const controller = new AbortController();
    const signal = controller.signal;

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

    container.addEventListener('mouseenter', sayHello, {signal});
    container.addEventListener('mouseout', sayBye, {signal});
    container.addEventListener('mousedown', depress, {signal});
    container.addEventListener('mouseup', release, {signal});

    controller.abort();
    ```

    ## Making a user cancelable async request

    ```jsx
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
    ```

    ### Aborting multiple fetch requests with one signal

    ```jsx
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
    ```

- **Chapter 7: Accessing Promise Results From Another Module**

    Top level `await` is an addition to JS to run async tasks at the top of the module. With this we could tell different parts of the code(modules or chunks in the same file) to halt the execution until another part is fully executed.

    This way we can make modules to work as big async tasks. This allows us to run the child modules before running the parent module.

    Normally, when we use `await` at the top without `async` we get this error:

    ```jsx
    const res = await fetch('https://example');
    // SyntaxError: await is only valid in async function

    // to fix, wrap an async IIFE:
    (async function() {
    const res = await fetch('https://example');
    }());

    // Top level await:
    await fetch("https://google.com", { mode: "no-cors" }
    ```

    Using top level await on modules:

    ```jsx
    // Module file:
    const api = `http://api.openweathermap.org/data/2.5/weather?
    q=Tokyo,Japan&APPID=1b1b3e9e909416e5bbe365a0a8505fbb`;
    // use your own app id in production

    const response = await fetch(api);
    const result = await response.json();

    export {result};

    // Import in another file
    import {result} from './module1.js';

    console.log(result.main.temp);
    ```

    ### Putting top-level await to work

    Using it with the variables:

    ```jsx
    const messages = await import(`./packs/messages-${navigator.language}.js`);
    ```

    Loading dependencies with fallbacks:

    ```jsx
    let d3;

    try {
      d3 = await import('https://cdnjs.cloudflare.com/ajax/libs/d3/6.7.0/d3.min.js');
    } catch {
      d3 = await import('https://ajax.googleapis.com/ajax/libs/d3js/6.7.0/d3.min.js');
    }
    ```

    Instead of `try/catch` syntax we can also use `Promise.any()`:

    ```jsx
    const CDNs = [
      'https://cdnjs.cloudflare.com/ajax/libs/d3/6.7.0/d3.min.js',
      'https://ajax.googleapis.com/ajax/libs/d3js/6.7.0/d3.min.js'
    ];

    const d3 = await Promise.any(CDNs);
    ```
