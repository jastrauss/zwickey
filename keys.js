$(document).ready( initialize );
$(document).keydown( keyHandler );

var colors = ["red","green","blue"];
	

function initialize() {
	for ( var i = 0; i < 3; i++) {
		var elem = $(".outer div:nth-child("+(i+1)+")");
		elem.addClass(colors[i]);
		elem.addClass("rounded");
	}
	
	verticalArrows();
	reset();
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
	if ( select>=1 && select<=3 ) {
		var self = $(".level");
		$(".level > div:nth-child("+(select)+")").addClass("level");
		self.removeClass("level");
		//
		if ( $(".level").children().length==0 )
		{
			$("#text").html($("#text").html()+$(".level").text());
			reset();
		}
		else
		{
			horizontalArrows();
		}
	}
	else if ( select==4 ) {
		var undo = $(".level");
		var parent = undo.parent();
		if ( !undo.hasClass("outer") )
		{
			parent.addClass("level");
			undo.removeClass("level");
			horizontalArrows();
		}
		else
		{
			$(".outer").addClass("level");
			undo.removeClass("level");
		}
	}
}