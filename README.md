# ES6

> ES6 feature documentation and examples

Run all the examples,

```sh
npm start
```

Run a particular example,

```sh
npm start --es6:example=arrow-functions
```

Watch an example and re-run when it changes,

```sh
npm run watch --es6:example=arrow-functions
```

## Features

- [Arrow function](#arrow-function)
- [Let](#let)
- [Const](#const)
- [Modules](#modules)
- [Template strings](#template-strings)
- [Classes](#classes)
- [Object literal enhancements](#object-literal-enhancements)
- [Destructuring](#destructuring)

## Arrow function

### Description

Arrow functions are a concise anonymous function syntax, and their `this` value is lexically bound to their enclosing scope.

### Examples

#### Single expression

```js
var add = (a,b) => a+b;
add(1,1); // 2
```

> When the arrow function body is a single expression it is implicitly returned.

#### Single argument

```js
var odd = n => n % 2;
odd(2); // 0
```
> When the arrow function has only one argument the parens can be omitted.

#### No arguments

```js
var ran = () => Math.random();
ran() // 0.265058204298839
```

> When the arrow function has no arguments you need the empty parens `()`.

#### Multiple statements

```js
var foo = s => {
  s = s.toUpperCase();
  return s + s;
}

foo('a'); // AA
```

> When the arrow function body has multiple statements then `{ }` are required.

#### Lexical `this`

```js
function Counter () {
  this.count = 0;
  setInterval(() => this.count++, 1000);
}

var counter = new Counter();
```

> The arrow function's `this` value is bound to the enclosing scope, so no more need for `var self = this`.

#### Concise functional iteration and mapping

```js
var lengths = ['one', 'two', 'three'].map(s => s.length);
console.log(lengths); // [3, 3, 5]
```

> Arrow functions can be used to write iterators and map functions quite concisely.

## `let`

### Description

The `let` keyword declares a variable that is strictly scoped to the current block, statement or expression where it is defined. This is in contrast to `var` declarations which are hoisted right up to the enclosing function's scope.

Examples of blocks that `let` declarations are scoped to include `if` statements, `for` loops and naked `{}` blocks.

In general `let` may be used in place of `var` in most scenarios, with the benefit of tightening up the code with a more focussed piece of syntax. The phrase "`let` is the new `var`" is false however, since there will remain many instances where the more liberal scoping of `var` is the correct choice.

### Examples

#### Scoped to block

```js
var a = 1;

{
  let b = 2;
}

console.log(a); // 1
console.log(b); // ReferenceError, b is undefined
```

> Attempting to access `b` outside the block it's declared in will throw an error. Note the use of a naked `{}` block in this example to arbitrarily create a new scope.

#### Hoisting and the TDZ

```js
{
  console.log(foo); // 'foo'
  console.log(bar); // ReferenceError, bar is in the TDZ
  var foo = 'foo';
  let bar = 'bar';
}
```

> Unlike `var` declarations which are hoisted to the top of the enclosing scope `let` declarations may only be accessed after they've been declared. `let` variables are said to be in the scope's TDZ (temporal dead zone) before they've been declared, and any attempt to read or write them beforehand will result in an error. :warning: Most transpilers don't handle this behaviour fully to-spec, so the above example will probably only error in a native ES6 environment.

#### New scopes in loops

```js
for (var i=1; i<=5; i++) {
    setTimeout(function(){
        console.log(i);
    }, i*100);
}
// 6,6,6,6,6

for (let i=1; i<=5; i++) {
    setTimeout(function(){
        console.log(i);
    }, i*100);
}
// 1,2,3,4,5
```

> When `let` is used in a `for` loop header a new `i` is scoped for each iteration of the loop. This makes writing async code in loops more intuitive since the closure doesn't need to be created manually. This can also help with tasks such as applying click event handlers in a loop.

#### Implicit scope creation

```js
if ( foo ) {
    // We're in the same scope as outside the 'if'
}

if ( foo ) {
    // We're in a new scope
    let a = 1;
}
```

> Using `let` within an `if` block implicitly creates a new scope. This is a hazard of using `let`. The new scope is easily spotted in the simple example above, but when code becomes more complicated hunting for new scopes created by `let` could become a cognitive burden. A rule of thumb is to place `let` declarations at the top of their enclosing block to clearly signpost their use and also avoid being bitten by the TDZ.

## `const`

### Description

The `const` keyword works much the same as the `let` keyword in that it declares a new variable only within the current block. The difference being that the value of a `const` variable may not change.

### Examples

#### Read only

```js
const foo = 'foo';
foo = 'bar' // Error, foo is read only
```

#### References

```js
const a = [];
a.push('foo');
```

> The above code does produce an error, since the `const` keyword only safeguards the pointer to the value, not the value itself, which may change.

## Modules

### Description

ES6 modules will standardise module loading in JavaScript with a concise syntax that removes the need for the competing CommonJS, AMD and UMD module standards and libraries.

Since ES6 modules are part of the language their structure can be statically analysed (at compile time), which is in contrast to the current library-based module loaders which can only reveal their structure by running the code. This paves the way for better static analysis tools, static types and macros in future JavaScript.

ES6 modules use a declarative syntax for importing and exporting, support cyclic dependencies and support an async programmatic loading API for dynamically/conditionally loading modules at runtime.

Future browser APIs will be exposed as ES6 modules instead of global variables, properties of `navigator` or object namespaces such as `Math` and `JSON`.

### Examples

#### Named exports

Consider the module `math`,

```js
// math.js
export const PI = Math.PI;
export function add(a,b) => a+b;
export function subtract(a,b) => a-b;
```

And a module `app`, which consumes the `math` module,

```js
// app.js
import {PI,add,subtract} from 'math';
PI; // 3.141592653589793
add(1,1); // 2
```

> Named exports can be individually imported and will manifest in the scope of the importing module.

```js
// app.js
import * as math from 'math';
math.add(1,1); // 2
math.subtract(2,1); // 1
```

> All named exports can be imported via the wildcard `*` character, in which case they will populate the supplied object namespace.

```js
// math.js
const PI = Math.PI;
function add(a,b) => a+b;
function subtract(a,b) => a-b;

export {PI,add,subtract};
```

> Named exports can alternatively be declared separately to the object they're exporting.

```js
// math.js
const PI = Math.PI;
function add(a,b) => a+b;
function subtract(a,b) => a-b;

export {subtract as minus};
```

> Exported names can be different from the one used internally to the module.

```js
// app.js
import {subtract as minus} from 'math';
math.minus(2,1); // 1
```

> Imported names can also be changed.

#### Default exports

Modules can indicate a default object to always be imported when no name is supplied.

Default exports are to be favoured over named exports since they simplify module APIs.

Consider the Underscore library refactored as an ES6 module,

```js
// underscore.js
export default {
    each: each
}

export function each (obj,iterator,context) {};
```

And a module `app`, which consumes the `underscore` module,

```js
// app.js
import _ from 'underscore';
```

> When importing the default export directly the `{}` named export syntax is not required.

```js
// app.js
import _,{each} from 'underscore';
```

> The default export can be imported along with any named exports.

#### Module loader API

```js
System
  .import('some-module')
  .then(someModule => {})
  .catch(error => {});
```

> Modules can be loaded dynamically and conditionally via the loader API exposed by `System`. A common use of `System.import` could be to bootstrap a transpiled ES6 app in a `<script>` tag in a ES5-based browser environment.

## Template strings

### Description

ES6 template strings, denoted by backticks rather than single or double quotes, enable multiline strings, expression substitution and tagged templates.

### Examples

#### Multiline

```js
var address = `29 Acacia Road,
Nuttytown,
England`;
```

> All whitespace characters in backtick template strings are preserved, so no extra formatting is required.

#### Expression substitution

```js
var name = "Billy";
var born = 1992;
var now = () => new Date().getFullYear();

var message = `${name} is ${now()-born} years old`;
// "Billy is 23 years old"
```

> Template strings are able to evaluate any expression against their current scope using `${}` syntax. :warning: Be careful when building strings in this way from user input since you may introduce injection vulnerabilities, see tagged templates below for an alternative approach.

#### Tagged templates

Tagged templates provide an abstracted and safer approach to string concatenation with dynamic values.

They work by providing a layer of syntactic sugar over the process of implementing dynamic template generating functions. These functions are referred to as template tags.

```js
function foo (literals,...values) {
    console.log(literals); // ['',' is ',' years old']
    console.log(values); // ['Billy',23]
    return 'foo';
}

var name = "Billy";
var born = 1992;
var now = () => new Date().getFullYear();

var message = foo`${name} is ${now()-born} years old`;
// "foo"
```

> By using the ``func`string`;`` syntax we invoke a template tag, that is a function to be run in order to process a template string. The first argument to the template tag is an array containing the sequence of plain strings, which is followed by the evaluated results of any expressions.

> Template tags could be used by libraries to variously escape user input, strip tags, perform internationalisation or provide any other string-based functionality via an arbitrary DSL.

## Classes

### Description

ES6 classes provide a standardised approach to prototypical inheritance supported by a layer of syntactic sugar built into the language.

The syntax supports inheritance, a concise method syntax, constructor functions, getters and setters, super functions and static properties.

### Example

```js
class Shape {

  constructor (numSides) {
      this.numSides = numSides;
  }

  get sides () {
     return this.numSides;
  }

  describe () {
    return Shape.label() + ' with ' + this.sides + ' sides';
  }

  static label () {
    return 'A shape';
  }
}

class Triangle extends Shape {

  constructor () {
    super(3);
  }

  describe () {
    return super.describe() + ', A.K.A. a triangle';
  }
}

var triangle = new Triangle();
console.log(triangle.describe());
// "A shape with 3 sides, A.K.A. a triangle"
```

## Object literal enhancements

### Description

Object literal syntax has received a number of enhancements.

### Examples

#### Property initialiser shorthand

```js
var foo = 'foo';
var bar = 'bar';

var o = {foo, bar};

console.log(o); // {foo: 'foo', bar: 'bar'};
```

> When a new object literal is created and populated with properties of the same name that exist in the current scope then the above shorthand syntax can be used.

#### Method initialiser shorthand

```js
var o = {
  foo () {
    return 'foo';
  }
};

console.log(o); // {foo: [Function]};
```

> Methods can be declared in object literals using the above shorthand. This syntax is shared with the new `class` constructs.

#### Computed property names

```js
var foo = 'foo';

var o = {
  [foo]: 'bar',
  [new Date().getTime()]: 'baz'
};

console.log(o); // {foo: 'bar', 1428942731913: 'baz'};
```

> Dynamic property names can be used while creating object literals.

#### Native extending/merging/mixin

```js
var o1 = {foo: 'foo'};
var o2 = {bar: 'bar'};
var o3 = {baz: 'baz', foo: 'qux'};

Object.assign(o1, o2, o3); // {foo: 'qux', bar: 'bar', baz: 'baz'}
console.log(o1); // {foo: 'qux', bar: 'bar', baz: 'baz'}
```

> The new `Object.assign` function copies properties and methods from source objects into a target object (the first object in the argument list) and returns the modified object.

## Destructuring

### Description

Destructuring, or "object destructuring assignment syntax" describes the new syntax that enables the extraction and declaration of new variables in the local scope from arbitrarily complex data structures.

```js
var data = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    qux: 'qux'
  }
};

var {foo:newFoo,bar:newBar,baz:{qux:newQux}} = data;

newFoo; // "foo"
newBar; // "bar"
newQux; // "qux"
```

> When destructuring object literal notation syntax is used on the left side of the assignment operation to both describe the target data structure and name the new local variables to be declared.

```js
var data = ['foo','bar',['baz']];

var [foo,bar,[baz]] = data;

foo; // "foo"
bar; // "bar"
baz; // "baz"
```

> Array literal notation syntax can be freely mixed with object literal notation syntax while destructuring.

```js
var data = {
  foo: 'foo',
  bar: 'bar'
};

var {foo,bar} = data;

foo; // "foo"
bar; // "bar"
```

> A shorthand syntax can be used when the desired local variable names are the same as the object keys in the data to be destructured.
