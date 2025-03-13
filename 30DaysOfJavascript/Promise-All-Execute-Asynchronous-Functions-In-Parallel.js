/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 *The time complexity of the `promiseAll` function can be analyzed based 
 on the number of functions passed in the `functions` array. Each function 
 is called once, and each function returns a promise that is resolved or 
 rejected. Therefore, if there are `n` functions, the time complexity is 
 O(n) for the initial loop that iterates through the functions. However, 
 the actual time taken will depend on how long each promise takes to 
 resolve, which can vary.

The space complexity is primarily determined by the storage of results in 
the `results` array and the counter variable. The `results` array will 
store one result for each function, leading to a space complexity of O(n). 
The counter variable is a constant space usage, O(1). Thus, the overall 
space complexity is O(n) due to the results array.

In summary, the time complexity is O(n) (dependent on the number of 
functions and their resolution times), and the space complexity is 
O(n) (for storing results).
 */
var promiseAll = function (functions) {
    return new Promise((resolve, reject) => {
        let results = []
        let counter = 0

        if (functions.length === 0) {
            resolve(results)
        }

        for (let i = 0; i < functions.length; i++) {
            functions[i]()
                .then(result => {
                    results[i] = result
                    counter++

                    if (counter === functions.length) {
                        resolve(results)
                    }
                })
                .catch(reason => {
                    reject(reason)
                })
        }
    })
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 * The time complexity of the `promiseAll` function can be analyzed based on 
 * the number of promises in the input iterable. The function iterates over 
 * each item in the iterable, and for each item, it awaits the resolution of 
 * the promise. If we denote the number of promises as n, the time complexity 
 * is O(n) in the best case, where all promises resolve quickly. However, 
 * since the function awaits each promise individually, the overall time 
 * complexity can be affected by the time it takes for the slowest promise 
 * to resolve, leading to a worst-case scenario of O(n * t), where t is the 
 * time taken by the longest promise to resolve.

The space complexity of the function is O(n) as well, due to the `results` 
array that stores the resolved values of the promises. This array has a length
 equal to the number of promises in the iterable. Additionally, there is some 
 constant space used for variables like `unresolved`, but this does not scale 
 with the input size. Therefore, the dominant factor in space complexity is the 
 `results` array, resulting in an overall space complexity of O(n).
 */


/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
        const results = new Array(iterable.length);
        let unresolved = iterable.length;

        if (unresolved === 0) {
            resolve(results);
            return;
        }

        iterable.forEach(async (item, index) => {
            try {
                const value = await item;
                results[index] = value;
                unresolved -= 1;

                if (unresolved === 0) {
                    resolve(results);
                }
            } catch (err) {
                reject(err);
            }
        });
    });
}

/**
* @param {Array} iterable
* @return {Promise<Array>}
The time complexity of the `promiseAll` function can be analyzed based on the 
number of promises in the input iterable. The function iterates over each item 
in the iterable, which takes O(n) time, where n is the length of the iterable. 
For each item, it calls `Promise.resolve(item)` and attaches `.then()` handlers. 
The time taken for resolving each promise can vary, but in the worst case, if 
all promises are resolved, the overall time complexity remains O(n) since we 
are primarily concerned with the number of items processed.

The space complexity is O(n) as well, due to the `results` array that stores 
the resolved values of the promises. This array has a length equal to the number 
of items in the iterable. Additionally, there is a constant amount of space used 
for variables like `unresolved` and the index in the loop, but these do not scale 
with the input size. Therefore, the dominant factor in space complexity is the 
`results` array.

In summary, both the time and space complexity of the `promiseAll` function 
are O(n).
*/
export default function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
        const results = new Array(iterable.length);
        let unresolved = iterable.length;

        if (unresolved === 0) {
            resolve(results);
            return;
        }

        iterable.forEach((item, index) => {
            Promise.resolve(item).then(
                (value) => {
                    results[index] = value;
                    unresolved -= 1;

                    if (unresolved === 0) {
                        resolve(results);
                    }
                },
                (reason) => {
                    reject(reason);
                },
            );
        });
    });
}