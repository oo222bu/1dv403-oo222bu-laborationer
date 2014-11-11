"use strict";

var makePerson = function(persArr){
    
var result = {};
var names = persArr.map(function(names){return names.name;}).sort(function(a, b){return a.localeCompare(b)}).join(", ");
var age = persArr.map(function(age){return age.age;});

var maxAge = Math.max.apply(Math, age);
var minAge = Math.min.apply(Math, age);
var averageAge = age.reduce(function(a, b){return a + b});

averageAge /= age.length;
averageAge = Math.round(averageAge);
result.minAge = minAge;
result.maxAge = maxAge;
result.averageAge = averageAge;
result.names = names;
return result;

	// Din kod här...

}
var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
var result = makePerson(data);
console.log(result);