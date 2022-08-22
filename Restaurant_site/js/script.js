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

	// URLs
	var homeHtml = "snippets/home-snippet.html";
	var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "snippets/categories-title-snippet.html";
	var categoryHtml = "snippets/category-snippet.html";

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

	// Return Substitute of '{{propName}}'
	// with propValue in given "string"
	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace,"g"), propValue);
		return string
	}
	// on page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function(event){
		// on first load, show home view
		showLoadingIcon("#main-content");
		$ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
			document.querySelector("#main-content").innerHTML=responseText;
		}, false)

		// load menu categories view
		dc.loadMenuCategories = function () {
			showLoadingIcon("#main-content");
			$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
		}

		// Builds HTML for the categories page based on data from the server
		function buildAndShowCategoriesHTML(categories) {
			// load title snippet of categories page 
			$ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
				// retrieve categories title snippet
				$ajaxUtils.sendGetRequest(categoryHtml, function (categoryHtml) {
					var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
					insertHtml("#main-content", categoriesViewHtml);
				},false);
			},false);
		}
	});

	// Using categories data and snippets HTML
	// build categories view to be inserted into page
	function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		// Loop over categories
		for (var i=0; i<categories.length; i++){
			// Insert category values
			var html = categoryHtml;
			var name = ""+ categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "short_name", short_name);

			finalHtml += html;
		}
		finalHtml+="</section>";
		return finalHtml;
	}


	// expose dc to the global env
	window.$dc = dc;
})(window);