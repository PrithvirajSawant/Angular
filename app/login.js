var app = angular.module('myApp', []);

app.controller('loginCtrl', function($scope, $http, $window){
    $scope.login = [];

    $scope.loginEmp = function(){
        const loginData = {
            email : $scope.emp.email,
            password : $scope.emp.password
        };

        $http.post('http://127.0.0.1:8000/login', loginData)
            .then(function(response){
                $scope.message = "Login successful , EMP ID :" + response.data.emp_id  + ", EMP Name : " + response.data.emp_name;
                $window.location.href = 'index.html';
            })
            .catch(function(error){
                $scope.errorMessage = "Error: " + error.data.detail;
            });
    };

});