"use strict";
var Quizz = {
    urlQuestion:"http://vhost3.lnu.se:20080/question/1",
    question:[],
    
    init: function(){
      var start = document.getElementById("startbutton");
      
      start.addEventListener("click", function(e){
          start.setAttribute("value", "Skicka Svar!");
          Quizz.buildElement();
          Quizz.startQuizz();
      });
      
      
        
    },
    
    buildElement:function(){
        var question = document.getElementById("question");
        var answer = document.getElementById("answer");
        var textarea = document.getElementById("textarea");
        var p = document.createElement("p");
        var button = document.getElementById("startbutton");
        
        p.setAttribute("id", "p");
        button.setAttribute("id", "answerbutton");
        
        question.appendChild(p);
        
    },
    
    startQuizz:function(){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){if(xhr.readyState === 4 && xhr.status === 200){Quizz.question=JSON.parse(xhr.responseText); console.log("Done"); Quizz.showQuestion(JSON.parse(xhr.responseText));}else{console.log("Läsfel, status:"+xhr.status);}};
        
        xhr.open("GET", Quizz.urlQuestion , true);
        
        xhr.send(null);
    },
    
 
    
    showQuestion:function(responseText){
        var question = document.getElementById("p");
        
        question.innerHTML = responseText.question;
    },
  
  
    
};

window.onload = function(){
    Quizz.init();
};