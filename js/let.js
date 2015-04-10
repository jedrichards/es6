var assert = require('assert');

// Block scoping

for ( var i=0; i<10; i++) {}
for ( let j=0; i<10; i++) {}

assert.equal(i, 10);
assert.equal(typeof j, 'undefined');

// New scope per iteration!

for (let i=1; i<=5; i++) {
    setTimeout(function(){
        // console.log("i:",i);
    },i*1000);
}

// Naked blocks

var a = 1;
let b = 2;

{
  let c = 3;
  assert.equal(b, 2);
}

assert.equal(a, 1);
assert.equal(typeof c, 'undefined');

// TDZ

{
    // console.log(x); // Should throw a ReferenceError, doesn't in transpilers
    let x = 'hey';
}
