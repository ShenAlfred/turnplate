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


$(".click-area").on('click', function() {
    if($(this).hasClass('click-able')) {
        $(this).removeClass('click-able');
        $(".history-list-warp").hide();
    }else {
        $(this).addClass('click-able');
        $(".history-list-warp").show();
    }
});