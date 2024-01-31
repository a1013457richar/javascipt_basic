// function foo(x,y,z) {
//   console.log( arguments.length );
// }

// foo( 3, 4 );    // 2

// function foo(x,y,z,...args) {
//   console.log( x, y, z, args );
// }

// foo( 1, 2, 3, 4 );    

function foo( {x=5,y} = {} ) {
  console.log( x, y );
}

foo( {
  y: 3
} );  


//Early Returns

// sum
function sum(list){
  var total=0;
  for(let i=0;i<list.length;i++){
    if(!list[i])list[i]=0
    total+=list[i]
  }
  return total
}


var nums = [ 1, 3, 9, 27, , 84 ];

var total=sum( nums )
console.log(total)


// higher-order function

function foo(){
  return bar(function inner(msg){
    return msg.toUpperCase()
  })
}

// var f=foo()
// console.log(f('hello'))

//另外一種寫法
function bar(func){
  return func('hello')
}
console.log(foo())

// foo(bar=>inner=>hello)

//closure
function running(start){
  var val=start;

  return function current(increment=1){
    val+=increment;
    return val
  }

}

var score=running(0);
score()
score()


console.log(score())

function add(x){
  return function sum(y){
    return x+y
  }
}

var addTo10 = add( 10 );

var addto=addTo10(12)
console.log(addto)


//共用的function
function formatter(formFn){
  return function inner(str){
    return formFn(str)
  }
}
var lowwer=formatter(function formaating(v){
  return v.toLowerCase();
});

var upper=formatter(function formaating(v){
  return v[0].toUpperCase()+v.substring(1).toLowerCase();
});

console.log(lowwer("QOW"));

//unary把array解構
function unary(fn){
  return function oneArg(arg){
    return fn(arg);
  };
}

var arr=['1','2','3'].map(unary(parseInt))
console.log(arr)

// helper to adapt a function so that it spreads out a single received array as its individual arguments:
function spreadArgs(fn) {
  return function spreadFn(argsArr) {
    return fn(...argsArr);
  };
}

function foo(x,y){
  console.log(x+y)
}

var f=spreadArgs(foo)

f([1,2])

//partial(..)
function partial(fn,...presetArgs){
  return function partiallyApplied(...laterArgs){
    return fn(...presetArgs,...laterArgs)
  }
}

// Reversing Arguments
function reverseArgs(fn) {
  return function argsReversed(...args) {
    return fn(...args.reverse());
  };
}

// partialRight(..)
function partialRight(fn,...presetArgs){
  return function partiallyApplied(...laterArgs){
    return fn(...laterArgs,...presetArgs)
  }
}
function foo(x,y,z,...rest) {
  console.log( x, y, z, rest );
}

var f = partialRight( foo, "z:last" );

f( 1, 2, 3, 4, 5, 6 );    // 1 2 3 [4,5,6] "z:last"



//curry
function curry(fn,arity=fn.length){
  return (function nextCurried(prevArgs){
    return function curried(nextArg){
      var args=[...prevArgs,nextArg];
      if(args.length>=arity){
        return fn(...args)
      }else{
        return nextCurried(args)
      }
    }
  })([])
}

function sum(...nums) {
  var total = 0;
  for (let num of nums) {
      total += num;
  }
  return total;
}


var f=curry(sum,5)
console.log(f(1)(2)(3)(4)(5))

//free to order concern :paritalprops
function partialProps(fn,presetArgsObj){
  console.log(presetArgsObj)
  return function partiallyApplied(laterArgsObj){
    console.log(laterArgsObj)
    return fn({...presetArgsObj,...laterArgsObj})
  }
}
//curryprops
function curryProps(fn,arity=1){
  return (function nextCurried(prevArgsObj){
    return function curried(nextArgObj){
      var [key]=Object.keys(nextArgObj);
      var allArgsObj={...prevArgsObj,...{[key]:nextArgObj[key]}};

      if(Object.keys(allArgsObj).length>=arity){
        return fn(allArgsObj)
      }else{
        return nextCurried(allArgsObj)
      }
    }
  })({})
}

