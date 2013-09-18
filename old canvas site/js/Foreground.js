//must pass in the active information to load first
function Foreground(){
	this.color = {
		primary: {r:0,g:0,b:0},
		secondary: {r:0,g:0,b:0}
	};
	
	this.margin = 10;
	this.pos = FORE_POS;
	this.width = FORE_WIDTH;
	this.height = FORE_HEIGHT;
	this.shadow = {
		on: {
			bottom: true,
			top: true,
			left: true,
			right: true
		},
		size: 7,
		opacity: 0.5
	};
	
	this.active = null;
	
	this.draw = draw;
	function draw(ctx){
		var grd;
		
		if((this.shadow.on.left && this.shadow.on.right) && !(this.shadow.on.top && this.shadow.on.bottom)){
			//draw shadow area
			ctx.fillStyle = 'rgba(0,0,0,' + this.shadow.opacity + ')';
			ctx.fillRect(this.pos.x - this.shadow.size, this.pos.y, this.width + 2*this.shadow.size, this.height);
		}
		else if((this.shadow.on.left && this.shadow.on.right) && (this.shadow.on.top && this.shadow.on.bottom)){
			//draw shadow area
			ctx.fillStyle = 'rgba(0,0,0,' + this.shadow.opacity + ')';
			ctx.fillRect(this.pos.x - this.shadow.size, this.pos.y - this.shadow.size, this.width + 2*this.shadow.size, this.height + 2*this.shadow.size);
		}
		
			
		//draw background with gradient fill
		grd = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
		grd.addColorStop(0, 'rgb(' + this.color.primary.r + ',' + this.color.primary.g + ',' + this.color.primary.b + ')');   
		grd.addColorStop(1, 'rgb(' + this.color.secondary.r + ',' + this.color.secondary.g + ',' + this.color.secondary.b + ')');
	
		ctx.fillStyle = grd;
		ctx.fillRect (this.pos.x, this.pos.y, this.width, this.height);
		
		if(this.active != null){
			this.active.draw(ctx);
		}
	}

	this.setActivePage = setActivePage;
	function setActivePage(page){
		if(page == null){
			this.active = this.main;
		}
		else{
			this.active = page;
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
}