function resumePage(){

	//currently just redirects to github
	
	this.linkText = "https://docs.google.com/document/d/19c9M7WngLWABcOtQcgXPrp6zKTqsIaoJ2ScegjpNKs4/edit?usp=sharing";
	
	this.draw = draw;
	function draw(ctx){
		window.location = this.linkText;
	}
}