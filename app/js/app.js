define(['routes'], function(config) {
	var app = angular.module('mobileservice', ['ui.router']);
	app.config(
		[	
			'$filterProvider',
			'$provide',
			'$httpProvider',
			'$controllerProvider',
			'$urlRouterProvider',
			'$stateProvider',
			'$compileProvider',
			'$locationProvider',
			function($filterProvider, $provide, $httpProvider,$controllerProvider,$urlRouterProvider,$stateProvider,$compileProvider,$locationProvider) {
				app.factory = $provide.factory;
				app.controller = $controllerProvider.register;
                app.filter = $filterProvider.register;
                app.directive  = $compileProvider.directive;
				$httpProvider.interceptors.push('UserInterceptor');
				$locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
				if(config.states !== undefined)
                {
                    angular.forEach(config.states, function(states, path)
                    {
                        $stateProvider.state(states.name,states.data);
                    });
                }
                if(config.defaultRoutePath !== undefined)
                {
                    $urlRouterProvider.otherwise(config.defaultRoutePath);
                }
			}
		]);
		app.factory('UserInterceptor', ["$q","$rootScope", function ($q,$rootScope) {
        return {
        	response:function(response){
    			var rData=response.data || '';
    			if(typeof rData==='object'){
					var _code = rData.code || 0;
					switch(rData.code){
					case '999':
						ml.conFirm("登录状态失效，请重新登录！",function(){
							location.href = "http://action/LoginActivity";
						},'提示',1,"温馨提示");
					break;
					}
    			};
    			return response || $q.when(reponse);
    		},
            responseError:function(rejection){
            	if (!navigator.onLine){
            		ml.layer.msg("无网络，请稍后重试！");
            		$rootScope.loadState={type:3,txt:'无网络，请稍后重试！',isOver:true};
            	}else if(rejection.status=="404"){
            		ml.layer.msg("亲，找不到您要的内容了！");
            		$rootScope.loadState={type:3,txt:'亲，找不到您要的内容了！',isOver:true};
            	}else{
            		$rootScope.loadState={type:3,txt:'未知错误',isOver:true};
            	}
    			ml.closeDownRefresh();
    			return $q.reject(rejection);
    		}
        };
    }]);
	app.config(["$httpProvider", function($httpProvider) {
		//更改 Content-Type
		$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
		$httpProvider.defaults.headers.post["Accept"] = "*/*";
		$httpProvider.defaults.transformRequest = function(data) {
			//把JSON数据转换成字符串形式
			if(data !== undefined) {
//				return $.param(data);
			}
			return data;
		};
	}])
	app.run(['$rootScope',function($rootScope) {
		ml.adaptiveLoad();
		$rootScope.$on('$stateChangeStart', function() {
		 	ml.loading.show();
	    });
	    $rootScope.$on('$stateChangeSuccess', function() {
		 	setTimeout(ml.loading.hide,1000);
	    });
	}]);
	return app;
});