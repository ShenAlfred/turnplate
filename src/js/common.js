var baseUrl = 'http://192.168.43.219:8007/v2';


/***** 测试皮肤 */
var theme = 'chinared';
$("body").addClass(theme);
// $(".bg1").attr('src', '../image/turnplate_a/skyblue/bg.png');
// $(".broadcast-img").attr('src', '../image/turnplate_a/skyblue/msg.png');
// $(".title").attr('src', '../image/turnplate_a/skyblue/title.png');
// $(".left-btn").attr('src', '../image/turnplate_a/skyblue/left_btn.png');
// $(".right-btn").attr('src', './image/turnplate_a/skyblue/right_btn.png');
// $(".turntable_bg").attr('src', '../image/turnplate/skyblue/turntable_bg.png');
// $(".ybd").attr('src', '../image/turnplate_a/skyblue/ybd.png');
// $(".cd-item").css({
// 	background: "url('../image/countdown/skyblue/cd.png') center center no-repeat",
// 	backgroundSize: '100%'
// });
// $(".chou-btn").css({
// 	background: "url('../image/trunplate/skyblue/chou_btn.png') center center no-repeat",
// 	backgroundSize: '100%'
// });
// $(".turntable_bg").css({
// 	boxShadow: '0 0 60px #2b5dce'
// });
// $(".chou-btn").css({
// 	background: 'url("../image/turnplate/skyblue/chou_btn.png") center center no-repeat',
//     backgroundSize: '100%'
// });



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