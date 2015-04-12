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

ES6 template strings, denoted by backticks rather than single or double quotes, enable multiline strings, template literals (expression substitution) and tagged templates.

### Examples

#### Multiline

```js
var address = `29 Acacia Road,
Nuttytown,
England`;
```

> All whitespace characters in backtick template strings are preserved, so no extra formatting is required.

#### Template literals

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

They work by providing a layer of syntactic sugar over the process of implementing dynamic template generating functions.

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
