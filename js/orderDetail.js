mui.plusReady(function(){
	
	new Vue({
		el : '#main',
		data : {
			order_id : plus.webview.currentWebview().order_id,
			order_sn : '',
			zffs : 0,
			time : '',
			zhuant : 0,
			order_name : '',
			order_telephone : '',
			order_address : '',
			store_name : '',
			store_logo : '',
			store_phone : '',
			goods : null
		},
		mounted : function(){
			this.loadData();
		},
		methods : {
			loadData : function(){
				var obj = this;
				var option = {
					order_id : this.order_id
				}
				loading(0);
				mui.post(getLocation('Order/detail.html'),option,function(result){
					obj.order_sn = result.order_sn;
					obj.zffs = result.zffs;
					obj.time = result.time;
					obj.zhuant = result.zhuant;
					obj.order_name = result.order_name;
					obj.order_telephone = result.order_telephone;
					obj.order_address = result.order_address;
					obj.store_name = result.store_name;
					obj.store_logo = result.store_logo;
					obj.store_phone = result.store_phone;
					obj.goods = result.goods;
					loading(1);
				},'json');
			}
		}
	});
	
});