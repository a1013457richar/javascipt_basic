//task 1
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';

//answer

function camelize(str) {
    return str.split('-').map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)).join('')
}

console.log(camelize("background-color"))

//task 2
let arr = [5, 3, 8, 1];
//錯誤的寫法
// function filterRange(arr,a,b){
//     const arr1=[...arr]
//     return (arr1<b||arr1>a)
// 


function filterRange(arr,a,b){
return arr.filter(item=>(item>=a&&item<=b))
}


console.log(filterRange(arr,1,4))

//task 3
let arr1 = [5, 3, 8, 1];

// removed the numbers except from 1 to 4



function filterRangeInPlace(arr,a,b){
    for (let i=0;i<arr.length;i++){
    //先取值
    let val=arr[i];
    if(val<a||val>b){
        arr.splice(i,1);
        i--;
    }
    
}
}

filterRangeInPlace(arr1, 1, 4); 
console.log(arr1)


//task4

let arr2 = [5, 2, 1, -10, 8];
// ... your code to sort it in decreasing order
arr2.sort((a,b)=>b-a)
console.log(arr2)

//task5

function copySorted(arr1){
    return [...arr1].sort()
}
let arr3 = ["HTML", "JavaScript", "CSS"];

let sorted1 = copySorted(arr3);
console.log(arr3)
console.log(sorted1)

//task6
// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };

// let users = [ john, pete, mary ];
// let usersMapped = users.map(user=>({
// fullname:`${user.name}${user.surname}`,
// id:`${user.id}`
// }))
// console.log(usersMapped[0].id)

//task7
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let arr5 = [ pete, john, mary ];

function sortByAge(arr){

    return arr.sort((a,b)=>(a.age)-b.age)
}

// console.log(sortByAge(arr5))

//task7

// function shuffle(arr){
//     arr.sort(()=>Math.random()-0.5)
// }
// let arr7= [1, 2, 3];
// let shu=shuffle(arr7)
// console.log(shu)

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]]
    }
    
}

let count = {
    '123': 0,
    '132': 0,
    '213': 0,
    '231': 0,
    '321': 0,
    '312': 0
  };
  
  for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    shuffle(array);
    count[array.join('')]++;
  }
  
  // show counts of all possible permutations
  for (let key in count) {
    console.log(`${key}: ${count[key]}`);
  }

//task8
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr9 = [ john, pete, mary ];

function getAverageAge(users){
    return users.reduce((pre,users)=>pre+users.age,0)
}

console.log(getAverageAge(arr9))
//還剩下最後兩個
https://javascript.info/array-methods















