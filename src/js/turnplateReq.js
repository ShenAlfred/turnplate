
var data = {
	timeMark: "12",							//开始倒计时， 结束倒计时
	startTime: '2018-10-24 17:12:00', 		//活动开始时间
	endTime: '2018-10-25 13:18:00',   		//活动结束时间
	startCdTime: '2018-10-24 17:12:00',		//开始倒计时时间
	endCdTime: '2018-10-22 14:00:00',		//结束倒计时时间
	user: {
		isJoinActivity: "1",      			//是否可参与对象 1可参与  2不能参与
		availablePoints: 30000,				//可用积点数量
		perConsumePoints: 100,				//每次消耗积点数量
		remainder: 3000,					//剩余次数
	},
	havePrize: '1',								//有没有奖品
	isConsumePoints: '1',						//是否消耗积点  1消耗  2不消耗
	otherShow: "1"								//是否显示其他中奖人信息
}


var currentTime = new Date();				//当前时间
var date;									//开始时间截取的时间变量	
var start_date;								//开始时间变量
var end_date;								//结束时间变量
if(data.timeMark.indexOf("1") != "-1") {					//显示开始倒计时
	if(currentTime.getTime() < new Date(data.startCdTime).getTime()) { //当前时间小于开始倒计时时间(活动开始前)
		$(".count_down-warp").hide();
		date = splitDate(data.startTime);
		$(".unstart_tips").text('tip:活动将于'+ date.year +'年'+ date.month +'月'+ date.date +'日'+ date.hours +':'+ date.minutes +'开始，敬请期待').show();
	}
	else if(currentTime.getTime() >= new Date(data.startCdTime).getTime() && currentTime.getTime() < new Date(data.startTime).getTime()) {//当前时间大于等于开始倒计时时间（有倒计时效果了）
		$(".count_down-warp").show();
		start_date = new Date(data.startTime);
		date = splitDate(data.startTime);
		$(".unstart_tips").text('tip:活动将于'+ date.year +'年'+ date.month +'月'+ date.date +'日'+ date.hours +':'+ date.minutes +'开始，敬请期待').show();
		$.leftTime(start_date.getTime(),function(d){
			if(d.status){
				$(".day").html(d.d);
				$(".hours").html(d.h);
				$(".minutes").html(d.m);
				$(".second").html(d.s);
			}else {
				console.log('活动开始了');
				startActive(data);
			}
		});
	}else if(currentTime.getTime() >= new Date(data.startTime)) {
		console.log('活动正在进行中');
		startActive(data);
	}
}else if(data.timeMark.indexOf("1") == "-1" || data.timeMark == "") {              //隐藏开始倒计时
	$(".count_down-warp").hide();
	start_date = new Date(data.startTime);
	$.leftTime(start_date.getTime(),function(d){
		if(d.status){
			$(".day").html(d.d);
			$(".hours").html(d.h);
			$(".minutes").html(d.m);
			$(".second").html(d.s);
		}else {
			console.log('活动开始了');
			startActive(data);
		}
	});
}
if(data.user.isJoinActivity == "1") {//可参与
	$(".history-list").show();		//历史参与列表显示
	$(".right-btn").show();			//我的奖品显示
}
else if(data.user.isJoinActivity == "2") {//不可参与
	$(".history-list").hide();
	$(".right-btn").hide();	
	$(".unjoin_tips").show();
}



//开始活动
function startActive(data) {
	$(".unstart_tips").hide();		//隐藏未开始tips
	$(".pt").text(data.user.availablePoints);
	$(".nu").text(data.user.remainder);
	if(data.otherShow == "1"){
		requestZJ();
		$("#joiner-list").show();		//显示参与者获得奖品列表
	}
	$(".un-click-area").hide();		//抽奖可点击区域
	if(data.user.isJoinActivity == "1") {	//可参与
		if(data.isConsumePoints == "1") {	//是不是消耗积点的
			$("#point-number").show();
			$("#choujiang-number").hide();
			if(data.user.availablePoints - data.user.perConsumePoints < 0) {
				$(".pt_unenough").show();   	//积点不足
			}
		}else {
			$("#point-number").hide();
			$("#choujiang-number").show();
		}
	}else if(data.user.isJoinActivity == "2") {  //不可参与
		$("#point-number").hide();
		$("#choujiang-number").hide();
	}
	if(data.havePrize == "0") {					//没有奖品了
		$("#joiner-list").hide();	
		$("#point-number").hide();
		$("#choujiang-number").hide();
		$(".un-click-area").show();	
		$(".no-prize_tips").show();
	}
	if(data.timeMark.indexOf("2") != "-1") {       							//需要显示倒计时时间
		if(currentTime.getTime() < new Date(data.endCdTime).getTime()) {   //当前时间小于结束倒计时时间
			$(".count_down-warp").hide();
		}
		else if(currentTime.getTime() >= new Date(data.endCdTime).getTime() && currentTime.getTime() < new Date(data.endTime).getTime()) {  //当前时间大于等于结束倒计时时间（有倒计时效果了）
			$(".count_down-warp").show();
			end_date = new Date(data.endTime);
			$("#active_state").text('结束');
			$.leftTime(end_date.getTime(),function(d){
				if(d.status){
					$(".day").html(d.d);
					$(".hours").html(d.h);
					$(".minutes").html(d.m);
					$(".second").html(d.s);
				}else {
					console.log('活动结束了');
					endActive(data);
				}
			});
		}else if(currentTime.getTime() >= new Date(data.endTime)) {
			console.log("活动已经结束了");
			$(".count_down-warp").show();
			endActive(data);
		}
	}else if(data.timeMark.indexOf("2") == "-1" || data.timeMark == "") {		//不需要显示倒计时时间
		$(".count_down-warp").hide();
		end_date = new Date(data.endTime);
		$("#active_state").text('结束');
		$.leftTime(end_date.getTime(),function(d){
			if(d.status){
				$(".day").html(d.d);
				$(".hours").html(d.h);
				$(".minutes").html(d.m);
				$(".second").html(d.s);
			}else {
				console.log('活动结束了');
				endActive(data);
			}
		});
	}
} 

