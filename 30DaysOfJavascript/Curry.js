export default function curry(func) {
    // Returns a new function 'curried' that collects arguments.
    return function curried(...args) {
        // If we've collected enough arguments (i.e. args.length >= func.length),
        // we call the original function with all the collected arguments.
        if (args.length >= func.length) {
            return func.apply(this, args);
        }

        // Otherwise, we return a new function that expects an additional argument.
        // Note: the ternary here handles the case when the new argument is undefined.
        return (arg) =>
            arg === undefined
                ? curried.apply(this, args)
                : curried.apply(this, [...args, arg]);
    };
}
/*
Detailed Explanation
Function Signature and Export:
 
export default function curry(func) { ... }
This defines a function called curry and exports it as the default export of the module.
It takes one argument: func, the function you want to curry.
The curried Function:
 
Inside curry, we return a new function curried which uses the rest parameter (...args) to collect all arguments passed to it.
args is an array containing the arguments collected so far.
Checking If Enough Arguments Are Collected:
 
if (args.length >= func.length) { ... }
func.length is the number of parameters that func expects.
If the number of collected arguments is equal to or greater than what func requires, the function is invoked immediately using func.apply(this, args) (which calls func with the current context this and the collected arguments).
Handling Partial Application:
 
If there aren’t enough arguments yet, the function returns another function that expects a single argument:
js
Copy
Edit
return (arg) =>
  arg === undefined
    ? curried.apply(this, args)
    : curried.apply(this, [...args, arg]);
Case when arg is not undefined:
The new argument is added to the array of collected arguments ([...args, arg]), and curried is called again with this updated list. This recursive call continues collecting arguments until the condition args.length >= func.length is met.
Case when arg is undefined:
This line checks if the provided argument is undefined. If so, it simply calls curried with the existing arguments (without adding anything new). This can be useful to handle cases where undefined is intentionally passed or as a way to "trigger" the function if needed.
Example in Action
Suppose you have a function:
 
js
Copy
Edit
function add(a, b, c) {
  return a + b + c;
}
If you curry it:
 
js
Copy
Edit
const curriedAdd = curry(add);
You can then call it in several ways:
 
Provide all arguments at once:
js
Copy
Edit
curriedAdd(1, 2, 3); // returns 6
Provide arguments one at a time:
js
Copy
Edit
curriedAdd(1)(2)(3); // returns 6
Provide a mix:
js
Copy
Edit
curriedAdd(1, 2)(3); // returns 6
In each case, the curried function collects the arguments until it has enough to call the original add function.
 
Summary
Currying transforms a function of multiple arguments into a chain of functions that each take one or a few arguments.
The curried function collects arguments until it has enough (i.e. args.length >= func.length), then calls the original function.
If not enough arguments are provided, it returns another function that waits for the next argument.
This approach offers flexibility in how you call your functions and can be very useful in functional programming styles.
*/

/*
Let's assume that n is the number of parameters that func requires (i.e. func.length). Typically, n is small, but here's the breakdown:

Time Complexity
Each Curried Invocation:
Every time you add an argument, you execute a constant-time check (args.length >= func.length) and then either call func.apply or return a new function.

Array Spreading:
The expression [...args, arg] creates a new array by copying the current args array and appending one element. In the worst-case, when you have collected k arguments, this operation takes O(k) time.

Overall Cost:
In the worst-case, you need to invoke the curried function n times (one for each argument). The cost per invocation increases as more arguments are collected:

First call: cost is O(1) (copying an empty array plus one element)
Second call: cost is O(1) or O(2)
...
n-th call: cost is O(n)
Adding these up gives roughly O(1 + 2 + … + n) = O(n²) in the worst-case scenario when considering the cost of array spreading.

Space Complexity
Recursion and Argument Storage:
Each time you call the curried function, you store an array of the arguments collected so far. At most, you store an array of size n.

Call Stack:
The recursion depth is at most n (one function call per argument).

Thus, the overall space complexity is O(n).

Summary
Time Complexity: O(n²) in the worst-case due to the repeated array copying.
Space Complexity: O(n) for storing the arguments and recursion depth.
In many practical cases (with small n), these costs are negligible, but it's good to be aware of them in theory.
*/

