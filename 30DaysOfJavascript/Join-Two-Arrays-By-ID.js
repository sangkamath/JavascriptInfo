/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const combinedArray = arr1.concat(arr2);
    const merged = {};
  
    combinedArray.forEach((obj) => {
      const id = obj.id;
      if (!merged[id]) {
        merged[id] = { ...obj };
      } else {
        merged[id] = { ...merged[id], ...obj };
      }
    });
  
    return Object.values(merged)
  };

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const map = new Map();
    for(const obj of arr1) map.set(obj.id, obj);
    for(const obj of arr2) {
        if(!map.has(obj.id)) map.set(obj.id, obj);
        else {
            const prevObj = map.get(obj.id);
            for(const key of Object.keys(obj)) prevObj[key] = obj[key];
        }
    }
    const res = new Array();
    for(let key of map.keys()) res.push(map.get(key));
    return res.sort((a,b)=>a.id-b.id); 
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const map = new Map();
    for(const obj of arr1) map.set(obj.id, obj);
    for(const obj of arr2) {
        if(!map.has(obj.id)) map.set(obj.id, obj);
        else {
            const prevObj = map.get(obj.id);
            for(const key of Object.keys(obj)) prevObj[key] = obj[key];
        }
    }
    const res = new Array();
    for(let key of map.keys()) res.push(map.get(key));
    return res.sort((a,b)=>a.id-b.id); 
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    arr1.sort((a,b) => a.id - b.id)
    arr2.sort((a,b) => a.id - b.id)
    let i = 0
    let j = 0

    const joinedArray = []

    while(i < arr1.length && j < arr2.length) {

        if(arr1[i].id === arr2[j].id) {
            joinedArray.push({...arr1[i], ...arr2[j]})
            i++
            j++
            continue
        }

        if(arr1[i].id < arr2[j].id) {
            joinedArray.push({...arr1[i]})
            i++
            continue
        }

        joinedArray.push({...arr2[j]})
        j++
    }

    while(i < arr1.length) {
        joinedArray.push({...arr1[i]})
        i++
    }

    while(j < arr2.length) {
        joinedArray.push({...arr2[j]})
        j++
    }

    return joinedArray
}