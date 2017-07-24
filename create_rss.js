/*
* This cli tool is a helper to generate rss page from words.json
*/

const file = process.argv[2] || './words.json';
const title = process.argv[3] || 'Words';
const output = process.argv[4] || 'rss.xml'
const words = require(file);

let xml = `<title>#{title}<title>\n`;

words.map( x => {
  xml += `<item><title>[${x.word}](${x.link}) : ${x.description}</title></item>\n`;
});

console.log(xml);

