var assert = require('assert');

// Simple

var add = (a,b) => a+b;

assert.equal(add(1,1),2);

// Single arg

var odd = n => n % 2;

assert.equal(odd(2),false);
assert.equal(odd(3),true);
console.log(Math.random());
// Lexical this

function TimeoutTest () {
    this.count = 0;
    setTimeout(() => this.count++, 100);
    setTimeout(() => assert.equal(this.count,1), 200);
}

var timeoutTest = new TimeoutTest();

// Map

var lengths = ['one', 'two', 'three'].map(s => s.length);
assert.deepEqual(lengths, [3, 3, 5]);
