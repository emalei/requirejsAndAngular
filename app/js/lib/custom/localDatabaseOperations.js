define(['detail'], function() {
	var localDatabaseOperations = function() {
		//创建或者打开数据库
		this.getCurrentDb = function() {
			//打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
			//如果数据库不存在那么创建之
			var db = openDatabase("CacheData", "1.0", "本地数据存储", 5120 * 5120);
			if(!db) {
				alert("您的浏览器不支持HTML5本地数据库");
				return;
			}
			return db;
		}
		//创建表
		this.creatTabe = function() {
			//interfacePath:接口路径，ReturnData:返回数据，NoteInformation:备注，
			var sql = "create table if not exists CacheData(webId int identity(1,1) primary key,interfacePath text,ReturnData text,NoteInformation)";
			var db = this.getCurrentDb();
			db.transaction(function(trans) {
				trans.executeSql(sql, [], function(ts, data) {
					ml.log("创建表成功");
				}, function(ts, message) { ml.log(message); });
			});
			return db;
		}
		//插入数据
		this.insertData = function(path, d) {
			if(!(d instanceof Array) || d.length < 1) {
				ml.log("参数错误");
				return false;
			}
			var sql = "",
				ar = [],
				backFun=null;
			this.selectData([path]).then(function(rData) {
					if(rData.data.length > 0) {
						new localDatabaseOperations().upDateData(path, d);
					} else {
						var db = new localDatabaseOperations().getCurrentDb();
						switch(d.length) {
							case 1:
								sql = "insert into CacheData(interfacePath,ReturnData) values(?,?)";
								ar = [path, d[0]];
								break;
							case 2:
								sql = "insert into CacheData(interfacePath,ReturnData,NoteInformation) values(?,?,?)";
								ar = [path, d[0], d[1]];
								break;
						}
						db.transaction(function(trans) {
							trans.executeSql(sql, ar, function(ts, data) {
								ml.log("插入数据成功");
								if(typeof backFun === "function") {
									backFun({
										"success": true,
										"data": null
									});
								}
							}, function(ts, message) {
								if(typeof backFun === "function") {
									backFun({
										"success": false,
										"data": null
									});
								}
							});
						});
					}
			});
			return {
				then: function(bFun) {
					backFun=bFun;
				}
			}
		}
		//修改数据
		this.upDateData = function(path, d) {
			if(!(d instanceof Array) || d.length < 1 || !path) {
				return false;
			}
			var sql = '',
				ar;
			if(d.length == 1) {
				sql = "update CacheData set ReturnData=? where interfacePath=?";
				ar = d;
				ar[1] = path;
			} else {
				sql = "update CacheData set ReturnData=? , NoteInformation=? where interfacePath=?";
				ar = d;
				ar[2] = path;
			}
			var db = this.getCurrentDb();
			//执行sql脚本，插入数据
			db.transaction(function(trans) {
				trans.executeSql(sql, ar, function(ts, data) {
					ml.log("修改数据成功");
				}, function(ts, message) {
					ml.log("表修改数据时出错");
				});
			});
		}
		//查询数据
		this.selectData = function(arg) {
			if(!arg) {
				var sql = "select * from CacheData";
			} else if(arg instanceof Array) {
				var sql = "select * from CacheData where interfacePath=?";
			} else {
				return false;
			}
			var backFun=null;
			var db = new localDatabaseOperations().getCurrentDb();
				db.transaction(function(trans) {
					trans.executeSql(sql, arg, function(ts, data) {
						ml.log("查询数据成功");
						var l = new Array();
						for(var i = 0; i < data.rows.length; i++) {
							l[l.length] = data.rows.item(i);
						}
						if(typeof backFun === "function") {
							backFun({
								"success": true,
								"data": l
							});
						}
					}, function(ts, message) {
						if(typeof backFun === "function") {
							backFun({
								"success": false,
								"data": null
							});
						}
					});
					});
			return {
				then: function(bFun) {
					backFun=bFun;
				}
			}
		}
	}
	return localDatabaseOperations;
});