var app = angular.module('indexApp'); // Include ngRoute for routing

app.controller('loginCtrl', ['$scope', 'loginService', '$location', function ($scope, loginService, $location) {
    $scope.user = {};

    const emailForOrgId = {
        'rakesh@greentinsolutions.com' : "1"
    };

    function getOrgIdByEmail(email){
        return emailForOrgId[email] || null;
    }

    $scope.login = function () {
        if ($scope.loginForm.$valid) {
            const orgId = getOrgIdByEmail($scope.user.email);
            if (orgId) {
                var loginData = {
                    orgId: orgId,
                    emailId: $scope.user.email,
                    password: $scope.user.password
                };
                // };
                // loginService.getOrgId($scope.user.email).then(function (response) {
                // if (response.data.status === 'success' && response.data.statusCode === 200) {
                    loginService.login(loginData).then(function (loginResponse) {
                        if (loginResponse.data.status === 'success' && loginResponse.data.statusCode === 200) {
                            localStorage.setItem('authToken', loginResponse.data.authToken);
                            // localStorage.setItem('loggedUser', loginResponse.data.);
                            localStorage.setItem('logedInEmpId', orgId);
                            $location.path('/home');
                        } else {
                            alert('Login Failed!' + (loginResponse.data.message || 'Invalid Credientials'));
                        }
                    },
                        function (error) {
                            alert('An error occured during login : ' + error.statusText);
                        });

                // }
                // else{
                //     alert('Failed to fetch organization details');
                // }  
            } else {
                alert('Could not retrieve organization details. Please check the email entered.');
            }
            // }, function(error){
            //     alert('An error occurred while fetching organization ID:' + error.statusText)
            // });
        };
    };
}]);
//             loginService.login(loginData).then(function (response) {
//                 // Prefer this : more info. in Notion
//                 // if (response.data && response.data.success === true) {
//                 // if (response.status === 200) {
//                     console.log(response.data)
//                     localStorage.setItem('authToken', response.data.authToken);
//                     console.log(localStorage.getItem('authToken'))
//                     localStorage.setItem('logedInEmpBranchId', response.data.employeeDetails.branch.branchId);
//                     console.log(localStorage.getItem('logedInEmpBranchId'))
//                     localStorage.setItem('logedInEmpOrgId', response.data.employeeDetails.branch.org.orgId);
//                     console.log(localStorage.getItem('logedInEmpOrgId'))
//                     localStorage.setItem('logedInEmpPortalLink', response.data.employeeDetails.branch.org.portalLink);
//                     console.log(localStorage.getItem('logedInEmpPortalLink'))
//                     // return

//                     $location.path('/home');
//                     // window.location.href = 'https://greentinsolutions-demo.myenovation.com/template.html#!/homepageV1';

//                 } else {
//                     const message = response.data?.message || 'Login failed! Please check your credentials.';
//                     alert(message);
//                 }
//                 // if (response.status === 200) {
//                 //     // alert('Login successful!');
//                 //     // Redirect to home page after successful login
//                 //     $location.path('/home'); // Correct redirection
//                 // } else {
//                 //     alert('Login failed! Please check your credentials.');
//                 // }
//                 , function (error) {
//                 alert('An error occurred: ' + error.statusText);
//             });
//         }
//     };
// }]);

// app.service('loginService', ['$http', function ($http) {
//     this.login = function (loginData) {
//         return $http({
//             method: 'POST',
//             url: 'http://gtdev.greentinsolutions.com:8085/GGRLocService/login',
//             data: loginData
//         });
//     };
// }]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configure routes
// app.config(['$routeProvider', function ($routeProvider) {
//     $routeProvider
//         .when('/login', {
//             templateUrl: 'login.html',
//             controller: 'loginCtrl'
//         })
//         .when('/home', {
//             templateUrl: 'home.html',
//             controller: 'homeCtrl'
//         })
//         .otherwise({
//             redirectTo: '/login'
//         });
// }]);


