var dogs = ['Lucky', 'Toby', 'Black', 'White']

function print(){
    return function inner(name){
        return console.log(name)
    }
}

var printer = print();

dogs.forEach(printer)

//下一個範例
function formatter(formatFn){
    return function inner(str){
        return formatFn(str)
    }
}

var low=formatter(function(v){
    return v.toLowerCase();
})

var capitalize=formatter(function(v){
    return v[0].toUpperCase()+v.substr(1).toLowerCase()
})

console.log(capitalize(low( "LOL")))
console.log(capitalize(low( "boy")))
//capitalize(lower( "LOL" ))


