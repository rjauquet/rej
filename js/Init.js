//initialization for my personal site
var RubyJacket;
function init(){
	var canvas = document.getElementById("canv");
	
	RubyJacket = new Site(canvas);
	
	RubyJacket.background.setPrimaryColor({r:200,g:255,b:255});
	RubyJacket.background.setSecondaryColor({r:255,g:255,b:255});
	
	RubyJacket.banner.setPrimaryColor({r:0,g:0,b:150});
	RubyJacket.banner.setSecondaryColor({r:30,g:30,b:180});
	
	RubyJacket.foreground.setPrimaryColor({r:100,g:100,b:100});
	RubyJacket.foreground.setSecondaryColor({r:150,g:150,b:150});
	
	RubyJacket.draw();
	
	window.onresize=function(){RubyJacket.draw()};
}