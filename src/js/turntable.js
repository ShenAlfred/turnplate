function turntable() {
    this.restaraunts = [];
    this.turnplate = [];
    this.big_circle_data = [];
    this.small_circle_data = [];
    this.big_textRadius = 280;
    this.small_textRadius = 280;
    this.bRotate = false;
    this.scale = 6;
    this.colorsGroup = ['#d52c1f', '#ffffff'];
    this.customTextColor;
}

//16
//turnplate.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费","京东卡","爱奇艺vip",'红包', '元宝', "$80", '100积点',"$80", '100积点',"$80", '100积点'];
//14
//turnplate.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费","京东卡","爱奇艺vip",'红包', '元宝', "$80", '100积点',"$80", '100积点'];
//12
//turnplate.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费","京东卡","爱奇艺vip",'红包', '元宝', "$80", '100积点'];
//10
//turnplate.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费","京东卡","爱奇艺vip", '红包', '元宝'];
//8
//turnplate.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费","京东卡","爱奇艺vip"];
//6
//turnplate.restaraunts = ["20积点","$600","50积点","$20","谢谢参与","$50话费"];

turntable.prototype = {
    init: function() {
        var turntable_warp = $("#turntable-warp");
        var canvas = $("#canvas");
        var $canvas = document.getElementById("canvas");
        var ctx = canvas[0].getContext("2d");
        var that = this;
        $canvas.width = $canvas.width * this.scale;
        $canvas.height = $canvas.height * this.scale;

        this.drawTurntableWheel(ctx);
        var custom_angle = 0;
        if(this.restaraunts.length == 6) {
            custom_angle = 0;
        }else if(this.restaraunts.length == 8) {
            custom_angle = 68;
        }else if(this.restaraunts.length == 10) {
            custom_angle = 35;
        }else if(this.restaraunts.length == 12) {
            custom_angle = 15;
        }else if(this.restaraunts.length == 16) {
            custom_angle = 10;
        }else {
            custom_angle = 0;
        }
        canvas.rotate({
            angle: custom_angle
        });
    },
    rotateFn: function (item, txt){
        var that = this;
        var angles = item * (360 / that.restaraunts.length) - (360 / (that.restaraunts.length*2));
        if(angles<270){
            angles = 270 - angles; 
        }else{
            angles = 360 - angles + 270;
        }
        $("#canvas").stopRotate();
        $("#canvas").rotate({
            angle: 0,
            animateTo:angles+7200,
            duration: 8000,
            callback:function (){
                console.log(txt);
                that.bRotate = !that.bRotate;
            }
        });
    },
    //画转盘
    drawTurntableWheel: function(ctx) {
        var arc = Math.PI / (this.restaraunts.length/2);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = "transparent";
        var center = canvas.width/2;
        var that = this;
        

        //圆的容器（包含小圆和大圆）
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.beginPath();
        ctx.arc(center,center,center-20*this.scale,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        
        //小圆
        for(var i=0;i<this.restaraunts.length; i++) {
            var angle = 0 + i * arc;
            ctx.fillStyle = this.colorsGroup[i%2];
            ctx.beginPath();
            ctx.arc(center, center, center-24*this.scale, angle, angle + arc, false);
            ctx.arc(center, center, 0, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save(); 
            ctx.fillStyle = this.customTextColor ? this.customTextColor[ (i%2)? (i%2)-1 : (i%2)+1 ] : this.colorsGroup[ (i%2)? (i%2)-1 : (i%2)+1 ];
            if(this.restaraunts.length == 6){
                ctx.font=16*this.scale/1.5 + "px Calibri";
            }else if(this.restaraunts.length >=6 && this.restaraunts.length <=8) {
                ctx.font=14*this.scale/1.5 + "px Calibri";
            }else if(this.restaraunts.length >=8 && this.restaraunts.length <=10) {
                ctx.font=12*this.scale/1.5 + "px Calibri";
            }else {
                ctx.font=12*this.scale/1.5 + "px Calibri";
            }
            var text = this.restaraunts[i]['activeName'];
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
}