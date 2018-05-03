mui.plusReady(function(){
	
	var page = 0;
	
	loadData('`status` > 6');
	
	mui(document).on('tap','.order_detail',function(){
		var order_id = $(this).attr('order_id');
		openWindow('orderDetail.html',{
			order_id : order_id
		});
	});
	
	function loadData(where){
		$('.historyTask ul').html('');
        $('.dropload-down').remove();
        $('.historyTask').dropload({
        	scrollArea : window,
        	loadDownFn : function(me){
        		page++;
        		var peisong_id = plus.storage.getItem('peisong_id');
				var option = {
					'peisong_id' : peisong_id,
					'where' : where,
					'page' : page
				};
				mui.post(getLocation('Order/index.html'),option,function(result){
					if(result.list.length > 0){
						var list = template('list',result);
						$('.historyTask ul').append(list);
					}else{
						me.lock();
						me.noData();
					}
					me.resetload();
				},'json');
        	}
        });
	}
	
});