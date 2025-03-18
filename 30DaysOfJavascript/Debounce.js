/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
    let id;
    return function (...args) {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), t);
    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */

/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
    let timeoutID = null;
    return function (...args) {
        // Keep a reference to `this` so that
        // func.apply() can access it.
        const context = this;
        clearTimeout(timeoutID);

        timeoutID = setTimeout(function () {
            timeoutID = null; // Not strictly necessary but good to do this.
            func.apply(context, args);
        }, wait);
    };
}

/**
* @callback func
* @param {number} wait
* @return {Function}
*/
export default function debounce(func, wait = 0) {
    let timeoutID = null;
    return function (...args) {
        clearTimeout(timeoutID);

        timeoutID = setTimeout(() => {
            timeoutID = null; // Not strictly necessary but good to include.
            // Has the same `this` as the outer function's
            // as it's within an arrow function.
            func.apply(this, args);
        }, wait);
    };
}