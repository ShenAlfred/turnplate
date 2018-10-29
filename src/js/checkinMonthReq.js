$(function() {

    var data = {
        timeMark: "12",							//开始倒计时， 结束倒计时
        startTime: '2018-2-25', 		        //活动开始时间
        endTime: '2019-2-15',   		        //活动结束时间
        startCdTime: '2018-10-24 17:12:00',		//开始倒计时时间
        endCdTime: '2018-10-25 13:28:00',		//结束倒计时时间
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


    var current_data = new Date();
    var _year = current_data.getFullYear();
    var _month = current_data.getMonth();
    var _date = current_data.getDate();
    var month = _month;
    var isCorssStartTime, isCorssEndTime;

    var calendar = new Calendar({
        callback: function() {
            console.log("rendered....");
            var startTime = data.startTime.replace(/-/g,"/");
            var endTime = data.endTime.replace(/-/g,"/");
            var d1 = new Date(Date.parse(startTime)); 
            var d2 = new Date(Date.parse(endTime)); 
            if(current_data > d1) {
                $("#prevArrow").addClass('able');
            } 
            if(current_data < d2) {
                $("#nextArrow").addClass('able');
            }


            $("#prevArrow").on('click', function() {
                if(isCorssStartTime) return 
                else {
                    month -= 1;
                    var startTime = data.startTime.replace(/-/g,"/");
                    var d1 = new Date(Date.parse(startTime));   //开始时间
                    var dd = new Date(_year,month, data.startTime.split('-')[2]);
                    if(dd > d1) {
                        $("#prevArrow").addClass('able');
                        $("#nextArrow").addClass('able');
                        isCorssEndTime = false;
                        calendar.drawCalendar(_year ,month, _date);
                    } else {
                        $("#prevArrow").removeClass('able');
                        calendar.drawCalendar(_year ,month, _date);
                        isCorssStartTime = true;
                        return;
                    }
                }
            });

            $("#nextArrow").on('click', function() {
                if(isCorssEndTime) return
                else {
                    month += 1;
                    var endTime = data.endTime.replace(/-/g,"/");
                    var d1 = new Date(Date.parse(endTime));   //结束时间
                    var dd = new Date(_year,month, data.endTime.split('-')[2]);
                    if(dd < d1) {
                        $("#nextArrow").addClass('able');
                        $("#prevArrow").addClass('able');
                        isCorssStartTime = false;
                        calendar.drawCalendar(_year ,month, _date);
                    } else {
                        $("#nextArrow").removeClass('able');
                        calendar.drawCalendar(_year ,month, _date);
                        isCorssEndTime = true;
                        return;
                    }
                }
            });
        }
    });
    calendar.init();


    $(".shwn").on('click', function() {
        $(".checkin-area").addClass('checkin-success');
    });
    var da = "2018-10-15"
    //已签到
    //$('.day[data-date="'+ da +'"]').addClass('active');
    //为签到
    //$('.day[data-date="'+ da +'"]').addClass('gray');
    //有礼物
    //$('.day[data-date="'+ da +'"]').html('<div class="d-gift"></div>');






    /** 测试皮肤 */
    var themebg_color = '#ff4758';
    var general_color = '#0e54b4';
    $('body').css({
        background: themebg_color
    });
    //$(".bg1").attr('src', '');
    //$(".ci-ti").attr('src', '');
    //$(".help").attr('src', '');
    //$(".wdjp").attr('src', '');
    $(".ci-accumulate").css({
        color: themebg_color
    });
    $(".circle-day.active").css({
        borderColor: themebg_color
    });
    $(".circle-day.active .cd-inner").css({
        borderColor: themebg_color
    });
    //$(".bghw").attr('src', '');
    // $(".checkin-btn").css({
    //     background: ''
    // });


    function dateParse(dateString){  
        var SEPARATOR_BAR = "-";  
        var SEPARATOR_SLASH = "/";  
        var SEPARATOR_DOT = ".";  
        var dateArray;  
        if(dateString.indexOf(SEPARATOR_BAR) > -1){  
            dateArray = dateString.split(SEPARATOR_BAR);    
        }else if(dateString.indexOf(SEPARATOR_SLASH) > -1){  
            dateArray = dateString.split(SEPARATOR_SLASH);  
        }else{  
            dateArray = dateString.split(SEPARATOR_DOT);  
        }  
        return new Date(dateArray[0], dateArray[1]-1, dateArray[2]);   
    }; 

    function dateCompare(dateString, compareDateString){   
        var dateTime = dateParse(dateString).getTime();  
        var compareDateTime = dateParse(compareDateString).getTime();  
        if(compareDateTime > dateTime){  
            return 1;  
        }else if(compareDateTime == dateTime){  
            return 0;  
        }else{  
            return -1;  
        }  
    };

    function isConfineEndDate(dateString, endDateString) {
        var flag = false;  
        var endFlag = (dateCompare(dateString, endDateString) > -1);  
        if(endFlag){  
            flag = true;  
        }  
        return flag;  
    };

    function isConfineStartDate(dateString, startDateString){   
        var flag = false;  
        var startFlag = (dateCompare(dateString, startDateString) < 1);  
        if(startFlag){  
            flag = true;  
        }  
        return flag;  
    };
});