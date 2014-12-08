"use strict";
var Memory = {
    array: [],
    
    init:function(){
        var memoryArr;
        var row = 4;
        var col = 4;
        
        memoryArr = RandomGenerator.getPictureArray(row, col);
        console.log(memoryArr);
    }
    
};

window.onload = function(){
    Memory.init();
}