//task1

// Sum with closures
// sum(1)(2) = 3
// sum(5)(-1) = 4

function add(a){
    //其實就等於說是
    //let a=1
    return function(b){
        // let b=3
        console.log(b)
        console.log(a)
        return a+b
    }
}
console.log(add(1)(2))
// task 2
let phrase = "Hello";

// if (true) {
//   let user = "John";

//   function sayHi() {
//     alert(`${phrase}, ${user}`);
//   }
// }

// sayHi()

//TASK3
let arr = [1, 2, 3, 4, 5, 6, 7];




function inBetween(a,b){
  return function arr(x){
    console.log(x)
    return x>a&&x<b
  }
}

console.log(arr.filter(inBetween(3,6)))
