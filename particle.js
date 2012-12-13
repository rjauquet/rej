var canvas, ctx, center, cur, next, speed, num, p1, p2, spaces, check, checkrad, rgbp1, rgbp2, drag=null,dPoint, boardx, boardy, playerTurn=true, gameover = false, winner = 0;

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
            state: 0,
            next: null
        });
    }
    for(var row=0; row<3; row++){
        for(var i=0; i<4; i++){
            p1.push({
                x:2*i*check+(check*(row%2)),
                y:row*check,
                s:num,
                king:false                
            });
            p2.push({
                x:2*i*check+(check*((row+1)%2)), 
                y:(5+row)*check,
                s:20+num,
                king:false                
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
    if(gameover){
        ctx.font = '14px Calibri';
        ctx.fillStyle = 'white';
        var text = "Player " + winner + " wins!";
        ctx.fillText("GAME OVER", boardx, boardy-22);
        ctx.fillText(text, boardx, boardy-10);
    }
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
                spaces[num].next = getNext(num,i%2==0);
                num++;
            }
            ctx.fillRect(startx+i*15,starty+j*15,15,15);
        }
        black = !black;           
    }
    drawDraughts(startx,starty);
}
    
function getNext(num,evenRow){
    var edges = [0,1,2,3,7,8,15,16,23,24,28,29,30,31];
    if(edges.indexOf(num) == -1){
        if(evenRow){
            return [num-5,num-4,num,num+3,num+4];
        }
        else{
            return [num-4,num-3,num,num+4,num+5];
        }
    }
    else if(num == 0){
        return [0,4];        
    }
    else if(num == 1){
        return [1,4,5];
    }
    else if(num == 2){
        return [2,5,6];
    }
    else if(num == 3){
        return [3,6,7];
    }
    else if(num == 28){
        return [28,24,25];
    }
    else if(num == 29){
        return [29,25,26];
    }
    else if(num == 30){
        return [30,26,27];
    }
    else if(num == 31){
        return [31,27];
    }
    else{
        return [num,num-4,num+4];
    }
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
    if(playerTurn && !gameover){
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
            if(cur < closest){
                closest = cur;
                index = i;                
            }  
        }
        if(isMove(drag,index)){
            jump(drag,index,1);
            prevSpace = p1[drag].s;    
            p1[drag].x = spaces[index].x;
            p1[drag].y = spaces[index].y;
            p1[drag].s = index;
            spaces[index].state = 1;
            //if it's a jump, deletes piece
            
        
            if(index != [prevSpace]){
                spaces[prevSpace].state = 0;
                playerTurn = false;
                computerTurn();
            }
            if(inKingRowP1(index)){
                p1[drag].king = true;            
            } 
        }
        else{
            p1[drag].x = spaces[p1[drag].s].x;
            p1[drag].y = spaces[p1[drag].s].y;
        }
        

        drag = null;
        canvas.style.cursor = "default";
        DrawCanvas();
    }
}

function isMove(start,end){
    var move;
    var moves = availableMoves(start,1);
    if(moves == null){
        return false;
    }
    for(var i=0; i<moves.length; i++){
        move = moves[i];
        if(move[0] == p1[start].s && move[1] == end){
            return true;
        }
    }
    return false;
}
 
