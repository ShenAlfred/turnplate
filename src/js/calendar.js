function Calendar(opt) {
    this.date_number = [31,"?",31,30,31,30,31,31,30,31,30,31];
    this.current_data = new Date(),
	this.current_year = this.current_data.getFullYear(),
	this.current_month = this.current_data.getMonth(),
    this.current_date = this.current_data.getDate();
    this.opt = opt || {};
}

Calendar.prototype = {

    init: function() {
        this.drawCalendar(this.current_year, this.current_month, this.current_date, this.opt.callback);
        this.bindEvent();
    },
    isLeapYear: function(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    },
    drawCalendar: function(year, month, date, callback) {
        var html = "";
        var newDate = new Date(year, month, 1);
        var firstDate = new Date(year, month, date);
        var what_day = newDate.getDay();  //获取这天是星期几下标
    
        if(this.isLeapYear(newDate.getFullYear())) {
            this.date_number[1] = 29;
        }else {
            this.date_number[1] = 28;
        }

        //当月总天数
        var total_day = this.date_number[(firstDate.getMonth())>11?(Math.ceil(firstDate.getMonth())%12):firstDate.getMonth()];
        //上个月的总天数
        var prevday_total = this.date_number[(firstDate.getMonth())>11?(Math.ceil(firstDate.getMonth())%12):(firstDate.getMonth()-1) < 0 ? 11 : (firstDate.getMonth()-1)];
        var prevStartDay = prevday_total - what_day;
        // 每个月的最后一天
        var lastDay = new Date(year,month,total_day);
        // 当月的最后一天星期几
        var lastDayWeekDay = lastDay.getDay();

        if(newDate.getDay() == 0){}//如果这个月的第一天是星期日
		else {
            //循环上个月的末尾几天
            for(var prev=prevStartDay+1; prev<=prevday_total; prev++) {
                html+="<div class='day gray'><span>"+ prev +"</span></div>"
            }		
        }
        // 循环这个月的天数
        for(var i=0; i<total_day; i++) {
            html+="<div class='day' data-date='"+ newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+(i+1) +"'><span>"+ (i+1) +"</span></div>";
        }
        //循环下个月的天数
        console.log(lastDayWeekDay)
        for(var i=0; i<(7-lastDayWeekDay-1); i++) {
            html+="<div class='day gray'><span>"+ (i+1) +"</span></div>"
        }

        document.querySelector("#year-show").innerHTML = newDate.getFullYear() +"年"+ (newDate.getMonth()+1) + "月";
        document.querySelector("#calendar-days").innerHTML = html;

        callback && callback();
    },
    bindEvent: function() {
        var prev = $("#prevArrow");
        var next = $("#nextArrow");
        var that = this;

        prev.on("click" , this.opt.prev);

        next.on("click" , this.opt.next);

    }

}