/**
 * @param {number} valueA
 * @return {Function}
 * The provided function `sum` is a higher-order function that returns another 
 * function to facilitate the accumulation of a sum. 

Time Complexity:
The time complexity of the `sum` function can be considered O(n), where n is the 
number of times the inner function is called with a defined value. Each call to 
the inner function performs a constant amount of work (checking if `valueB` is 
undefined and potentially creating a new `sum` function). Therefore, if the function 
is called n times with defined values, the overall time complexity will be linear 
with respect to the number of calls.

Space Complexity:
The space complexity is O(n) as well, due to the creation of new function instances 
for each call to `sum` with a defined `valueB`. Each call creates a new closure that 
retains the accumulated value, leading to a stack of function instances that can
 grow linearly with the number of calls. If the function is called n times, it 
 will occupy O(n) space in the call stack. 

In summary, both time and space complexity for this implementation are O(n).
 */
export default function sum(valueA) {
    return function (valueB) {
        return valueB === undefined ? valueA : sum(valueA + valueB);
    };
}

const sum = (a) => (b) => b !== undefined ? sum(a + b) : a;
