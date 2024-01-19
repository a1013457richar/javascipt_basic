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










