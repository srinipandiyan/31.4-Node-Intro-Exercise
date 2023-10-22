const fs = require('fs')
const process = require('process')

function cat(path) {
    fs.readFile(`${path}`, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    process.exit(1);
    });
}

let args = process.argv;

args.slice(2).forEach( val => { 
    if(!val.startsWith('http')){
        cat(val)
    } 
}); 

module.exports = cat;