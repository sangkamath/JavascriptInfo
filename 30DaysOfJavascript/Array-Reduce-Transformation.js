/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    if (nums.length == 0) 
    {
        return init;
    }
    let val = init;
    for (let i=0;i<nums.length;i++)
    {
        val = fn(val,nums[i]);
    }
    return val;
};

//array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

const numbers = [15.5, 2.3, 1.1, 4.7];
document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);

function getSum(total, num) {
  return total + Math.round(num);
}

/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
    const noInitialValue = initialValue === undefined;
    const len = this.length;

    if(noInitialValue && len === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    let acc = noInitialValue ? this[0] : initialValue;
    let startingIndex = noInitialValue ? 1 : 0;

    for(let k = startingIndex; k < len; k++) {
      if(Object.hasOwn(this, k)) {
        acc = callbackFn(acc, this[k], k, this);
      }
    }
    return acc;
};