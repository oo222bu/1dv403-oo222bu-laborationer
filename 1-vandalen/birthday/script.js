"use strict";

window.onload = function(){

	
	var birthday = function(date){
		
		var birthday = new Date(date);
		console.log(birthday);
		var today = new Date();
		var oneDay = 1000*60*60*24;
		if (isNaN(birthday) ) {
			throw {'message' : "Ej giltigt datum!"}
		};
		if (birthday >= today) {
			throw {'message' : "Ange när du är född."}
		};	
		
		birthday.setFullYear(today.getFullYear());
		if (today > birthday ) {
			birthday.setFullYear(today.getFullYear()+1);
		}
		var diffDay = Math.abs((birthday.getTime()-today.getTime())/(oneDay));
		if (diffDay < 0) {
			return "Ange giltigt datum!";
		}
		console.log(diffDay);
		return Math.round(diffDay);
	
			// Din kod här.




	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};