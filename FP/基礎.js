// 多個參數? 要加 ( )
people.map( (person,idx) => person.name );

// object destructure？需要 ( )
people.map( ({ person }) => person.name );

// 預設值? 需要 ( )
people.map( (person = {}) => person.name );

// return Object? 需要 ( )
people.map( person =>
	({ preferredName: person.name })
);

