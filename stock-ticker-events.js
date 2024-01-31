var server = connectToServer();

var formatDecimal = unboundMethod( "toFixed" )( 2 );
//pipe從左到右調用函數
var formatPrice = pipe( formatDecimal, formatCurrency );
var formatChange = pipe( formatDecimal, formatSign );
var processNewStock = pipe( addStockName, formatStockNumbers );
var observableMapperFns = [ processNewStock, formatStockNumbers ];
var makeObservableFromEvent = curry( Rx.Observable.fromEvent, 2 )( server );
var mapObservable = uncurry( map );

var stockEventNames = [ "stock", "stock-update" ];

var [ newStocks, stockUpdates ] = pipe(
	map( makeObservableFromEvent ),
	curry( zip )( observableMapperFns ),
	map( spreadArgs( mapObservable ) )
)
( stockEventNames );


// *********************

function addStockName(stock) {
	return setProp( "name", stock, stock.id );
}//stock:{name:stock.id}
//function setProp(name,obj,val) {
// 	var o = Object.assign( {}, obj );
// 	o[name] = val;
// 	return o;
// }

function formatStockNumbers(stock) {
	var stockDataUpdates = [
		[ "price", formatPrice( stock.price ) ],
		[ "change", formatChange( stock.change ) ]
	];
	//reduce接受三個參數，第一個參數是一個函數，第二個參數是一個初始值，第三個參數是一個數組

	return reduce( function formatter(stock,[propName,val]){
		return setProp( propName, stock, val );
	} )
	( stock )//stock是初始值
	( stockDataUpdates );//stockDataUpdates是數組
}

function formatSign(val) {
	if (Number(val) > 0) {
		return `+${val}`;
	}
	return val;
}

function formatCurrency(val) {
	return `$${val}`;
}