function foo({x,y,z}={}){
  console.log(x,y,z)
}

var f1=curryProps(foo,3)
var f2=partialProps(foo,{y:2})

f1({y:2})({x:1})({z:3})
f2({z:3,x:1})


//not 

function not(fn){
  return function negated(...args){
    return !fn(...args)
  }
}
function isShortEnough(str) {
  return str.length <= 5;
}
function output(txt) {
  console.log( txt );
}
function printIf( predicate, msg ) {
  if (predicate( msg )) {
      output( msg );
  }
}
var isLong=not(isShortEnough)
var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf( isLong, msg1 );
printIf( isLong, msg2 );   


// Let's examine composition in action one step at a time. Consider these two utilities you might have in your program:
function words(str) {
  return String( str )
      .toLowerCase()
      .split( /\s|\b/ )
      .filter( function alpha(v){
          return /^[\w]+$/.test( v );
      } );
}

function unique(list) {
  var uniqList = [];

  for (let v of list) {
      // value not yet in the new list?
      if (uniqList.indexOf( v ) === -1 ) {
          uniqList.push( v );
      }
  }

  return uniqList;
}





var text = "To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.";

var wordsFound = words( text );
var wordsUsed = unique( wordsFound );

wordsUsed;
// ["to","compose","two","functions","together","pass",
// "the","output","of","first","function","call","as",
// "input","second"]

var wordsUsed = unique( words( text ) );

wordsUsed;

function uniqueWords(str) {
  return unique( words( str ) );
}
// wordsUsed <-- unique <-- words <-- text

//compose function
function compose2(fn2,fn1) {
  return function composed(origValue){
      return fn2( fn1( origValue ) );
  };
}

var uniqueWords2 = compose2( unique, words );

console.log(uniqueWords2( text ));




// General Composition

function compose(...fns) {
  return function composed(result) {
      // copy the array of functions
      var list = [...fns];

      while (list.length > 0) {
          // take the last function off the end of the list
          // and execute it
          result = list.pop()( result );
      }

      return result;
  };
}


function skipShortWords(words) {
  var filteredWords = [];

  for (let word of words) {
      if (word.length > 4) {
          filteredWords.push( word );
      }
  }

  return filteredWords;
}

function compose(...fns) {
  // pull off the last two arguments
  var [ fn1, fn2, ...rest ] = fns.reverse();

  var composedFn = function composed(...args){
      return fn2( fn1( ...args ) );
  };

  if (rest.length == 0) return composedFn;

  return compose( ...rest.reverse(), composedFn );
}





// Reordered Composition
function pipe(...fns) {
  return function piped(result){
      var list = [...fns];

      while (list.length > 0) {
          // take the first function from the list
          // and execute it
          result = list.shift()( result );
      }

      return result;
  };
}

function skipShortWords(words) {
  var filteredWords = [];

  for (let word of words) {
      if (word.length > 4) {
          filteredWords.push( word );
      }
  }

  return filteredWords;
}

function uniqueWords(str) {
  return unique( words( str ) );
}

var pipe = reverseArgs( compose );

var biggerWords = pipe( words, unique, skipShortWords );
console.log(biggerWords( text ));


// Abstraction
function skipLongWords(list) { /* .. */ }

var shorterWords = compose( skipLongWords, unique, words );



// array destructuring:
var [first, ...rest] = [1,2,3,4,5];
first;              // 1

// Composition as Abstraction
function prop(name,obj) {
  return obj[name];
}


function setProp(name,obj,val) {
  var o = Object.assign( {}, obj );
  o[name] = val;
  return o;
}

var extractName = partial( prop, "name" );


// Purely Relative
function rememberedNumber(nums){
  return function caller(fn){
    return fn(nums)
  }
}

var nums=[1,2,3,4,5]

var f=rememberedNumber(nums)

var sum=f(function add(nums){
  return nums.reduce((total,v)=>total+v,0)
})

console.log(sum)


// covering Up Effects
var nums=[]
var smallCount=0
var largeCount=0      

function generateMoreRandoms(count){
  for (let i =0;i<count;i++){
    let num=Math.random()
    if(num<0.5)smallCount++
    else largeCount++
    nums.push(num)
  }

}

