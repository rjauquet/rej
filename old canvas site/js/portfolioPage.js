function portfolioPage(){
	this.pos = FORE_POS;
	this.width = FORE_WIDTH;
	this.height = FORE_HEIGHT;
	this.imgHeight = 250;
	this.imgWidth = 250;
	this.text = ["COMING SOON"];
	
	this.draw = draw;
	function draw(ctx){
		var lines = 0;
		ctx.font = TEXT_STYLE.TEXT_SIZE + 'px ' + TEXT_STYLE.FONT;
		ctx.textBaseline = TEXT_STYLE.BASE_LINE;
		ctx.fillStyle = "rgb(" + TEXT_STYLE.COLOR.R + ',' + TEXT_STYLE.COLOR.G + ',' + TEXT_STYLE.COLOR.B + ')';
		for(var i=0; i<this.text.length; i++){
			lines += wrapText(ctx, this.text[i], this.pos.x + 20, this.pos.y + 30 + lines*TEXT_STYLE.LINE_HEIGHT, this.width - 60, TEXT_STYLE.LINE_HEIGHT);
		}
	}
}