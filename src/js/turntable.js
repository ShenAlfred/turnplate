function turntable() {
    this.restaraunts = [];
    this.turnplate = [];
    this.big_circle_data = [];
    this.small_circle_data = [];
    this.big_textRadius = 300;
    this.small_textRadius = 300;
    this.bRotate = false;
    this.scale = 6;
}

turntable.prototype = {
    init: function() {
        var turntable_warp = $("#turntable-warp");
        var canvas = $("#canvas");
        var $canvas = document.getElementById("canvas");
        var ctx = canvas[0].getContext("2d");
        var that = this;
        $canvas.width = $canvas.width * this.scale;
        $canvas.height = $canvas.height * this.scale;

        this.handleRestarauntsData();
        this.drawTurntableWheel(ctx);

        var custom_angle = 0;
        if(this.restaraunts.length == 6) {
            custom_angle = 0;
        }else if(this.restaraunts.length == 8) {
            custom_angle = 68;
        }else if(this.restaraunts.length == 10) {
            custom_angle = 35;
        }else {
            custom_angle = 0;
        }
        canvas.rotate({
            angle: custom_angle
        });
    },
    rotateFn: function (item, txt){
        var that = this;
        var angles = item * (360 / this.restaraunts.length) - (360 / (this.restaraunts.length*2));
        if(angles<270){
            angles = 270 - angles; 
        }else{
            angles = 360 - angles + 270;
        }
        $("#canvas").stopRotate();
        $("#canvas").rotate({
            angle: 0,
            animateTo:angles+7200,
            duration: 5000,
            callback:function (){
                console.log(txt);
                that.bRotate = !that.bRotate;
                console.log(that.bRotate)
            }
        });
    },
    //处理奖品数据(分割两个数组)
    handleRestarauntsData: function() {
        for(var k=0; k<this.restaraunts.length; k++) {
            if(k%2 == 0) {
                this.big_circle_data.push(this.restaraunts[k]);
                this.small_circle_data.push("");
            }else {
                this.big_circle_data.push("");
                this.small_circle_data.push(this.restaraunts[k]);
            }
        }
    },
    //画转盘
    drawTurntableWheel: function(ctx) {
        var arc = Math.PI / (this.restaraunts.length/2);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = "transparent";
        var center = canvas.width/2;
        var that = this;
        

        //圆的容器（包含小圆和大圆）
        ctx.fillStyle = "transparent";
        ctx.beginPath();
        ctx.arc(center,center,center-15*this.scale,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        
        //小圆的渐变色
        var small_grd=ctx.createRadialGradient(center,center,0,center,center,center-25);
        small_grd.addColorStop(0,"#fff");
        small_grd.addColorStop(0.7,"#fff");
        small_grd.addColorStop(1,"#fff2bc");
        ctx.fillStyle = small_grd;
        //小圆
        for(var i=0;i<that.small_circle_data.length; i++) {
            if(that.small_circle_data[i]) {
                var angle = 0 + i * arc;
                ctx.beginPath();
                ctx.arc(center, center, center-15*this.scale, angle, angle + arc, false);
                ctx.arc(center, center, 0, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save(); 
                ctx.fillStyle = "#ff5122";
                if(this.restaraunts.length == 6){
                    ctx.font=16*this.scale/1.5 + "px Calibri";
                }else if(this.restaraunts.length >=6 && this.restaraunts.length <=8) {
                    ctx.font=14*this.scale/1.5 + "px Calibri";
                }else if(this.restaraunts.length >=8 && this.restaraunts.length <=10) {
                    ctx.font=12*this.scale/1.5 + "px Calibri";
                }else {
                    ctx.font=12*this.scale/1.5 + "px Calibri";
                }
                var text = that.small_circle_data[i];
                var line_height = 17;
                if(this.restaraunts.length == 6){
                    ctx.translate(center + Math.cos(angle + arc / 2) * this.big_textRadius, center + Math.sin(angle + arc / 2) * this.big_textRadius);
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                }else if(this.restaraunts.length >=6 && this.restaraunts.length <=8) {
                    ctx.translate(center + Math.cos(angle + arc / 1.7) * this.big_textRadius, center + Math.sin(angle + arc / 1.8) * this.big_textRadius);
                    ctx.rotate(angle + arc/2);
                }else if(this.restaraunts.length >=8 && this.restaraunts.length <=10) {
                    ctx.translate(center + Math.cos(angle + arc / 1.5) * this.big_textRadius, center + Math.sin(angle + arc / 1.8) * this.big_textRadius);
                    ctx.rotate(angle + arc/2);
                }else {
                    ctx.translate(center + Math.cos(angle + arc / 1.5) * this.big_textRadius, center + Math.sin(angle + arc / 1.8) * this.big_textRadius);
                    ctx.rotate(angle + arc/2);
                }
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }
        }

        //大圆的渐变色
        var big_grd=ctx.createRadialGradient(center,center,0,center,center,center-18);
        big_grd.addColorStop(0,"#FF7A4B");
        big_grd.addColorStop(0.5,"#FFBA00");
        big_grd.addColorStop(1,"#FFD4B4");
        ctx.fillStyle = big_grd;

        //大圆阴影
        ctx.shadowOffsetX = 0; // 阴影Y轴偏移
        ctx.shadowOffsetY = 0; // 阴影X轴偏移
        ctx.shadowBlur = 30; // 模糊尺寸
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
        // //大圆
        for(var i=0;i<that.big_circle_data.length; i++) {
            if(that.big_circle_data[i]) {
                var angle = 0 + i * arc;
                ctx.beginPath();
                ctx.arc(center, center, center-12*this.scale, angle, angle + arc, false);
                ctx.arc(center,center, 0, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save(); 
                if(i%2 == 0) {
                    ctx.fillStyle = "#fff";
                    if(this.restaraunts.length == 6){
                        ctx.font=16*this.scale/1.5 + "px Calibri";
                    }else if(this.restaraunts.length >=6 && this.restaraunts.length <=8) {
                        ctx.font=14*this.scale/1.5 + "px Calibri";
                    }else if(this.restaraunts.length >=8 && this.restaraunts.length <=10) {
                        ctx.font=12*this.scale/1.5 + "px Calibri";
                    }else {
                        ctx.font=12*this.scale/1.5 + "px Calibri";
                    }
                    ctx.shadowOffsetX = 0; 
                    ctx.shadowOffsetY = 0; 
                    ctx.shadowBlur = 0; 
                    ctx.shadowColor = 'rgba(255, 255, 255, 0)'; 
                    var text = that.big_circle_data[i];
                    var line_height = 17;
                    if(this.restaraunts.length == 6){
                        ctx.translate(center + Math.cos(angle + arc / 2) * this.big_textRadius, center + Math.sin(angle + arc / 2) * this.big_textRadius);
                        ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    }else if(this.restaraunts.length >=6 && this.restaraunts.length <=8) {
                        ctx.translate(center + Math.cos(angle + arc / 1.7) * this.big_textRadius, center + Math.sin(angle + arc / 1.8) * this.big_textRadius);
                        ctx.rotate(angle + arc/2);
                    }else if(this.restaraunts.length >=8 && this.restaraunts.length <=10) {
                        ctx.translate(center + Math.cos(angle + arc / 1.5) * this.big_textRadius, center + Math.sin(angle + arc / 1.8) * this.big_textRadius);
                        ctx.rotate(angle + arc/2);
                    }else {
                        ctx.translate(center + Math.cos(angle + arc / 1.5) * this.big_textRadius, center + Math.sin(angle + arc / 1.8) * this.big_textRadius);
                        ctx.rotate(angle + arc/2);
                    }
                    // ctx.translate(center + Math.cos(angle + arc / 2) * turnplate.big_textRadius, center + Math.sin(angle + arc / 2) * turnplate.big_textRadius);
                    //ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    ctx.restore();
                }
            }
        }
    }
}