//解決side effect
function safer_generateMoreRandoms(count,initial) {
  // (1) Save original state
  var orig = {
      nums,
      smallCount,
      largeCount
  };

  // (2) Set up initial pre-side effects state
  nums = [...initial.nums];
  smallCount = initial.smallCount;
  largeCount = initial.largeCount;

  // (3) Beware impurity!
  generateMoreRandoms( count );

  // (4) Capture side effect state
  var sides = {
      nums,
      smallCount,
      largeCount
  };

  // (5) Restore original state
  nums = orig.nums;
  smallCount = orig.smallCount;
  largeCount = orig.largeCount;

  console.log(sides);

  // (6) Expose side effect state directly as output
  return sides;
}
var initialStates = {
  nums: [0.3, 0.4, 0.5],
  smallCount: 2,
  largeCount: 1
};

safer_generateMoreRandoms( 5, initialStates );

initialStates
nums


//recusrion

function fib(n){
  if(n<2)return n;
  return fib(n-1)+fib(n-2)
}

fib(5)



// Binary Tree Recursion
function sum(tree) {
if(tree==null)return 0;
return sum(tree.left)+tree.value+sum(tree.right)
}
//for example
var tree = {
  value: 30,
  left: {
      value: 20,
      left: {
          value: 10,
          left: null,
          right: null
      },
      right: null
  },
  right: {
      value: 40,
      left: null,
      right: null
  }
};

// Trampolines
function trampoline(fn){
  return function trampolined(...args){
    var result=fn(...args)
    while(typeof result==='function'){
      result=result()
    }
    return result
  }
}

var sum = trampoline(
  function sum(num1,num2,...nums) {
    // console.log(num1);
      num1 = num1 + num2;
      // console.log(num1);
      if (nums.length == 0) return num1;
      
      return () => sum( num1, ...nums );
  }
);

var xs = [];
for (let i=0; i<20000; i++) {
  xs.push( i );
}
console.log(sum( ...xs ));


function filter(predicateFn,arr) {
  var newList = [];

  for (let [idx,v] of arr.entries()) {
      if (predicateFn( v, idx, arr )) {
        // console.log(v);
          newList.push( v );
      }
  }

  return newList;
}


function isOdd(v) { return v % 2 == 1; }

var nums = [1,2,3,4,5,6,7,8,9,10];

var odds = filter( isOdd, nums );

odds;       // [1,3,5,7,9]


// Filtering-Out & Filtering-In

var filterIn = filter;

function filterOut(predicateFn,arr) {
    return filterIn( not( predicateFn ), arr );
}

var nums = [1,2,3,4,5,6,7,8,9,10];

var evens = filterOut( isOdd, nums );

evens;      // [2,4,6,8,10]


// Reduce
[5,10,15].reduce( (product,v) => product * v, 3 );

// function reduce(reducerFn,initialValue,arr) {
//   var acc, startIdx;

//   if (arguments.length == 3) {
//       acc = initialValue;
//       startIdx = 0;
//   }
//   else if (arr.length > 0) {
//       acc = arr[0];
//       startIdx = 1;
//   }
//   else {
//       throw new Error( "Must provide at least one value." );
//   }

//   for (let idx = startIdx; idx < arr.length; idx++) {
//       acc = reducerFn( acc, arr[idx], idx, arr );
//   }

//   return acc;
// }
function compose(...fns) {
  return function composed(result){
      return [...fns].reverse().reduce( function reducer(result,fn){
          return fn( result );
      }, result );
  };
}

function mapper(mapperFn,arr) {
  var newList = [];

  for (let [idx,v] of arr.entries()) {
      newList.push(
          mapperFn( v, idx, arr )
      );
  }

  return newList;
}


var pipeReducer = (composedFn,fn) => pipe( composedFn, fn );

// var fn =
//     [3,17,6,4]
//     .mapper( v => n => v * n )
//     .reducer( pipeReducer );

// fn( 9 );            // 11016  (9 * 3 * 17 * 6 * 4)
// fn( 10 );     

