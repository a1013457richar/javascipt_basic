// let ary = [1, 2, 3]
// let newAry = ary.slice(0)  




// let ary = [[1,1], [2,2]]
// let newAry = Array.from(ary)


// let arr=[1,2,3]
// let newAry=[...arr]

let arr=[[1,2],[3,4]]
let newAry =JSON.parse(JSON.stringify(arr))
  console.log(arr === newAry )
  newAry.push([3.3])
  console.log(arr)
  console.log(newAry)


  //結論:要拷貝多層物件和陣列就用JSON.parse(JSON.stringify

