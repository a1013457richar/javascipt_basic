let company = { // the same object, compressed for brevity
    sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
    development: {
      sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
      internals: [{name: 'Jack', salary: 1300}]
    }
  };


function sumSalaries(department){
    if(Array.isArray(department)){
        return department.reduce((pre,current)=>pre+current.salary,0)
    }
    else{
        // recursively call for subdepartments, sum the results
        let sum=0
        for (let sub of Object.values(department)){
            sum +=sumSalaries(sub)
        }
        return sum
    }
}

console.log(sumSalaries(company))