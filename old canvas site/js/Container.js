function Container(pos,width,height){
	this.pos = pos;
	this.height = height;
	this.width = width;
	this.containers = [];
	this.border = {
		on: false,
		color: { r:0,g:0,b:0 },
		size: 1
	};
	this.text = "";
	this.imgData = {
		img: false,
		pos: {x:0,y:0},
		width: 0,
		height: 0
	};
	
	this.draw = draw;
	function draw(ctx){
		
	}
	
	this.setText = setText;
	function setText(text){
		this.text = text;
	}
	
	this.getText = getText;
	function getText(){
		return this.text;
	}
	
	this.setImg = setImg;
	//if pos, width, height non specified, assumed to fill container
	function setImg(img,pos,width,height){
		this.imgData.img = img;
		
		if(pos != null){
			this.imgData.pos = pos;
		}
		else{
			this.imgData.pos = this.pos;
		}
		
		if(width != null){
			this.imgData.width = width;
		}
		else{
			this.imgData.width = this.width;
		}
		
		if(height != null){
			this.imgData.height = height;
		}
		else{
			this.imgData.height = this.height;
		}
	}
	
	this.addContainer = addContainer;
	function addContainer(){
		this.containers.push(container);
	}
}