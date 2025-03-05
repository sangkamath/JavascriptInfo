//array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

const numbers = [15.5, 2.3, 1.1, 4.7];
document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);

function getSum(total, num) {
  return total + Math.round(num);
}

//array.entries()

// Create an Array
const fruits = ["Banana", "Orange", "Apple", "Mango"];

// Create an Iterator
const list = fruits.entries();

// List the Entries
let text = "";
for (let x of list) {
  text += x;
}

//array.filter(function(currentValue, index, arr), thisValue)

const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}

//array.forEach(function(currentValue, index, arr), thisValue)

const numbers2 = [65, 44, 12, 4];
numbers2.forEach(myFunction)

function myFunction(item, index, arr) {
  arr[index] = item * 10;
}