var displayPanel;
var controlPanel;
var lastX, lastY;

window.onload = appInit;


function appInit(){

	displayPanel = document.getElementById("displayPanel");
	
	drawClock.start(displayPanel);
//	tick();
	
	initColorPicker();
	
	var filePicker = document.getElementById("filePicker");
	var fileButton = document.getElementById("fileButton");

	filePicker.addEventListener("change", setBackground, false);
	fileButton.addEventListener("click", function(){filePicker.click();}, false);
	
	loadSettings();
	
	controlPanel = document.getElementById("controlPanel");
//	hideControlPanel();

	if(typeof displayPanel.ontouchstart == "undefined"){
		displayPanel.addEventListener("dragstart", dragStart, false);
		displayPanel.addEventListener("dragend", dragEnd, false);
	}else{
		displayPanel.addEventListener("touchstart", touchStart, false);
		displayPanel.addEventListener("touchmove", touchMove, false);
		displayPanel.addEventListener("touchend", touchEnd, false);	
	}

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

//	displayPanel.style.color = event.target.value;
	drawClock.frame(event.target.value);
	saveData("color", event.target.value);
}


function saveData(name, data){
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
	
	var color = storage.getItem("color") || "gray";
	var image = storage.getItem("image");
	
//	if(textcolor){
		var colorPicker = document.getElementById("colorPicker");
//		displayPanel.style.color = textcolor;
		drawClock.frame(color);
		colorPicker.value = color;
//	}
	
	if(image){
		document.body.style.backgroundImage = "url('"+image+"')";
	}

	var posX = storage.getItem("PosX");
	var posY = storage.getItem("PosY");
	
	if(posX && posY){
		displayPanel.style.left = posX;
		displayPanel.style.top = posY;
	}
	
}


function hideControlPanel(){
	controlPanel.style.visibility="hidden";
	
	if(typeof document.ontouchmove == "undefined")
		document.addEventListener("mousemove", showControlPanel);
	else document.addEventListener("touchmove", showControlPanel);
}


function showControlPanel(){
	controlPanel.style.visibility = "visible";
	setTimeout(hideControlPanel,5000);
	
	if(typeof document.ontouchmove =="undefined")
		document.addEventListener("mousemove", showControlPanel);
	else document.addEventListener("touchmove", showControlPanel);
}

function dragStart(event){
	lastX = event.screenX;
	lastY = event.screenX;
	event.dataTransfer.setData("Text",this.innerHTML);
}

function moveClock(element, x, y){
	var posX, posY;
	var newX = element.offsetLeft + x - lastX;
	var newY = element.offsetTop + y - lastY;
	var maxX = document.body.clientWidth - element.offsetWidth;
	var maxY = document.body.clientHeight - element.offsetHeight;
	
	if(newX < 0) newX = 0;
	if(newY < 0) newY = 0;
	if(newX > maxX) newX = maxX;
	if(newY > maxY) newY = maxY;
	
	posX = newX + "px";
	posY = newY + "px";
	
	element.style.left = posX;
	element.style.top = posY;
	
	return{ x: posX, y: posY};
}

function dragEnd(event){
	var element = event.target;
	var x = event.screenX;
	var y = event.screenY;
	var pos = moveClock(element, x, y);
	
	saveData("PosX",pos.x);
	saveData("PosY",pos.y);
	
	lastX = null;
	lastY = null;
}

function touchStart(event){
	lastX = event.touches[0].clientX;
	lastY = event.touches[0].clientY;
}

function touchMove(event){
	
	event.preventDefault();
	var element = event.target;
	if(element.nodeName == "CANVAS"){
		element = element.parentNode;
	}
	
	var x = event.touches[0].clientX;
	var y = event.touches[0].clientY;
	
	moveClock(element, x, y);
	
}

function touchEnd(event){
	
	var element = event.target;
	if(element.nodeName == "CANVAS"){
		element = element.parentNode;
	}
	
	var x = event.touches[0].clientX;
	var y = event.touches[0].clientY;
	
	var pos = moveClock(element, x, y);
	
	saveData("PosX",pos.x);
	saveData("PosY",pos.y);
	
	lastX = null;
	lastY = null;
}

