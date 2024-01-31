"use strict";

var pipe = reverseArgs(compose);//compose是從右到左調用函數，pipe是從左到右調用函數

// curried list operators
var map = unboundMethod( "map", 2 );
var filter = unboundMethod( "filter", 2 );
var filterIn = filter;
var reduce = unboundMethod( "reduce", 3 );
var each = unboundMethod( "forEach", 2 );
var flatMap = curry( function flatMap(mapperFn,arr) {
	return arr.reduce( function reducer(list,v) {
		return list.concat( mapperFn( v ) );
	}, [] );
} );


// ************************************

function filterOut(predicateFn,arr) {
	return filterIn( not( predicateFn ), arr );
}

function unary(fn) {
	return function onlyOneArg(arg){
		return fn( arg );
	};
}

function not(predicate) {
	return function negated(...args){
		return !predicate( ...args );
	};
}

function reverseArgs(fn) {
	return function argsReversed(...args){
		return fn( ...args.reverse() );
	};//接受一個函數當作fn，把參數順序反轉最後調用fn
}

function spreadArgs(fn) {
	return function spreadFn(argsArr){
		return fn( ...argsArr );
	};
}

function partial(fn,...presetArgs) {
	return function partiallyApplied(...laterArgs){
		return fn( ...presetArgs, ...laterArgs );
	};
}

function partialRight(fn,...presetArgs) {
	return function partiallyApplied(...laterArgs){
		return fn( ...laterArgs, ...presetArgs );
	};
}

function curry(fn,arity = fn.length) {//arity默認函數數量
	return (function nextCurried(prevArgs){
		return function curried(nextArg){
			// curry函数返回一个函数，这个函数会递归地接受一个参数并将其添加到参数列表中，直到参数数量达到arity，然后调用原始函数fn。
			var args = [ ...prevArgs, nextArg ];

			if (args.length >= arity) {
				return fn( ...args );
			}
			else {
				return nextCurried( args );
			}
		};
	})( [] );
}

function uncurry(fn) {
	return function uncurried(...args){
		var ret = fn;

		for (let i = 0; i < args.length; i++) {
			ret = ret( args[i] );
		}

		return ret;
	};
}

function zip(arr1,arr2) {
	var zipped = [];
	arr1 = [...arr1];
	arr2 = [...arr2];

	while (arr1.length > 0 && arr2.length > 0) {
		zipped.push( [ arr1.shift(), arr2.shift() ] );
	}

	return zipped;
}

function compose(...fns) {
    return fns.reduceRight( function reducer(fn1,fn2){//從右邊到左邊便利函數列表
        return function composed(...args){
            return fn2( fn1( ...args ) );//，然后返回一个新的函数，这个新函数会先调用fn1，然后把结果传递给fn2。
        };
    } );
}

function prop(name,obj) {
	return obj[name];
}

function setProp(name,obj,val) {
	var o = Object.assign( {}, obj );
	o[name] = val;
	return o;
}//創建新對象，並將原對象的屬性複製到新對象中	

function unboundMethod(methodName,argCount = 2) {
	return curry(//curry的作用是将一个多参数函数转换成一个单参数函数
		(...args) => {
			//把每一個對象的方法都提取出來，並且把this指向obj
			var obj = args.pop();
			//obj上的方法，this指向obj
			return obj[methodName]( ...args );
		},
		argCount
	);
}
