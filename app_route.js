// Configure routes
var app = angular.module('indexApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCtrl',
            css: 'login.css'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl',
            css : 'create.css'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

app.run(['$rootScope', '$document', function($rootScope, $document) {
    $rootScope.$on('$routeChangeSuccess', function(event, current) {
        // Remove existing dynamically loaded CSS files
        var existingLink = $document[0].querySelector('link.dynamic-css');
        if (existingLink) {
            existingLink.remove(); // Remove the previously loaded CSS
        }

        // Add new CSS file if defined in the current route
        if (current.$$route && current.$$route.css) {
            var link = $document[0].createElement('link'); // Create a new <link> element
            link.rel = 'stylesheet'; // Set rel attribute
            link.href = current.$$route.css; // Use the css property from the route
            link.className = 'dynamic-css'; // Add class for easier identification
            $document[0].head.appendChild(link); // Append to <head>
        }
    });
}]);



