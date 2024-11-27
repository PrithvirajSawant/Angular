var app = angular.module('indexApp');

// LOGIN SERVICE
app.service('loginService', ['$http', function ($http) {

    // this.getOrgId = function(email){
    //     return $http({
    //         method : 'POST',
    //         url  : 'http://gtdev.greentinsolutions.com:8085/GGRLocService/getOrgId',
    //         data : {emailId : email}
    //     });
    // };

    this.login = function (loginData) {
        return $http({
            method: 'POST',
            url: 'http://gtdev.greentinsolutions.com:8085/GGRLocService/login',
            data: loginData
        });
    };
}]);

// FETCH SERVICE
app.service('dataService', ['$http', function($http){
    this.getEmpList = function(requestData){
        const token = localStorage.getItem('authToken');
        return $http({
            method : 'POST',
            url : 'http://gtdev.greentinsolutions.com:8085/GGRLocService/getAllEmpListByBrannchIds',
            data : requestData,
            headers: {
                Authorization: token
            }
        });
    };
}]);

// CREATE SERVICE
app.service('createEmpService', ['$http', function($http){
    this.addEmp = function(empData) {
        const token = localStorage.getItem('authToken');
        return $http({
            method : 'POST',
            url : 'http://gtdev.greentinsolutions.com:8085/GGRLocService/createemployee',
            data : empData,
            headers: {
                Authorization: token
            }
        });
    };
}]);

//Update Service
app.service('updateEmpService',['$http', function($http){
    this.updateEmp = function(updateData){
        const token = localStorage.getItem('authToken');
        return $http({
            method : 'POST',
            url : 'http://gtdev.greentinsolutions.com:8085/GGRLocService/updateemployeedetails',
            data : updateData,
            headers : {
                Authorization : token
            }
        });
    };
}]);

//DELETE SERVICE
app.service('deleteEmpService',['$http', function($http){
    this.deleteEmp = function(empId){
        const token = localStorage.getItem('authToken');
        return $http({
            method : 'GET',
            url : 'http://gtdev.greentinsolutions.com:8085/GGRLocService/deactivateEmployeeRecord/' + empId,
            // data : deleteData,
            headers : {
                Authorization : token
            }
        });
    };
}]);