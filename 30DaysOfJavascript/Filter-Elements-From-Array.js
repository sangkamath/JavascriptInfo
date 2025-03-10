/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    var result = [];
    for(var i = 0; i < arr.length; i++){
        if(fn(arr[i], i)) {
            result.push(arr[i]);
        }
    }   
    return result; 
};

//array.filter(function(currentValue, index, arr), thisValue)

const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}

/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
    const len = this.length;
    const results = [];
  
    for (let k = 0; k < len; k++) {
      const kValue = this[k];
      if (
        // Ignore index if value is not defined for index (e.g. in sparse arrays).
        Object.hasOwn(this, k) &&
        callbackFn.call(thisArg, kValue, k, this)
      ) {
        results.push(kValue);
      }
    }
  
    return results;
  };