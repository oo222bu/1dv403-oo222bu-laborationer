"use strict";
var Quizz = {
    
    init: function(){
      var start = document.getElementById("startbutton");
      
      start.addEventListener("click", function(e){
          start.setAttribute("value", "Skicka Svar!");
      });
        
    },
  
  
  
    
};

window.onload = function(){
    Quizz.init();
};