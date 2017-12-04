define(['app'], function(app) {
	app.factory("onLoadState", ["$rootScope", function($rootScope) {
		return function() {
			if(document.getElementById("loadStart") || !document.getElementById("page")) {
				return;
			}
			var loadStart = document.createElement('div');
			loadStart.id = 'loadStart';
			loadStart.style.cssText = 'min-height:0.6rem;line-height:0.6rem;text-align:center;color:#999;font-size:0.24rem';
			document.getElementById('page').appendChild(loadStart);
			this.load = function(state, msg) {
				var _msg = {
					startMsg: '<div style="-webkit-transform:translateY(2rem);transform:translateY(2rem);font-size:0.3rem; text-align: center;"><img src="../../images/noRecord.png" style="display:inline-block; width:1.5rem; margin-top:0.2rem;" /><p class="m-fs22 m-col999 m-cen">亲，暂时还没有记录哦！</p></div>', //<p class="m-fs22 m-col999 m-cen">亲，暂时还没有记录哦！</p>
					onMsg: '玩命加载中！',
					endMsg: '亲，已经加载完了！'
				};
				if(msg) {
					_msg = Object.assign(_msg, msg);
				}
				switch(Number(state)) {
					case 0:
						loadStart.innerHTML = _msg.onMsg;
						break;
					case 1:
						loadStart.innerHTML = _msg.endMsg;
						break;
					case 2:
						loadStart.innerHTML = '<div style="-webkit-transform:translateY(2rem);transform:translateY(2rem);position:fixed;left:50%;top:50%;font-size:0.3rem; text-align: center;"><img src="../../images/noRecord.png" style="display:inline-block; width:1.5rem; margin-top:0.2rem;" /><p class="m-fs22 m-col999 m-cen">亲，暂时还没有记录哦！</p></div>';
						break;
					default:
						loadStart.innerHTML = _msg.startMsg;
				}
			}
		};
	}]);
	app.factory("ajaxLoading", function() {
		var loadOnGif = "data:image/gif;base64,R0lGODlh3QCMAMQfAOjp6dfY2MnKyvPz86anp/z8/La3t1hVVI+Njaurq3NwcJqYmLq7u5+goKKjo87Pz+Pj48DBwa+vr/f4+PHx8b2+vtzc3N/f38TFxYSCgbOzs9LT0z46Oe/v7/////X19SH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYTQ5MzJhYi02ZDAxLWQ5NGUtOWNmMi04OTk5MWI2MzY0Y2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUZCMjhCQjEzM0M2MTFFNzlEQ0Q5Q0Y2Qzc0M0U4MUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUZCMjhCQjAzM0M2MTFFNzlEQ0Q5Q0Y2Qzc0M0U4MUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODgzYjc3MDMtZGE2ZC00NzQ4LTkwNjgtNjU0ZTJiN2Q4YzE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAu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";
		return function(className){
//			var ajaxLoadDiv = document.createElement("div");
//			ajaxLoadDiv.cssText="position:fixed; width:100%;height:100%; background:url(loadOnGif) no-repeat;";
//			document.body.appendChild(ajaxLoadDiv);
			var ajaxLoadDiv= document.getElementsByClassName(className);
			if(!className || ajaxLoadDiv.length <=0){return false;}
			ajaxLoadDiv[0].style.display="none";
			return{
				loading :function(){
					ajaxLoadDiv[0].style.display="block";
					ajaxLoadDiv[0].innerHTML="<img src='"+loadOnGif+"' width='70' style='display: inline-block; vertical-align: middle;' />";
				},
				loadEnd:function(t){
					var _v=t?t:false;
					if(!_v){
						ajaxLoadDiv[0].innerHTML="";
						ajaxLoadDiv[0].style.display="none";
					}else{
						ajaxLoadDiv[0].style.display="block";
						ajaxLoadDiv[0].innerHTML=_v;
					}
					
				}
			}
		};
	});
	app.factory("conversion", function() {
		return function(v, t) {
			var rV = "";
			if(t === 0) {
				switch(Number(v)) {
					case 0:
						rV = "男";
						break;
					case 1:
						rV = "女";
						break;
				}
			}
			return rV;
		};
	});
	app.factory("checkObject", function() {
		return {
			ckJSON: function(j) {
				if(j == null || j == undefined || j == '') {
					return false;
				} else {
					for(var i in j) {

						if(j[i]) {
							return true;
						}
					}
					return false;
				}
			}
		};
	});
	app.factory('popDispose', [function() {
		var addPopEle = function(ele, con) {
			var str = document.createElement("div");
			str.className = "popLoading";
			var stylePopLod = "position:absolute;width:100%;height:100%;left:0;top:0;opacity:1;z-index:9998;background:#fff;";
			str.style.cssText = stylePopLod;
			ele.appendChild(str);
			var strP = document.createElement("div");
			strP.className = "popLODp";
			var styleP = "width:100%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;left:50%;top:50%;font-size:0.3rem; text-align: center;"; //background:#fff url(/h5/2.0/images/waiting.gif) center center no-repeat;background-size:30% auto;
			strP.innerHTML = con;
			strP.style.cssText = styleP;
			str.appendChild(strP);
		}
		var removePopEle = function(ele) {
			if(!ele) {
				return;
			}
			var _pld = ele.getElementsByClassName('popLoading');
			while(_pld[0]) {
				if(_pld[0]) {
					_pld[0].parentNode.removeChild(_pld[0]);
				}
			}
		}
		var getEleCon = [
			"暂无记录",
			"<img src='../../images/waiting.gif' style='width:2rem;margin: 0 auto 0.2rem auto;'>",
			"<img src='../../images/noRecord.png' style='width:1.46rem;margin: 0 auto 0.2rem auto;'><p class='m-fs20 m-col999 m-cen'>暂无记录！</p>",
			"<img src='../../images/failure.png' style='width:1.08rem;margin: 0 auto 0.2rem auto;'><p class='m-fs20 m-col999 m-cen'>服务器繁忙，请点击重新加载或稍后再试！</p>", //服务器繁忙
			"<img src='../../images/failure.png' style='width:1.08rem;margin: 0 auto 0.2rem auto;'><p class='m-fs20 m-col999 m-cen'>加载失败，请点击重新加载或检查网络！</p>", //加载失败
			"<img src='../../images/failure.png' style='width:1.08rem;margin: 0 auto 0.2rem auto;'><p class='m-fs20 m-col999 m-cen'>加载失败！</p>" //加载失败
		]
		return {
			load: function() {
				var _pl = document.getElementsByClassName("PartitionedLoading");
				for(var i = 0; i < _pl.length; i++) {
					if(_pl[i].getElementsByClassName("popLoading").length > 0) {
						continue;
					}
					addPopEle(_pl[i], getEleCon[1]);
				}
			},
			creadState: function(pram) {
				var _p = {};
				if(typeof pram !== "object") {
					return;
				}
				_p = pram;
				var _pl = document.getElementsByClassName(_p.eleName);
				var _e = "";
				var _t = _p.type;
				if(_t === "0000") {
					removePopEle(_pl[0]);
					return;
				} else if(_t === "0001" || (typeof _t === "Number" && _t >= 500)) {
					_e = getEleCon[3];
				} else if(_t === "6001") {
					_e = getEleCon[2];
				} else if(_t === "6002") {
					_e = getEleCon[5];
				} else if(_t >= 400 || _t===-1) {
					_e = getEleCon[4];
				} else {
					_e = getEleCon[4];
				}
				for(var i = 0; i < _pl.length; i++) {
					if(_pl[i].getElementsByClassName('popLoading').length <= 0) {
						addPopEle(_pl[i], getEleCon[1]);
					}
					var _pld = _pl[i].getElementsByClassName('popLoading');
					for(var t = 0; t < _pld.length; t++) {
						var pLODp = _pld[t].getElementsByClassName('popLODp')[0];
						pLODp.innerHTML = _e;
						if(typeof _p.bFun === "function") {
							_pld[t].onclick = function() {
								pLODp.innerHTML = getEleCon[1];
								_p.bFun();
								this.onclick = null;
							}
						}
					}
				}
			},
			hide: function(pram) {
				//var bodyEle=document.getElementsByTagName("body")[0];
				var _p = {};
				if(typeof pram !== "object") {
					return;
				}
				_p = pram;
				var _pl = document.getElementsByClassName(_p.eleName)[0];
				removePopEle(_pl);
			}
		}
	}]);

	////客户来源
	app.factory('custSource', function() {
		return function(CustSource) {
			var CustSourceTxt = "";
			switch(Number(CustSource)) {
				case 1:
					CustSourceTxt = "人员拓展";
					break;
				case 2:
					CustSourceTxt = "市场活动";
					break;
				case 3:
					CustSourceTxt = "咨询电话";
					break;
				case 4:
					CustSourceTxt = "用户推介";
					break;
				case 5:
					CustSourceTxt = "网站注册";
					break;
				case 6:
					CustSourceTxt = "咨询EMAIL";
					break;
				case 7:
					CustSourceTxt = "渠道";
					break;
				case 8:
					CustSourceTxt = "机构";
					break;
				case 9:
					CustSourceTxt = "内部员工";
					break;
				default:
					CustSourceTxt = "无";
			}
			return CustSourceTxt;
		}
	});
	app.factory('PartitionedLoading', ['popDispose', function(popDispose) {
		return function() {
			var piecemeal = document.getElementsByClassName("PartitionedLoading");
			for(var i = 0; i < piecemeal.length; i++) {
				if(!piecemeal[i].getElementsByClassName("PTLoading")) {
					var crdDOM = document.createElement('div');
					crdDOM.className = "PTLoading";
					piecemeal[i].appendChild(crdDOM);
				}
			}
			return {
				hide: function(cid) {
					var _cid = document.getElementById(cid),
						_PTLoading = _cid.getElementsByClassName("PTLoading")[0];
					if(_PTLoading) {
						_cid.removeChild(_PTLoading);
					}
				},
				code: function(cid, code, refFun) {
					var _cid = document.getElementById(cid),
						_PTLoading = _cid.getElementsByClassName("PTLoading")[0];
					if(!cid) {
						return;
					}
					var _code = code ? Number(code) : 0;
					switch(_code) {
						case 0:
							popDispose.load({
								eleName: document.body,
								type: 0,
								bFun: null
							});
							break;
						case 1:
							_PTLoading.className = "PTLoading PTL-bg1";
							if(typeof refFun === "function") {
								_PTLoading.onclick = function() {
									_PTLoading.className = "PTLoading";
									_PTLoading.onclick = null;
									refFun();
								}
							}
							break;
						case 2:
							_PTLoading.className = "PTLoading PTL-bg2";
							if(typeof refFun === "function") {
								_PTLoading.onclick = function() {
									_PTLoading.className = "PTLoading";
									_PTLoading.onclick = null;
									refFun();
								}
							}
							break;
						default:
							if(_PTLoading) {
								_cid.removeChild(_PTLoading);
							}
					}
				}
			};
		}
	}]);
	app.factory("setDowlLoad", [function() {
		//获取滚动条当前的位置 
		function getScrollTop() {
			var scrollTop = 0;
			if(document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if(document.body) {
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		}
		//获取当前可是范围的高度 
		function getClientHeight() {
			var clientHeight = 0;
			if(document.body.clientHeight && document.documentElement.clientHeight) {
				clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			} else {
				clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			}
			return clientHeight;
		}
		//获取文档完整的高度 
		function getScrollHeight() {
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		}
		return function(backFun) {
			window.onscroll = function() {
				ml.log("滚动开始" + typeof(backFun));
				if(getScrollTop() + getClientHeight() == getScrollHeight()) {
					if(typeof(backFun) == "function") {
						ml.log("执行函数");
						backFun();
					}
				}
			}
		};
	}]);
	app.factory("statisticsByClick",function($http){
		return function(p){
			console.log("统计："+p);
		}
	});
});