/**
 * @param {Array<*|Array>} value
 * @return {Array}
 * Time Complexity:
The time complexity of this function can be analyzed based on the 
number of elements in the input array. If we denote the total number 
of elements in the nested array as `n`, the function will visit 
each element exactly once. In the worst case, where every element
 is an array, the function will recursively call itself for each 
 of those arrays. However, since each element is processed once, 
 the overall time complexity remains O(n), where n is the total
  number of elements across all levels of nesting.

Space Complexity:
The space complexity of the function is influenced by both the 
recursion stack and the space needed to store the result. The
 maximum depth of the recursion stack can be equal to the depth 
 of the nested arrays. In the worst case, if the input is a 
 deeply nested array, the recursion stack could grow to O(d),
  where d is the maximum depth of the nesting. Additionally,
   the space required to store the flattened result is O(n),
    as it needs to hold all the elements from the input. 
    Therefore, the overall space complexity is O(n + d), but 
    since n is typically larger than d, it is often simplified 
    to O(n).
 */

export default function flatten(value) {
    var result = [];
  
    for(var i = 0; i < value.length; i++) {
      if(Array.isArray(value[i])) {
        result.push(...flatten(value[i]));
      } else {
        result.push(value[i]);
      }
    }
  
    return result;
  }

  /*

export default function flatten(value: Array<ArrayValue>): Array<any> {
  const res = [];
  const copy = value.slice();

  while (copy.length) {
    const item = copy.shift();
    if (Array.isArray(item)) {
      copy.unshift(...item);
    } else {
      res.push(item);
    }
  }

  return res;
}

This function flattens a nested array iteratively using the some() method and concat(). Here's a breakdown of how it works:

Step-by-Step Explanation
1. Type Definitions
typescript
Copy
Edit
type ArrayValue = any | Array<ArrayValue>;
ArrayValue is a recursive type that can be either any (a primitive value) or an array of ArrayValue (which allows for nested arrays).
typescript
Copy
Edit
export default function flatten(value: Array<ArrayValue>): Array<any>
The function takes an array of ArrayValue and returns a flattened array of any.
2. While Loop: Flattening Iteratively
typescript
Copy
Edit
while (value.some(Array.isArray)) {
  value = [].concat(...value);
}
some(Array.isArray): Checks if any element inside value is an array.
If at least one element is an array, we proceed to flatten one level using [].concat(...value).
The loop continues until there are no more arrays left, meaning everything is fully flattened.
How Does [].concat(...value) Work?
[].concat(...value) spreads value and concatenates all elements into a new array, removing one level of nesting.

Example: Flattening Step by Step
typescript
Copy
Edit
let value = [1, [2, [3, [4]]]];
First Iteration

typescript
Copy
Edit
[].concat(...value) // [1, 2, [3, [4]]]
Second Iteration

typescript
Copy
Edit
[].concat(...value) // [1, 2, 3, [4]]
Third Iteration

typescript
Copy
Edit
[].concat(...value) // [1, 2, 3, 4]  (Fully flattened)
Now, value.some(Array.isArray) returns false, and the loop exits.

Time Complexity
In the worst case, this takes O(N²) because each iteration checks some() and concatenates arrays.
If the array is shallow (few nesting levels), performance is closer to O(N).
Example Test Cases
typescript
Copy
Edit
console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
console.log(flatten([[1, 2], [3, 4], [5, [6]]])); // [1, 2, 3, 4, 5, 6]
console.log(flatten([])); // []
console.log(flatten([1, 2, 3])); // [1, 2, 3]
Why Use while Instead of Recursion?
Iterative approach avoids stack overflow for deeply nested arrays.
Recursion is more elegant but can run into maximum call stack errors for deeply nested structures.
Alternative Recursive Approach
typescript
Copy
Edit
export default function flatten(value: Array<ArrayValue>): Array<any> {
  return value.reduce((acc, curr) => 
    acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
}
This uses recursion but may hit stack limits for very deep nesting.

Summary
✅ Iteratively flattens arrays
✅ Avoids stack overflow
✅ Efficient for moderately nested arrays

Would you like me to optimize it further or provide alternatives? 🚀






You said:
what is the complexity of export default function flatten(value) {
  var result = [];

  for(var i = 0; i < value.length; i++) {
    if(Array.isArray(value[i])) {
      result.push(...flatten(value[i]));
    } else {
      result.push(value[i]);
    }
  }

  return result;
}
ChatGPT said:
Time Complexity Analysis
javascript
Copy
Edit
export default function flatten(value) {
  var result = [];

  for (var i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      result.push(...flatten(value[i])); // Recursive call with spread
    } else {
      result.push(value[i]);
    }
  }

  return result;
}
1. Breakdown of Recursion
The function traverses each element in the input array value.
If an element is not an array, it is added directly to result (O(1)).
If an element is an array, it calls flatten() recursively and spreads the result using push(...flatten(value[i])), which requires flattening that sub-array first.
2. Time Complexity Calculation
Let:

N = Total number of elements (including nested ones).
d = Maximum depth of nesting.
Base Case (No Nesting)
If value is a flat array (e.g., [1, 2, 3]), the function:

Iterates once over N elements → O(N).
Recursive Case (Nested Arrays)
For deeply nested cases like:

javascript
Copy
Edit
[ [ [ [ [1] ] ] ] ] // Depth = d
At depth d, flatten() recursively calls itself d times.
At each level, it spreads results into the parent array.
💡 The costly operation here is push(...flatten(value[i])), because:

Flattening subarrays and spreading them creates extra copies of the array.
Spreading (...flatten(value[i])) can take O(K) time, where K is the number of elements in the flattened subarray.
Since each element is processed once per depth level, the worst case occurs when we have deep nesting, leading to O(N * d) complexity.

3. Space Complexity
Best case (No nesting) → O(N) (Only one call stack level, storing result).
Worst case (Deeply nested arrays) → O(N + d) (Call stack grows up to d + result storing N elements).
4. Final Complexity
Time Complexity: O(N * d) (Worst case: deep recursion with spreading).
Space Complexity: O(N + d) (Result storage + recursion depth).

type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  for (let i = 0; i < value.length; ) {
    if (Array.isArray(value[i])) {
      value.splice(i, 1, ...value[i]);
    } else {
      i++;
    }
  }

  return value;
}

type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  return Array.isArray(value) ? value.flatMap((item) => flatten(item)) : value;
}

*/