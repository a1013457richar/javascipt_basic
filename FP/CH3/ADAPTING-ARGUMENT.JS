// function foo( [x,y,...args] = [] ) 


function foo(x,y) {
    console.log( x + y );
}
//因為他的輸出只有一個[]
//當我套console.log([3,9])
//因此:他會儲存到
function bar(fn) {
    fn( [ 3, 9 ] );
}
bar(foo)

//bar( foo );   沒救了=>要用一個spreadfunction
function spreadArgs(fn){
return function spreadFn(args){
    console.log(args)
    console.log(...args)//...就解構出來了
    return fn(...args)
   
}
}

bar(spreadArgs(foo))

//另外一個unapply
function gatherArgs(fn){
    return function gatherFn(...args){
        console.log(...args)
        console.log(args)


        return fn(args)
        
    }
}

function combinetwo([v1,v2]){
    return v1+v2
}

// [1,2,3,4,5].reduce(combinetwo)
var num=[1,2,3,4,5].reduce(gatherArgs(combinetwo))
console.log(num)
