// Home page controller//

var app = angular.module('indexApp');

app.controller('homeCtrl', ['$scope', 'dataService', 'createEmpService' , function($scope, dataService, createEmpService) {
    // Initialize FETCH $scope variables
    $scope.branchId = null;
    $scope.employeeDetails = []; 
    $scope.dataAvailable = false;  

    $scope.getAllEmpListByBrannchIds = function() {
        if ($scope.branchId) {
            var requestData = {
                branchIds: [$scope.branchId]
            };

            dataService.getEmpList(requestData).then(function(response) {
                if (response.data.statusCode === 200) {
                    $scope.dataAvailable = true;
                    $scope.employeeDetails = response.data.allEmpDetails;
                } else {
                    $scope.dataAvailable = false;
                    alert('Failed to fetch the data');
                }
            }, function(error) {
                $scope.dataAvailable = false;
                alert('An error occurred while fetching the data: ' + error.statusText);
            });
        } else {
            alert('Please enter a valid Branch ID');
        }
    };



    // Initialize CREATE $scope variables
    $scope.emp = {};

    $scope.createEmp = function(){
        // console.log($scope.emp)
        // return
        // if($scope.createForm.$valid){
        //     var empData = {
        //         empId : $scope.emp.empId,
        //         cmpyEmpId: $scope.emp.cmpyEmpId,
        //         firstName : $scope.emp.firstName,
        //         lastName : $scope.emp.lastName,
        //         contactNo : $scope.emp.contactNo,
        //         emailId : $scope.emp.emailId,
        //         deptId: $scope.emp.deptId,
        //         deptName : $scope.emp.deptName,
        //         branchId: $scope.emp.branchId 
        //     };
        if($scope.createForm.$valid){
            var empData = {
                "cmpyEmpId": null,
                "firstName": $scope.emp.firstName,
                "lastName": $scope.emp.lastName,
                "contactNo": $scope.emp.contactNo,
                "createdBy": 0,
                "dept": { "deptId": 1, "deptName": "CQA" },
                "organization": { "orgId": 1, "portalLink": "http://gtdev.greentinsolutions.com/enovation-portal/" },
                "branch": { "branchId": 1 },
                "emailId": $scope.emp.emailId,
                "designation": null,
                "isSetupCompleted": 1,
                "registrationByPass": "Y",
                "empLevelDetails": { "empLvlId": 0 }
            };
            

            

            createEmpService.addEmp(empData).then(function(response){
                if(response.data.statusCode == 200){
                    alert('Employee created Successfully')
                }
                else{
                    alert('Failed to create employee')
                }
            }, function(error){
                alert('An error occured while creating an emp '+ error.statusText);
            });
        }
        
    };


    

}]);

