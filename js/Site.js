//all global variables here. all global vars will be in ALL_CAPS_WITH_UNDERSCORE
//we want a constant standard size for the foreground and banner, and then it should
//stretch beyond that if space allows. Also need to detect mobile. 
var FORE_WIDTH = 600; // the width will always be the same, regardless of resize
var MIN_HEIGHT = 600; // the height of the foreground will change passed this value

//this function will have all functions to control the site and other objects.
function site(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.canvas.height = window.innerHeight;
	this.canvas.width = window.innerWidth;
	
	this.background = new background();
	this.foreground = new foreground();
	this.banner = new banner();
	
	this.draw = draw;
	function draw(){
		//resize the canvas
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;
		
		/* 
			order of drawing matters.
			1) Background
			2) foreground
			3) banner
		*/	
		this.background.draw(this.ctx);
		this.foreground.draw(this.ctx);
		this.banner.draw(this.ctx);
	}
}