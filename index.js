require('babel/register');

var chalk = require('chalk');
var fs = require('fs');

var example = process.env.npm_package_config_example;

if ( example ) {
    run(example);
} else {
    runAll();
}

function run (example) {
    console.log('\n' + chalk.yellow(example) + '\n');
    require('./js/' + example);
}

function runAll () {
    var examples = fs.readdirSync('./js');
    examples.forEach(run);
}
