// Doesn't work in Babel.js yet ...

let target = {};

let handler = {
    get(target, propKey, receiver) {
        console.log('get ' + propKey);
        return 123;
    },
    ownKeys(target) {
        console.log('ownKeys');
        return ['hello', 'world'];
    }
};

let proxy = new Proxy(target, handler);
