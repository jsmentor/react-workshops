// Iterators

const list = new Set(['a', 'b', 'c']);

// let values = list.values();
//
// let value = values.next(); //{value: "a", done: false}
// console.log('value: ', value);
//
// let value2 = values.next(); //{value: "b", done: false}
// console.log('value2: ', value2);
//
// let value3 = values.next(); //{value: "c", done: false}
// console.log('value3: ', value3);
//
// let finalValue = values.next(); //{value: undefined, done: true}
// console.log('finalValue: ', finalValue);

// for(let value of list){
//   console.log(`value: ${value}`);
// }

for(let value of list.values()){
  console.log(`list value: ${value}`);
}

let array = ['a', 'b', 'c'];

for(let value of array){
  console.log(`array value: ${value}`);
}

for(let key of array.keys()){
  console.log(`key: ${key}`);
}

