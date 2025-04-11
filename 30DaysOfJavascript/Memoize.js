/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    var cache = {};
    return function (...args) {
        var key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        } else {
            var value = fn.apply(this, args);
            cache[key] = value;
            return cache[key];
        }
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */

function memoize(func) {
    const cache = new Trie();

    return function (...args) {
        if (cache.has(args)) {
            return cache.get(args);
        }

        const result = func.apply(this, args);
        cache.set(args, result);
        return result;
    }
}

/*
Instead of constructing a single string key out of the 
arguments, we can use individual argument item as nodes
 within a trie data structure. Here we implement a Trie 
 and TrieNode class with the same relevant set, has,
  get APIs as Map and can just change the cache 
  initialization step and have the rest of the code 
  remain the same. The benefit of using a trie as 
  the cache is lesser memory space needed, but lookup 
  time complexity is around the same as the 
  JSON.stringify version.
*/

class TrieNode {
    constructor(value) {
        this._value = value;
        this._nodes = new Map();
    }

    getValue() { return this._value; }
    setValue(value) { this._value = value; }

    hasKey(key) { return this._nodes.has(key); }
    getNode(key) { return this._nodes.get(key); }

    addNode(key) {
        const newNode = new TrieNode();
        this._nodes.set(key, newNode);
        return newNode;
    }
}

class Trie {
    constructor() {
        this._rootNode = new TrieNode();
        this._hasValueForUndefined = false;
    }

    set(args, value) {
        if (args.length === 0) {
            if (this._hasValueForUndefined) {
                return this._rootNode.getValue();
            }

            this._hasValueForUndefined = true;
            this._rootNode.setValue(value);
            return;
        }

        let currNode = this._rootNode;
        for (const arg of args) {
            if (currNode.hasKey(arg)) {
                currNode = currNode.getNode(arg);
            } else {
                currNode = currNode.addNode(arg);
            }
        }

        currNode.setValue(value);
    }

    has(args) {
        if (args.length === 0) {
            return this._hasValueForUndefined;
        }

        let currNode = this._rootNode;
        for (const arg of args) {
            if (!currNode.hasKey(arg)) {
                return false;
            }
            currNode = currNode.getNode(arg);
        }

        return true;
    }

    get(args) {
        if (args.length === 0) {
            return this._rootNode.getValue();
        }

        let currNode = this._rootNode;
        for (const arg of args) {
            currNode = currNode.getNode(arg);
        }

        return currNode.getValue();
    }
}
