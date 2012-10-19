
// This script will inline the mustache templates
// Based on: https://gist.github.com/3498183
// Author: Miller Medeiros


// ---


var _fs = require('fs');

var SOURCE_NAME = 'schizo.js';
var FILE_ENCODING = 'utf-8';


// ---


// $1 = templateStart
// $2 = content
// $3 = templateEnd
var _reInc = /(^\s*\/\/\s*>\s*templateStart\s*$)([\s\S]*?)(^\s*\/\/\s*>\s*templateEnd\s*$)/gm;



var _templates = interpolate( '    var _template = "{{schizo}}";\n    var _brokeTemplate = "{{broke}}";', {
    schizo : getTemplate('schizo'),
    broke : getTemplate('broke')
});




var _data = readFile(SOURCE_NAME).replace(_reInc, '$1\n'+ _templates +'\n$3');
_fs.writeFileSync(SOURCE_NAME, _data, FILE_ENCODING);

console.log('updated: '+ SOURCE_NAME);



// ---


// borrowed from amd-utils/string/interpolate
function interpolate(template, data, regexp){
    function replaceFn(match, prop){
        return (prop in data)? data[prop] : '';
    }
    // mustache-like syntax
    return template.replace(/\{\{([\-_\w]+)\}\}/g, replaceFn);
}


function readFile(fileName){
    return _fs.readFileSync(fileName).toString();
}

function getTemplate(id){
    return readFile(id + '.mustache')
        .replace(/[\n\r]+/g, '\\n') // remove line breaks
        .replace(/\s{2,}/g, ' ') // remove multiple spaces
        .replace(/"/g, '\\"'); // escape quotes
}

