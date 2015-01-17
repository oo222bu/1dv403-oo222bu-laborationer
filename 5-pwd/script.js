"use strict";

var Pwd = {
	
	init:function(){
		
		Pwd.createDesktop();
	},
	
	createDesktop:function(){
		//sätter bakgrundsbild
		document.body.style.background = "url('pics/desktop.jpg')";
		
		//skapar aktivitetsfält
		var toolBar = document.createElement("div");
		toolBar.setAttribute("id", "toolBar");
		document.body.appendChild(toolBar);
		
		//imageviewer
		var imageViewerA = document.createElement("a");
		var imageViewerImg = document.createElement("img");
		
		imageViewerA.setAttribute("href", "#");
		imageViewerImg.setAttribute("src", "pics/imageveiwer.png");
		imageViewerImg.setAttribute("class", "toolImg")
		
		toolBar.appendChild(imageViewerA);
		imageViewerA.appendChild(imageViewerImg);
	}
	
};

window.onload = function(){
    Pwd.init();
};