let fruits = [
    {item: 'apple', quantity: 0}, 
    {item: 'banana', quantity: 1}, 
    {item: 'cherry', quantity: 2}
  ]
  // 把大於 0 改成等於 0


  let fruitNew=fruits.filter(e=>e.quantity===0)
  console.log(fruitNew)


  let fruitlowercase=fruits.filter(e=>e.item.toLowerCase().includes("a"))
  console.log(fruitlowercase)

//   let newArr = arr.filter(function (element, index, array) {
//     //...
//   });


// 修改到原陣列的元素內容
let words = ["1", "22", "333", "4444", "55555", "666666"];
let word1=[...words]
let wordNew=word1.filter((word,index,arr)=>{
    console.log(word)
    arr[index+1]+='extra';
    return word.length<6;
})

console.log(wordNew);

// 修改到原陣列並加入新元素
// 每次 filter() 裡的函式在執行時，只要遇到一個元素就會新增一個 new 到最後面，因此 6 個元素跑過一遍就有 6 個 new，但是這些 new 是新增的，就不會被 filter() 判斷到，因此實際上就判斷了前 6 個元素，而這 6 個元素很自然地，只有 666666 字串長度沒有小於 6。
let wordNews=words.filter((word,index,arr)=>{
    arr.push("new");
    return word.length<6;
})

console.log(wordNews);





