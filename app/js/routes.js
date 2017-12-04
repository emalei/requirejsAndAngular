define([], function()
{
    var loadController = function(controllerName) {
        return ["$q", function($q) {
            var deferred = $q.defer();
            require([controllerName], function() {deferred.resolve(); });
            return deferred.promise;
        }];
    };

    return{
    	defaultRoutePath: '/index',
        states: [
            {
            name: "default",
            data: {
                    url: '/default',
                    templateUrl: 'views/index.html'
                }
            },
            {
            name: "index",
            data: {
                    url: '/index',
                    templateUrl: 'views/bookcase/index.html',
                    controller: 'HomeCtrl',
                    resolve: { IndexCtrl: loadController("controllers/bookcase")}
                }
            },
            {
            name: "account",
            data: {
                    url: '/account',
                    templateUrl: 'views/account/index.html',
                    controller: 'HomeCtrl',
                    resolve: { IndexCtrl: loadController("controllers/bookcase")}
                }
            },
            {
            name: "search",
            data: {
                    url: '/search',
                    templateUrl: 'views/search/index.html',
                    controller: 'HomeCtrl',
                    resolve: { IndexCtrl: loadController("controllers/bookcase")}
                }
            },
            {
            name: "info",
            data: {
                    url: '/info/:id',
                    templateUrl: 'views/bookcase/info.html',
                    controller: 'HomeCtrl',
                    resolve: { IndexCtrl: loadController("controllers/bookcase")}
                }
            },
            {
            name: "directory",
            data: {
                    url: '/directory/:id',
                    templateUrl: 'views/bookcase/directory.html',
                    controller: 'HomeCtrl',
                    resolve: { IndexCtrl: loadController("controllers/bookcase")}
                }
            }
        ]
    };
});
