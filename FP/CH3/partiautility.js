function ajax(url,data,callback) {
    // ..
}

function getPerson(data,cb) {
    ajax( "http://some.api/person", data, cb );
}

function getOrder(data,cb) {
    ajax( "http://some.api/order", data, cb );
}

function getCurrentUser(cb) {
    getPerson( { user: CURRENT_USER_ID }, cb );
}

function partial(fn,...presetArgs) {
    return function partiallyApplied(...laterArgs){
        return fn( ...presetArgs, ...laterArgs );
    };
}

var getPerson = partial( ajax, "http://some.api/person" );
var getPerson = function partiallyApplied(...laterArgs) {
    return ajax( "http://some.api/person", ...laterArgs );
};

//等於說是先進行
/*

return function partiallyApplied(...laterArgs){
        return fn( ...presetArgs, ...laterArgs );
    };


return function partiallyApplied(...laterArgs){
        return ajax( "http://some.api/person", ...laterArgs );
    };


*/ 



var getCurrentUser = partial( getPerson, { user: CURRENT_USER_ID } );


var getCurrentUser = function outerPartiallyApplied(...outerLaterArgs){
    var getPerson = function innerPartiallyApplied(...innerLaterArgs){
        return ajax( "http://some.api/person", ...innerLaterArgs );
    };

    return getPerson( { user: CURRENT_USER_ID }, ...outerLaterArgs );
}


//如果要全部都加上三的話


