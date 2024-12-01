// Home page controller//

var app = angular.module('indexApp');

app.controller('homeCtrl', ['$scope', 'dataService', 'createEmpService', 'updateEmpService', 'deleteEmpService', function ($scope, dataService, createEmpService, updateEmpService, deleteEmpService) {
    // FETCH - POST
    // Initialize FETCH $scope variables
    $scope.branchId = null;
    $scope.employeeDetails = [];
    $scope.dataAvailable = false;
    $scope.update_data = false;
    $scope.create_data = true;
    $scope.fetch_data = false;
    $scope.emp = {};

    const dept = {
        'CQA' : '1',
        'MachineShop' : '7',
        'Production' : '116',
        'Quality Assurance' : '117'
    }

    function getdeptIdbydName(deptName){
        return dept[deptName] || null;
    }

    let deptId;

    $scope.$watch('emp.deptName', function (newValue) {
        deptId = getdeptIdbydName(newValue);
        // console.log(deptId)
    });
    
    // const deptId = getdeptIdbydName($scope.emp.deptName)

// ///////////////////////////////// LVL //////////////////////////////
    const empLvl = {
        'STAFF' : '7',
        'OE' : '2'
    }

    function getLvlByLvlName(lvlName){
        return empLvl[lvlName] || null;
    }

    let lvl;

    $scope.$watch('emp.levelName', function(newValue){
        lvl = getLvlByLvlName(newValue);
        console.log(lvl);
    })

////////////////////////// NAV BAR FUNCTIONS /////////////////////////
$scope.show_fetch_data = function(){
    $scope.create_data=false;
    $scope.fetch_data = true;
}

$scope.show_create_form = function(){
    $scope.create_data = true;
    $scope.fetch_data = false;
    $scope.update_data = false;
}



////////////////////////////////////// HOME & Services //////////////////////////////////////////////////////////////////////

    $scope.getAllEmpListByBrannchIds = function () {
        if ($scope.branchId) {
            var requestData = {
                branchIds: [$scope.branchId]
            };

            dataService.getEmpList(requestData).then(function (response) {
                if (response.data.statusCode === 200) {
                    $scope.dataAvailable = true;
                    $scope.employeeDetails = response.data.allEmpDetails;

                    //Featching the data from the for-each loop
                    $scope.show_update_data = function(employee){
                        $scope.update_data = true;
                        $scope.fetch_data = false;
                        $scope.emp.eId = employee.empId
                        $scope.emp.ceId = employee.cmpyEmpId;
                        $scope.emp.fname = employee.firstName;
                        $scope.emp.lName = employee.lastName;
                        $scope.emp.contactNum = employee.contactNo;
                        $scope.emp.email = employee.emailId;
                        $scope.emp.designation = employee.designation;
                        $scope.emp.leName = employee.empLevelDetails.levelType;
                        
                        // $scope.emp.ceId = employee.cmpyEmpId;

                        // console.log($scope.emp.ceId);
                        // $scope.emp.ceId = "gt011"

                    }
                } else {
                    $scope.dataAvailable = false;
                    alert('Failed to fetch the data');
                }
            }, function (error) {
                $scope.dataAvailable = false;
                alert('An error occurred while fetching the data: ' + error.statusText);
            });
        } else {
            alert('Please enter a valid Branch ID');
        }

    };


    // CREATE - POST
    // Initialize CREATE $scope variables
    

    $scope.createEmp = function () {
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
        if ($scope.createForm.$valid) {
            var empData = 
            //     cmpyEmpId: 5678,
            //     firstName: $scope.emp.firstName,
            //     lastName: $scope.emp.lastName,
            //     contactNo: $scope.emp.contactNo,
            //     createdBy: 0,
            //     dept: { deptId: 7, deptName: "MachineShop" },
            //     organization: { orgId: 1, portalLink: "http://gtdev.greentinsolutions.com/enovation-portal/" },
            //     branch: { branchId: 4, name: "Unit 3 - Panvel" },
            //     line: { id: 12, name: "A1" },
            //     designation: "Software Engineer",
            //     emailId: $scope.emp.emailId,
            //     isSetupCompleted: 1,
            //     registrationByPass: "Y",
            //     empLevelDetails: { empLvlId: 0, levelName: "STAFF" },
            //     doj: "2021-06-07",
            //     address: null
            // };
            {
                "cmpyEmpId": $scope.emp.ceId,  // Example Company Employee ID (alphanumeric)
                "firstName": $scope.emp.firstName,      // Mandatory (alphabetic)
                "lastName": $scope.emp.lastName,        // Optional (alphabetic)
                "contactNo": $scope.emp.contactNo, // Optional, exactly 10 digits
                "createdBy": 1,      // User creating the employee
                "dept": { 
                    "deptId": deptId          // Mandatory, department ID from the static list
                },
                "organization": { 
                    "orgId": "1",    // Example organization ID
                    "portalLink": "http://gtdev.greentinsolutions.com/enovation-portal" // Example portal link
                },
                "branch": { 
                    "branchId": 1   // Example branch ID
                },
                "emailId": $scope.emp.emailId, // Optional, validated email format
                "designation": $scope.emp.designation, // Optional, alphabetic
                "isSetupCompleted": 1,      // Indicates setup is completed
                "registrationByPass": "Y",  // Registration bypass flag
                "empLevelDetails": { 
                    "empLvlId": lvl           // Example employee level ID
                }
            }
            


            createEmpService.addEmp(empData).then(function (response) {
                if (response.data.statusCode == 200) {
                    // console.log(response.data)
                    // return
                    alert('Employee created Successfully')
                }
                else {
                    alert('Failed to create employee')
                }
            }, function (error) {
                alert('An error occured while creating an emp ' + error.statusText);
            });
        }

    };


    // UPDATE- POST
    // Initialize UPDATE $scope variables
    // $scope.update_data = false;

    $scope.cancel_form = function(){
        $scope.update_data = false;
        console.log($scope.update_data);
        return
    };


    $scope.updateEMP = function () {


        if ($scope.updateForm.$valid) {
            var updateData = {
                empId: $scope.emp.eId , //HC bind to cmpyEmpId
                firstName: $scope.emp.fname, // C
                lastName: $scope.emp.lName, // C
                contactNo: $scope.emp.contactNum, // C
                deptId: deptId, // bind to deptName
                branchId: "1", //HC
                cmpyEmpId: $scope.emp.ceId, // 
                emailId: $scope.emp.email, // C
                designation: $scope.emp.designation, // C
                isSetupCompleted: 1, //HC
                registrationByPass: "Y",
                empLevelDetails: { "empLvlId": lvl }, //HC bind to levelName C
                // "updatedBy": "0",
                createdBy: "36" //HC 
            }


            updateEmpService.updateEmp(updateData).then(function (updateResponse) {
                if (updateResponse.data.statusCode == 200) {
                    $scope.update_data = false;

                    // console.log($scope.update_data);
                    // console.log(updateResponse.data.allEmpDetails.empId)
                    // return
                    alert('Emp updated Successfully')
                    
                }
                else {
                    alert('Falied to update')
                }
            }, function (error) {
                alert('An error occured while updating EMP' + error.statusText)
            });

        }else{
            alert('Empty Form')
        }
    };

    $scope.delete_data = function(empId){
        deleteEmpService.deleteEmp(empId).then(function(){
            const idx = $scope.employeeDetails.findIndex(emp => emp.empId === empId);
            if(idx != -1){
                $scope.employeeDetails.splice(idx, 1);
            }
            alert('Emp Detailes deleted successfully');
        }, function(error){
            alert('Failed to delete the Emp' + error.statusText);
        });
    };


}]);

