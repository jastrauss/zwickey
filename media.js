var vids = [];
var populateAutocomplete;
var slots=0;

$(function() {

var parseXML = function(data) { 

  $xml = $( data );
  $title = $xml.find( "feed" ).find("entry");

  vids = [];

  $title.each(function() {
      title = $(this).find("title").text();
      // url = $(this).find("media:group").find("media:player").attr("url");
      url_object = $(this).find("link")[0];
      url = $(url_object).attr("href");
      temp = [title, url];
      vids.push(temp);
  });

}

var queryYoutube = function(word) {
  $.get("https://gdata.youtube.com/feeds/api/videos", {'q':word, 'max-results':"8"}, 
    function(data) { parseXML(data); }
  );
}

var makeACDiv = function() {
  // take vids and make divs and put in ac box
  $('#autocomplete').html('');
  for (var i=0; i<vids.length; i++) {
    var did = i+3;
    $('#autocomplete').append('<div id="'+did+'"><div class="results results_black" >'+vids[i][0]+'</div></div>');
  }  
  slots = 2 + vids.length;
};

populateAutocomplete = function(word) {
  queryYoutube(word);
  makeACDiv();
}
  
})
