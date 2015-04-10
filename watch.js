var nodemon = require('nodemon');

var example = process.env.npm_package_config_example;

nodemon({
    exec: 'npm start --es6:example=' + example,
    watch: ['js']
});
