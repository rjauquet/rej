//must pass in the active information to load first
function Foreground(pos,text,img){
	this.color = {
		primary: {r:0,g:0,b:0},
		secondary: {r:0,g:0,b:0}
	};
	
	this.shadow = {
		on: {
			bottom: false,
			top: false,
			left: true,
			right: true
		},
		size: 7,
		opacity: 0.5
	};
	
	this.active = new Display([{pos:pos,text:text,img:img,width:FORE_WIDTH,height:MIN_HEIGHT}]);
	this.displays = [];
	this.displays.push(this.active);
	
	this.draw = draw;
	function draw(ctx){
		var grd;
		
		if(this.shadow.on.left && this.shadow.on.right){
			//draw shadow area
			ctx.fillStyle = 'rgba(0,0,0,' + this.shadow.opacity + ')';
			ctx.fillRect(ctx.canvas.width/2 - FORE_WIDTH/2 - this.shadow.size, 0, FORE_WIDTH + 2*this.shadow.size, ctx.canvas.height);
		}
		
			
		//draw background with gradient fill
		grd = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
		grd.addColorStop(0, 'rgb(' + this.color.primary.r + ',' + this.color.primary.g + ',' + this.color.primary.b + ')');   
		grd.addColorStop(1, 'rgb(' + this.color.secondary.r + ',' + this.color.secondary.g + ',' + this.color.secondary.b + ')');
	
		ctx.fillStyle = grd;
		ctx.fillRect (ctx.canvas.width/2 - FORE_WIDTH/2, 0, FORE_WIDTH, ctx.canvas.height);
		
		this.active.draw();
	}

	this.addDisplay = addDisplay;
	function addDisplay(){
		displays.push(new Display([]));
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
		console.log(color)
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