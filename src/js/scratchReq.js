
var data = {
	timeMark: "12",							//开始倒计时， 结束倒计时
	startTime: '2018-10-28 17:22:00', 		//活动开始时间
	endTime: '2018-10-28 18:00:00',   		//活动结束时间
	startCdTime: '2018-10-28 14:20:00',		//开始倒计时时间
	endCdTime: '2018-10-28 15:00:00',		//结束倒计时时间
	user: {
		isJoinActivity: "1",      			//是否可参与对象 1可参与  2不能参与
		availablePoints: 30000,				//可用积点数量
		perConsumePoints: 100,				//每次消耗积点数量
		remainder: 3000,					//剩余次数
	},
	havePrize: '1',								//有没有奖品  1有  0没有
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
if(data.user.isJoinActivity == "1") {			//可参与
	$(".history-list").show();					//历史参与列表显示
	$(".right-btn").show();						//我的奖品显示
}
else if(data.user.isJoinActivity == "2") {//不可参与
	$(".history-list").hide();
	$(".right-btn").hide();	
	$(".unjoin_tips").show();
}



//开始活动
function startActive(data) {
	$(".unstart_tips").hide();					//隐藏未开始tips
	if(data.otherShow == "1"){
		requestZJ('../image/turnplate_a/msg.png'); 			//msg图片路径
		$("#joiner-list").show();				//显示参与者获得奖品列表
	}
	$("#ggq-unstart").hide();					//抽奖可点击区域
	$("#ggq-start-active").show();				
	if(data.user.isJoinActivity == "1") {		//可参与
		if(data.isConsumePoints == "1") {		//是不是消耗积点的
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
		$("#ggq-unstart").show();
		$("#ggq-start-active").hide();
		$("#ggq-unstart").find('.uiwo').text('奖品已发放完毕，感谢关注！');	
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
			$("#active_state").text('结束');
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
	$("#ggq-unstart").show();					//结束背景
	$("#ggq-start-active").hide();				//开始背景
	$("#ggq-unstart").find('.uiwo').text('活动已结束，感谢关注！');	
}

var zgyc_btn = './image/scratch_a/close.png';
var arr = ["恭喜您获得50元京东卡","恭喜您获得100元亚马逊卡","恭喜您获得20元话费"];
var lottery_info_html = "<div class='a_lottery-info'><div class='text-info'></div><img src='"+ zgyc_btn +"' class='lottery_btn' id='lottery_click'></a></div>";
var scratch_layer_img = './image/scratch_a/xyggl.png';
var sc = null;
var scContainer = document.getElementById('js--sc--container');

//点我刮奖
$("#kgua").on('click', function() {
	$(".ggq-ing").hide();
	//TODO  ajax
	lottery_info_html = "<div class='a_lottery-info'><div class='text-info'>"+ arr[Math.floor(Math.random()*arr.length)] +"</div><img src='./image/scratch_a/zgyc.png' class='lottery_btn' id='lottery_click'></a></div>"
	createScratch(scratch_layer_img, lottery_info_html);
});




function createScratch(scratch_layer, lottery_info_html) {
	if(sc) {
		sc = null;
	}else {
		sc = new ScratchCard('#js--sc--container', {
				scratchType: SCRATCH_TYPE.CIRCLE,
				containerWidth: scContainer.offsetWidth,
				containerHeight: scContainer.offsetHeight,
				imageForwardSrc: scratch_layer,
				htmlBackground: lottery_info_html,
				clearZoneRadius: 20,
				percentToFinish: 50,
				callback: function () {
						sc = null;
						$("#lottery_click").on('click', function() {
							//TODO ajax
							$(".haveprize-tips").hide();
							var _lottery_info_html = "<div class='a_lottery-info'><div class='text-info'>"+ arr[Math.floor(Math.random()*arr.length)] +"</div><img src='./image/scratch_a/zgyc.png' class='lottery_btn' id='lottery_click'></a></div>";
							createScratch(scratch_layer_img, _lottery_info_html);
						});
				}
		});
		sc.init().then(function() {
			sc.canvas.addEventListener('scratch.move', function() {
				var percent = sc.getPercent();
				//TODO  在做一次判断是否中奖了 if
				if(percent >= 50) {
					$(".haveprize-tips").show();
				}
			})
		});
	}
}


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
		},{
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
		},{
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
	var _html = '';
	if(0) {	
        for(var i =0; i<data.length; i++) {
			_html += '<div class="hl-td"><div class="prize-order">'+ data[i].seq +'</div><div class="prize-name">'+ data[i].prizeName +'</div><div class="prize-time">'+ data[i].time +'</div><div class="prize-pt">'+ data[i].consumablePoint +'</div></div>';
		}
	}else {
        for(var i =0; i<data.length; i++) {
			_html += '<div class="hl-td"><div class="prize-order">'+ data[i].seq +'</div><div class="prize-name">'+ data[i].prizeName +'</div><div class="prize-time">'+ data[i].time +'</div></div>';
		}
	}
	$("#joiner-td-warp").html(_html);
}

joinRecord();

//历史记录切换
$(".click-area").on('click', function() {
    if($(this).hasClass('click-able')) {
        $(this).removeClass('click-able');
        $(".history-list-warp").hide();
    }else {
        $(this).addClass('click-able');
        $(".history-list-warp").show();
    }
});


/**  测试皮肤 */
var themebg_color = '#4fcdf7';
var general_color = '#0e54b4';
// $("body").css({
// 	background: themebg_color
// });
// $(".bg1").attr('src', '../image/turnplate_a/skyblue/bg.png');
// $(".broadcast-img").attr('src', '../image/turnplate_a/skyblue/msg.png');
// $(".ggl-title").attr('src', '../image/turnplate_a/skyblue/title.png');
// $(".left-btn").attr('src', '../image/turnplate_a/skyblue/left_btn.png');
// $(".right-btn").attr('src', './image/turnplate_a/skyblue/right_btn.png');
// $(".gift-img").attr('src', '');
// $("#kgua").attr('src', '');
// $(".award-decarl-box").attr('src', '');
$(".ggq-unstart .tb").css({
	background: "url("+ scratch_layer_img +") center center no-repeat",
	backgroundSize: '100%'
});
$(".ggq-ing .tb").css({
	background: "url("+ scratch_layer_img +") center center no-repeat",
	backgroundSize: '100%'
});
// $(".cd-item").css({
// 	borderColor: general_color,
// 	color: general_color
// });
// $(".count_down-warp").css({
// 	color: general_color
// });
// $(".tips").css({
// 	color: general_color
// });
// $(".zj-list ul li").css({
// 	color: general_color
// });
// $(".point-number").css({
// 	color: general_color
// });
// $(".click-area").css({
// 	color: general_color
// });
// $(".click-area .arrow").css({
// 	borderLeftColor: general_color
// });
// $(".click-area.click-able .arrow").css({
// 	borderLeftColor: general_color
// });
// $(".hl-td").css({
// 	color: general_color
// });
// $(".hl-th").css({
// 	color: general_color
// });
// $(".unjoin_tips").css({
// 	color: general_color,
// 	borderColor: general_color
// });
// $(".pt_unenough").css({
// 	color: general_color,
// 	borderColor: general_color
// });