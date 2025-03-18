/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 * The provided `throttle` function is designed to limit the execution of a given 
 * function (`func`) to at most once every specified interval (`wait`). 

Time Complexity:
The time complexity of the `throttle` function itself is O(1) for each call to the 
returned function. This is because the function only checks a boolean flag (`shouldThrottle`), 
sets a timeout, and calls the original function if allowed. The actual execution of the
 original function (`func`) is not counted in the complexity of the throttle function itself,
  as it depends on the implementation of `func`.

Space Complexity:
The space complexity is also O(1) because the function uses a fixed amount of space 
regardless of the input size. It only maintains a few variables (`shouldThrottle` and 
the arguments passed to `func`), and does not create any data structures that grow 
with input size. The space used by the timeout is not considered in the space complexity 
analysis, as it does not depend on the input to the throttle function. 

In summary, both time and space complexity for the `throttle` function are O(1).
 */
export default function throttle(func, wait) {
    let shouldThrottle = false;

    return function (...args) {
        if (shouldThrottle) {
            return;
        }

        shouldThrottle = true;
        setTimeout(function () {
            shouldThrottle = false;
        }, wait);

        func.apply(this, args);
    };
}