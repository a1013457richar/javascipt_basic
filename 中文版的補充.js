//改變了


const collection = ['ironMan'];
collection.push('captainAmerica');

collection

//沒有改變

const collection1 = ['ironMan'];
collection.concat('captainAmerica');

collection1
// Immutable.js 
// const collection3 = Immutable.List.of('ironMan');
// const newCollection = collection.push('captainAmerica');

// Output:
// newCollection;

// 函數的合成
// 還記得我們討論過的 [].map(unary(parseInt)) 嗎？現在來看看其中的運作。

//偏函數應用

// function ajax( url, data, cb ) {

// }

// function getOrder(data, cb) {
//     ajax( "http://some.api/order", data, cb );
// }

// 正式來說是一種減少函數參數個數 Arity 的流程，Arity 指的是形式參數 parameter 的個數，如原先 ajax 的 arity 從 3 個減少到 2 個。

function partial(fn, ...presetArgs) {
    console.log(...presetArgs);
    //先暫存參數
    return function partiallyApplied(...laterArgs) {
        //等這個參數到了之後再傳進去函數裡面
        console.log(...laterArgs);
        return fn( ...presetArgs, ...laterArgs )
    }
}

// partiallyApplied 閉包 closes over 了 fn 和 presetArgs。
// var getOrder = partial(ajax, "http://some.api/order")
/*
var getOrder = function partiallyApplied (...laterArgs) {
    return ajax("http://some.api/order", ...laterArgs)
}

// ver1
var getLastOrder = partial(
    ajax,
    "http://some.api/order",
    { id: ORDER_ID }
)

var getLastOrder = function partiallyApplied (...laterArgs){
    return ajax(
        "http://some.api/order",
        { id: ORDER_ID }
    )
}

var getLastOrder = partial( getOrder, { id: ORDER_ID })

// ver2
var getLastOrder = function outerPartiallyApplied (...outerLaterArgs) {
    var getOrder = function innerPartiallyApplied (...innerlaterArgs) {
        return ajax("http://some.api/order", ...innerlaterArgs)
    }
    return getOrder({{ id: ORDER_ID }}, ...outerLaterArgs)
}
*/
function add (x, y) {
    console.log(x, y);
    return x + y
}


var num=[30, 55, 42, 87, 66].map(partial(add, 10))

console.log(num);



//參數反轉
function reverseArgs(fn) {
    return function argsReversed(...args){
        console.log(...args);
        return fn( ...args.reverse() );
    };
}
/*

var getOrderWithHandler = reverseArgs(
    partial(reverseArgs( ajax ), function handler() {
        // ...
    })
)

1. (cb, data, url)
2. 

*/

// function partialRight(fn, ...presetArgs) {
    
//     console.log(...presetArgs);
//     return reverseArgs(
       
//         partial( reverseArgs( fn ), ...presetArgs.reverse() )
//     );
// }

function partialRight(fn,...presetArgs) {
    console.log(...presetArgs);
    return function partiallyApplied(...laterArgs){
        console.log( ...laterArgs);
        return fn( ...laterArgs, ...presetArgs );
    };
}
function foo(x,y,z,...rest) {
    console.log( x, y, z, rest );
}

var f = partialRight( foo, "在你右邊" );

// f(  );              // "在你右邊" undefined undefined []

// f( 1, 2 );          // 1 2 "在你右邊" []

// f( 1 );             // 1 "在你右邊" undefined []

// f( 1, 2, 3 );       // 1 2 3 ["在你右邊"]

f( 1, 2, 3, 4 );    // 1 2 3 [4,"在你右邊"]


