/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if(!obj || typeof obj !== 'object') {
        return obj;
    }

    if(Array.isArray(obj)) {
        return obj.filter(Boolean).map(compactObject);
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        if(value) {
            acc[key] = compactObject(value);
        }
        return acc;
    }, {});
};

var compactObject = function(obj) {
    function dfs(obj) {
        if (!obj) return false;
        if (typeof obj !== 'object') return obj;
  
        if (Array.isArray(obj)) {
            const newArr = [];
            for(let i = 0; i < obj.length; i++) {
                const curr = obj[i];
                const subRes = dfs(curr);
  
                if(subRes) {
                    newArr.push(subRes);
                }
            }
  
            return newArr;
        }
  
        const newObj = {};
  
        for (const key in obj) {
            const subRes = dfs(obj[key])
            if (subRes) {
                newObj[key] = subRes;
            }
        }
  
        return newObj;
    }  
  
    return dfs(obj);
  };
  
  function compactObject(obj) {
    const stack = [[obj, Array.isArray(obj) ? [] : {}]];
    let newObj = stack[0][1];

    while (stack.length > 0) {
        const [currObj, newCurrObj] = stack.pop();

        for (const key in currObj) {
            const val = currObj[key];

            if (!val) continue;
            
            if (typeof val !== 'object') {
                Array.isArray(newCurrObj) ? newCurrObj.push(val) : newCurrObj[key] = val;
                continue;
            }

            const newSubObj = Array.isArray(val) ? [] : {};
            Array.isArray(newCurrObj) ? newCurrObj.push(newSubObj) : newCurrObj[key] = newSubObj;
            stack.push([val, newSubObj]);
        }
    }

    return newObj;
}