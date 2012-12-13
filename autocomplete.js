// autocomplete
var insert;
var cursor_left, cursor_right;
var textBoxFocus, textBoxOffFocus;
var autocompleteFocus, autocompleteOffFocus;
var autocompleteUp, autocompleteDown;
var ac_cursor = 0;
var ac_kids;
var fullword;

$(function() {

var getMatchingMovies = function(word, movies) {
  var results = new Array();
  
  for (var i=0; i<movies.length; i++) {
    var lower_word = movies[i].toLowerCase()
    // if (lower_word.indexOf(word.toLowerCase()) > -1) { // match anywhere in the string
    if (lower_word.indexOf(word.toLowerCase()) == 0) { // prefix matching
      results.push(movies[i]); 
    }
  }
  return results;
};

// gets the autocomplete results and puts them in the div
var populateDiv = function (word) {
  $('#autocomplete').html('');
  var matching_movies = getMatchingMovies(word, movies_db);
  for (var i=0; i<=8; i++) {
    if (matching_movies[i]) {
      $('#autocomplete').append('<div class="results results_black">'+matching_movies[i]+'</div>');
    }
  }  
};

var cursor = 0;
var kids = $('#letterbox').children();
fullword = new Array();

insert = function (letter) {
  var son = kids[cursor];
  $(son).html(letter).removeClass('bottom_red').addClass('bottom_black');
  fullword[cursor] = letter;
  cursor = (cursor + 1) % kids.length;
  var nextson = kids[cursor];
  $(nextson).removeClass('bottom_black').addClass('bottom_red');
  populateDiv(fullword.join(''));
}

cursor_right = function() {
  var son = kids[cursor];
  $(son).removeClass('bottom_red').addClass('bottom_black');
  cursor = (cursor + 1) % kids.length;
  var nextson = kids[cursor];
  $(nextson).removeClass('bottom_black').addClass('bottom_red');
}
cursor_left = function() {
  var son = kids[cursor];
  $(son).removeClass('bottom_red').addClass('bottom_black');
  cursor = (cursor - 1 + kids.length) % kids.length;
  var nextson = kids[cursor];
  $(nextson).removeClass('bottom_black').addClass('bottom_red');
}

focus_first = function() {
    var son = kids[cursor];
    $(son).removeClass('bottom_red').addClass('bottom_black');
    cursor = 0;
    var nextson = kids[cursor];
    $(nextson).removeClass('bottom_black').addClass('bottom_red');
}

textBoxFocus = function () {
  $('#letterbox').removeClass('box_black').addClass('box_red');
}

textBoxOffFocus = function () {
  $('#letterbox').removeClass('box_red').addClass('box_black');
}


// Autocomplete Functionality

autocompleteFocus = function () {
  $('#autocomplete').removeClass('box_black').addClass('box_red');
  ac_kids = $('#autocomplete').children();
  var ac_son = ac_kids[ac_cursor];
  $(ac_son).removeClass('results_black').addClass('results_red');
  
}

autocompleteOffFocus = function () {
  $('#autocomplete').removeClass('box_red').addClass('box_black');
  $(ac_kids[ac_cursor]).removeClass('results_red').addClass('results_black');
}

autocompleteDown = function () {
  var ac_son = ac_kids[ac_cursor];  
  $(ac_son).removeClass('results_red').addClass('results_black');
  ac_cursor = (ac_cursor+1) % ac_kids.length;
  $(ac_kids[ac_cursor]).removeClass('results_black').addClass('results_red');
}

autocompleteUp = function () {
  $(ac_kids[ac_cursor]).removeClass('results_red').addClass('results_black');
  ac_cursor = (ac_cursor-1+ac_kids.length) % ac_kids.length;
  $(ac_kids[ac_cursor]).removeClass('results_black').addClass('results_red');
}

});