//curry
function curry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs){
        console.log(prevArgs);
        console.log(arity);
        return function curried(nextArg){
            console.log(nextArg);
            //蒐集已經傳入的參數<
    //接每次傳入的參數合併成args
            var args = [ ...prevArgs, nextArg ];
            // 當 args 長度小於 ARITY 時，return nextCurried(args)，args，也就是下一輪的 prevArgs
            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}

function sum(...args){
    var sum=0;
    for(var i=0;i<args.length;i++){
        sum+=args[i];
    }
    return sum;
}


var curriedSum = curry( sum, 5 );
console.log(curriedSum( 1 )( 2 )( 3 )( 4 )( 5 ));
// 15

//全班加十分
var addthen=[1,2,3,4,5,6,7,8,9,10].map(curry(add)(10))
console.log(addthen);

// 重構 partial application 工具
function partialProps(fn,presetArgsObj) {
    console.log(presetArgsObj);
    return function partiallyApplied(laterArgsObj){
        console.log(laterArgsObj);
        return fn( Object.assign( {}, presetArgsObj, laterArgsObj ) );
    };
}

// 重構 currying 工具
// 請注意，arity 需指定，預設為 1
function curryProps(fn, arity = 1) {
    return (function nextCurried(prevArgsObj){
        return function curried(nextArgObj = {}){
            var [key] = Object.keys( nextArgObj );
            var allArgsObj = Object.assign( {}, prevArgsObj, { [key]: nextArgObj[key] } );

            if (Object.keys( allArgsObj ).length >= arity) {
                return fn( allArgsObj );
            }
            else {
                return nextCurried( allArgsObj );
            }
        };
    })( {} );
}

function move({x = 0, y = 0, z} = {}) {
    return [x, y, z];
  }

  var f2 = partialProps( move, { y: 2 } );
  console.log( f2({ x: 1, z: 6}) );
  var f1 = curryProps( move, 3 );

  console.log( f1({ x: 2 })({ z: 7 })({ y: 3}))


  //形參是各自獨立(沒有形參解構 parameter destructuring)
  function move2(x, y, z) {
    return [x, y, z];
  }

// spreadArg


function spreadArgs(fn) {

    return function spreadFn(argsArr){
        console.log(argsArr);
        return fn( ...argsArr );
    };
}

function spreadArgProps(
    fn,
    propOrder =
        fn.toString()
        .replace( /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/, "$1$2$3" )
        .split( /\s*,\s*/ )
        .map( v => v.replace( /[=\s].*$/, "" ) )
) {
    return function spreadFn(argsObj) {
        console.log(argsObj);
        //對於每個參數，都從 argsObj 中取出對應的值
        console.log(propOrder);
        //map到argsObj[x]
        console.log(...propOrder.map( k => argsObj[k] ));
        return fn( ...propOrder.map( k => argsObj[k] ) );
    };
}

var f4 = partialProps( spreadArgProps( move2 ), { y: 2 } );

console.log(f4( { z: 3, x: 1 } ));


//Pointfree 改寫相同簽名的範例

function double(x) {
    return x * 2
}

[1,2,3,4,5].map( function mapper( v ){
    return double( v );
} )
// [1,2,3,4,5].map( double )

//unary

function unary(fn) {
    console.log(fn);
    return function onlyOneArg(arg){
        console.log(arg);
        return fn( arg );
    };
}
// var unary = (fn) => (arg) => fn( arg )
console.log(["1","2","3"].map( unary( parseInt ) ));
// Pointfree 的本質
// 輸出
function output(txt) {
    console.log( txt );
}
// 字串長度是否小於等於 5
function isShortEnough(str) {
    return str.length <= 5;
}

// 字串長度是否大於 5
function isLongEnough (str) {
    return !isShortEnough(str)
}

function printIf( testfn, msg ) {
    if (testfn( msg )) {
        output( msg )
    }
}
var msg1 = "Good";
var msg2 = msg1 + " Morning";

printIf( isShortEnough, msg1 );     // Good
printIf( isShortEnough, msg2 );

// 小工具：取反（取補）
function not(fn) {
    return function negated(...args){
        return !fn( ...args );
    };
}

var isLongEnough = not(isShortEnough)

printIf( isLongEnough, msg2 )  

function uncurry(fn) {
    return function uncurried(...args){
        console.log(...args);
        var ret = fn;

        for (let arg of args) {
            console.log(ret);
            ret = ret( arg );
        }

        return ret;
    };
}

// 進階：printIf 重構
function when(test,fn){
    return function conditional(...args){
        console.log(...args);
        if (test(...args)) {
            return fn(...args)
        }
    }
}

var printIf = uncurry( rightPartial( when, output ) );

// [] <-- map <-- unary <-- parseInt
function splitString(str) {
    return String( str )
        .toLowerCase()
        .split( /\s|\b/ )
        .filter( function alpha(v){
            return /^[\w]+$/.test( v );
        } );
}

function deDuplicate(list) {
    return Array.from(new Set(list));
}

var loremString = 'Cras eleifend, in hendrerit tellus feugiat. Nulla non malesuada orci. Sed orci tellus.'

var wordsArray = splitString( loremString )
var wordsUsed = deDuplicate( wordsArray )

console.log(wordsUsed)

var compose2fn = (fn2, fn1) =>
    value =>
        fn2( fn1( value ))

var deDuplicateString = compose2fn (deDuplicate, splitString)       

console.log(deDuplicateString(loremString))

// output <-- fn1 <-- fn2 <-- ... <-- fnN <--input

function compose(...fns) {
    return function composed(result) {
        // 複製 fns 陣列到 list
        var list = fns.slice()
        
        while (list.length > 0) {
            // 從右到左拿出函數並執行
            result = list.pop()(result)
            
        }
        
        return result
    }
}

function splitString(str) {
    return String( str )
        .toLowerCase()
        .split( /\s|\b/ )
        .filter( function alpha(v){
            return /^[\w]+$/.test( v );
        } );
}

function deDuplicate(list) {
    return Array.from(new Set(list));
}

function skipShortWords(words) {    
    return words.filter(word => word.length > 4)
}

var longWords = compose(skipShortWords, deDuplicate, splitString)


var result = longWords(loremString)

console.log(result)


// partialRight 的概念，實作一個右偏應用的 compose 


