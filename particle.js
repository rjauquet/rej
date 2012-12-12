var canvas, ctx, center, cur, next, speed, num, p1, p2, spaces, check, checkrad, rgbp1, rgbp2, drag=null,dPoint, boardx, boardy;

function particle(x,y,rad,r,g,b){
    this.x=x;
    this.y=y;
    this.rad=rad;
    this.r=r;
    this.g=g;
    this.b=b;
}


function init() {
    // start
    canvas = document.getElementById("background_canvas");
    ctx = canvas.getContext("2d");
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    
    check = 15;
    checkrad = 6;
    num = 100;
    speed = 50; 
    boardx = canvas.width/6+15;
    boardy = canvas.height-(8*15+10);
    cur = getParticles(num).slice(0);
    next = getParticles(num).slice(0);
    rgbp1 = getRGB(255,255,255,100);
    rgbp2 = getRGB(0,0,0,100);
    
    canvas.addEventListener("mousedown", DragStart, false);
    canvas.addEventListener("mousemove", Dragging, false);
    document.body.addEventListener("mouseup", DragEnd, false);
    
    setUpDraughts();
    
    setInterval(update,speed);
}

function setUpDraughts(){
    p1 = new Array();
    p2 = new Array();
    spaces = new Array();
    var num = 0;
    for (var i=0;i<32; i++){
        spaces.push({
            x:0,
            y:0,
            state: 0
        });
    }
    for(var row=0; row<3; row++){
        for(var i=0; i<4; i++){
            p1.push({
                x:2*i*check+(check*(row%2)),
                y:row*check,
                s:num        
            });
            p2.push({
                x:2*i*check+(check*((row+1)%2)), 
                y:(5+row)*check,
                s:20+num               
            });
            spaces[num].state = 1;
            spaces[20+num].state = 2;
            num++;
        }
    }
}     

function getParticles(num){
    var particles = new Array();
    var radMax = 40;
    var radMin = 5;
    for(var i=0; i<num; i++){
        var x = Math.floor((Math.random()*canvas.width)+1);
        var y = Math.floor((Math.random()*canvas.height)+1);
        var rad = Math.floor((Math.random()*(radMax-radMin))+radMin);
        var rgb = getRGB(50,0,255,125);
        particles.push(new particle(x,y,rad,rgb.r,rgb.g,rgb.b));                
    }
    return particles;        
}

function update(){
    var toNext = 0;
    for(var i=0; i<cur.length; i++){
        if(toNext == 0){
            cur[i].dx = (next[i].x-cur[i].x)/speed;
            cur[i].dy = (next[i].y-cur[i].y)/speed;
            cur[i].drad = (next[i].rad-cur[i].rad)/speed;
            cur[i].dr = Math.floor((next[i].r-cur[i].r)/speed);
            cur[i].dg = Math.floor((next[i].g-cur[i].g)/speed);
            cur[i].db = Math.floor((next[i].b-cur[i].b)/speed);
        }
        
        cur[i].x += cur[i].dx;
        if(cur[i].x < 0){
            cur[i].x = 0;
        }
        else if(cur[i].x > canvas.width - 1){
            cur[i].x = canvas.width - 1;
        }
        
        cur[i].y += cur[i].dy;
        if(cur[i].y < 0){
            cur[i].y = 0;
        }
        else if(cur[i].y > canvas.height - 1){
            cur[i].y= canvas.height - 1;
        }
        
        cur[i].rad += cur[i].drad
        if(cur[i].rad < 3){
            cur[i].rad = 3;
        }
        else if(cur[i].rad > 25){
            cur[i].rad = 25;
        }
        cur[i].r += cur[i].dr;
        if(cur[i].r < 0){
            cur[i].r = 0;
        }
        else if(cur[i].r > 255){
            cur[i].r = 255;
        }
        
        cur[i].g += cur[i].dg;
        if(cur[i].g < 0){
            cur[i].g = 0;
        }
        else if(cur[i].g > 255){
            cur[i].g = 255;
        }
        
        cur[i].b += cur[i].db;
        if(cur[i].b < 0){
            cur[i].b = 0;
        }
        else if(cur[i].b > 255){
            cur[i].b = 255;
        }
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        DrawCanvas();
        if( Math.abs(cur[i].x - next[i].x) < .5 && Math.abs(cur[i].y - next[i].y) < .5){
            toNext++;            
        }
    }
    //transition to next when half of the points have finished moving
    if(toNext > cur.length/2){
        toNext = 0;
        cur = next.slice(0);
        next = getParticles(num).slice(0);
    }
}

// draw canvas

function DrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 5;

    for(var i=0; i<cur.length; i++){
        ctx.strokeStyle = "rgb("+cur[i].r+","+cur[i].g+","+cur[i].b+")";
        ctx.fillStyle = "rgb("+cur[i].r+","+cur[i].g+","+cur[i].b+")";
        ctx.beginPath();
        ctx.moveTo(cur[i].x, cur[i].y);
        ctx.arc(cur[i].x, cur[i].y, cur[i].rad, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();
    }
    
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width/6,0,canvas.width*2/3,canvas.height);
    boardx = canvas.width/6+15;
    boardy = canvas.height-(8*15+10);
    drawText(canvas.width/6,0,canvas.width*2/3);
    drawEnglishDraughts(boardx,boardy);
    ctx.closePath();
}

