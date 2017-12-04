function timetrans(){
	var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
window.m_version = 't=' + timetrans();
require.config({
    baseUrl: '../../js',
    urlArgs : window.m_version,
    paths: {
        'jquery' : 'lib/jquery-2.2.2.min',
        'jquery-weui' : 'lib/jquery-weui',
        'jquery-raty': 'lib/jquery.raty.min',
        'angular': 'lib/angular/angular.min',
        'factory': 'factory/factory',
        'angular-ui-router': 'lib/angular-ui-router/angular-ui-router.min',
        'angular-cookies'   :'lib/angular-cookies/angular-cookies.min',
        'directives' : 'directives/directives',
        'services' : 'services/services',
        'filters' : 'filters/filters',
        'swiper-animate' : 'lib/swiper.animate.min',
        'swiper' : 'lib/swiper/swiper.min',
        'dialog' : 'lib/dialog',
        'require' : 'lib/requirejs/require',
        'loading-bar' :'lib/loading-bar',
        'config' :'config',
        'qrcode' :'lib/jquery.qrcode.min',
        'app':'app',
        'nativeShare' : 'lib/nativeShare',
        'share' :'lib/social-share.min',
        'angulartics' : 'lib/angulartics/angulartics.min',
        'angulartics-piwik' : 'lib/angulartics/angulartics-piwik.min',
        'angular-sanitize' : 'lib/angular-sanitize/angular-sanitize.min',
        'detail' : 'lib/custom/detail',
        'clipboard' : 'lib/clipboard.min',
    },
    map: {
        '*': {
            'css': 'css.min'
        }
    },
    shim: {
        'dialog': {
            deps: ['jquery','css!../css/dialog.css']
        },
        'config': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'directives': {
            deps: ['angular']
        },
        'services': {
            deps: ['angular' , 'angular-cookies']
        },
        'filters': {
            deps: ['angular']
        },
        'swiper': {
            deps: ['css!../css/swiper/swiper.min.css']
        },
        'qrcode':{
            deps: ['jquery']
        },
        'angulartics':{
            deps :['angular']
        },
        'angulartics-piwik':{
            deps :['angulartics']
        },
        'app':{
            deps: ['angular' , 'config' , 'detail','css!../css/default_style.css']
        },
        'angular-sanitize': {
            deps: ['angular']
        }
        
    }
});
try{
	var $otherJs = document.getElementById("require").getAttribute("data-other-js");
	if($otherJs){
		require(['app',$otherJs], function() {
			ml.adaptiveLoad();
			angular.bootstrap(document, ['mobileservice']);
		});
	}else{
		require(['app'], function() {
			ml.adaptiveLoad();
			angular.bootstrap(document, ['mobileservice']);
		});
	}
}catch(e){
	//TODO handle the exception
}

