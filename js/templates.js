function foo (literals,...substitions) {
    console.log(literals);
    console.log(substitions);
    return 'foo';
}

var name = "Billy";
var born = 1992;
var now = () => new Date().getFullYear();

var message = foo`${name} is ${now()-born} years old`;

console.log(message);
