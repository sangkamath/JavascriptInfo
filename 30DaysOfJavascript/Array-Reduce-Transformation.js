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