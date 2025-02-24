const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length < 6);

console.log(result)


let arr = [
    { id: 15 },
    { id: -1 },
    { id: 0 },
    { id: 3 },
    { id: 12.2 },
    { },
    { id: null },
    { id: NaN },
    { id: 'undefined' }
  ];
  
let invalidEntries = 0;

function isNumber(obj){
    return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
}

function filterByID(item) {
    if (isNumber(item.id) && item.id !== 0) {
      return true;
    }
    invalidEntries++;
    return false;
  }
  
 const arrByID = arr.filter(filterByID);

 console.log('Filtered Array\n', arrByID);

console.log('Number of Invalid Entries = ', invalidEntries);


arr = ['a', 'b', 'c'];

console.log(arr.includes('a'));         //true
console.log(arr.includes('a', -100));   //true
console.log(arr.includes('b', -10));    //true
console.log(arr.includes('b', -2));     //true
console.log(arr.includes('a', -1));     //false
console.log(arr.includes('b', -1));     //false
console.log(arr.includes('c', -1));     //true
console.log(arr.includes('a', 0));      //true
console.log(arr.includes('b', 1));      //true
console.log(arr.includes('c', 3));      //false