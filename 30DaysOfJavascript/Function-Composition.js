/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    
    return function(x) {
        for(const func of functions.reverse()) {
            x = func(x);
        }
        return x;
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    return function(x) {
        if(functions.length < 1) {
            return x;
        }
        var f = functions[functions.length -1];
        var result = f(x);
        for(var i =functions.length -2; i >= 0; i--){
            f = functions[i];
            result = f(result);
        }  
        return result;  
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */