#!/usr/bin/env node
//include the fs, path modules
var fs = require('fs');
var path = require('path');
var file = './dist/deployFile.js';
var dir2 = './extensions/chrome_ext/js/';

//gets file name and adds it to dir2
var f = path.basename(file);
var source = fs.createReadStream(file);
var dest = fs.createWriteStream(path.resolve(dir2, f));

source.pipe(dest);
source.on('end', function() { console.log('Succesfully copied'); });
source.on('error', function(err) { console.log(err); });
