function curry(fn,arity=fn.length){
    return (function nextCurried(pre){
        return function curried(nextargs){
            const args=[...pre,nextargs];
            if(args.length>=arity){
                return fn(...args);
            }
            return nextCurried(args)
        }
    })([])
}

const add = (x, y) => x + y;
const addC = curry(add);
console.log(addC(1)(2))
//Loose curry

