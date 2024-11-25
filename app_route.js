// Configure routes
var app = angular.module('indexApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl' 
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);