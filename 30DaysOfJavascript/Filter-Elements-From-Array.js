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