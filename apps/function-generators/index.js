

// Iterators

const set = new Set(['a', 'b', 'c']);

let values = set.values();

var value = values.next(); //{value: "a", done: false}

var value2 = values.next(); //{value: "b", done: false}

var value3 = values.next(); //{value: "c", done: false}

var finalValue = values.next(); //{value: undefined, done: true}

for(var value of set){
  console.log(`value: ${value}`);
}

var array = ['a', 'b', 'c'];
for(var value of array){
  console.log(`value: ${value}`);
}

var array = ['a', 'b', 'c'];
for(var key of array.keys()){
  console.log(`key: ${key}`);
}