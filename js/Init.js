//initialization for my personal site
var RubyJacket;
function init(){
	var canvas = document.getElementById("canv");
	
	var background = new Image();
	background.src = 'img/background/London_train_station.jpg';
	
	var profile = new Image();
	profile.src = 'img/profile.jpg';
	
	RubyJacket = new Site(canvas);
	
	RubyJacket.background.setPrimaryColor({r:200,g:255,b:255});
	RubyJacket.background.setSecondaryColor({r:255,g:255,b:255});
	RubyJacket.background.setImage(background);
	
	RubyJacket.banner.setPrimaryColor({r:130,g:0,b:0});
	RubyJacket.banner.setSecondaryColor({r:180,g:30,b:30});
	
	RubyJacket.foreground.setPrimaryColor({r:200,g:100,b:100});
	RubyJacket.foreground.setSecondaryColor({r:255,g:150,b:150});
	
	
	
	RubyJacket.draw();
	
	window.onresize=function(){RubyJacket.draw()};
}