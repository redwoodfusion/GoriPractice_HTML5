var displayPanel;

//ここにひつような変数を用意

window.onload = appInit;

function appInit(){
	displayPanel = document.getElementById("displayPanel");
	
	tick();	
	initColorPicker();

	
	var filePicker = document.getElementById("filePicker");
	var fileButton = document.getElementById("fileButton");
	filePicker.addEventListener("change", setBackground, false);
	fileButton.addEventListener("click", function(){
		filePicker.click();
		}, false);
	loadSettings();
}

function tick(){
	var date = new Date();
	displayPanel.textContent = date.toLocaleTimeString(); 
	setTimeout(tick, 1000 - date.getMilliseconds());
}

function initColorPicker(){
	var colorPicker = document.getElementById("colorPicker");

	var inputColor = document.createElement("input");
	inputColor.setAttribute("type","color");
	
	if(inputColor.type=="color"){
		inputColor.value = "black";
		if(inputColor.value == "#000000"){
			colorPicker.parentNode.replaceChild(inputColor, colorPicker);
			inputColor.id = "colorPicker";
			colorPicker = inputColor;
		}
	}
	
	colorPicker.addEventListener("change", setColor, false);
}

function setColor(event){
	displayPanel.style.color = event.target.value;
	saveData("color", event.target.value);
}

function saveDate(name, date){
	var storage = localStorage;
	if(typeof storage == "undefined") return;
	storage.setItem(name,data);
}

function setBackground(event){
	var file = event.target.files[0];
	window.URL = window.URL||window.webkitURL;
	var url=window.URL.createObjectURL(file);
	document.body.style.backgroundImage="url('"+url+"')";
	
	var fileReader = new FileReader();
	fileReader.onload = function(){saveData("image", this.result);};
	fileReader.readAsDataURL(file);
}

function loadSettings(){
	
	var storage = localStorage;
	if(typeof storage == "undefined") return;
	
	var textcolor = storage.getItem("color");
	var image = storage.getItem("image");
	
	if(textcolor){
		var colorPicker = document.getElementById("colorPicker");
		displayPanel.style.color = textcolor;
		colorPicker.value = textcolor;
	}
	if(image){
		document.body.style.backgroundImage = "url('"+image+"')";
	}
}

