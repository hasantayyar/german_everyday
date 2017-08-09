var shuffle=function(r){for(var a,f,n=r.length;0!==n;)f=Math.floor(Math.random()*n),a=r[n-=1],r[n]=r[f],r[f]=a;return r};
var months = ['German', 'Turkish', 'English'];

Vue.component('word-item', {
  props: ['word'],
  template: '<span><input id="flashcard-1" type="checkbox" />\
      <label for="flashcard-1">\
      <section class="front">\
        <div class="card-contents">\
          <h2>{{word.word}}</h2>\
          <h4 class="front">{{word.pronounciation}}</h4>\
        </div>\
      </section>\
      <section class="back">\
        <div class="card-contents">\
          <h2>{{word.description}}</h2>\
        </div>\
      </section>\
      </label></span>'
});

var app = new Vue({
  el: '#container',
  data: {
    index: 0,
    words:
      [ ]
  },
  methods: {
    next: function() { 
      if (this.index >= this.words.lenght ) {
        return;
      }
      this.nav(true);
    },
    prev: function() { 
      if (this.index <= 0) {
        return;
      }
      this.nav(false);
    },
    nav: function(n){
      this.$set(this.words[this.index], 'show', false );
      this.index = n ? this.index + 1 : this.index - 1;
      console.log(this.index);
      this.$set(this.words[this.index], 'show', true );
    }
  }
});

for (var mi in months) {
  var m = months[mi];
  document.getElementById('nav_sections').innerHTML += '<a class="' + m + '" onclick="loadSection(\'' + m + '\')" href="#">' + m + '</a>';
}

var loadSection = function(lang) {
  var file = "../" + lang + "/words.json";
  $('#nav_sections a').removeClass('active');
  $('#nav_sections a.' + lang +'').addClass('active');

  app.words = [];
  app.index = 0;
  let random = $('input[name=random]').is(':checked');

  $.getJSON(file, function(data) {
    console.log('data fetched', file);
    var count = data.length;
    $('#display .total').html(count)
    $('#display .index').html(0);
    let shuffled = random ? shuffle(data) : data;
    shuffled[0].show = true;
    app.words.push(...shuffled)
  });
};

var init = function(lang) {
  console.log('Init app');
  loadSection(lang);
}
