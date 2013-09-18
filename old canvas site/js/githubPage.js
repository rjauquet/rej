function githubPage(){

	//currently just redirects to github
	
	this.linkText = "https://github.com/rjauquet";
	
	this.draw = draw;
	function draw(ctx){
		window.location = this.linkText;
	}
}