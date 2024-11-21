var app = angular.module('myApp', []);

app.controller('empController', function($scope, $http, $window) {
    $scope.emp = {};

    // Function to handle the form submission
    $scope.createEmp = function() {
        const data = {
            id: $scope.emp.id,
            first_name: $scope.emp.first_name,
            last_name: $scope.emp.last_name,
            contact_number: $scope.emp.contact_number,
            email: $scope.emp.email,
            dept: $scope.emp.dept,
            designation: $scope.emp.designation,
            password: $scope.emp.password
        };

        // Sending POST request to FastAPI's /api/create_emp endpoint
        $http.post('http://127.0.0.1:8000/create_emp', data)
            .then(function(response) {
                $scope.message = "Emp Created Successfully, Emp ID: " + response.data.employee;
                // console.log(response.data);
            })
            .catch(function(error) {
                $scope.message = "Error: " + error.data.detail;
                // console.error(error);
            });
    };

    $scope.logout = function(){
        $scope.message = "LogOut Successful"
        $window.location.href = "login.html"
    }
});
