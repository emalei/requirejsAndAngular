define(['app'], function(app) {
	app.filter('trustHtml', function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		}
	});
	app.filter('startRepeat',function(){
		return function(input,i){
			if(input){
				i=i-1;
				return input.slice(i);
			}
		}
	});
	app.filter('encrypt', function() {
		var Trim = function Trim(str, is_global) {
			var result;
			result = str.replace(/(^\s+)|(\s+$)/g, "");
			if(is_global.toLowerCase() == "g") {
				result = result.replace(/\s/g, "");
			}
			return result;
		}
		return function(n, prame) {
			var rStr = '',
				q, j;
			if(n) {
				n = Trim(n, 'g');
				switch(prame) {
					case 'bank':
						rStr = rStr.replace(/\s/g, "");
						rStr = n.substring(0, n.length - 4).replace(/(\d)/g, "*");
						rStr += n.substring(n.length - 4);
						rStr = rStr.replace(/(.{4})/g, '$1 ');
						break;
				}

			} else {
				ml.log("filter：encrypt参数为空了");
			}
			return rStr;
		}
	});
});