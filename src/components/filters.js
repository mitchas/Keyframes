// Filters
// 	Various for modifying data
// 
// 		titleCase(string): 
// 		numberFormat(value, type): 
// 

import Vue from "vue";
var numeral = require("numeral");

// Title case
// Capitalizes each word of string
// Also replaces _underscores_ with spaces
Vue.filter("titleCase", function (value) {

	// If value exists
	if(value){
		var splitStr = value.replace(/_/g, " ");

		splitStr = splitStr.toLowerCase().split(" ");
		// Capitalize Every Letter
		for (var i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
		}
		// Return the joined string
		return splitStr.join(" "); 

	}else{
		// No value received, no value returned
		return "";
	}
	
});

//  Number Format
// Formats numbers to commas, 
// options: comma, decimal, dollar, percent, short (ie 1k)
Vue.filter("numberFormat", function (value, type) {
	if(type == "comma"){
		return numeral(value).format("0,0"); 
	}else if(type == "decimal"){
		return numeral(value).format("0,0.00"); 
	}else if(type == "dollar"){
		return numeral(value).format("$ 0,0[.]00"); 
	}else if(type == "percent"){
		return numeral(value).format("0.000 %"); 
	}else if(type == "short"){ // ie 1,000 = 1k
		return numeral(value).format("0a"); 
	}else{
		return numeral(value).format("0,0"); 
	}
});
