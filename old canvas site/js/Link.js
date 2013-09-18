//image or text that is clickable and links to a new site or new foreground display
function Link(text,num,page){
	this.text = text;
	this.num = num;
	this.pos = {x: 0, y: 0};
	this.height = 0;
	this.width = 0;
	
	this.clicked = false;
	this.page = page;

	this.draw = draw;
	function draw(ctx){
	
		this.pos.x = ctx.canvas.width/2;
		this.pos.y = 50;
		this.width = this.text.length*24;
		this.height = 30;
		
		//Resume
		if(this.num == 0){
			this.pos.x -= this.pos.x*2/3;
			this.pos.x -= 20;
		}
		//Github
		else if(this.num == 1){
			this.pos.x -= this.pos.x/3;
			this.pos.x -= 60;
		}
		//Social
		else if(this.num == 2){
			this.pos.x += this.pos.x/3;
			this.pos.x += 60;
		}
		//Portfolio
		else if(this.num == 3){
			this.pos.x += this.pos.x*2/3;
			this.pos.x += 20;
		}
		
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		
		ctx.font = '24px Calibri';
		
		if(this.clicked){
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillText(this.text, this.pos.x + 3 , this.pos.y + 3);
		}
		else{
			ctx.fillStyle = 'rgba(0,0,0,.5)';
			ctx.fillText(this.text, this.pos.x + 3, this.pos.y + 3);
		
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillText(this.text, this.pos.x , this.pos.y);
		}
	}
}