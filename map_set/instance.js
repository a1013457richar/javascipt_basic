let map=new Map()
console.log(map.set('1','str1'))

let john = { name: "John" };
let visitsCountMap = new Map();
visitsCountMap.set(john, 123);
console.log(visitsCountMap.get(john) )

// Iteration over Map
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);
// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable)
}


