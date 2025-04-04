/**
 * @param {number} value The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
export default function clamp(value, lower, upper) {
    if (value >= lower && value <= upper) {
        return value;
    } else if (value < lower) {
        return lower;
    }
    return upper;
}

/**
* @param {number} value The number to clamp.
* @param {number} lower The lower bound.
* @param {number} upper The upper bound.
* @returns {number} Returns the clamped number.
*/
export default function clamp(value, lower, upper) {
    if (value < lower) {
        return lower;
    }

    if (value > upper) {
        return upper;
    }

    return value;
}

/**
* @param {number} value The number to clamp.
* @param {number} lower The lower bound.
* @param {number} upper The upper bound.
* @returns {number} Returns the clamped number.
*/
export default function clamp(value, lower, upper) {
    return Math.min(upper, Math.max(lower, value));
}