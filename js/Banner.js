function Banner(width,height){
	this.title = new Title();
	this.links = [];
	this.color = {
		primary: {r:0,g:0,b:0},
		secondary: {r:0,g:0,b:0}
	};
	this.opacity = 1;
	this.shadow = {
		on: {
			bottom: false,
			top: false,
			left: false,
			right: false
		},
		size: 5,
		opacity: 0.5
	};
	this.height = height;
	this.width = width;
	
	this.draw = draw;
	function draw(ctx){
		var grd;
		
		if(this.shadow.on.bottom){
			//draw shadow area
			ctx.fillStyle = 'rgba(0,0,0,' + this.shadow.opacity + ')';
			ctx.fillRect(0, 0, this.width, this.height + this.shadow.size);
		}
		
		//draw background with gradient fill
		grd = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
		grd.addColorStop(0, 'rgb(' + this.color.primary.r + ',' + this.color.primary.g + ',' + this.color.primary.b + ')');   
		grd.addColorStop(1, 'rgb(' + this.color.secondary.r + ',' + this.color.secondary.g + ',' + this.color.secondary.b + ')');
	
		ctx.fillStyle = grd;
		ctx.fillRect (0, 0, this.width, this.height);
	}
	
	this.addLink = addLink;
	function addLink(src,display){
		//display is either text or an image, must check here
		this.links.push(new Link(src,display));
	}
	
	this.addLinks = addLinks;
	function addLinks(links){
		for(link in links){
			//display is either text or an image, must check here
			this.links.push(new Link(link.src,link.display));
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
	
	this.setShadow = setShadow;
	function setShadow(bottom,top,left,right){
		//check to make sure these are all true and false and exist
		//if nothing specified, turn all off;
		this.shadow.on.bottom = bottom;
		this.shadow.on.top = top;
		this.shadow.on.left = left;
		this.shadow.on.right = right;
	}

	this.getShadow = getShadow;
	function getShadow(){
		return this.shadow.on;
	}
	
	this.setOpacity = setOpacity;
	function setOpacity(val){
		if(val > 1 || val < 0){
			return -1;
		}
		else{
			this.opacity = val;
		}
	}
	
	this.getOpacity = getOpacity;
	function getOpacity(){
		return this.opacity;
	}
	
}