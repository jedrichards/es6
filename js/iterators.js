var it = [1,2,3][Symbol.iterator]();

console.log([][Symbol.iterator]);
console.log(it);
console.log(it.next);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

for ( let n of [1,2,3] ) {
  console.log(n);
}

var map = new Map();
map.set('a', 1);
map.set('b', 2);

for (let key of map.values()) {
  console.log(key);
}

function * makeGenerator (x) {
    var y = 2 * (yield (x + 3));
    var z = yield (y / 2);
    return (x + y + z);
}

var it = makeGenerator(2);

console.log(it.next()); // {value:5, done:false}
console.log(it.next(4)); // {value:4, done:false}
console.log(it.next(3)); // {value:13, done:true}
