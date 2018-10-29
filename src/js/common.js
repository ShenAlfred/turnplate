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

//计算两时间差值
function DateDiff(sDate1,  sDate2){
    var  aDate,  oDate1,  oDate2,  iDays  
    aDate  =  sDate1.split("-")  
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    
    aDate  =  sDate2.split("-")  
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    
    return  iDays  
}

//截取url后面的参数
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
 
 //分割时间字符串
 function splitDate(timeStr) {
	 var _timeStr = timeStr.split(" ");
	 var date = _timeStr[0];
	 var time = _timeStr[1];
	 var data_split = date.split("-");
	 var time_split = time.split(":");
	 return {
		 year: data_split[0],
		 month: data_split[1],
		 date: data_split[2],
		 hours: time_split[0],
		 minutes: time_split[1],
		 second: time_split[2]
	 } 
 }
 

 function requestZJ(msgUrl) {
	var data = [
		{
			'phone': '135****7890',
			'prize': '***'
		},
		{
			'phone': '135****7890',
			'prize': '***'
		},
		{
			'phone': '135****7890',
			'prize': '***'
		},
		{
			'phone': '135****7890',
			'prize': '***'
		},
		{
			'phone': '135****7890',
			'prize': '***'
		}
	];

	var $zj_list_container = $(".zj-list"),
	$zj_ul = $zj_list_container.find('ul');
	var zj_index = 0;
	var $li_height = 0;

	for(var i =0; i<data.length; i++) {
		$zj_ul.append("<li><img src='"+ msgUrl +"' class='broadcast-img'>"+ data[i].phone + "抽中"+ data[i].prize +"奖品</li>");
	}

	var $li_height = $zj_ul.find('li').eq(0).height(),
	total_height = 4.831 * 5 + "vw";
	$zj_ul.css({
		height: total_height,
		top: 0
	});

	function zjscroll() {
		$zj_ul.stop().animate({
			top: -zj_index * $li_height
		}, 400, function() {
			if(zj_index == $zj_ul.children().length -1) {
				$zj_ul.css({top:0});
				zj_index = 0;
			}
		});
	}
	
	function next() {
		zj_index++;
		if(zj_index > $zj_ul.children().length - 1) {
			zj_index = 0;
		}
		zjscroll();
	}
	
	setInterval(next,2000);
}