//结束活动
function endActive(data) {
	if(data.user.isJoinActivity == "1") {  			//可参与
		$(".over_tips").find('span').text('活动已结束，感谢关注！');
	}else if(data.user.isJoinActivity != "1") {		//不可参与
		$(".over_tips").find('span').text('活动已结束');
	}
	$(".no-prize_tips").hide();					//奖品已发放
	$("#joiner-list").hide();					//参与者获取奖品列表信息
	$(".over_tips").show();						//活动结束tips
	$(".point-number").hide();					//积点信息
	$(".un-click-area").show();					//抽奖可点区域
}


//我的奖品
$(".right-btn").on('click', function() {
	//我的奖品
	var myPrize = [{
		couponIcon: '',
		couponName: '手机',
	},{
		couponIcon: '',
		couponName: '话费',	
	},{
		couponIcon: '',
		couponName: '购物卡',	
	},{
		couponIcon: '',
		couponName: '爱奇艺VIP会员',	
	},{
		couponIcon: '',
		couponName: '京东卡',	
	},{
		couponIcon: '',
		couponName: '积分',	
	}];
	var _html = '';
	if(myPrize.length) {
		for(var i = 0;i<myPrize.length; i++) {
			_html += '<article class="content-list"><div class="cl-item"><img src="'+ myPrize[i].couponIcon +'" class="fl"><div class="cl-i-n fr">'+ myPrize[i].couponName +'</div></div></article>'
		}
	}else{
		_html = '<div class="wdjp-tb"><div>您还没有获得奖品。</div></div>';
	}
	$("#myPrize-content").html(_html);
	$("#prize_pop").show();
	$(".shadow").show();
});

//我参与记录
function joinRecord() {
	var data = [
		{
			consumablePoint: 100,
			prizeName: '京东卡',
			seq: 1,
			time: '2018-8-2'
		},
		{
			consumablePoint: 100,
			prizeName: '面霜',
			seq: 2,
			time: '2018-8-2'
		}
	];
	var _th_html = '';
	var _html = '';
	if(0) {	
		_th_html = '<div class="hl-th"><div class="prize-order">序号</div><div class="prize-name">获得奖品</div><div class="prize-time">抽奖时间</div><div class="prize-pt">消耗积点</div></div>'	
		for(var i =0; i<data.length; i++) {
			_html += '<div class="hl-td"><div class="prize-order">'+ data[i].seq +'</div><div class="prize-name">'+ data[i].prizeName +'</div><div class="prize-time">'+ data[i].time +'</div><div class="prize-pt">'+ data[i].consumablePoint +'</div></div>';
		}
	}else {
		_th_html = '<div class="hl-th"><div class="prize-order">序号</div><div class="prize-name">获得奖品</div><div class="prize-time">抽奖时间</div></div>'	
		for(var i =0; i<data.length; i++) {
			_html += '<div class="hl-td"><div class="prize-order">'+ data[i].seq +'</div><div class="prize-name">'+ data[i].prizeName +'</div><div class="prize-time">'+ data[i].time +'</div></div>';
		}
	}
	$("#joiner-th-warp").html(_th_html);
	$("#joiner-td-warp").html(_html);
}

joinRecord();

	var _turntable = new turntable();
	//_turntable.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费","京东卡","爱奇艺vip",'红包', '元宝'];
	_turntable.restaraunts = [{
		activeNo: 's09827',
		activeName: '20积点'
	},{
		activeNo: 's09527',
		activeName: '$600'
	},{
		activeNo: 's029027',
		activeName: '50积点'
	},{
		activeNo: 's096727',
		activeName: '$20'
	},{
		activeNo: 's09927',
		activeName: '谢谢参与'
	},{
		activeNo: 's099927',
		activeName: '¥50话费'
	},{
		activeNo: 's78227',
		activeName: '京东卡'
	},{
		activeNo: 's0198227',
		activeName: '爱奇艺vip'
	},{
		activeNo: 's0998927',
		activeName: '谢谢参与'
	},{
		activeNo: 's0992527',
		activeName: '谢谢参与'
	},{
		activeNo: 's099890927',
		activeName: '谢谢参与'
	},{
		activeNo: 's08927',
		activeName: '谢谢参与'
	},{
		activeNo: 's08927',
		activeName: '谢谢参与'
	},{
		activeNo: 's08927',
		activeName: '谢谢参与'
	},{
		activeNo: 's08927',
		activeName: '谢谢参与'
	},{
		activeNo: 's08927',
		activeName: '谢谢参与'
	}];

	var randomNo = "s099927";
		index = 0;

	_turntable.init();

	$("#choujiang").on('click',function() {
		if(_turntable.bRotate) return;
		_turntable.bRotate = !_turntable.bRotate;
		for(var i=0; i<_turntable.restaraunts.length; i++) {
			if(randomNo == _turntable.restaraunts[i]['activeNo']) {
				index = i+1;
			}
		}
		_turntable.rotateFn(index, _turntable.restaraunts[index-1]);
	});

	$(".click-area").on('click', function() {
		$(this).toggleClass('click-able');
		$(".history-list-warp").toggle();
	});


/***** 测试皮肤 */
// var theme = 'skyblue';
$("body").css({
	background: '#f03839'
});
// $("body").addClass(theme);
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