mui.plusReady(function(){
	
	mui(document).on('tap','#submit',function(){
		
		var platform = $('#platform').val();
		if(platform == 0){
			plus.nativeUI.alert('请先选择平台','','提示','确定');
		}else{
			plus.storage.setItem('platform',platform);
			var username = $("#phone").val();
			var password = $("#password").val();
			if(username == '' || password == ''){
				plus.nativeUI.alert('帐号或密码不能为空','','提示','确定');
			}else{
				var option = {
					username : username,
					password : password
				};
				mui.post(getLocation('Login/doLogin.html'),option,function(result){
					if(result.status == 'success'){
						plus.storage.setItem('username',result.username);
						plus.storage.setItem('user_id',result.user_id);
						openWindow('index.html');
					}else{
						plus.nativeUI.alert(result.msg,'','提示','确定');
					}
				},'json');
			}
		}
		
	});
	
});