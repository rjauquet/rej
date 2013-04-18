function banner(length,height){
	this.title = new Title();
	this.links = [];
	this.color = {r:0,g:0,b:0};
	this.height = height;
	this.length = length;
	
	this.draw = draw;
	function draw(ctx){
		
	}
	
	this.addLink = addLink;
	function addLink(src,display){
		//display is either text or an image, must check here
	}
	
	
}