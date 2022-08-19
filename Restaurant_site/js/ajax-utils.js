(function(global){
	// create name space 
	var ajaxUtils = {};

	// Returns HTTP request object 
	function getRequestObject() {
		if (window.XMLHttpRequest){
			return (new XMLHttpRequest());
		}

		// for very old IE browsers
		else if (window.ActiveXObject){
			return(new ActiveXObject("Microsoft.XMLHTTP"));
		}
		else{
			global.alert("Ajax is not supported");
			return (null);
		}
	}

	// makes an ajax GET to "requestUrl"
	ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
		var request = getRequestObject();

		request.onreadystatechange = function () {
			handleResponse(request, responseHandler, isJsonResponse);
		}
		request.open("GET", requestUrl, true);
		request.send(null) // only for POST requests
	}

	// only calls user provided 'responseHandler'
	// functions if response is ready and not an error

	function handleResponse(request, responseHandler, isJsonResponse) {
		if ((request.readyState == 4) && (request.status == 200)){
			// default 'isJsonResponse' to 'true'
			if (isJsonResponse == undefined){
				isJsonResponse = true;
			}
			if (isJsonResponse == true){
				responseHandler(JSON.parse(request.responseText));
			}
			else {
				responseHandler(request.responseText);
			}
		}
	}

	// expose ajaxUtils to the global environment
	window.$ajaxUtils = ajaxUtils;

})(window);