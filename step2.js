const cat = require('./step1')
const axios = require('axios')

async function webCat(url) {
    try {
      let resp = await axios.get(url);
      console.log(resp.data);
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
}

let args = process.argv;

args.slice(2).forEach( val => { 
    if (val.startsWith('http')) {
        webCat(val)
    } else {
        cat(val)
    }
});