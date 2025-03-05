/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    var cache = {};
    return function(...args) {
        var key = JSON.stringify(args);
        if(key in cache) {
            return cache[key];
        }else {
            var value = fn.apply(this, args);
            cache[key] = value;
            return cache[key];
        }   
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */