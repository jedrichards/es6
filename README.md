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

Arrow functions have a concise function syntax, and their `this` value is lexically bound to their enclosing scope.

```js
var add = (a,b) => a+b;
add(1,1); // 2
```
> When the arrow function body is a single expression it is implicitly returned.

```js
var odd = n => n % 2;
odd(2); // 0
```
> When the arrow function has only one argument the parens can be omitted.

```js
var ran = () => Math.random();
ran() // 0.265058204298839
```
> When the arrow function has no arguments you need the empty `()`.

```js
var transform = s => {
  s = s.toUpperCase();
  return s + s;
}
transform('a'); // AA
```
> When the arrow function body has multiple statements then `{}` are required.

```js
function Counter () {
  this.count = 0;
  setInterval(() => this.count++, 1000);
}
```
> The arrow function's `this` value is bound to the enclosing scope, so no more need for `var self = this`.

```js
var lengths = ['one', 'two', 'three'].map(s => s.length);
// [3, 3, 5]
```
> Arrow functions can be used to write iterators and map functions quite concisely.