export default function curry(func) {
    var curried = function (...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        }

        // Use an arrow function here so that "this" is inherited from "curried"
        return (arg) =>
            arg === undefined
                ? curried.apply(this, args)
                : curried.apply(this, [...args, arg]);
    };

    return curried;
}

export default function curry(func) {
    var curried = function (...args) {
        const that = this; // capture outer `this`
        if (args.length >= func.length) {
            return func.apply(that, args);
        }

        return function (arg) {
            return arg === undefined
                ? curried.apply(that, args)
                : curried.apply(that, [...args, arg]);
        };
    };

    return curried;
}

export default function curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.call(this, ...args);
      }
  
      return (arg) =>
        arg === undefined
          ? curried.call(this, ...args)
          : curried.call(this, ...args, arg);
    };
  }


export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return curried.bind(this, ...args);
  };
}
  /*
Step-by-Step Explanation
Function Definition & Parameters:
The curry function takes a single parameter, func, which is the function you want to curry. It returns a new function curried.

The Curried Function:
The returned function, curried, accepts a variable number of arguments (...args). These are the arguments collected so far.

Checking for Sufficient Arguments:
Inside curried, it first checks:

js
Copy
Edit
if (args.length >= func.length) {
  return func.apply(this, args);
}
Here, func.length gives the number of parameters that the original function func expects.
If the number of collected arguments (args.length) is equal to or greater than what func needs, the function is invoked immediately using func.apply(this, args).
Returning a Bound Function for Partial Application:
If there are not enough arguments, the function doesn't call func yet. Instead, it returns a new version of curried with the arguments collected so far pre-bound:

js
Copy
Edit
return curried.bind(this, ...args);
The bind method creates a new function where the value of this is fixed to the current context, and the provided arguments (...args) are prepended to any arguments passed later.
When the bound function is later called with additional arguments, those arguments are appended to the pre-bound arguments.
This allows you to keep accumulating arguments until you have enough to call func.
How It Works in Practice
Imagine you have a function:

js
Copy
Edit
function add(a, b, c) {
  return a + b + c;
}
When you curry it:

js
Copy
Edit
const curriedAdd = curry(add);
You can call it in several ways:

All arguments at once:

js
Copy
Edit
curriedAdd(1, 2, 3); // Returns 6, because 3 arguments are provided.
Partially applying arguments:

js
Copy
Edit
const add1 = curriedAdd(1);         // Returns a new function with 1 bound.
const add1And2 = add1(2);             // Returns another function with 1 and 2 bound.
add1And2(3);                        // Now returns 6.
Using bind for accumulation:

When you call curriedAdd(1), it doesn't have enough arguments (only 1 out of 3 needed), so it returns a new function with 1 pre-bound.
Calling that function with another argument (say 2) returns another function with 1, 2 pre-bound.
Finally, when you provide the third argument (3), the condition args.length >= func.length becomes true, and it calls add(1, 2, 3).
Key Points
Binding Pre-Bound Arguments:
The use of bind lets you accumulate arguments without creating explicit closures or manually merging arrays of arguments. Each time you call the function with fewer arguments than needed, a new bound function is returned with the existing arguments pre-bound.

Maintaining Context (this):
Using bind(this, ...args) ensures that the original context is preserved in subsequent calls.

Lazy Execution:
The function doesn't execute until enough arguments are collected. This is what makes currying useful in functional programming—it transforms a multi-argument function into a sequence of functions that collect arguments over time.

This implementation is both elegant and concise because it leverages JavaScript's built-in bind method to handle partial application, simplifying the process of accumulating arguments until the original function can be called.
*/