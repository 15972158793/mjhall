
var shareKey = "e32c36ea311bff152efc73508b6fd8f8";

var RequestURL = function (url,func) {
	var xhr = cc.loader.getXMLHttpRequest();

	xhr.open("GET", url);
	//set Content-type "text/plain;charset=UTF-8" to post plain text
	//xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");

	xhr.onreadystatechange = function () {

		if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
			var httpStatus = xhr.statusText;

			func(xhr.responseText);
		}
	};
	xhr.send();
}

var PostURL = function (url,data,func,otherdata,errorhandle) {
	var xhr = cc.loader.getXMLHttpRequest();
	xhr.open("POST", url);

	cc.log("postUrl,url=="+url)

	//set Content-type "text/plain;charset=UTF-8" to post plain text
	//xhr.setRequestHeader("Content-Type","text/plain");
	xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	//xhr.responseType = "arraybuffer";
	xhr.otherdata = otherdata;
	xhr.onreadystatechange = function () {
		if(xhr.status == 200) {
			if(xhr.readyState == 4) {
				var httpStatus = xhr.statusText;
				var buffer = xhr.response;

				func(buffer, xhr.otherdata);
			}
		} else {
			cc.log("PostURL error");
			if(errorhandle != null)
				errorhandle(xhr.otherdata);
		}
	};

	xhr.send(data);

}

var PostURLPHP = function (url,data,func,otherdata,errorhandle) {
	var xhr = cc.loader.getXMLHttpRequest();
	//cc.log(url);
	xhr.open("POST", url);
	//set Content-type "text/plain;charset=UTF-8" to post plain text
	//xhr.setRequestHeader("Content-Type","text/plain");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//xhr.responseType = "arraybuffer";
	xhr.otherdata = otherdata;
	xhr.onreadystatechange = function () {

		if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
			var httpStatus = xhr.statusText;
			var buffer = xhr.response;

			func(buffer, xhr.otherdata);

		}else{
			//func(out.join(''), xhr.otherdata);
			cc.log("PostURL error");
			if(errorhandle != null)
				errorhandle(xhr.otherdata);
		}
	};

	xhr.send(data);

}