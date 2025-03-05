/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function(fn) {
    var output = {};
    for(var i= 0; i < this.length; i++){
        var key =fn(this[i]);
        if(output[key]) {
            output[key].push(this[i]);
        }else{
            output[key] = [this[i]];
        }
    }
    return output;
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */