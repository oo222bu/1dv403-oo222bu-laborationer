"use strict";

var Pwd = {
	counter:0,
	images:[],
	
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
		
		imageViewerImg.onclick = function(e){
			e.preventDefault();
			Pwd.createImageWindow();
		};
	},
	
	createImageWindow:function(){
		Pwd.counter+=1;
		
		if(Pwd.counter > 1){
			Pwd.closeWindow();
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
		
		Pwd.importImg();
		closeImg.onclick=function(){
			Pwd.closeWindow();
		};
	},
	
	closeWindow:function(){
		Pwd.counter=0;
		document.getElementById("picsWindow").remove();
		
	},
	
	importImg:function(){
		//Loading icon
		var bot = document.getElementById("bot");
		var loadDiv = document.createElement("div");
		var loadIcon = document.createElement("img");
		var loadP = document.createElement("p");
		
		loadP.setAttribute("class", "loadP");
		loadP.innerHTML = "Loading";
		loadDiv.setAttribute("id", "loadDiv");
		loadIcon.setAttribute("src", "pics/loading.gif");
		loadIcon.setAttribute("class", "loadIcon");
		
		bot.appendChild(loadDiv);
		loadDiv.appendChild(loadIcon);
		loadDiv.appendChild(loadP);
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
					console.log(xhr.responseText);
					loadDiv.remove();
					Pwd.images = JSON.parse(xhr.responseText);
					Pwd.showImages();
				}
				else{
					console.log("Läsfel, status: "+xhr.status);
				}
			}
			
		};
		
		xhr.open("Get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true)
		
		xhr.send(null);
	},
	
	showImages:function(){
		var main = document.getElementById("main");
		
		var height = 0;
		var width = 0;
		
		for (var i = 0; i < Pwd.images.length; i+=1) {
				

				if(height < Pwd.images[i].thumbHeight){
					height = Pwd.images[i].thumbHeight;
				}

				if(width < Pwd.images[i].thumbWidth){
					width = Pwd.images[i].thumbWidth;
				}
			};
			console.log(height);
			for(var i = 0; i < Pwd.images.length; i+=1){
				var imagesArray = Pwd.images[i];
				var imageDiv = document.createElement("div");
				var imageA = document.createElement("a");
				var imageImg = document.createElement("img");
				
				imageDiv.setAttribute("class", "imageDiv");
				imageA.setAttribute("href", "#");
				imageA.setAttribute("class", "imageA");
				imageImg.setAttribute("class", "imageImg");
				imageImg.setAttribute("src", imagesArray.thumbURL);
				
				main.appendChild(imageDiv);
				imageDiv.appendChild(imageA);
				imageA.appendChild(imageImg);
				
				imageDiv.style.height = height+"px";
				imageDiv.style.width = width+"px";
				
				Pwd.changeBackground(Pwd.images[i].URL, imageA);
			};
			
	},
	
	changeBackground:function(image, click){
		console.log(image);
		console.log(click);
		click.onclick = function(){
			document.getElementById("desktop").style.background = "url("+image+")";	
		};
	},
	
};

window.onload = function(){
    Pwd.init();
};