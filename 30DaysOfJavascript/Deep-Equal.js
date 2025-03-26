function shouldDeepCompare(type) {
    return type === '[object Object]' || type === '[object Array]';
}

function getType(value) {
    return Object.prototype.toString.call(value);
}

/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
    // Check for arrays/objects equality.
    const type1 = getType(valueA);
    const type2 = getType(valueB);

    // Only compare the contents if they're both arrays or both objects.
    if (type1 === type2 && shouldDeepCompare(type1) && shouldDeepCompare(type2)) {
        const entriesA = Object.entries(valueA);
        const entriesB = Object.entries(valueB);

        if (entriesA.length !== entriesB.length) {
            return false;
        }

        return entriesA.every(
            // Make sure the other object has the same properties defined.
            ([k, v]) => Object.hasOwn(valueB, k) && deepEqual(v, valueB[k]),
        );
    }

    // Check for primitives + type equality.
    return Object.is(valueA, valueB);
}

/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
    // Check primitives for equality.
    if (Object.is(valueA, valueB)) {
        return true;
    }

    const bothObjects =
        Object.prototype.toString.call(valueA) === '[object Object]' &&
        Object.prototype.toString.call(valueB) === '[object Object]';
    const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

    // At this point, they can still be primitives but of different types.
    // If they had the same value, they would have been handled earlier in Object.is().
    // So if they're not both objects or both arrays, they're definitely not equal.
    if (!bothObjects && !bothArrays) {
        return false;
    }

    // Compare the keys of arrays and objects.
    if (Object.keys(valueA).length !== Object.keys(valueB).length) {
        return false;
    }
    for (const key in valueA) {
        if (!deepEqual(valueA[key], valueB[key])) {
            return false;
        }
    }

    // All checked have passed, the arrays/objects are equal.
    return true;
}