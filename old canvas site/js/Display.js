//a display is passed an array of objects.
//each object has a location, color, text, img, etc
function Display(containers){
	this.containers = [];
	for(cont in containers){
		this.containers.push(new Container(cont.pos,cont.width,cont.height));
		if(cont.img != null){
			containers[containers.length-1].setImg(cont.img);
		}
		if(cont.text != null){
			containers[containers.length-1].setText(cont.text);
		}
	}
	
	this.draw = draw;
	function draw(ctx){
		for(var i=0; i<this.containers.length; i++){
			this.containers[i].draw(ctx);
		}
	}
}