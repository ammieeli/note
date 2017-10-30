const http =require('http');
const fs=require('fs');


   
http.createServer((req,res)=>{
	let urlName = req.url;
	let files='www';
	let obj={
		code:0
	}
	let sql=[{"name":"leo","password":123},{"name":"aa","password":123},{"name":"bb","password":123}];
	let onOff=false;
	

	
	if(urlName !=='/favicon.ico'){
		if(urlName.indexOf('?')!=-1){
			urlName=urlName.split('?')[1];
			let arr=urlName.split('&');
			for(var i=0;i<arr.length;i++){
				let a = arr[i].split('=');
				for(var j=0;j<sql.length;j++){
					if(sql[j].name==decodeURI(a[1])){
						obj.code=1;
						obj.msg='用户名已经注册';
						onOff=true;
						break;
					}
				}
			}

			if(!onOff){
				obj.msg='可以注册';
			}
				res.write(JSON.stringify(obj));
				res.end();
		}else{
			fs.readFile(files+urlName,(error,data)=>{
				if(error){
					res.write('404');
				}else{
					res.write(data.toString());
				}
				res.end();
			})
		}
	}
}).listen(88);
