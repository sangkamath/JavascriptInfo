/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        result.push(fn(arr[i], i));
    }  
    return result;  
};

//array.map(function(currentValue, index, arr), thisValue)

const numbers = [65, 44, 12, 4];
const newArr = numbers.map(myFunction)

function myFunction(num) {
  return num * 10;
}