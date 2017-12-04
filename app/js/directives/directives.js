define(["app"], function(app) {
	app.directive('compileHtml', function($compile) {
		return {
			restrict: 'A',
			replace: true,
			link: function(scope, ele, attrs) {
				scope.$watch(function(attrs) {
					return scope.$eval(attrs.ngBindHtml);
				}, function(html) {
					ele.html(html);
					$compile(ele.contents())(scope);
				});
			}
		};
	});
	app.directive('topBody',function(){
		var templateBody='<div class="m-lin8 {{type==1?\'\':\'m-bg0a99fa\'}} iconfont m-colfff top_header">';
			templateBody+='<p class="m-lin8 m-fs44 top_back" ng-click="goback()">&#xe602;</p>';
			templateBody+='<div class="m-cen m-fs30 m-fw9" ng-bind="txt"></div>';
			templateBody+='</div>';
		return{
			restrict:"E",
			template:templateBody,
			replace:"false",
			transclude:true,
			scope:{
				txt:"@showTxt",
				type:"@type"
			},
			link:function(scope){
				scope.goback=function(){
					history.go(-1);
				}
			}
		};
	});
	app.directive('contintBody',function(){
		var templateBody='<div class="iconfont m_content">';
			templateBody+='<div ng-transclude></div>';
			templateBody+='<div class="dis-box m-cen m-bod-t m-col666 m-bgfff footer_nav">';
			templateBody+='<div class="box-flex {{showPage.index==0?\'m-col0a99fa\':\'\'}}" ng-click="togglePage(0)"><p class="m-fs40 m-lin5">&#xe503;</p><p class="m-fs16">书架</p></div>';
			templateBody+='<div class="box-flex {{showPage.index==1?\'m-col0a99fa\':\'\'}}" ng-click="togglePage(1)"><p class="m-fs36 m-lin5">&#xe608;</p><p class="m-fs16">搜索</p></div>';
			templateBody+='<div class="box-flex {{showPage.index==2?\'m-col0a99fa\':\'\'}}" ng-click="togglePage(2)"><p class="m-fs40 m-lin5">&#xe531;</p><p class="m-fs16">账户</p></div>';
			templateBody+='</div></div>';
		return{
			restrict:"E",
			template:templateBody,
			replace:'false',
			transclude:true,
			scope:{
	            showPage:'=showPage'
	        },
			link:function(scope,element,attrs){
				scope.togglePage=function(n){
					switch(n){
						case 0:
						document.location.href="#/index";
						break;
						case 1:
						document.location.href="#/search";
						break;
						case 2:
						document.location.href="#/account";
						break;
					}
				}
			}
		};
	});
});