'use strict';

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$document', 'Auth', AppCtrl]) // overall control
    .config(['$mdThemingProvider', '$httpProvider', mdConfig])

function AppCtrl($scope, $rootScope, $state, $document, Auth) {

    var date = new Date();
    var year = date.getFullYear();

    $scope.auth = Auth;

    $scope.main = {
        brand: 'Material',
        name: 'Lisa',
        year: year
    };

    $scope.menu = [{
        'title': 'Home',
        'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
        Auth.logout();
        $location.path('/login');
    };

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.pageTransitionOpts = [{
        name: 'Fade up',
        "class": 'animate-fade-up'
    }, {
        name: 'Scale up',
        "class": 'ainmate-scale-up'
    }, {
        name: 'Slide in from right',
        "class": 'ainmate-slide-in-right'
    }, {
        name: 'Flip Y',
        "class": 'animate-flip-y'
    }];

    $scope.admin = {
        layout: 'wide', // 'boxed', 'wide'
        menu: 'vertical', // 'horizontal', 'vertical', 'collapsed'
        fixedHeader: true, // true, false
        fixedSidebar: true, // true, false
        pageTransition: $scope.pageTransitionOpts[0], // unlimited
        skin: '31' // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
    };

    $scope.color = {
        primary: '#3F51B5',
        success: '#4CAF50',
        info: '#00BCD4',
        infoAlt: '#673AB7',
        warning: '#FFC107',
        danger: '#F44336',
        gray: '#DCDCDC'
    };

    $rootScope.$on("$stateChangeSuccess", function(event, currentRoute, previousRoute) {
        $document.scrollTo(0, 0);
    });

}

function mdConfig($mdThemingProvider, $httpProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '500'
        })
        .accentPalette('cyan', {
            'default': '500'
        })
        .warnPalette('red', {
            'default': '500'
        })
        .backgroundPalette('grey');
    $httpProvider.interceptors.push('authInterceptor');
}

angular.module('app')
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
