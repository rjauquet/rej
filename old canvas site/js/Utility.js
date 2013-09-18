function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
    var line = '';
    var numLines = 0;
    
    for(var n = 0; n < words.length; n++) {
    	var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
          
        if(testWidth > maxWidth) {
        	context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
            numLines++;
        }
        else {
        	line = testLine;
        }
    }
    context.fillText(line, x, y);
    numLines++;
    return numLines;
}

//future implementation - should wrap around any images with a specified border
function wrapTextWithImages(context, text, x, y, maxWidth, lineHeight, imgHeight, imgWidth, side){

}