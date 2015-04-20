var map1 = new Map([
  [1,'a'],
  [2,'b'],
  [3,'c'],
  [4,'d']
]);

var map2 = new Map(
  [...map1]
  .filter(([key,value]) => key > 2)
  .map(([key,value]) => [key * 2, value])
);

console.log(map2.get(6));
console.log(map2.get(8));
