var vids = [];
var queryYouTube;

$(function() {

var parseXML = function(data) { 

  $xml = $( data );
  $title = $xml.find( "feed" ).find("entry");

  $title.each(function() {
      title = $(this).find("title").text();
      // url = $(this).find("media:group").find("media:player").attr("url");
      url_object = $(this).find("link")[0];
      url = $(url_object).attr("href");
      vids[title] = url;
  });

}

queryYouTube = function(word) {
  $.get("https://gdata.youtube.com/feeds/api/videos", {'q':wort, 'max-results':"8"}, 
    function(data) { parseXML(data); }
  );
}

  
})
