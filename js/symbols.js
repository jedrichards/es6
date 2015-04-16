var firstName = Symbol('first name');

console.log(firstName);

var o = {
  [firstName] () {
    return 'Jed';
  }
};

console.log(o[firstName]());

var it = [1,2,3][Symbol.iterator]();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
