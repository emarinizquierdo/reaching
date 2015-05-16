(function() {
    'use strict';


    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            var routes, setRoutes;

            routes = [{
                route: 'emmiter',
                authenticate: true
            },{
                route: 'dashboard',
                authenticate: true
            },{
                route: 'show',
                params: 'userId',
                authenticate: true
            }, {
                route: 'ui/cards',
                authenticate: true
            }, {
                route: 'ui/typography',
                authenticate: true
            }, {
                route: 'ui/buttons',
                authenticate: true
            }, {
                route: 'ui/icons',
                authenticate: true
            }, {
                route: 'ui/grids',
                authenticate: true
            }, {
                route: 'ui/widgets',
                authenticate: true
            }, {
                route: 'ui/components',
                authenticate: true
            }, {
                route: 'ui/timeline',
                authenticate: true
            }, {
                route: 'ui/lists',
                authenticate: true
            }, {
                route: 'ui/pricing-tables',
                authenticate: true
            }, {
                route: 'ui/maps',
                authenticate: true
            }, 
            {
                route: 'tables/static',
                authenticate: false
            }, {
                route: 'tables/dynamic',
                authenticate: true
            }, {
                route: 'tables/responsive',
                authenticate: true
            }, {
                route: 'forms/elements',
                authenticate: true
            }, {
                route: 'forms/layouts',
                authenticate: true
            }, {
                route: 'forms/validation',
                authenticate: true
            }, {
                route: 'forms/wizard',
                authenticate: true
            }, {
                route: 'charts/charts',
                authenticate: true
            }, {
                route: 'charts/flot',
                authenticate: true
            }, {
                route: 'charts/chartjs',
                authenticate: true
            }, {
                route: 'pages/404',
                authenticate: false
            }, {
                route: 'pages/500',
                authenticate: false
            }, {
                route: 'pages/blank',
                authenticate: false
            }, {
                route: 'pages/forgot-password',
                authenticate: true
            }, {
                route: 'pages/invoice',
                authenticate: true
            }, {
                route: 'pages/lock-screen',
                authenticate: true
            }, {
                route: 'pages/profile',
                authenticate: true
            }, {
                route: 'pages/show',
                authenticate: true
            }, {
                route: 'app/calendar',
                authenticate: true
            },
            {
                route: 'pages/signup',
                authenticate: false
            },{
                route: '/',
                authenticate: false
            }];
           

            setRoutes = function(route) {
                var config, url;
                url = '/' + route.route;

                url = (route.params) ? url + '/:' + route.params : url;

                config = {
                    url: url,
                    templateUrl: 'views/' + route.route + '.html',
                    authenticate : route.authenticate
                };

                $stateProvider.state(route.route, config);

                return $stateProvider;
            };


            routes.forEach(function(route) {
                return setRoutes(route);
            });

            $urlRouterProvider
                .when('/', '/dashboard')
                .otherwise('/dashboard');

        }]);

})();
