/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
    const originalMethod = this;
    return function(...args) {
      return originalMethod.apply(thisArg, [...argArray, ...args]);
    }
  };

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
    const originalFunc = this;
    if (typeof originalFunc !== 'function') {
      throw new TypeError('Bind must be called on a function');
    }
  
    return function (...args) {
      return Reflect.apply(originalFunc, thisArg, [...argArray, ...args]);
      // This also works 👇
      // return Function.prototype.apply.call(originalFunc, thisArg, [
      //   ...argArray,
      //   ...args,
      // ]);
    };
  };

  /**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
    const sym = Symbol();
    const wrapperObj = Object(thisArg);
    Object.defineProperty(wrapperObj, sym, {
      enumerable: false,
      value: this,
    });
  
    return function (...args) {
      return wrapperObj[sym](...argArray, ...args);
    };
  };