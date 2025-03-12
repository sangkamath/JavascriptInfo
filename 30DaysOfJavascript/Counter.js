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

/**
 * @param {number} initialValue
 * @return {Function}
 */
export default function makeCounter(initialValue = 0) {
    let count = initialValue - 1;
  
    return () => {
      count += 1;
      return count;
    };
  }

  /**
 * @param {number} initialValue
 * @return {Function}
 */
export default function makeCounter(initialValue = 0) {
    let count = initialValue;
  
    return () => {
      return count++;
    };
  }

  /**
 * @param {number} value
 * @return {Function}
 */
export default function makeCounter(value = 0) {
    return () => value++;
  }
