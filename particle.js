var canvas, ctx, center, cur, next, speed, num;

function particle(x,y,mass,rad,r,g,b){
    this.x=x;
    this.y=y;
    this.mass=mass;
    this.rad=rad;
    this.r=r;
    this.g=g;
    this.b=b;
}


function init() {
    // start
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    num = 100;
    cur = getParticles(num);
}
        
function run(){
    next = getParticles(num); 
    speed = 1000;        
    motion();
    delete next;
}
        
function getParticles(num){
    var particles = new Array();
    for(var i=0; i<num; i++){
        var x = Math.floor((Math.random()*canvas.width)+1);
        var y = Math.floor((Math.random()*canvas.height)+1);
        var mass = Math.floor((Math.random()*100)+25);
        var rad = Math.floor((Math.random()*15)+1);
        var rgb = getRGB(50,0,255,125);
        particles.push(new particle(x,y,mass,rad,rgb.r,rgb.g,rgb.b));    
    }
    return particles;        
}

function motion(){
    var start = cur;
    for(var j=0; j<speed; j++){
        var interval = setInterval(function() { 
            update(start);
            if(j == speed-1){ 
                clearInterval(interval)
            }
         }, 1000);
    }
}

function update(start){
    DrawCanvas(cur); 
    for(var i=0; i<cur.length; i++){
        cur[i].x += (next[i].x-start[i].x)/(i+1);
        if(cur[i].x < 0){
            cur[i].x = 0;
        }
        else if(cur[i].x > canvas.width - 1){
            cur[i].x = canvas.width - 1;
        }
        
        cur[i].y += (next[i].y-start[i].y)/(i+1);
        if(cur[i].y < 0){
            cur[i].y = 0;
        }
        else if(cur[i].y > canvas.height - 1){
            cur[i].y= canvas.height - 1;
        }
        
        cur[i].rad += Math.floor((next[i].rad-start[i].rad)/(i+1));
        if(cur[i].rad < 0){
            cur[i].rad = 1;
        }
        else if(cur[i].rad > 15){
            cur[i].rad = 15;
        }
        cur[i].r += Math.floor((next[i].r-start[i].r)/(i+1));
        if(cur[i].r < 0){
            cur[i].r = 0;
        }
        else if(cur[i].r > 255){
            cur[i].r = 255;
        }
        
        cur[i].g += Math.floor((next[i].g-start[i].g)/(i+1));
        if(cur[i].g < 0){
            cur[i].g = 0;
        }
        else if(cur[i].g > 255){
            cur[i].g = 255;
        }
        
        cur[i].b += Math.floor((next[i].b-start[i].b)/(i+1));
        if(cur[i].b < 0){
            cur[i].b = 0;
        }
        else if(cur[i].b > 255){
            cur[i].b = 255;
        }
    }
}

// draw canvas

function DrawCanvas(particles) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;

    for(var i=0; i<particles.length; i++){
        ctx.strokeStyle = "rgb("+particles[i].r+","+particles[i].g+","+particles[i].b+")";
        ctx.fillStyle = "rgb("+particles[i].r+","+particles[i].g+","+particles[i].b+")";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.arc(particles[i].x, particles[i].y, particles[i].rad, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();
    }
     
    ctx.closePath();
}

function getRGB(red,green,blue,range){
    var rp,rm,gp,gm,bp,bm;
    
    //set red upper
    if((red+range) > 255){
        rp = 255;       
    }
    else{
        rp = red + range;
    }
    
    //set red lover
    if((red-range) < 0){
        rm = 0;       
    }
    else{
        rm = red - range;
    }
    
    //set green upper
    if((green+range) > 255){
        gp = 255;       
    }
    else{
        gp = green + range;
    }
    
    //set green lower
    if((green-range) < 0){
        gm = 0;       
    }
    else{
        gm = green - range;
    }
    
    //set blue upper
    if((blue+range) > 255){
        bp = 255;       
    }
    else{
        bp = blue + range;
    }
    
    //set blue lower
    if((blue-range) < 0){
        bm = 0;       
    }
    else{
        bm = blue - range;
    }
    
    return {        
        r: Math.floor((Math.random()*rp)+rm),
        g: Math.floor((Math.random()*gp)+gm),
        b: Math.floor((Math.random()*bp)+bm) 
    };
}​