// Example function with callback as last argument
// The callback has the signature `(err, value) => any`
function foo(url, options, callback) {
    apiCall(url, options)
        .then((data) => callback(null, data))
        .catch((err) => callback(err));
}

const promisifiedFoo = promisify(foo);
const data = await promisifiedFoo('example.com', { foo: 1 });

/**
* @callback func
* @returns Function
* The `promisify` function takes a callback-based function as input and 
* returns a new function that returns a Promise. 

Time Complexity:
The time complexity of the `promisify` function itself is O(1) because it simply 
creates and returns a new function without performing any iterative or recursive 
operations. However, the time complexity of the returned function depends on the 
execution time of the original callback-based function (`func`). If `func` takes 
a certain amount of time to execute, the time complexity of the returned function 
will be O(T), where T is the time taken by `func`. The Promise resolution or rejection
itself is O(1) since it involves a simple state change.

Space Complexity:
The space complexity of the `promisify` function is also O(1) because it does not 
use any additional data structures that grow with input size. The space used is 
constant, primarily for storing the new function and the Promise object. The space 
complexity of the returned function will also be O(1) in terms of additional space 
used, but it will depend on the size of the arguments passed to `func` and the size 
of the result it returns, which could vary based on the specific implementation of `func`.
*/
export default function promisify(func) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            func.call(this, ...args, (err, result) =>
                err ? reject(err) : resolve(result),
            );
        });
    };
}

// Example function with callback as the first argument.
// The callback has the signature `(err, value) => any`.
function foo(callback, url, options) {
    apiCall(url, options)
        .then((data) => callback(null, data))
        .catch((err) => callback(err));
}

foo[Symbol.for('util.promisify.custom')] = (url, options) => {
    return new Promise((resolve, reject) => {
        foo(
            (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            },
            url,
            options,
        );
    });
};

const promisifiedFoo1 = foo[Symbol.for('util.promisify.custom')]; // true
const data1 = await promisifiedFoo('example.com', { foo: 1 });

const promisifyCustomSymbol = Symbol.for('util.promisify.custom');

/**
 * @callback func
 * @returns Function
 * The `promisify` function transforms a callback-based function into a promise-based one. 

In terms of time complexity, the function itself operates in constant time, O(1), since it 
primarily checks for the existence of a custom symbol on the input function and returns a 
new function. The inner logic of the returned function, which involves calling the original 
function and handling the callback, also operates in constant time, O(1), for the same reasons. 
However, the actual time taken to resolve the promise depends on the execution time of the 
original function being promisified, which is not determined by this code.

Regarding space complexity, the function uses a constant amount of space, O(1), since it 
does not create any data structures that grow with input size. The only additional space 
used is for the promise object and the closure created by the returned function, which 
does not depend on the size of the input. Thus, the space complexity remains constant.

In summary, both time and space complexity for the `promisify` function itself are O(1), 
but the overall performance will depend on the behavior of the original function being 
promisified.
 */
export default function promisify(func) {
  if (func[promisifyCustomSymbol]) {
    return func[promisifyCustomSymbol];
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });
  };
}