"use strict";

function Message(message, date){
    
    this.getText = function(){
        return message;
    } 
    
    this.setText = function(_text){
        message = _text;
    }
    
    this.getDate = function(){
        return date;
    }
    
    this.setDate = function(_date){
        date = _date;
    }
}

Message.prototype.toString = function(){
	return "Inlägget skapades"+"("+this.getDate()+")";

}

Message.prototype.getHTMLText = function() {
	return this.getText().replace(/[\n\r]/g, "<br/>");
}

Message.prototype.getDateTime = function(){
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    
    return hour + ":" + min + ":" + sec;
}