/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
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

/**
 * @param {number} initialValue
 * @return {{get: Function, increment: Function, decrement: Function, reset: Function }}
 */
export default function makeCounter(initialValue = 0) {
    let count = initialValue;

    return {
        get: () => count,
        increment: () => ++count,
        decrement: () => --count,
        reset: () => (count = initialValue),
    };
}

class Counter {
    constructor(initialValue = 0) {
        this.initialValue = initialValue;
        this.value = initialValue;
    }
    get() {
        return this.value;
    }
    increment() {
        return ++this.value;
    }
    decrement() {
        return --this.value;
    }
    reset() {
        this.value = this.initialValue;
        return this.value;
    }
}

/**
 * @param {number} initialValue
 * @return {{get: Function, increment: Function, decrement: Function, reset: Function }}
 */
export default function makeCounter(initialValue = 0) {
    return new Counter(initialValue);
}