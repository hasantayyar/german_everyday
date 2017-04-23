const loadJSON = (file, callback) => {
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

const render = (tpl, options) => tpl.replace(
  /(\{\{)(.*?)(\}\})/g,
   (match,_1,_2,_3) => options[_2]
);

let tpl = '<article class="flashcard">';
tpl +='<input id="flashcard-1" type="checkbox" />';
tpl +='<label for="flashcard-1">';
tpl +='<section class="front">{{word}}</section>';
tpl +='<section class="back">{{description}}</section></label></article>';
const init = () => {
  console.log('Init app');
  loadJSON( "/words.json", response => {
    console.log('data fetched');
    let data = JSON.parse(response);
    document.body.innerHTML += render(tpl, data[0]);
  });
}

init();
