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