// Advanced List Operations// 12240  (10 * 3 * 17 * 6 * 4)

// var unique =
//     arr =>
//         arr.filter(
//             (v,idx) =>
//                 arr.indexOf( v ) == idx
//         );



var unique =
    arr =>
        arr.reduce(
            (list,v) =>
            
                list.indexOf( v ) == -1 ?
                    ( list.push( v ), list ) : list
        , [] );


var list=unique( [1,4,7,1,3,1,7,9,2,6,4,0,5,3] );
// [1, 4, 7, 3, 9, 2, 6, 0, 5]
console.log(list);

var hyphenate = (str,char) => `${str}-${char}`

var list=
["a","b","c"].reduce( hyphenate );
console.log(list);

// Flatten
function Flatten(arr) {
  return arr.reduce(
      (list,v) =>
          list.concat(
              Array.isArray( v ) ?
                  Flatten( v ) : v
          )
  , [] );
}
//用迴圈寫
var flatten=Flatten( [[0,1],2,3,[4,[5,6,7],[8,[9,[10,[11,12],13]]]]] );
console.log(flatten);

var flatten =
    (arr,depth = Infinity) =>
        arr.reduce(
            (list,v) =>
                list.concat(
                    depth > 0 ?
                        (depth > 1 && Array.isArray( v ) ?
                            flatten( v, depth - 1 ) :
                            v
                        ) :
                        [v]
                )
        , [] );


var flatten=flatten( [[0,1],2,3,[4,[5,6,7],[8,[9,[10,[11,12],13]]]]] ,1);
console.log(flatten);

// Mapping, Then Flattening

var firstNames = [
  { name: "Jonathan", variations: [ "John", "Jon", "Jonny" ] },
  { name: "Stephanie", variations: [ "Steph", "Stephy" ] },
  { name: "Frederick", variations: [ "Fred", "Freddy" ] }
];

var firstname=firstNames.map(e=>[e.name,...e.variations])
console.log(firstname);

// var flatMap =
//     (mapperFn,arr) =>
//         flatten( arr.map( mapperFn ), 1 );

// var name=flatMap( e => [e.name,...e.variations], firstNames );
// console.log(name);

// Zip

// 

function zip(arr1,arr2) {
  var zipped = [];

 arr1=[...arr1]
  arr2=[...arr2]
  while (arr1.length > 0 && arr2.length > 0) {
      zipped.push( [arr1.shift(), arr2.shift()] );
  }

  return zipped;
}

var zip=zip( [1,3,5,7,9], [2,4,6,8,10] );
console.log(zip);


// flatten( zip( [1,3,5,7,9], [2,4,6,8,10] ) );
// Composing Standalone Utilities
var filter = (arr,predicateFn) => arr.filter( predicateFn );

var map = (arr,mapperFn) => arr.map( mapperFn );

var reduce = (arr,reducerFn,initialValue) =>
    arr.reduce( reducerFn, initialValue );

    var double = v => v * 2;
var comp=compose(
    partialRight( reduce, sum, 0 ),
    partialRight( map, double ),
    partialRight( filter, isOdd )
)
( [1,2,3,4,5] );  
console.log(comp);     

// 18

var BinaryTree =
    (value,parent,left,right) => ({ value, parent, left, right });

    var banana = BinaryTree( "banana" );
var apple = banana.left = BinaryTree( "apple", banana );
var cherry = banana.right = BinaryTree( "cherry", banana );
var apricot = apple.right = BinaryTree( "apricot", apple );
var avocado = apricot.right = BinaryTree( "avocado", apricot );
var cantaloupe = cherry.left = BinaryTree( "cantaloupe", cherry );
var cucumber = cherry.right = BinaryTree( "cucumber", cherry );
var grape = cucumber.right = BinaryTree( "grape", cucumber );

var tree = banana;

// in-order traversal
BinaryTree.forEach = function forEach(visitFn,node){
  if (node) {
      if (node.left) {
          forEach( visitFn, node.left );
      }

      visitFn( node );

      if (node.right) {
          forEach( visitFn, node.right );
      }
  }
};

