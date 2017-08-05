var index = 0;
var words = [];
var months = ['German', 'English'];

for (var mi in months) {
  var m = months[mi];
  document.getElementById('nav_sections').innerHTML += '<a onclick="loadSection(\'../' + m + '/words.json\')" href="#">' + m + '</a>';
}

var loadJSON = function(file, callback) {
  var xobj = new XMLHttpRequest();
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

var loadSection = function(file) {
  words = [];
  document.getElementById('container').innerHTML = '';
  loadJSON(file, function(response) {
    console.log('data fetched', file);
    var data = JSON.parse(response);
    for (var i in data) {
      words.push(render(data[i]));
    }
    document.getElementById('container').innerHTML += words[0];
  });
};

var refresh = function() {
  document.getElementById('flashcard').remove();
  document.getElementById('container').innerHTML += words[index];
}

var next = function() {
  if (index === (words.length - 1)) return;
  index++;
  refresh();
}
var prev = function() {
  if (index === 0) return;
  index--;
  refresh();
}

var tpl = '<article id="flashcard">';
tpl += '<input id="flashcard-1" type="checkbox" />';
tpl += '<label for="flashcard-1">';
tpl += '<section class="front">{{word}}</section>';
tpl += '<section class="back">{{description}}</section>';
tpl += '</label>';
tpl += '<div class="nav"><a onclick="prev()">&#x2039; prev</a><a onclick="next()">next &#x203A;</a></div>'
tpl += '</article>';

var render = function(options) {
  return tpl.replace(
    /(\{\{)(.*?)(\}\})/g,
    (match, _1, _2, _3) => options[_2]
  );
}
var init = function(file) {
  console.log('Init app');
  loadSection('../German/words.json');
}
