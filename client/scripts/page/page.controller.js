(function() {
        'use strict';

        angular.module('app.page')
            .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
            .controller('authCtrl', ['$scope', '$window', '$location', 'Auth', authCtrl]);

        function invoiceCtrl($scope, $window) {
            var printContents, originalContents, popupWin;

            $scope.printInvoice = function() {
                printContents = document.getElementById('invoice').innerHTML;
                originalContents = document.body.innerHTML;
                popupWin = window.open();
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
                popupWin.document.close();
            }
        }

        function authCtrl($scope, $window, $location, Auth) {

            $scope.user = {};
            $scope.errors = {};

            $scope.login = function(form) {
                $scope.submitted = true;

                if (form.$valid) {
                    Auth.login({
                            email: $scope.user.email,
                            password: $scope.user.password
                        })
                        .then(function() {
                            // Logged in, redirect to home
                            $location.path('/');
                        })
                        .catch(function(err) {
                            $scope.errors.other = err.message;
                        });
                }
            };

            $scope.loginOauth = function(provider) {
                $window.location.href = '/auth/' + provider;
            };
        

    $scope.login = function() {
        $location.url('/')
    }

    $scope.signup = function() {
        $location.url('/')
    }

    $scope.reset = function() {
        $location.url('/')
    }

    $scope.unlock = function() {
        $location.url('/')
    }
}

})();