// in-order traversal
function inOrder(tree) {
  if (tree.left) {
      inOrder( tree.left );
  }

  console.log( tree.value );

  if (tree.right) {
      inOrder( tree.right );
  }
}

// BinaryTree.forEach( node => console.log( node.value ), banana );


BinaryTree.map = function map(mapperFn,node){
  if (node) {
      let newNode = mapperFn( node );
      newNode.parent = node.parent;
      newNode.left = node.left ?
          map( mapperFn, node.left ) : undefined;
      newNode.right = node.right ?
          map( mapperFn, node.right ): undefined;

      if (newNode.left) {
          newNode.left.parent = newNode;
      }
      if (newNode.right) {
          newNode.right.parent = newNode;
      }

      return newNode;
  }
};



var BANANA = BinaryTree.map(
  node => BinaryTree( node.value.toUpperCase() ),
  banana
);


BinaryTree.forEach( node => console.log( node.value ), BANANA );


BinaryTree.reduce = function reduce(reducerFn,initialValue,node){
  if (arguments.length < 3) {
      // shift the parameters since `initialValue` was omitted
      node = initialValue;
  }

  if (node) {
      let result;

      if (arguments.length < 3) {
          if (node.left) {
              result = reduce( reducerFn, node.left );
          }
          else {
              return node.right ?
                  reduce( reducerFn, node, node.right ) :
                  node;
          }
      }
      else {
          result = node.left ?
              reduce( reducerFn, initialValue, node.left ) :
              initialValue;
      }

      result = reducerFn( result, node );
      result = node.right ?
          reduce( reducerFn, result, node.right ) : result;
      return result;
  }

  return initialValue;
};

var sum = BinaryTree.reduce(
  (acc,v) => [ ...acc, v.value ]
,[],
  banana
);

console.log(sum);


BinaryTree.filter = function filter(predicateFn,node){
  if (node) {
      let newNode;
      let newLeft = node.left ?
          filter( predicateFn, node.left ) : undefined;
      let newRight = node.right ?
          filter( predicateFn, node.right ) : undefined;

      if (predicateFn( node )) {
          newNode = BinaryTree(
              node.value,
              node.parent,
              newLeft,
              newRight
          );
          if (newLeft) {
              newLeft.parent = newNode;
          }
          if (newRight) {
              newRight.parent = newNode;
          }
      }
      else {
          if (newLeft) {
              if (newRight) {
                  newNode = BinaryTree(
                      undefined,
                      node.parent,
                      newLeft,
                      newRight
                  );
                  newLeft.parent = newRight.parent = newNode;

                  if (newRight.left) {
                      let minRightNode = newRight;
                      while (minRightNode.left) {
                          minRightNode = minRightNode.left;
                      }

                      newNode.value = minRightNode.value;

                      if (minRightNode.right) {
                          minRightNode.parent.left =
                              minRightNode.right;
                          minRightNode.right.parent =
                              minRightNode.parent;
                      }
                      else {
                          minRightNode.parent.left = undefined;
                      }

                      minRightNode.right =
                          minRightNode.parent = undefined;
                  }
                  else {
                      newNode.value = newRight.value;
                      newNode.right = newRight.right;
                      if (newRight.right) {
                          newRight.right.parent = newNode;
                      }
                  }
              }
              else {
                  return newLeft;
              }
          }
          else {
              return newRight;
          }
      }

      return newNode;
  }
};


var vegetables = [ "asparagus", "avocado", "broccoli", "carrot",
    "celery", "corn", "cucumber", "lettuce", "potato", "squash",
    "zucchini" ];

var whatToBuy = BinaryTree.filter(
    // filter the produce list only for vegetables
    node => vegetables.indexOf( node.value ) != -1,
    banana
);

// shopping list
var whatToBuy=BinaryTree.reduce(
    (result,node) => [ ...result, node.value ],
    [],
    whatToBuy
);

console.log(whatToBuy);



// Eager vs. Lazy

var a = [1,2,3]

var b = a.map( v => v * 2 );

b;  

var a = [];

var b = mapLazy( a, v => v * 2 );

a.push( 1 );
