//initialization for my personal site
var RubyJacket;

var background = new Image();
//background.src = 'img/background/London_train_station.jpg';
background.src = 'img/background/Norway.jpg';

var profile = new Image();
profile.src = 'img/profile.jpg';

function init(){

	var mainText = ["     This webpage is built using only standard JavaScript and HTML5, specifically utilizing the canvas tag. Nearly every element is drawn using a combination of canvas vectors and imported images controlled completely by JavaScript. While it may not adhere to the HTML programming guidelines, I wanted to show off some of the power of the canvas as well of some of the tricks I've learned while programming the user interface for Swoop Search.", 
	"","     I am currently studying Computer Engineering and Computer Science at the University of Wisconsin - Madison, and I am also working on a software startup called Swoop Search, where I've been in charge of most of the JavaScript programming including demo sites for presentations for potential partners and investors.",
	"","     I'm interested in continuing to learn about web design and programming, as well as more process intensive coding like image processing. I primarily program in C, Matlab, and JavaScript, but also know various other languages and software packages.",
	"","     The code for this site can be found on my github page, along with my other projects I've worked on in my college years. Links to my social media pages, resume, portfolio, and github profile can be found on the top banner."];

	var canvas = document.getElementById("canv");
	
	RubyJacket = new Site(canvas);
	
	RubyJacket.background.setPrimaryColor({r:200,g:255,b:255});
	RubyJacket.background.setSecondaryColor({r:255,g:255,b:255});
	RubyJacket.background.setImage(background);
	
	RubyJacket.banner.setPrimaryColor({r:0,g:0,b:30});
	RubyJacket.banner.setSecondaryColor({r:30,g:30,b:60});
	
	//make the pages;
	RubyJacket.setMain(new mainPage(profile, mainText));
	RubyJacket.setResume();
	RubyJacket.setGithub();
	RubyJacket.setPortfolio();
	RubyJacket.setSocial();
	RubyJacket.setBannerLinks();
	RubyJacket.setActive(RubyJacket.main);
	
	
	RubyJacket.foreground.setPrimaryColor({r:0,g:0,b:30});
	RubyJacket.foreground.setSecondaryColor({r:30,g:30,b:60});
	
	RubyJacket.draw();
	
	window.onresize=function(){RubyJacket.draw()};
	
	RubyJacket.canvas.addEventListener("mousedown", function () {
        mouseStart(event, RubyJacket);
    }, false);

    RubyJacket.canvas.addEventListener("touchstart", function () {
        touchStart(event, RubyJacket);
    }, false);

    document.body.addEventListener("mouseup", function () {
        mouseEnd(event, RubyJacket);
    }, false);

    document.body.addEventListener("touchend", function () {
        touchEnd(event, RubyJacket);
    }, false);

    document.body.addEventListener("touchcancel", function () {
        touchEnd(event, RubyJacket);
    }, false);
}