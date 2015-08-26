var fs = require('fs');
var toc = require('markdown-toc');


fs.writeFileSync('./README.md',toc.insert(fs.readFileSync('./README.md', 'utf8')));
