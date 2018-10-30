var data = {
	timeMark: "12",							//开始倒计时， 结束倒计时
	startTime: '2018/10/25', 		//活动开始时间
	endTime: '2018/11/15',   		//活动结束时间
	startCdTime: '2018/10/24 17:12:00',		//开始倒计时时间
	endCdTime: '2018/10/25 13:28:00',		//结束倒计时时间
	user: {
		isJoinActivity: "1",      			//是否可参与对象 1可参与  2不能参与
		availablePoints: 30000,				//可用积点数量
		perConsumePoints: 100,				//每次消耗积点数量
		remainder: 3000,					//剩余次数
	},
	havePrize: '1',								//有没有奖品  1有  0没有
	isConsumePoints: '1',						//是否消耗积点  1消耗  2不消耗
	otherShow: "1"								//是否显示其他中奖人信息
};


/** 测试皮肤 */
var themebg_color = '#ff4758';
var general_color = '#0e54b4';
$('body').css({
    background: themebg_color
});
//$(".bg1").attr('src', '');
//$(".ci-ti").attr('src', '');
//$(".help").attr('src', '');
$(".calendar .calendar-body .calendar-days .day.active").css({
    background: themebg_color
});
//$(".bghw").attr('src', '');
//$(".shwn").attr('src', '');


var totalday = DateDiff(data.startTime, data.endTime);
var start = new Date(data.startTime);
var start_date = start.getDate();
var date_arr = [];
var day_html = "";
for(var i =0; i<=totalday; i++) {
    var newDate = new Date().setDate(start_date+i);
    date_arr.push(new Date(newDate).getFullYear()+"-"+(new Date(newDate).getMonth()+1)+"-"+new Date(newDate).getDate());
}    

for(var i=0; i<date_arr.length; i++) {
    day_html += '<div class="circle-day" data-date="'+ date_arr[i] +'"><div class="cd-inner"><div class="cd-tn"><div class="dp-text">第'+(i+1)+'天</div></div></div></div>';
}
$("#checkin_days").html(day_html);



//ajax req


var reqDate = "2018-10-28";
$(".circle-day[data-date="+ reqDate +"]").addClass('active');

//签到req
$(".checkin-btn").on('click', function() {
    $(".checkin-area").addClass('checkin-success');
});

//如果这天是有奖品的
// $(".circle-day[data-day="+ reqDate +"]").find('.dp-text').text();
// $(".circle-day[data-day="+ reqDate +"]").append('<i class="gift-icon"></i>');


// var arra=["2018-10-25","2018-10-26","2018-10-27"];

// localStorage.setItem('key',JSON.stringify(arra));

// var read=JSON.parse(localStorage.getItem('key'));

// console.log(read,read.length);



    var _turntable = new turntable();
    _turntable.colorsGroup[0] = "#ffd800";
    _turntable.customTextColor = ["#ff4419", "#ff4419"];
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

    $("#turntable-close").on('click', function() {
        $("#turntable-pop").hide();
        $(".shadow").hide();
    });