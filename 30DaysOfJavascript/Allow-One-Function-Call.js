/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function(fn) {
    var count = 1;
    return function(...args){
        if(count === 1)
        {
            count++;
            return fn(...args);
        }
        return undefined;
    }
};

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 * 
 * The provided `once` function is a higher-order function that ensures that the wrapped function (`func`) can only be executed once. 

Time Complexity:
- The time complexity of the `once` function itself is O(1) because it performs a constant amount of work regardless of the input size. The returned function checks a boolean flag and potentially calls the original function, which is also O(1) since it only executes once.

Space Complexity:
- The space complexity is O(1) as well. The function maintains a fixed amount of state: a boolean flag (`ranOnce`) and a variable (`value`) to store the result of the function call. This does not grow with the size of the input or the number of times the function is called. 

In summary, both the time and space complexity of the `once` function are O(1).
 */

/**
 * @template {Function} T
 * @param {T} func
 * @return {T}
 */
export default function once(func) {
    let ranOnce = false;
    let value;
  
    return function(...args) {
      if(!ranOnce) {
        value = func.apply(this, args);
        ranOnce = true;
      }
  
      return value;
    }
  }