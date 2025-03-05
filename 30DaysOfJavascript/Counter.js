/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
    var count = 0;
    var updatedn = n;
    return function() {
        if(count === 0) {
            count++;
            return updatedn;
        } else {
            updatedn++;
            return updatedn;
        }
    };
};

/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
