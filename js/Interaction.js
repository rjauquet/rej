var clicked;

function mouseStart(e,obj){
	e = mousePos(e,obj);
	getClicked(e,obj);
}

function touchStart(e,obj){
    e = touchPos(e,obj);
    getClicked(e,obj);
}

function getClicked(e,obj){
	
	//start with title info

	var startx = obj.banner.title.pos.x - obj.banner.title.width/4;
	var endx = startx + obj.banner.title.width/2;
	var starty = obj.banner.title.pos.y;
	var endy = starty + obj.banner.title.height;
			
	//check title first
	if(e.x > startx && e.x < endx && e.y > starty && e.y < endy){
		clicked = obj.banner.title;
		clicked.clicked = true;
	}
	//otherwise check the links
	else{
		for(var i=0; i<obj.banner.links.length; i++){
			var startx = obj.banner.links[i].pos.x - obj.banner.links[i].width/4;
			var endx = startx + obj.banner.links[i].width/2;
			var starty = obj.banner.links[i].pos.y;
			var endy = starty + obj.banner.links[i].height;
			
			if(e.x > startx && e.x < endx && e.y > starty && e.y < endy){
				clicked = obj.banner.links[i];
				clicked.clicked = true;
			}
		}
	}
	obj.draw();
}

function mouseEnd(e,obj){
	e = mousePos(e,obj);
	redirect(e,obj);
}
 
function touchEnd(e,obj){
	e = touchPos(e,obj);
	redirect(e,obj);
}
  
function redirect(e,obj){
	if(clicked != null){
		clicked.clicked = false;
		
		console.log(clicked)
		obj.foreground.active = clicked.page;
		
		clicked = null;
		obj.draw();
	}
}

// event parser
function touchPos(event,obj){
    event = (event ? event : window.event);
    var pos = this.findPos(obj.canvas);
	if(event.targetTouches.length != 0){
	    touchx = event.targetTouches[0].pageX - pos.x;
    	touchy = event.targetTouches[0].pageY - pos.y;
	}
    if(event.targetTouches[1] == null){
        event.preventDefault();
    }
    return {
            x: touchx,
            y: touchy
    };
}

function mousePos(event,obj) {
    event = (event ? event : window.event);
    var pos = this.findPos(obj.canvas);
    var x = event.pageX - pos.x;
    var y = event.pageY - pos.y;
    return {
        x: x,
        y: y
    };
}

function findPos(e){
    var offs = new Array();
    var curleft = 0, curtop = 0;
    
    if (e.offsetParent) {
        do {
            curleft += e.offsetLeft;
            curtop += e.offsetTop;
        } while (e = e.offsetParent);
        offs = { x: curleft, y: curtop };
        return offs;
    }
    return {x:0,y:0};
}