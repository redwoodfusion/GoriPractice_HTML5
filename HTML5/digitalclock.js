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
}
