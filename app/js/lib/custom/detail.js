define([], function() {
	ml = {
		Promise: function(perform) { //重写js本身Promise
			this.then = function(resolve, reject) {
				if(typeof(resolve) != 'function' || typeof(reject) != 'function') {
					console.log("传入的参数不是function类型");
					return;
				}
				perform(resolve, reject);
			};
			this.perf = function() {
				perform(function() {}, function() {});
			};
			return {
				then: this.then,
				perf: this.perf
			}
		},
		addEvent: function(elm, evType, fn, useCapture) {
			if(elm.addEventListener) {
				elm.addEventListener(evType, fn, useCapture); //DOM2.0
				return true;
			} else if(elm.attachEvent) {
				var r = elm.attachEvent('on' + evType, fn); //IE5+
				return r;
			} else {
				elm['on' + evType] = fn; //DOM 0
			}
		},
		getEleSize: function(elm) {
			return {
				w: document.getElementsByClassName(elm)[0].offsetWeight,
				h: document.getElementsByClassName(elm)[0].offsetHeight
			}
		},
		layer: { //消息弹窗
			msg: function(text, time, fun) {
				if(!text) {
					return false;
				}
				if(!time) {
					time = 2000;
				}
				if(document.getElementById("popMessage") || document.getElementById("conFirm")) {
					return;
				}
				var str = document.createElement("div");
				str.id = "popMessage";
				str.innerHTML = "<div id='mobileMessage'>" + text + "</div>";
				var bodyEle = document.getElementsByTagName("body")[0];
				bodyEle.appendChild(str);
				var popMes = document.getElementById("popMessage");
				var stylePopMes = "position:fixed;width:100%;height:100%;left:0;top:0;z-index:10000;";
				document.getElementById("mobileMessage").style.cssText = "width:60%;height:auto;position:absolute;top:50%;left:50%;padding:15px 10px;border-radius:5px;background:none no-repeat center center rgba(0,0,0,.7);overflow:hidden;text-align:center;color:#fff;font-size:14px;z-index:10001;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);transform:translate(-50%,-50%)";
				popMes.style.cssText = stylePopMes;
				var offMessage = function() {
					var str = document.getElementById("popMessage");
					if(str) {
						bodyEle.removeChild(str);
					}
					if(typeof(fun) == "function") {
						fun();
					} else {
						return false;
					}
				}
				setTimeout(offMessage, time);
			}
		},
		loading: { //loading
			show: function() {
				if(document.getElementById("popLoading") || document.getElementById("conFirm")) {
					return;
				}
				var time = 30000; /*最长等待时间 30s*/
				var str = document.createElement("div");
				str.id = "popLoading";
				var stylePopLod = "position:fixed;width:1.2rem;height:1.2rem;left:50%;top:50%; margin:-0.6rem 0 0 -0.6rem; background:#5e4674 url(../../images/waitting.gif) center center no-repeat;z-index:10004; box-shadow: 0 0 0.05rem #999; background-size:100% auto; border-radius:0.2rem;";
				str.style.cssText = stylePopLod;
				//var bodyEle=document.body;
				document.body.appendChild(str);
				var offMessage = function() {
					var str = document.getElementById("popLoading");
					if(str) {
						document.body.removeChild(str);
					}
				}
				setTimeout(offMessage, time);
			},
			hide: function() {
				//var bodyEle=document.getElementsByTagName("body")[0];
				var str = document.getElementById("popLoading");
				if(str) {
					document.body.removeChild(str);
				}
			}
		},
		getPRAM: function(name) { ///获取URL中的参数
			var r = String(window.location),
				_n = r.indexOf("?") + 1,
				_RP = null;
			var getpraJSON = function() {
				r = r.substring(_n);
				var narray = r.split("&"),
					_rP = {};
				for(var i = 0; i < narray.length; i++) {
					_rP[narray[i].split("=")[0]] = narray[i].split("=")[1];
				}
				return _rP;
			}
			if(_n > 0) {
				if(name === 0) {
					_RP = r.substring(_n); //返回整个参数
				} else if(name) {
					_RP = getpraJSON()[name];
					_RP = _RP ? _RP : ''; //返回指定字符串
				} else {
					_RP = getpraJSON(); //返回参数集合，json格式
				}
			}
			return _RP;
		},
		setPRAM: function() {
			var r = String(window.location),
				_n = r.indexOf("?") + 1;
			r = r.substring(_n);
			return r;
		},
		ifLoginNow: function(u) {
			var u = u ? u : "http://action/LoginActivity"; //window.location.replace(u);
			var tokenid = ml.getPRAM('tokenId');
			if(!tokenid) {
				if(u) {
					ml.conFirm("亲，还没有登录喔～请先登录", function() {
						window.location.replace(u);
					}, '提示', 1);
				}
				return false;
			} else {
				return true;
			}
		},
		conFirm: function(msg, fun, tit, btnNum) {
			if(!msg || document.getElementById("conFirm")) {
				return
			}
			if(!tit) {
				tit = "提示";
			}
			var strHTML = "<div style=\"width:5rem;height:auto;position:absolute;top:50%;left:50%;border-radius:5px;background:#fff;overflow:hidden;text-align:center;font-size:0.14rem;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-box-shadow: 0 0 0.05rem #666; box-shadow: 0 0 0.05rem #666;font-size: 0.26rem;\">";
			strHTML += "<div style=\"height: 0.6rem; line-height: 0.6rem; color: #000; padding-top: 0.2rem;\">" + tit + "</div>";
			strHTML += "<div style=\"color: #666; padding:0.05rem 0.3rem 0.2rem;\">" + msg + "</div>";
			strHTML += "<div style=\"display: -webkit-box; display: box; width: 100%;border-top:1px solid #ccc ;\">";
			strHTML += "<p style=\"-webkit-box-flex:1.0; box-flex:1.0; height: 0.8rem; line-height: 0.8rem; \" id=\"conFirmBackFun\">确定</p>";
			if(!btnNum) {
				strHTML += "<p style=\"-webkit-box-flex:1.0; box-flex:1.0; height: 0.8rem;border-left:1px solid #ccc ; line-height: 0.8rem;\" id=\"conFirmRemoStr\">取消</p>";
			}
			strHTML += "</div></div>";
			var str = document.createElement("div");
			str.id = "conFirm";
			str.style.cssText = "position:fixed;width:100%;height:100%;left:0;top:0;z-index:10007;background:rgba(0,0,0,0.5);";
			str.innerHTML = strHTML;
			var bodyEle = document.getElementsByTagName("body")[0];
			bodyEle.style.webkitTransform = '';
			bodyEle.appendChild(str);
			document.getElementById("conFirmBackFun").onclick = function() {
				//    	bodyEle.removeChild(str);
				if(typeof(fun) == "function") {
					fun();
				}
			}
			if(!btnNum) {
				document.getElementById("conFirmRemoStr").onclick = function() {
					bodyEle.removeChild(str);
				}
			}
		},
		log: function(txt) {
			console.log(txt);
		},
		onTouch: function(sFun, mFun, eFun) { ////touch事件
			var startCoor = {
				x: 0,
				y: 0,
				t: 0
			}; //初始坐标
			var moveCoor = {
				x: 0,
				y: 0,
				t: 0
			}; //移动时坐标
			var endCoor = {
				x: 0,
				y: 0,
				t: 0
			}; //结束时坐标
			var backFun = {
				s: null,
				m: null,
				e: null
			}
			backFun.s = sFun;
			backFun.m = mFun;
			backFun.e = eFun;
			this.bindEvent = function(lisFun) { //给document绑定触摸事件
				document.addEventListener('touchstart', touchFunction);
				document.addEventListener('touchmove', touchFunction);
				document.addEventListener('touchend', touchFunction);
			}
			var removerEvent = function() {
				document.removeEventListener("touchend", touchFunction);
				document.removeEventListener("touchmove", touchFunction);
				document.removeEventListener("touchstart", touchFunction);
			}
			var touchFunction = function(event) {
				var event = event || window.event;
				this.myDate = new Date();
				try {
					//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
					switch(event.type) {
						case "touchstart":
							startCoor.x = Number(event.touches[0].clientX);
							startCoor.y = Number(event.touches[0].clientY);
							startCoor.t = new Date().getTime(); //得到毫秒数  
							if(typeof(backFun.s) == "function") {
								backFun.s({
									startCoor: startCoor,
									moveCoor: moveCoor,
									endCoor: endCoor
								});
							}
							break;
						case "touchmove":
							moveCoor.x = Number(event.touches[0].clientX);
							moveCoor.y = Number(event.touches[0].clientY); //event.changedTouches[0].clientX;
							if(typeof(backFun.m) == "function") {
								backFun.m({
									startCoor: startCoor,
									moveCoor: moveCoor,
									endCoor: endCoor
								});
							}
							if(moveCoor.y - startCoor.y > 0 && ml.getScrollTop() <= 0) {
								event.preventDefault();
							}
							break;
						case "touchend":
							endCoor.x = Number(event.changedTouches[0].clientX);
							endCoor.y = Number(event.changedTouches[0].clientY);
							endCoor.t = new Date().getTime();
							if(typeof(backFun.e) == "function") {
								backFun.e({
									startCoor: startCoor,
									moveCoor: moveCoor,
									endCoor: endCoor
								});
							}
							break;
					}
				} catch(e) {
					alert('touchMoveFunc：' + e.message);
				}
			}
			try {
				document.createEvent("TouchEvent");
				this.bindEvent(touchFunction); //绑定事件
			} catch(e) {
				ml.log("不支持TouchEvent事件！" + e.message);
			}
			return {
				setStartFun: function(sFun) {
					backFun.s = sFun;
				},
				setMoveFun: function(mFun) {
					backFun.m = mFun;
				},
				setEndFun: function(eFun) {
					backFun.e = eFun;
				},
				removerEvent: removerEvent
			}
		},
		closeDownRefresh: function() {
			ml.log("此页面没有下来刷新");
		},
		getScrollTop: function() {
			//获取滚动条当前的位置 
			var scrollTop = 0;
			if(document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if(document.body) {
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		},
		downRefresh: function(refreshEndFun, isOn) { //下拉刷新
			var isOn = isOn; //初始时是否默认显示
			var createDownLoad = function() {
				var loadOnGif = "data:image/gif;base64,R0lGODlh3QCMAMQfAOjp6dfY2MnKyvPz86anp/z8/La3t1hVVI+Njaurq3NwcJqYmLq7u5+goKKjo87Pz+Pj48DBwa+vr/f4+PHx8b2+vtzc3N/f38TFxYSCgbOzs9LT0z46Oe/v7/////X19SH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYTQ5MzJhYi02ZDAxLWQ5NGUtOWNmMi04OTk5MWI2MzY0Y2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUZCMjhCQjEzM0M2MTFFNzlEQ0Q5Q0Y2Qzc0M0U4MUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUZCMjhCQjAzM0M2MTFFNzlEQ0Q5Q0Y2Qzc0M0U4MUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODgzYjc3MDMtZGE2ZC00NzQ4LTkwNjgtNjU0ZTJiN2Q4YzE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAu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";
				var loadStartJpg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAACMCAYAAAD4FqxIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REEwQzk4RDAzM0M2MTFFNzg0MDZFMUEzRTY2Q0QwQ0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REEwQzk4RDEzM0M2MTFFNzg0MDZFMUEzRTY2Q0QwQ0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQTBDOThDRTMzQzYxMUU3ODQwNkUxQTNFNjZDRDBDQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQTBDOThDRjMzQzYxMUU3ODQwNkUxQTNFNjZDRDBDQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtuZuBsAACOnSURBVHja7J0LtFV1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";
				var cdrfBODY = document.getElementById("downRefreshDiv");
				if(document.getElementById("downRefresh") || !cdrfBODY) {
					return false;
				}
				if(isOn) {
					cdrfBODY.style.cssText = "position: relative; -webkit-transform: translateY(0px);";
				} else {
					cdrfBODY.style.cssText = "position: relative; -webkit-transform: translateY(60px);";
				}
				var drDIV = document.createElement("div");
				drDIV.id = "downRefresh";
				drDIV.style.cssText = "position: absolute; top:-8rem; left:0; height: 8rem; background:url(" + loadOnGif + ") center bottom no-repeat;background-size: auto 60px; width: 100%;";
				cdrfBODY.appendChild(drDIV);
				return {
					setDownImg: function(t) { //设置下拉div的图片
						var _loUrl = "";
						if(t === 1) {
							_loUrl = loadOnGif;
						} else {
							_loUrl = loadStartJpg;
						}
						drDIV.style.backgroundImage = "url(" + _loUrl + ")";
					},
					setTranslate: function(tranY) { //设置下拉div的translateY
						cdrfBODY.style.webkitTransform = "translateY(" + tranY + "px)";
					},
					getTranslate: function() { //获取下拉div的translateY
						var _r = cdrfBODY.style.webkitTransform;
						_r = _r.substring(11, _r.indexOf("px)"));
						return Number(_r);
					},
					setTranstion: function(t) { //设置下拉div是否用动画
						cdrfBODY.style.webkitTransition = ((t === 1) ? "-webkit-transform 0.5s" : '');
					}
				}
			}
			var CDL = createDownLoad();
			var _m = 0, //记录手指下拉的距离
				_TY = 0, //记录下啦滑动的实际距离
				wHeight = 800,
				_site = 0, //记录当前下拉的位置
				refreshOnLength = 60; //下拉到什么程度刷新
			var ont = new ml.onTouch(function(bParm) {
				_m = 0;
				_TY = 0;
				CDL.setTranstion();
				_site = CDL.getTranslate();

			}, function(bParm) {
				var GST = ml.getScrollTop();
				_m = bParm.moveCoor.y - bParm.startCoor.y;
				if(_m > 0 && GST <= 0) {
					_TY = _m / (wHeight + _m) * wHeight / 3 + _site;
					if(_TY >= refreshOnLength) {
						CDL.setDownImg(1);
					} else {
						CDL.setDownImg();
					}
					CDL.setTranslate(_TY);
				}
			}, function(bParm) {
				var GST = ml.getScrollTop();
				_m = bParm.moveCoor.y - bParm.startCoor.y;
				if(_m > 0 && GST <= 0) {
					CDL.setTranstion(1);
					if(CDL.getTranslate() >= refreshOnLength - 5) {
						CDL.setTranslate(refreshOnLength);
						CDL.setDownImg(1);
						if(typeof(refreshEndFun) === "function" && _site === 0) {
							refreshEndFun(closeRefresh);
						}
					} else {
						CDL.setTranslate(0);
						CDL.setDownImg();
					}
				}
			});
			var closeRefresh = function() { //关闭下拉刷新
				CDL.setTranstion(1);
				CDL.setTranslate(0);
				CDL.setDownImg();
				_site = 0;
			}
			ml.closeDownRefresh = closeRefresh;
			return {
				closeRefresh: closeRefresh,
				delRefresh: function() {
					document.body.removeAttribute('style');
					ml.log(document.body.style);
					this.closeRefresh = function() {};
					if(document.getElementById("downRefresh")) {
						document.body.removeChild(document.getElementById("downRefresh"));
					}
					ont.removerEvent();
				}
			}
		},
		getDOMSize: function() {
			var w_w = window.innerWidth,
				h_h = window.innerHeight;
			if(typeof w_w != "number") {
				if(document.compatMode == "CSS1Compat") {
					w_w = document.documentElement.clientWidth;
					h_h = document.documentElement.clientHeight;
				} else {
					w_w = document.body.clientWidth;
					h_h = document.body.clientHeight;
				}
			}
			return {
				w: w_w,
				h: h_h
			};
		},
		getElementRect: function(e) {
			function getTop(e) { //获取元素的纵坐标（相对于窗口）
				var offset = e.offsetTop;
				if(e.offsetParent != null){
					offset += getTop(e.offsetParent);
				}
				return offset;
			}
			return {
				y: getTop(e)
			}
		},
		ckParam:function(obj,ary,t){//验证页面传参
			var _t = "缺少参数:",isPase=true;
			if(typeof(obj)!=="object"){
				_t="函数传参有误";
				isPase=false;
			}else{
				if(!t){
					var _ary = ['adviser_id','tokenId','version','device'];
					ary = ary ? ary.concat(_ary) : _ary;
				}else{
					ary = ary || [];
				}
				for (var i = 0; i < ary.length; i++) {
					if(obj[ary[i]] !== 0 && !obj[ary[i]]){
						_t+=ary[i]+"  ";
						isPase=false;
					}
				}
			}
			return {
				t:_t,
				isPase:isPase
			};
		},
		onErrorImg: function(t, src) { //头像图片检查
			t.src = src;
		},
		adaptiveLoad: function() {
			/*初始化页面fond-size值*/
			try {
				var n = document.getElementsByTagName("body")[0].getAttribute("data-size");
				var s = n ? n : 6.4;
			} catch(e) {
				var s = 6.4;
			}
			var w_w = window.innerWidth;
			if(typeof w_w != "number") {
				if(document.compatMode == "CSS1Compat") {
					w_w = document.documentElement.clientWidth;
				} else {
					w_w = document.body.clientWidth;
				}
			}
			var _fod = w_w / s;
			document.getElementsByTagName("html")[0].style.fontSize = _fod + "px";
			if(!window.triggerOne) { //延迟加载一次，预防首次加载不完全
				triggerOne = true;
				setTimeout(function() {
					ml.adaptiveLoad();
				}, 30);
			}
			window.onresize = function() { //页面大小改变时重新触发事件
				ml.adaptiveLoad();
			}
		}
	}
	Function.prototype.href = function(url, p, bFun) {
		p = p || {};
		this.call(this.constructor, p);
		if(typeof bFun === "function") {
			bFun();
		}
		if(url) {
			window.location.href = url;
		}
	}
	Function.prototype.mclick = function(p) {
		p = p || {};
		if(typeof Function.prototype.mclick.record === "function") {
			Function.prototype.mclick.record(p);
		}
		var _arg = [];
		for(var i = 1; i < arguments.length; i++) {
			_arg.push(arguments[i]);
		}
		this.call(this.constructor, _arg);
	}
});