mui.plusReady(function(){
	
	var peisong_id = plus.storage.getItem('peisong_id');
	var page = 0;
	loadData();
	
	function loadData(){
		$('#dataList').html('');
        $('.dropload-down').remove();
        $('.workSummary').dropload({
        	scrollArea : window,
        	loadDownFn : function(me){
        		page++;
				var option = {
					'peisong_id' : peisong_id,
					'page' : page
				};
				mui.post(getLocation('User/signRecord.html'),option,function(result){
					if(result.list.length > 0){
						var list = template('list',result);
						$('#dataList').append(list);
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