function f (a,b=1,c=()=>{console.log('poop');}) {
  console.log(a,b,c);
}

f();
