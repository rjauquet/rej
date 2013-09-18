function getTextFromFile(){

}

function readSingleFile(event) {
	//Retrieve the first (and only!) File from the FileList object
	var file = evt.target.files[0]; 

	if (file) {
    	var reader = new FileReader();
    	reader.onload = function(e) { 
			var contents = e.target.result;
			alert( "Got the file.n" 
				  +"name: " + f.name + "n"
				  +"type: " + f.type + "n"
				  +"size: " + f.size + " bytesn"
				  + "starts with: " + contents.substr(1, contents.indexOf("n"))
			);  
		}
		reader.readAsText(file);
	} 
    else { 
      alert("Failed to load file");
    }
}

//document.getElementById('fileinput').addEventListener('change', readSingleFile, false);