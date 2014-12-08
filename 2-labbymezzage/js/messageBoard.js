"use strict";
var MessageBoard = {
    
    messages: [],
    
    init:function(){
    	var send = document.getElementById("button");
    	var input = document.getElementById("textarea");
    	
    	input.addEventListener("keypress", function(e){
			if(!e){ e = window.event; }

			if(e.keyCode == 13 && !e.shiftKey){
				e.preventDefault();
				MessageBoard.getMessages();
			}
		});
    	send.addEventListener("click", MessageBoard.getMessages);
    	
    },
    
    getMessages:function(){
		var text = document.getElementById("textarea");

		if( text.value != ""){
			MessageBoard.messages.push( new Message(text.value, new Date()));
			var last = MessageBoard.messages.length - 1;
			MessageBoard.renderMessage(last);
			MessageBoard.messageCount();
			text.value = "";
		}
		
    },
    
    renderMessages:function(){
    	document.getElementById("messageboard").innerHTML="";
    	
    	for(var i=0; i < MessageBoard.messages.length; ++i){
    		
    		MessageBoard.renderMessage(i);
    	}
    },
    
    renderMessage:function(messageID){
    	var messageBoard = document.getElementById("messageboard");
    	var send = document.createElement("div"); 
    	var text = document.createElement("p");
    	var date = document.createElement("p");
    	var imgDate = document.createElement("img");
    	var imgDelete = document.createElement("img");
    	var linkDate = document.createElement("a");
    	var linkDelete = document.createElement("a");
    	
    	messageBoard.appendChild(send);
    	send.setAttribute("class", "send");
    	date.setAttribute("class", "date");
    	imgDate.setAttribute("src", "pics/clock.png");
    	imgDelete.setAttribute("src", "pics/delete.png");
    	linkDate.setAttribute("href", "#");
    	linkDelete.setAttribute("href", "#");
    	
    	//Date
    	send.appendChild(linkDate);
    	linkDate.appendChild(imgDate);
    	linkDate.addEventListener("click", function(e) {
    	    MessageBoard.messageTime(messageID);
    	});
    	//Delete
    	send.appendChild(linkDelete);
    	linkDelete.appendChild(imgDelete);
    	linkDelete.addEventListener("click", function(e){
	    		e.preventDefault();
	    		if(confirm("Är du säker på att du ska radera meddelandet?")){
	    			MessageBoard.removeMessage(messageID);
	    		}
	    	});
    	
    	text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
    	send.appendChild(text);
    	
    	date.innerHTML = MessageBoard.messages[messageID].getDateTime();
    	send.appendChild(date);
    	
    },
    
    messageCount:function(){
    	var messageCount = document.getElementById("messagecount");
    	var messagesSent = MessageBoard.messages.length;
    	
    	messageCount.innerHTML = "Antal meddelanden: " + messagesSent;
    	
    },
    
    removeMessage:function(messageID){
    	MessageBoard.messages.splice(messageID, 1);
    	MessageBoard.renderMessages();
    	MessageBoard.messageCount();
    },
    
    messageTime:function(messageID){
    	alert(MessageBoard.messages[messageID].toString());
    }
};

window.onload=MessageBoard.init;
