"use strict";
var Quizz = {
    urlQuestion:"http://vhost3.lnu.se:20080/question/1",
    question:[],
    numberOfTries: [],
	counter: 0,
	
    
    init:function(){
      var start = document.getElementById("startButton");
      
      start.addEventListener("click", function(){
          start.setAttribute("value", "Skicka Svar!");
          Quizz.buildElement();
          Quizz.startQuizz();
      });
      
      
        
    },
    
    buildElement:function(){
        var question = document.getElementById("question");
        var p = document.createElement("p");
        var button = document.getElementById("startButton");
        var textarea = document.createElement("textarea");
        var answer = document.getElementById("answer");
        
        p.setAttribute("id", "p");
        button.setAttribute("id", "answerbutton");
        textarea.setAttribute("id", "textarea");
        textarea.setAttribute("rows", "1");
        textarea.setAttribute("cols", "20");
        
        question.appendChild(p);
        answer.appendChild(textarea);
    },
    
    startQuizz:function(){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                    if (xhr.status == 200){
                    Quizz.question=JSON.parse(xhr.responseText);
                    Quizz.showQuestion(JSON.parse(xhr.responseText));
                    Quizz.sendAnswer(JSON.parse(xhr.responseText));
                }
                else{
                    console.log("Läsfel, status:"+xhr.status);
                    
                }
            }
        };
       
        xhr.open("GET", Quizz.urlQuestion , true);
        
        xhr.send(null);
    },
    
    showQuestion:function(responseText){
        var question = document.getElementById("p");
        
        if("question" in responseText){
			question.innerHTML = responseText.question;
		} else {
			question.innerHTML = responseText.message;
		}
    },
    
    sendAnswer:function(url){
        var answerbutton = document.getElementById("answerbutton");
        var textarea = document.getElementById("textarea");
        
        answerbutton.onclick = function(){
            Quizz.counter+=1;
            var xhr = new XMLHttpRequest();
            var text;
            
            xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){ 
                
                if(xhr.status == 200){
                        Quizz.question = JSON.parse(xhr.responseText);
                        Quizz.numberOfTries.push(Quizz.counter);
                        Quizz.counter = 0;
                    
                    if("nextURL" in Quizz.question){
                            Quizz.showQuestion(JSON.parse(xhr.responseText));
                            Quizz.urlQuestion = Quizz.question.nextURL;
                            setTimeout(function(){
                                    Quizz.resetTextarea();
    								Quizz.startQuizz();
    							}, 1000);
                            
                        }
                            else{
                                Quizz.gameEnd();
                            }
                }
                else{
                    Quizz.wrongAnswer(Quizz.question);
                    console.log(Quizz.question);
                }
            }
            else{
                    console.log("Läsfel, status:"+xhr.status);
                }
            };
            
            xhr.open("POST", url.nextURL, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            text = {
                "answer": textarea.value
            }; 
            
            xhr.send(JSON.stringify(text));
        };
    },
    
    resetTextarea:function(){
        var textArea = document.getElementById("textarea");
        textArea.value="";
        
    },    

    gameEnd:function(){
       	var text = document.getElementById("p");
		text.innerHTML = "";
		var q = document.getElementById("question");

		for (var i = 0; i < Quizz.numberOfTries.length; i+=1) {
			var p = document.createElement("p");
			q.appendChild(p);
			p.innerHTML = "Fråga nr "+(i+1)+" tog "+Quizz.numberOfTries[i]+" försök.";
		};
    },
    
    wrongAnswer:function(responseText){
        var wrong = document.getElementById("p");
        wrong.innerHTML = "Wrong answer! ";
        console.log(wrong.innerHTML);
        setTimeout(function(){
		    wrong.innerHTML = Quizz.question.question;	
		}, 1000);
        
    },    
    
    
};

window.onload = function(){
    Quizz.init();
};