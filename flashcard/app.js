const loadJSON = function(file, callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  console.log('Getting data...');
  xobj.onreadystatechange = () => {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

let index = 0;
let words = [];

const refresh = function(){
  document.getElementById('flashcard').remove();
  document.body.innerHTML += words[index];
}

const next = function() {
  if (index === (words.length - 1)) return;
  index++;
  refresh();
}
const prev = function() {
  if(index === 0) return;
  index--;
  refresh();
}

let tpl = '<article id="flashcard">';
tpl +='<input id="flashcard-1" type="checkbox" />';
tpl +='<label for="flashcard-1">';
tpl +='<section class="front">{{word}}</section>';
tpl +='<section class="back">{{description}}</section>';
tpl +='</label>';
tpl +='<div class="nav"><a onclick="prev()">&#x2039; prev</a><a onclick="next()">next &#x203A;</a></div>'
tpl +='</article>';

const render = function(options) {
  return tpl.replace(
  /(\{\{)(.*?)(\}\})/g,
   (match,_1,_2,_3) => options[_2]
  );
}
const init = function(file) {
  console.log('Init app');
  loadJSON( file, response => {
    console.log('data fetched');
    let data = JSON.parse(response);
    for (let i in data) {
      words.push(render(data[i])); 
    }
    document.body.innerHTML += words[0];
  });
}

