'use strict';

angular.module('reachingApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'btford.socket-io',
        'ngMaterial'
        ,'ui.router'
        ,'ui.bootstrap'
        ,'ui.tree'
        ,'ngMap'
        ,'ngTagsInput'
        ,'textAngular'
        ,'angular-loading-bar'
        ,'duScroll'
        ,'app.i18n'
    ])
    .config(function($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function(event, next) {
        Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate && !loggedIn) {
                $location.path('/login');
            }
        });
    });
});
