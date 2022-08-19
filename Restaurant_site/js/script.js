$(function(){ //Same as document.addEventListener("DOMContentLoaded", ...
	//Same as document.querySelector("#navbarToggle").addEventListener("blur" ...
	$("#navbarToggle").blur(function(event){
		var screenWidth = window.innerWidth; 
		if (screenWidth < 768){
			$("#collapsable-nav").collapse('hide');
		}
	});

});

(function (global) {
	// create a namespace 
	var dc = {};

	var homeHtml = "snippets/home-snippet.html";

	// convinence function for inserting innerHTML for 'select'
	var insertHtml = function (selector, html) {
		var targetElement = document.querySelector(selector);
		targetElement.innerHTML = html;
	};

	// show loading icon inside element identified by selector
	var showLoadingIcon = function (selector) {
		var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>"
		insertHtml(selector, html);
	}

	// on page load (before images or CSS)

	document.addEventListener("DOMContentLoaded", function(event){
		// on first load, show home view
		showLoadingIcon("#main-content");
		$ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
			document.querySelector("#main-content").innerHTML=responseText;
		}, false)

	});
	// expose dc to the global env
	window.$dc = dc;
})(window);