var baseUrl = 'http://192.168.43.219:8007/v2';
var common_api = {
	imgcode: '/activity/api/codeverified/imgcode',
	msgcode: '/activity/api/codeverified/smcode',
	verifyimgcode: '/activity/api/codeverified/verifyimgcode',
	verifysmcode: '/activity/api/codeverified/verifysmcode'
}

function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

function GetRequest() {   
	var url = location.search; //获取url中"?"符后的字串   
	var theRequest = new Object();   
	if (url.indexOf("?") != -1) {   
	   var str = url.substr(1);   
	   strs = str.split("&");   
	   for(var i = 0; i < strs.length; i ++) {   
		  theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
	   }   
	}   
	return theRequest;   
 }   