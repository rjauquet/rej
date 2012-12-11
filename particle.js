var canvas, ctx, center, cur, next, speed, num;

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
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    
    num = 100;
    speed = 50; 
    cur = getParticles(num).slice(0);
    next = getParticles(num).slice(0);
    setInterval(update,speed);
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
    for(var i=0; i<cur.length; i++){
        cur[i].x += (next[i].x-cur[i].x)/speed;
        if(cur[i].x < 0){
            cur[i].x = 0;
        }
        else if(cur[i].x > canvas.width - 1){
            cur[i].x = canvas.width - 1;
        }
        
        cur[i].y += (next[i].y-cur[i].y)/speed;
        if(cur[i].y < 0){
            cur[i].y = 0;
        }
        else if(cur[i].y > canvas.height - 1){
            cur[i].y= canvas.height - 1;
        }
        
        cur[i].rad += (next[i].rad-cur[i].rad)/speed;
        if(cur[i].rad < 3){
            cur[i].rad = 3;
        }
        else if(cur[i].rad > 25){
            cur[i].rad = 25;
        }
        cur[i].r += Math.floor((next[i].r-cur[i].r)/speed);
        if(cur[i].r < 0){
            cur[i].r = 0;
        }
        else if(cur[i].r > 255){
            cur[i].r = 255;
        }
        
        cur[i].g += Math.floor((next[i].g-cur[i].g)/speed);
        if(cur[i].g < 0){
            cur[i].g = 0;
        }
        else if(cur[i].g > 255){
            cur[i].g = 255;
        }
        
        cur[i].b += Math.floor((next[i].b-cur[i].b)/speed);
        if(cur[i].b < 0){
            cur[i].b = 0;
        }
        else if(cur[i].b > 255){
            cur[i].b = 255;
        }
        DrawCanvas();
    }
    if((Math.abs(cur[0].x - next[0].x) < 2) && (Math.abs(cur[0].y - next[0].y) < 2)){
        console.log("here")
        cur = next.slice(0);
        next = getParticles(num).slice(0);
    }
}

// draw canvas

function DrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
     
    ctx.closePath();
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
}​