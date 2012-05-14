$(document).ready( initialize );
$(document).keydown( keyHandler );

var colors = ["red","green"];
var counter = 0;
var step = 0;
var password_mode = false;
var name = "";
var moviename = "";
var password = "";
	

function initialize() {
	for ( var i = 0; i < 2; i++) {
		var elem = $(".outer div:nth-child("+(i+1)+")");
		elem.addClass(colors[i]);
		elem.addClass("rounded");
	}
	
	verticalArrows();
	reset();
	
	showStep();
}

function reset() {
	var lvl = $(".level");
	while (!lvl.hasClass("outer"))
		lvl = lvl.parent();
	
	$(".outer div").removeClass("level");
	lvl.addClass("level");
	
	horizontalArrows();
}

function verticalArrows() {
	var arrows = $("div .arrow");
	for ( var i = 0; i < arrows.length; i++ ) {
		var arr = $(arrows[i]);
		var elem = $(".level > div:nth-child("+(i+1)+")");
		var pos = elem.position();
		var my = pos.top-70;
		arr.css("top",my+"px");
	}
}

function horizontalArrows() {
	var arrows = $("div .arrow");
	for ( var i = 0; i < arrows.length; i++ ) {
		var arr = $(arrows[i]);
		var elem = $(".level > div:nth-child("+(i+1)+")");
		var pos = elem.offset();
		var mx = pos.left+elem.width()/2-arr.width()/2;
		arr.css("left",mx+"px");
	}
}

function keyHandler( e )
{
	var code = -1;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	
	var select = code-36;	
	if(code == 13) {
		showStep();
	}
	else if ( (select==1 || select==3) && counter < 3 ) {
		if ( select==3 ) select=2;
		var self = $(".level");
		$(".level > div:nth-child("+(select)+")").addClass("level");
		self.removeClass("level");
		//
		if ( $(".level").children().length==0 )
		{
			var txt = $(".level").text();
			if ( txt=='del' )
				$("#text").html($("#text").html().substring(0,$("#text").html().length-1));
			else if ( passwordmode == true ){
				password = password + txt;
				$("#text").html($("#text").html()+"*");
			}
			else if ( txt=='space' )
				$("#text").html($("#text").html()+" ");
			else
				$("#text").html($("#text").html()+txt);
		
    	reset();

      // autcomplete shenanigans
      if (step == 3) {
        moviename = $('#text').text();
        populateAutocomplete(moviename);
      }
      
		}
		else
		{
			horizontalArrows();
		}
	}
	else if ( select==4 || select==2 ) {
		e.preventDefault();
		
		var undo = $(".level");
		var parent = undo.parent();
		if ( !undo.hasClass("outer") && counter < 3)
		{
			parent.addClass("level");
			undo.removeClass("level");
			horizontalArrows();
		}
		else
		{
			if(select==4) // down arrow
			{
				counter = (counter+1)%(slots+3); // num divs
			}
			else if(select==2) // up arrow
			{
				if(counter == 0)
					counter = slots+2;
				else
					counter = (counter-1)%(slots+3); // num divs
			}
			//$(".outer").addClass("level");
			var id = "#"+counter;
			$(id).addClass("level");
			undo.removeClass("level");
		}
	}
}

function showStep() {
	step++;
    var prompt = document.getElementById("prompt"); 
    var ac = document.getElementById("autocomplete");
    if (step == 1) {
        prompt.innerHTML = "[Step 1/3] Enter your username:";
        ac.style.visibility = "hidden";
        passwordmode = false;
    }
    else if (step == 2 && $('#text').text()=="") {
    	step--;
    	alert("Username must have at least one character!");
    } else if (step == 2) {
    	name = $('#text').text();
    	prompt.innerHTML = "[Step 2/3] (User: " + name + ") Enter your password:";
    	ac.style.visibility = "hidden";
        passwordmode = true;
        $('#text').html('');
    } else if (step == 3) {
        prompt.innerHTML = "[Step 3/3] Enter a movie:";
        ac.style.visibility = "visible";
        passwordmode = false;
        $('#text').html('');
    } else {
        if ( counter < 3 ) { // the user isn't in the autocomplete
          moviename = $('#text').text();
          location.href = 'http://www.youtube.com/results?search_query=hi'+moviename
        } else { // get the result from autocomplete
          var movie_num = counter-3;
          var url = vids[movie_num][1];
          url = url.replace('watch?v=','v/')+'&autoplay=1' // play the youtube video fullscreen
          location.href=url;
        }

    }
}
