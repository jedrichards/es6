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

## Table of contents

- [Arrow functions](#arrow-functions)

## Arrow functions

### Description

Arrow functions are a concise function syntax, and their `this` value is lexically bound to their enclosing scope.

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
```

> The arrow function's `this` value is bound to the enclosing scope, so no more need for `var self = this`.

#### Concise functional iteration and mapping

```js
var lengths = ['one', 'two', 'three'].map(s => s.length);
console.log(lengths); // [3, 3, 5]
```

> Arrow functions can be used to write iterators and map functions quite concisely.

## Let

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

## Const

### Description

The `const` keyword works much the same as the `let` keyword in that it declares a new variable only within the current block. The difference being that the value of a `const` variable may not change.

### Examples

#### Read only const

```js
const foo = 'foo';
foo = 'bar' // Error, foo is read only
```

#### Constant reference

```js
const a = [];
a.push('foo');
```

> The above code does produce an error, since the `const` keyword only safeguards the pointer to the value, not the value itself, which may change.