function drawText(startx,starty,width){
    ctx.font = '14px Calibri';
    ctx.fillStyle = 'white';
    var text = "Hello. My name is Rob Jauquet. The purpose of this site is to give a representation of my background using javascript, as well as showcase my experience animating on HTML5's canvas.";
    wrapText(text, startx+5, starty+28, width-5, 16);
}
  
function drawEnglishDraughts(startx,starty){
    var black = false;
    var num = 0;
    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            if(black){
                ctx.fillStyle = 'black';
                black = false;
            }
            else{
                ctx.fillStyle = 'white';
                black = true;
                spaces[num].x = j*15;
                spaces[num].y = i*15;
                num++;
            }
            ctx.fillRect(startx+i*15,starty+j*15,15,15);
        }
        black = !black;           
    }
    drawDraughts(startx,starty);
}
function drawDraughts(startx,starty){
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb("+rgbp2.r+","+rgbp2.g+","+rgbp2.b+")";
    ctx.fillStyle = "rgb("+rgbp1.r+","+rgbp1.g+","+rgbp1.b+")";
    for(var i=0; i<p1.length; i++){
        ctx.beginPath();
        ctx.arc(startx+p1[i].x+check/2,starty+p1[i].y+check/2, checkrad, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();       
    }
    ctx.strokeStyle = "rgb("+rgbp1.r+","+rgbp1.g+","+rgbp1.b+")";
    ctx.fillStyle = "rgb("+rgbp2.r+","+rgbp2.g+","+rgbp2.b+")";
    for(var i=0; i<p2.length; i++){
        ctx.beginPath();
        ctx.arc(startx+p2[i].x+check/2,starty+p2[i].y+check/2, checkrad, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();
    }
}  
function wrapText(text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}
//getRGB(50,0,255,125);
function getRGB(red,green,blue,range){
    var rhigh,rlow,ghigh,glow,bhigh,blow,rrand,grand,brand;
    
    //set red upper
    if((red+range) > 255){
        rhigh = 255;       
    }
    else{
        rhigh = red + range;
    }
    
    //set red lover
    if((red-range) < 0){
        rlow = 0;       
    }
    else{
        rlow = red - range;
    }
    
    //set green upper
    if((green+range) > 255){
        ghigh = 255;       
    }
    else{
        ghigh = green + range;
    }
    
    //set green lower
    if((green-range) < 0){
        glow = 0;       
    }
    else{
        glow = green - range;
    }
    
    //set blue upper
    if((blue+range) > 255){
        bhigh = 255;       
    }
    else{
        bhigh = blue + range;
    }
    
    //set blue lower
    if((blue-range) < 0){
        blow = 0;       
    }
    else{
        blow = blue - range;
    }
    rrand = Math.floor((Math.random()*(rhigh - rlow))+rlow);
    grand = Math.floor((Math.random()*(ghigh - glow))+glow);
    brand = Math.floor((Math.random()*(bhigh - blow))+blow);
    return {        
        r: rrand,
        g: grand,
        b: brand 
    };
}
    
function DragStart(e){
    e = MousePos(e);
    var dx,dy;
    for(var i=0; i<p1.length; i++){
        dx = e.x - (p1[i].x + boardx + checkrad);
        dy = e.y - (p1[i].y + boardy + checkrad);       
        if((dx*dx + dy*dy) < checkrad*checkrad){
            drag = i;
            dPoint = e;
            canvas.style.cursor = "none";
            return;
        }       
    }
}
    
function Dragging(e){
    if (drag != null) {
        e = MousePos(e);
        p1[drag].x += e.x - dPoint.x;
        p1[drag].y += e.y - dPoint.y;
        dPoint = e;
        DrawCanvas();
    } 
}
    
function DragEnd(e){
    var prevSpace;
    if(drag != null){
        var closest=null,cur,closest = 1000, index = p1[drag].s;
        for(var i=0; i<spaces.length; i++){
              cur = Math.sqrt((p1[drag].x - spaces[i].x)*(p1[drag].x - spaces[i].x) + (p1[drag].y - spaces[i].y)*(p1[drag].y - spaces[i].y));
            //change places if its an empty space, or the original space
            if(cur < closest && (spaces[i].state == 0 || p1[drag].s == i)){
                closest = cur;
                index = i;               
            }
        }
        prevSpace = p1[drag].s;    
        p1[drag].x = spaces[index].x;
        p1[drag].y = spaces[index].y;
        p1[drag].s = index;
        spaces[index].state = 1;
        spaces[prevSpace].state = 0; 
        
        drag = null;
        canvas.style.cursor = "default";
        DrawCanvas();
    }
}
        
function MousePos(event) {
    event = (event ? event : window.event); 
    var pos = findPos(canvas);
    var x = event.pageX - pos[0];
    var y = event.pageY - pos[1];
    return {
        x: x,
        y: y
    }
}
        
function findPos(e){
    var offs = new Array()
    var curleft = 0, curtop = 0;
    if (e.offsetParent) {
        do {
            curleft += e.offsetLeft;
            curtop += e.offsetTop;
        } while (e = e.offsetParent);
        offs.push(curleft);
        offs.push(curtop);
        return offs;
    }
    return undefined;
}​
