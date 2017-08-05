/*
* This cli tool is a helper to 
* - generate markdown pages from json
* - to add new records to words.json
*/

const file = process.argv[2] || './words.json';
const title = process.argv[3] || 'Words';
const output = process.argv[4] || 'README.md'
const words = require(file);

let md = '##' + title + '\n\n';

words.map( x => {
  md += `- [${x.word}](${x.link}) : ${x.description}`;
  if (x.sample) md += `\n  - ${x.sample}`;
  md += '\n';
});

console.log(md);