function jump(start,end,player){
    var move;
    var jumps = getJumps(start,1);
    if(jumps == null){
        return;
    }
    for(var i=0; i<jumps.length; i++){
        move = jumps[i];
        if(move[0] == p1[start].s && move[1] == end && move.length == 3){
            if(player == 1){
                for(var i=0; i<p2.length; i++){
                    if(p2[i].s == move[2]){
                        spaces[p2[i].s].state = 0;
                        p2.splice(i,1);
                    }
                }
            }
            else if(player == 2){
                for(var i=0; i<p1.length; i++){
                    if(p1[i].s == move[2]){
                        spaces[p1[i].s].state = 0;
                        p1.splice(i,1);
                    }
                }
            }
            
        }
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
}
function inKingRowP1(space){
    var kingRow = [28,29,30,31];
    if(kingRow.indexOf(space) != -1){
        return true;
    }
    else{
        return false;
    }
}

function inKingRowP2(space){
    var kingRow = [0,1,2,3];
    if(kingRow.indexOf(space) != -1){
        return true;
    }
    else{
        return false;
    }
}  
function computerTurn(){
    //get all locations it's possible to move to
    var moves = getMoves();
    if(moves == null){
        gameover = true;
        winner = 1;
    }
    else{
        //pick a random available move
        var rand = Math.floor(Math.random()*moves.length);
        var move = moves[rand];
        movePC(move[0],move[1]);
        if(move.length == 3){
            for(var i=0; i<p2.length; i++){
                if(p2[i].s == move[0]){
                    jump(i,move[1],2);
                }                
            }       
        }
        DrawCanvas();
    //starting with random choice AI
    // eventually do these steps, and then move to a procedural AI. 
        // step one - prevent any jumps    
        // step two - if step one not taken, look for jumps
        // step three - if step two not taken, look for safe single space moves
        // if no safe moves, just take whatever you can get

        
        playerTurn = true;
    
    }

}

function getMoves(){
    var moves = new Array();
    
    for(var i=0;i<p2.length;i++){
        var mv = availableMoves(i,2);
        if(mv != null){
            moves = moves.concat(mv);      
        }
    }
    if(moves.length != 0){
        return moves;
    }
    else{
        return null;
    }
}

function availableMoves(checker,player){
    var next;
    var moves = new Array();
    var jumps = new Array();
    if(player == 1){
        next = spaces[p1[checker].s].next;
        jumps = getJumps(checker,1);
    }
    else if(player == 2){
        next = spaces[p2[checker].s].next;
        jumps = getJumps(checker,2);
    }
    
    if(checker.king && player == 1){
        for(var i=0; i<next.length; i++){
            if(spaces[next[i]].state == 0){
                moves.push([p1[checker].s,next[i]]);
            }
        }
    }
    else if(checker.king && player == 2){
        for(var i=0; i<next.length; i++){
            if(spaces[next[i]].state == 0){
                moves.push([p2[checker].s,next[i]]);
            }
        }
    }
    else if(player == 1){
        for(var i=0; i<next.length; i++){
            if(spaces[next[i]].state == 0 && next[i] > p1[checker].s){
                moves.push([p1[checker].s,next[i]]);
            }
        }
    }
    else if (player == 2){
        for(var i=0; i<next.length; i++){
            if(spaces[next[i]].state == 0 && next[i] < p2[checker].s){
                moves.push([p2[checker].s,next[i]]);
            }
        }
    }

    moves = moves.concat(jumps);

    if(moves.length > 0){
        return moves;
    }
    else{
        return null;
    }
}

function movePC(from,to){
    var prevSpace;
    var checker;
    for(var i=0; i<p2.length; i++){
        if(p2[i].s == from){
            checker = i;
        }
    }
    prevSpace = p2[checker].s;    
    p2[checker].x = spaces[to].x;
    p2[checker].y = spaces[to].y;
    p2[checker].s = to;
    spaces[to].state = 2;
    spaces[prevSpace].state = 0;

    if(inKingRowP2(to)){
        p2[checker].king = true;            
    }
    if(playerMovesRemain()){
        playerTurn = true;
    }
    else{
        gameover = true;
        winner = 2;
    }   
}
    
function playerMovesRemain(){
    var moves = new Array();
    
    for(var i=0;i<p1.length;i++){     
        var mv = availableMoves(i,1);
        if(mv != null){
            moves = moves.concat(mv);      
        }
    }
    if(moves.length == 0){
        return false;
    }
    else{
        return true;
    }
}
//checker contains the index of p1 or p2 that we're looking at
//checker contains the index of p1 or p2 that we're looking at
function getJumps(checker,player){
    var checks = new Array();
    var jumps = new Array();
        
    if(player == 1 && p1[checker].king){
    
    }
    else if(player == 2 && p1[checker].king){
    
    }
    else if(player == 1){
        var next = spaces[p1[checker].s].next;
        for(var i=0; i<next.length; i++){            
            if(spaces[next[i]].state == 2 && next[i] > p1[checker].s){                
                checks.push(next[i]);
            }
        }
        for(var i=0; i<checks.length; i++){
            var nextcheck = spaces[checks[i]].next;    
            for(var j=0; j<nextcheck.length; j++){                          
                if(spaces[nextcheck[j]].state == 0 && nextcheck[j] > checks[i] && isDiagonal(p1[checker].s,nextcheck[j])){
                    //return the original positon, the position it's moving to, and the location of the checker being jumped
                    jumps.push([p1[checker].s,nextcheck[j],checks[i]]);
                }
            }
        }
    }
    if(player == 2){
        var next = spaces[p2[checker].s].next;
        for(var i=0; i<next.length; i++){            
            if(spaces[next[i]].state == 1 && next[i] < p2[checker].s){                
                checks.push(next[i]);
            }
        }
        for(var i=0; i<checks.length; i++){
            var nextcheck = spaces[checks[i]].next;    
            for(var j=0; j<nextcheck.length; j++){                          
                if(spaces[nextcheck[j]].state == 0 && nextcheck[j] < checks[i] && isDiagonal(p2[checker].s,nextcheck[j])){
                    //return the original positon, the position it's moving to, and the location of the checker being jumped
                    jumps.push([p2[checker].s,nextcheck[j],checks[i]]);
                }
            }
        }
    }
    return jumps;
}

function isDiagonal(start,end){
    if(Math.abs(start - end) == 7 || Math.abs(start - end) == 9){
        return true;
    }
    else{
        return false;
    }
}​
