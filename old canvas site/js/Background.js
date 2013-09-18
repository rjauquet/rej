//I want to do a few different things with the background, but for now, it'll get a color
//and an image  (optional)
function Background(){
	this.color = {
		primary: {r:0,g:0,b:0},
		secondary: {r:0,g:0,b:0}
	};
	this.img = false;
	
	this.draw = draw;
	function draw(ctx){
		if(this.img != false){
			ctx.drawImage(this.img, 0, 0, ctx.canvas.width, this.img.height/ctx.canvas.height+ctx.canvas.height);
		}
		else{
			var grd;
			
			//draw background with gradient fill
			grd = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
			grd.addColorStop(0, 'rgb(' + this.color.primary.r + ',' + this.color.primary.g + ',' + this.color.primary.b + ')');   
			grd.addColorStop(1, 'rgb(' + this.color.secondary.r + ',' + this.color.secondary.g + ',' + this.color.secondary.b + ')');
		
			ctx.fillStyle = grd;
			ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}
	
	//sets both at once (no gradient)
	this.setColor = setColor;
	function setColor(color){
		this.color.primary = color;
		this.color.secondary = color;
	}
	//sets only primary color
	this.setPrimaryColor = setPrimaryColor;
	function setPrimaryColor(color){
		this.color.primary = color;
	}
	
	//sets only secondary color
	this.setSecondaryColor = setSecondaryColor;
	function setSecondaryColor(color){
		this.color.secondary = color;
	}
	
	//get color returns primary
	this.getColor = getPrimaryColor;
	this.getPrimaryColor = getPrimaryColor;
	function getPrimaryColor(){
		return this.color.primary;
	}
	
	this.getSeconaryColor = getSecondaryColor;
	function getSecondaryColor(){
		return this.color.secondary;
	}
	
	this.setImage = setImage;
	function setImage(img){
		//need to make sure it's an image
		this.img = img;
	}
	
	this.getImage = getImage;
	function getImage(){
		return this.img;
	}
}