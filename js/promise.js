// var promise = new Promise((resolve,reject) => {
//   resolve('yay!');
//   // reject(new Error('Exploded'));
// });

// var promise = Promise.resolve().then(function () {
//   return Promise.reject(new Error('poop!'));
// });
//
// promise.then((x) => console.log('success',x));
// promise.catch((x) => console.log('fail',x));

// var promises = ['foo','bar','baz'].map(value => {
//   return Promise.resolve(value);
// });
//
// Promise.all(promises)
//   .then(values => console.log(values))
//   .catch(error => console.log(error));

// function delay (delay) {
//   return new Promise((resolve,reject) => {
//     setTimeout(() => {
//       resolve(delay);
//     },delay)
//   });
// }
//
// Promise
//   .race([delay(100),delay(200)])
//   .then(value => console.log(value));

function asyncThing (value) {
  return Promise.resolve(value);
}

Promise
  .resolve('foo')
  .then(asyncThing)
  .then(value => console.log(value));
