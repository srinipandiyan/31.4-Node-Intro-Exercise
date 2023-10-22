const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, output) {
    if (out) {
      fs.writeFile(output, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${output}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
}
  
async function webCat(url, output) {
    try {
      let resp = await axios.get(url);
      handleOutput(resp.data, output);
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
}

function cat(path, output) {
    fs.readFile(`${path}`, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading to ${path}: ${err}`);
        process.exit(1);
    }
    handleOutput(data, output);
    });
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}