// B：map(...) 傳 3 個變數 value, index, array
// A：parseInt(...) 接收兩個變數 string, radix

//unary
var unary=
fn=>arg=>fn(arg)

// function unary(fn) {
//     return function onlyOneArg(arg){
//         return fn( arg );
//     };
// }

var unary = (fn) => (arg) => fn( arg )

//這樣不行
// console.log(["1","2","3"].map( parseInt ))

console.log(["1","2","3"].map( unary( parseInt )))


//One on One
// 自己回傳自己

function identity(v){
    return v
}


var words = "   Now is the time for all...  ".split( /\s|\b/ );
console.log(words)

console.log(words.filter(i=>i))

//identity可以在很多地方用
function output(msg,FN){
    msg=FN(msg)
    console.log(msg)

}

output("Hello World",txt=>txt.toUpperCase())



