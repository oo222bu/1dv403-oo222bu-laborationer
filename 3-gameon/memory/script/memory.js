"use strict";
var Memory = {
    array: [],
    tries:0,
    counter:0,
    
    init:function(){
        var memoryArr;
        var row = 4;
        var col = 4;
        
        memoryArr = RandomGenerator.getPictureArray(row, col);
       
        Memory.setGame(memoryArr);
    },
    
    setGame:function(memoryArr){
            var divMem;
            var aMem;
            var imgMem;
        for (var i = 0; i < memoryArr.length; i++) {
            divMem = document.getElementById("memoryBoard");
            aMem = document.createElement("a");
            imgMem = document.createElement("img");
            
            aMem.setAttribute("href", "#");
            aMem.setAttribute("class", memoryArr[i]);
            imgMem.setAttribute("src", "pics/0.png");
            
            divMem.appendChild(aMem);
            aMem.appendChild(imgMem);
            
            aMem.addEventListener("click", Memory.turnImg);
        }
    },
    
    turnImg:function(e){
            e.preventDefault();
            var click = this;
            var number = click.getAttribute("class");
            var counter;
            if(Memory.array.length < 2){
                click.firstChild.setAttribute("src", "pics/" + number +".png");
                Memory.array.push(click);
            }
            
            if(Memory.array.length >= 2){
                if(Memory.array[0].getAttribute("class") === Memory.array[1].getAttribute("class"))
                {
                    Memory.countPair();
                    Memory.array.splice(0, Memory.array.length);
                }
                else{
                    setTimeout(function() 
                        {
                        for (var i = 0; i < Memory.array.length; i++) {
                            Memory.array[i].firstChild.setAttribute("src", "pics/0.png");
                        }
                        Memory.array.splice(0, Memory.array.length);
                    }, 1000);
                }
            }
    },
    
    countPair:function(){
        Memory.counter++;
        if(Memory.counter === 8){
           alert("Grattis du vann!");
           
        }
    }
    
};

window.onload = function(){
    Memory.init();
};