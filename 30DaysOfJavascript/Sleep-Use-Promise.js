/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    function callback(resolve, reject) {
        setTimeout(resolve, millis);
    }
    return new Promise(callback);
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */