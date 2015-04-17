var firstName = Symbol('first name');

console.log(firstName);

var o = {
  [firstName] () {
    return 'Jed';
  }
};

console.log(o[firstName]());
