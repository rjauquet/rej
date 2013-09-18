//title object, either image or text
function Title(title){
	this.title = title;
	this.draw = draw;
	this.url = "default";
	
	this.pos = { x: 0, y: 0 }
	this.width = 0;
	this.height = 0;
	
	this.page = false;
	
	this.clicked = false;
	
	function draw(ctx){
		
		this.pos.x = ctx.canvas.width/2;
		this.pos.y = 50;
		this.width = 11*60;
		this.height = 70;
	
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		
		ctx.font = '60px Calibri';
		
		if(this.clicked){
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillText(this.title,this.pos.x + 5, this.pos.y + 5);
		}
		else{
			ctx.fillStyle = 'rgba(0,0,0,.5)';
			ctx.fillText(this.title,this.pos.x + 5, this.pos.y + 5);
		
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillText(this.title,this.pos.x, this.pos.y);
		}
		
		
	}
	
	this.drawClicked = drawClicked;
	function drawClicked(ctx){
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		
		ctx.font = '60px Calibri';
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText(this.title,this.pos.x + 5, this.pos.y + 5);
	}
}