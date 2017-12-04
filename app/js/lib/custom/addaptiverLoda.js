adaptiveLoad = function(n) {
	/**
	 * 初始化页面fond-size值
	 */
	var s = n ? n : 6.4;
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
			adaptiveLoad(s);
		}, 30);
	}
	window.onresize = function() { //页面大小改变时重新触发事件
		adaptiveLoad(s);
	}
}
adaptiveLoad();
