/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
    var array = [];
    var index = 0;
    var input = [];
    for (var i = 0; i < arr.length; i++) {
        input.push(arr[i]);
        index++;
        if (index === size || i === arr.length - 1) {
            array.push(input);
            input = [];
            index = 0;
        }
    }
    return array;
};