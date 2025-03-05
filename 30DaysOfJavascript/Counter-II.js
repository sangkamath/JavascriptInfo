/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    var currentVal = init;
    return {
        increment: (val) => {
            currentVal++;
            return currentVal;
        },
        decrement: (val) => {
            currentVal--;
            return currentVal;
        },
        reset: (val) => {
            currentVal = init;
            return currentVal;
        }
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */