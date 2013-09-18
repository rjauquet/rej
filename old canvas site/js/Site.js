//all global variables here. all global vars will be in ALL_CAPS_WITH_UNDERSCORE
//we want a constant standard size for the foreground and banner, and then it should
//stretch beyond that if space allows. Also need to detect mobile. 
var FORE_WIDTH = 900; // the width will always be the same, regardless of resize
var FORE_HEIGHT = 600;
var MIN_HEIGHT = 600; // the height of the foreground will change passed this value
var BANNER_HEIGHT = 100;

//these are not constants
var FORE_POS = {
	x: 0,
	y: BANNER_HEIGHT + 30
};


var TEXT_STYLE = {
	LINE_HEIGHT: 20,
	FONT: 'Calibri',
	TEXT_SIZE: 17,
	COLOR: { R:255,G:255,B:255 },
	BASE_LINE: 'top'
}

//this function will have all functions to control the site and other objects.
function Site(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	
	this.canvas.height = window.innerHeight;
	this.canvas.width = window.innerWidth;
	
	FORE_POS.x = this.canvas.width/2 - FORE_WIDTH/2;
	
	this.background = new Background();
	this.foreground = new Foreground();
	this.banner = new Banner(this.canvas.width,BANNER_HEIGHT);
	
	this.main = null;
	this.social = null;
	this.github = null;
	this.portfolio = null;
	this.resume = null;
	
	this.setSocial = setSocial;
	function setSocial(){
		this.social = new socialPage();
	}
	
	this.setGithub = setGithub;
	function setGithub(){
		this.github = new githubPage();
	}
	
	this.setPortfolio = setPortfolio;
	function setPortfolio(){
		this.portfolio = new portfolioPage();
	}
	
	this.setResume = setResume;
	function setResume(){
		this.resume = new resumePage();
	}
	
	this.setMain = setMain;
	function setMain(main){
		this.main = main;
		this.banner.title.page = this.main;
	}
	
	this.setActive = setActive; 
	function setActive(page){
		this.foreground.active = page;
	}
	
	this.setBannerLinks = setBannerLinks;
	function setBannerLinks(){
		this.banner.links = [new Link("Resume",0,this.resume),new Link("Github",1,this.github), new Link("Portfolio",2,this.portfolio), new Link("Social",3,this.social)];
	}
	
	this.social = null;
	this.github = null;
	this.portfolio = null;
	this.resume = null;
	
	this.draw = draw;
	function draw(){
		//clear the canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    	this.ctx.beginPath();
    	
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