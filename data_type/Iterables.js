let range = {
    from: 1,
    to: 5
  };

  range[Symbol.iterator] =function(){
    return {
        current:this.from,
        last:this.to,
    
    next(){
        if(this.current<=this.last){
            return {done:false,value:this.current++}
        }else{
            return{done:true}
        }
    }
    }
  }


  for (let num of range) {
    console.log(num)
  }

  //String is iterable

  for(let char of "test"){
    console.log(char)
  }


  let arr1=[1,2,3,4,5]

  let arr2=Array.from(range,num=>num*num)

  console.log(arr2)

  



