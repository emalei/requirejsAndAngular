function timetrans(){
	var date = new Date();
    var Y = date.getFullYear().toString();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
window.m_version = 't=' + timetrans();
require.config({
    baseUrl: 'js',
    urlArgs : window.m_version,
    paths: {
        'jquery' : 'lib/jquery-2.2.2.min',
        'angular': 'lib/angular/angular.min',
        'factory': 'factory/factory',
        'angular-ui-router': 'lib/angular-ui-router/angular-ui-router.min',
        'angular-cookies'   :'lib/angular-cookies/angular-cookies.min',
        'directives' : 'directives/directives',
        'services' : 'services/services',
        'filters' : 'filters/filters',
        'config' :'config',
        'routes' :'routes',
        'app':'app',
        'angular-sanitize' : 'lib/angular-sanitize/angular-sanitize.min',
        'detail' : 'lib/custom/detail'
    },
    map: {
        '*': {
            'css': 'css.min'
        }
    },
    shim: {
        'angular-ui-router': {
            deps: ['angular']
        },
        'directives': {
            deps: ['angular']
        },
        'services': {
            deps: ['angular']
        },
        'filters': {
            deps: ['angular']
        },
        'swiper': {
            deps: ['css!../css/swiper/swiper.min.css']
        },
        'app':{
            deps: ['angular' , 'config' , 'detail','angular-ui-router','css!../css/default_style.css','css!../css/pulic_style.css']
        },
        'angular-sanitize': {
            deps: ['angular']
        }
        
    }
});
require(['app'], function() {
	angular.bootstrap(document, ['mobileservice']);
});

