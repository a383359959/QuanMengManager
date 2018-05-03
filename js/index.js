mui.plusReady(function(){
	var index = new Vue({
		el : '#main',
		data : {
			user_id : null,
			name : '',
			telephone : '',
			status : 0,
			order_list : [],
			count : [0,0],
			index_active : 0,
			picker : null
		},
		mounted : function(){
			this.init();
			plus.nativeUI.closeWaiting();
			this.picker = new mui.PopPicker();
			plus.runtime.getProperty(plus.runtime.appid,function(result){
			    $('.version').text('当前版本：' + result.version);
			});
		},
		methods : {
			init : function(){
				this.user_id = plus.storage.getItem('user_id');
				if(this.user_id != null) this.getUser();
				if(this.user_id == null){
					this.count = [0,0];
					this.order_list = [];
					this.status = 0;
				}
				var obj = this;
				obj.loadData(obj.index_active);
				plus.push.addEventListener('click',function(result){
					obj.loadData(obj.index_active);
				},false);
				document.addEventListener('reload',function(){
					obj.loadData(obj.index_active);
				});
				plus.push.addEventListener('receive',function(result){
					obj.loadData(obj.index_active);
				},false);
				// 监听重新切入消息
				document.addEventListener('resume',function(){
					obj.loadData(obj.index_active);
				});
			},
			setPicker : function(){
				var obj = this;
				var option = {
					user_id : this.user_id,
				};
				plus.nativeUI.showWaiting();
				mui.post(getLocation('User/getPicker.html'),option,function(result){
					plus.nativeUI.closeWaiting();
					obj.picker.setData(result);
				},'json');
			},
			menu : function(type){
				if(type == 'show'){
					$('.menu_bg').show();
					$('.menu_layout').animate({'left' : '0px'},'fast');
				}else{
					$('.menu_bg').hide();
					$('.menu_layout').animate({'left' : '-60%'},'fast');
				}
			},
			login : function(){
				openWindow('login.html');
			},
			getUser : function(){
				var obj = this;
				var option = {
					user_id : this.user_id,
					field : 'name,telephone,status'
				}
				mui.post(getLocation('User/info.html'),option,function(result){
					obj.name = result.name;
					obj.telephone = result.telephone;
					obj.loadData(0);
				},'json');
			},
			loadData : function(status){
				$('.index_item a').removeClass('active');
				$('.index_item a').eq(status).addClass('active');
				var obj = this;
				if(this.user_id == null) return false;
				var option = {
					status : status
				};
				mui.post(getLocation('Order/lists.html'),option,function(result){
					obj.order_list = result.list;
					obj.count = result.count;
					obj.index_active = status;
				},'json');
			},
			order_detail : function(order_id){
				openWindow('orderDetail.html',{
					order_id : order_id
				});
			},
			paidan : function(order_id,index){
				var obj = this;
				this.setPicker();
				this.picker.show(function(items){
					var option = {
						user_id : items[0].value,
						order_id : order_id,
						master_id : obj.user_id
					}
					mui.post(getLocation('Order/paidan.html'),option,function(result){
						if(result.status == 'success'){
							plus.nativeUI.alert('派单成功！',function(){
								obj.loadData(obj.index_active);
							},'提示','确定');
						}else{
							plus.nativeUI.confirm(result.msg,function(e){
								if(e.index == 0){
									var option = {
										user_id : items[0].value,
										order_id : order_id,
										master_id : obj.user_id
									}
									mui.post(getLocation('Order/gaipai.html'),option,function(result){
										if(result.status == 'success'){
											plus.nativeUI.alert('改派成功！',function(){
												obj.loadData(obj.index_active);
											},'提示','确定');
										}
									},'json');
								}
							},'提示',['是','否']);
						}
					},'json');
				});
			},
			jump : function(html){
				openWindow(html);
			},
			logout : function(){
				var obj = this;
				plus.nativeUI.confirm('确认退出？',function(e){
					if(e.index == 0){
						plus.storage.removeItem('user_id');
						obj.init();
					}
				},'提示',['是','否']);
			}
		}
	});
	document.addEventListener('login',function(){
		index.init();
	});
});