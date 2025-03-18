/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 * The time complexity of the `classNames` function can be analyzed based on the number of 
 * arguments and the types of those arguments. The function iterates through each argument
 *  in the `args` array, which has a length of `n`. For each argument, it performs different 
 * operations based on its type:

1. For strings and numbers, it simply pushes the value into the `classes` array, which takes
 O(1) time.
2. For arrays, it recursively calls `classNames`, which can lead to a deeper level of recursion 
depending on the structure of the input. In the worst case, if all arguments are arrays, this 
could lead to a time complexity of O(n * m), where `m` is the average depth of the nested arrays.
3. For objects, it iterates through the keys of the object, which takes O(k) time, where `k` 
is the number of keys in the object. This operation is performed for each object argument.

Overall, the worst-case time complexity can be approximated as O(n * m + k), where `n` is 
the number of arguments, `m` is the average depth of nested arrays, and `k` is the total 
number of keys across all object arguments.

The space complexity is primarily determined by the `classes` array that stores the 
resulting class names. In the worst case, if all arguments are valid class names, 
the space complexity is O(n + k), where `n` is the number of string or number arguments 
and `k` is the number of keys in the object arguments. Additionally, the recursive calls 
for nested arrays may contribute to the call stack space, but this is generally considered 
O(m) for the depth of recursion. Therefore, the overall space complexity can be summarized 
as O(n + k + m).
 */
export default function classNames(...args) {
    const classes = [];
  
    args.forEach((arg) => {
      // Ignore falsey values.
      if (!arg) {
        return;
      }
  
      const argType = typeof arg;
  
      // Handle string and numbers.
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
        return;
      }
  
      // Handle arrays.
      if (Array.isArray(arg)) {
        classes.push(classNames(...arg));
        return;
      }
  
      // Handle objects.
      if (argType === 'object') {
        for (const key in arg) {
          // Only process non-inherited keys.
          if (Object.hasOwn(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
  
        return;
      }
    });
  
    return classes.join(' ');
  }