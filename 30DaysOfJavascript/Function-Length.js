/**
 * @param {Function} fn
 * @return {number}
 */
export default function functionLength(fn) {
    return fn.length;
}

function foo(a, b = 2) { }
foo.length; // 1

function bar(a = 1, b = 2) { }
bar.length; // 0

function baz(...args) { }
baz.length; // 0