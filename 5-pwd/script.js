"use strict";

var Pwd = {
	counter:0,
	
	init:function(){
		
		Pwd.createDesktop();
	},
	
	createDesktop:function(){
		//Desktop background
		var desktop = document.createElement("div");
		desktop.setAttribute("id", "desktop");
		document.body.appendChild(desktop);
		
		
		//Toolbar
		var toolBar = document.createElement("div");
		toolBar.setAttribute("id", "toolBar");
		desktop.appendChild(toolBar);
		
		//Imageviewer
		var imageViewerA = document.createElement("a");
		var imageViewerImg = document.createElement("img");
		
		imageViewerA.setAttribute("href", "#");
		imageViewerImg.setAttribute("src", "pics/imageveiwer.png");
		imageViewerImg.setAttribute("class", "toolImg")
		imageViewerImg.setAttribute("title", "Image Viewer");
		
		toolBar.appendChild(imageViewerA);
		imageViewerA.appendChild(imageViewerImg);
		
		imageViewerImg.onclick = function(){
			Pwd.createImageWindow();
		};
	},
	
	createImageWindow:function(){
		Pwd.counter+=1;
		
		if(Pwd.counter > 1){
			return false;
		}
		
		//New window
		var desktop = document.getElementById("desktop");
		var picsWindow = document.createElement("div");
		var top = document.createElement("div");
		var main = document.createElement("div");
		var bot = document.createElement("div");
		var topImg = document.createElement("img");
		var closeImg = document.createElement("img");
		var title = document.createElement("p");
		
		picsWindow.setAttribute("id", "picsWindow");
		top.setAttribute("id", "top");
		top.setAttribute("title", "Image Viewer");
		main.setAttribute("id", "main");
		bot.setAttribute("id", "bot");
		topImg.setAttribute("class", "topImg");
		topImg.setAttribute("src", "pics/imageveiwer.png");
		closeImg.setAttribute("class", "closeImg");
		closeImg.setAttribute("src", "pics/close.png");
		title.setAttribute("class", "title");
		title.innerHTML = "Image Viewer";
		
		desktop.insertBefore(picsWindow, desktop.childNodes[0]);
		picsWindow.appendChild(top);
		picsWindow.appendChild(main);
		picsWindow.appendChild(bot);
		top.appendChild(topImg);
		top.appendChild(title);
		top.appendChild(closeImg);
		
		closeImg.onclick=function(){
			Pwd.closeWindow();
		};
	},
	
	closeWindow:function(){
		Pwd.counter=0;
		document.getElementById("picsWindow").remove();
		
	},
	
};

window.onload = function(){
    Pwd.init();
};