var index = 0;
var words = [];
var months = ['German', 'Turkish', 'English'];

var random = true;

for (var mi in months) {
  var m = months[mi];
  document.getElementById('nav_sections').innerHTML += '<a class="' + m + '" onclick="loadSection(\'' + m + '\')" href="#">' + m + '</a>';
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

var loadSection = function(lang) {
  var file = "../" + lang + "/words.json";
  $('#nav_sections a').removeClass('active');
  $('#nav_sections a.' + lang +'').addClass('active');
  words = [];
  document.getElementById('container').innerHTML = '';
  loadJSON(file, function(response) {
    console.log('data fetched', file);
    var data = JSON.parse(response);
    var data = random ? shuffle(JSON.parse(response)) : JSON.parse(response);

    var count = data.length;
    $('#display .total').html(count)
    $('#display .index').html(0)
    for (var i in data) {
      words.push(render(data[i]));
    }
    document.getElementById('container').innerHTML += words[0];
  });
};



// array shuffle utility function
 // https://github.com/coolaj86/knuth-shuffle
 var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }
   return array;
 }

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
tpl += '<section class="front">{{word}}';
tpl += '<detail class="front">{{pronounciation}}</detail></section>';
tpl += '<section class="back">{{description}}</section>';
tpl += '</label>';
tpl += '<div class="nav"><a id="previous" onclick="prev()">&#x2039; prev</a><a id="next" onclick="next()">next &#x203A;</a></div>'
tpl += '</article>';

var render = function(options) {
  return tpl.replace(
    /(\{\{)(.*?)(\}\})/g,
    (match, _1, _2, _3) => options[_2]
  );
}
var init = function(file) {
  console.log('Init app');
  loadSection('German');
}
